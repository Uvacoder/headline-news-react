<?php
    
    include "includes/session.php";
    include "includes/dbconfig.php";
    include "includes/adminConfig.php";

    function CreateTableIfNotExists($pdo)
    {
        $sql = "CREATE TABLE IF NOT EXISTS data(id int UNIQUE NOT NULL, date date, highlight boolean,category tinytext,issueDate date,issue text,shortHeadline text,
                                                summary text,rebuttal text,completeArticle text,source text,subSources text,refrenceUrl text,attachment text,notes text,
                                                author text,reviewed boolean,reviewNotes text,feedback text)";
        $statment = $pdo->prepare($sql);
        $statment->execute();
    }

    function FixDateTime($dateString)
    {
        $dateTime = explode(" ", $dateString);
        $parts = explode('/', $dateTime[0]);
        
        return "20" . $parts[2] ."-". $parts[0] ."-". $parts[1] . " " . $dateTime[1] . ":00";
    }

    function FixDate($dateString)
    {
        $parts = explode('/', $dateString);
        
        return "20" . $parts[2] ."-". $parts[0] ."-". $parts[1];
    }

    function isTrue($data)
    {
        if(empty($data)) return 0;
        return 1;
    }

    function ProcessAndAppened($pdo,$csvFile)
    {
        $header = fgetcsv($csvFile,0,","); // First Read Discards Header Row

        $sql = 'REPLACE INTO `data` (id,date,highlight,category,issueDate,issue,shortHeadline,summary,rebuttal,completeArticle,source,subSources,refrenceUrl,attachment,notes,author,reviewed,reviewNotes,feedback) VALUES';
        $data = array();
        $insertQuery = array();
        $dataCount = 0;
        
        while(($rowData = fgetcsv($csvFile,0,",")) != false)
        {
            $insertQuery[] = '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $data[] = intval($rowData[0]);
            $data[] = FixDateTime($rowData[1]);
            $data[] = isTrue($rowData[2]);
            $data[] = utf8_decode($rowData[3]);
            $data[] = FixDate($rowData[4]);
            $data[] = utf8_decode($rowData[5]);
            $data[] = utf8_decode($rowData[6]);
            $data[] = utf8_decode($rowData[7]);
            $data[] = utf8_decode($rowData[8]);
            $data[] = utf8_decode($rowData[9]);
            $data[] = utf8_decode($rowData[10]);
            $data[] = utf8_decode($rowData[11]);
            $data[] = utf8_decode($rowData[12]);
            $data[] = utf8_decode($rowData[13]);
            $data[] = utf8_decode($rowData[14]);
            $data[] = utf8_decode($rowData[15]);
            $data[] = empty($rowData[16]);
            $data[] = utf8_decode($rowData[17]);
            $data[] = utf8_decode($rowData[18]);


            $dataCount++;

            if($dataCount >= 500)
            {
                $fixedSQL = $sql . implode(',', $insertQuery);
                $finalSQL = $fixedSQL;
                $statment = $pdo->prepare($finalSQL);
                if(!$statment->execute($data))
                {
                    $error = new stdClass();
                    $error->errorMessage = "Error has Occured!, Inserting data into table: " . $statment->errorInfo();
                    echo json_encode($error);
                    return;
                }

                $dataCount = 0;
                $insertQuery = array();
                $data = array();
                
            }
        }

        if($dataCount > 0)
        {
            $fixedSQL = $sql . implode(', ', $insertQuery);
            $statment = $pdo->prepare($fixedSQL);
            if(!$statment->execute($data))
            {
                $error = new stdClass();
                $error->errorMessage = "Error has Occured!, Inserting data into table: " . print_r($statment->errorInfo());
                echo json_encode($error);
                return;
            }
        }

        $result = new stdClass();
        $result->op = true;
        echo json_encode($result);
        return;
    }

    // Is user Authed
    if(isset($_SESSION['username']) && isset($_SESSION['password']) && $_SESSION['password'] == $adminPass)
    {
        
        if(isset($_FILES['userfile']) && count($_FILES['userfile']) != 0)
        {
            $userFile = $_FILES['userfile'];
            if($userFile['error'] != 0)
            { 
                $error = new stdClass();
                $error->errorMessage = "CSV File Error: " . $userFile['error'];
                echo json_encode($error);
                return;
            }
            else
            {
                CreateTableIfNotExists($pdo);

                $filePath = $userFile['tmp_name'];
                $csvFile = fopen($filePath,"r");

                if($csvFile == false){
                    $error = new stdClass();
                    $error->errorMessage = "Failed to open stream";
                    echo json_encode($error);
                    return;
                }
       
                if($_POST['append'] == true)
                {
                    ProcessAndAppened($pdo,$csvFile);
                }
                else
                {
                    // ProcessAndReplace($pdo,$csvFile);
                }
    
                fclose($csvFile);               

                return;
            }
        }

        $error = new stdClass();
        $error->errorMessage = "No CSV File Present!";
        echo json_encode($error);
        return;
    }
    else
    {
        $error = new stdClass();
        $error->errorMessage = "Action Denied!";
        echo json_encode($error);
        return;
    }
?>