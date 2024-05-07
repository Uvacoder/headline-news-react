<?php
    include "includes/cors.php";
    include "includes/session.php";
    include "includes/dbconfig.php";

    function getArticle($startDate, $endDate, $pdo)
    {
        $sql = "SELECT * FROM data WHERE issueDate BETWEEN :endDate AND :startDate ORDER BY RAND() LIMIT 1";
        $statment = $pdo->prepare($sql);

        $statment->bindParam(":endDate", $endDate);
        $statment->bindParam(":startDate", $startDate);

        if($statment->execute() == false)
        {
            $error = new stdClass();
            $error->errorMessage = "An error occured fetching article!";
            echo json_encode($error);
            exit;
        }

        if($statment->rowCount() == 0)
        {
            return false;
        }

        echo json_encode($statment->fetch(PDO::FETCH_ASSOC));
        exit;
    }

    function getArticleWithCategory($startDate, $endDate, $category, $pdo)
    {
        $sql = "SELECT * FROM data WHERE issueDate BETWEEN :endDate AND :startDate AND category LIKE :category ORDER BY RAND() LIMIT 1";
        $statment = $pdo->prepare($sql);
        $cat = "%" . $category . "%";
        $statment->bindParam(":category", $cat);
        $statment->bindParam(":endDate", $endDate);
        $statment->bindParam(":startDate", $startDate);

        if($statment->execute() == false)
        {
            $error = new stdClass();
            $error->errorMessage = "An error occured fetching article!";
            echo json_encode($error);
            exit;
        }

        if($statment->rowCount() != 0)
        {
            echo json_encode($statment->fetch(PDO::FETCH_ASSOC));
            return true;
        }

        return false;
    }

    function getHighlightedArticle($pdo)
    {
        $sql = "SELECT * FROM data WHERE highlight=1 ORDER BY RAND() LIMIT 1";
        $result = $pdo->query($sql);

        if($result == false)
        {
            $error = new stdClass();
            $error->errorMessage = "An error occured fetching article!";
            echo json_encode($error);
            exit;
        }

        if($result->rowCount() != 0)
        {
            echo json_encode($result->fetch(PDO::FETCH_ASSOC));
            return true;
        }

        return false;
    }

    function getHighlightedArticleWithType($type, $pdo)
    {
        $sql = "SELECT * FROM data WHERE highlight=1 AND category LIKE :category ORDER BY RAND() LIMIT 1";
        $statment = $pdo->prepare($sql);

        $cat = "%" . $type . "%";
        $statment->bindParam(":category", $cat);
        if($statment->execute() == false)
        {
            $error = new stdClass();
            $error->errorMessage = "An error occured fetching article!";
            echo json_encode($error);
            exit;
        }

        if($statment->rowCount() != 0)
        {
            echo json_encode($statment->fetch(PDO::FETCH_ASSOC));
            return true;
        }

        return false;
    }

    function getDateRange($modifier)
    {
        // Notes: 0 should never be a value we get here since the first article should be the latest on page load
        // 1 - 1 to 14 days
        // 2 - 15 to 90 
        // 3 - 91 or older - defaults on any value higher then 3 to this range

        $dates = new stdClass();

        switch($modifier)
        {
            case 1:
                $dates->startDate = date("Y-m-d", strtotime("-1 days"));
                $dates->endDate = date("Y-m-d", strtotime("-14 days"));
                return $dates;

            case 2:
                $dates->startDate = date("Y-m-d", strtotime("-15 days"));
                $dates->endDate = date("Y-m-d", strtotime("-90 days"));
                return $dates;

            default:
                $dates->startDate = date("Y-m-d", strtotime("-91 days"));
                $dates->endDate = date("Y-m-d", strtotime("-40 years"));
                return $dates;
        }
    }
    
    // If artcielid is present 
    if(isset($_GET['articleid']))
    {
        try
        {
            $articleid = intval($_GET['articleid']);
            if($articleod == false)
            $sql = "SELECT * FROM data WHERE id=:id";
            $statment = $pdo->prepare($sql);
            $statment->bindParam(":id", $articleid);

            if($statment->execute() == false)
            {
                $error = new stdClass();
                $error->errorMessage = "An error occured fetching article!";
                echo json_encode($error);
                exit;
            }

            $row = $statment->fetch(PDO::FETCH_ASSOC);
            
            echo json_encode($row);
            exit;
        }
        catch(Exception $e)
        {
            $error = new stdClass();
            $error->errorMessage = "An error occured fetching article!";
            echo json_encode($error);
            exit;
        }
    }

    if(isset($_GET['latest']))
    {
        if($_GET['latest'] == 'true')
        {
            $sql = "SELECT * FROM data ORDER BY issueDate DESC";
            $statment = $pdo->prepare($sql);

            if($statment->execute() == false)
            {
                $error = new stdClass();
                $error->errorMessage = "An error occured fetching article!";
                echo json_encode($error);
                exit;
            }

            echo json_encode($statment->fetch(PDO::FETCH_ASSOC));
            exit;
        }
        else
        {
            $error = new stdClass();
            $error->errorMessage = "An error occured fetching article!";
            echo json_encode($error);
            exit;
        }
    }

    if(isset($_GET['modifier']))
    {
        $modifier =  intval($_GET['modifier']);


        if(isset($_GET['type']))
        {
            $category = $_GET['type'];

            if($modifier % 5 === 0)
            {
                if(getHighlightedArticleWithType($_GET['type'], $pdo)) exit;
            }

            //Else wise get date range
            $dates = getDateRange($modifier);
            if(getArticleWithCategory($dates->startDate, $dates->endDate, $category, $pdo) != false) exit;
            
            // If we get here we failed to find an article in the date range, expand the range
            $modifier += 1;
            $dates = getDateRange($modifier);
            if(getArticleWithCategory($dates->startDate, $dates->endDate, $category,$pdo) != false) exit;

            // If we get here we failed to find an article in the date range, expand the range
            $modifier += 1;
            $dates = getDateRange($modifier);
            if(getArticleWithCategory($dates->startDate, $dates->endDate, $category,$pdo) != false) exit;
        }
        else
        {
            if($modifier % 5 === 0)
            {
                if(getHighlightedArticle($pdo)) exit;
            }
            
            //Else wise get date range
            $dates = getDateRange($modifier);
            if(getArticle($dates->startDate, $dates->endDate,$pdo) != false) exit;
            
            // If we get here we failed to find an article in the date range, expand the range
            $modifier += 1;
            $dates = getDateRange($modifier);
            if(getArticle($dates->startDate, $dates->endDate,$pdo) != false) exit;

            // If we get here we failed to find an article in the date range, expand the range
            $modifier += 1;
            $dates = getDateRange($modifier);
            if(getArticle($dates->startDate, $dates->endDate,$pdo) != false) exit;
        }

        //At this point if we are still failing to get an article something the database is very broken
        exit;
    }

    // if(isset($_GET['startDate']))
    // {
    //     $startDate = $_GET['startDate'];
    //     $endDate = $startDate;

    //     if(isset($_GET['endDate']))
    //     {
    //         $endDate = $_GET['endDate'];
    //     }

    //     if(isset($_GET['category']))
    //     {
    //         getArticleWithCategory($startDate, $endDate, $_GET['category'], $pdo);
    //     }
    //     else
    //     {
    //         getArticle($startDate, $endDate, $pdo);        
    //     }
    // }
    // else
    // {
    //     $startDate = date("20y-m-d");
    //     $endDate = $startDate;

    //     if(isset($_GET['category']))
    //     {
    //         getArticleWithCategory($startDate, $endDate, $_GET['category'], $pdo);
    //     }
    //     else
    //     {
    //         getArticle($startDate, $endDate, $pdo);        
    //     }
    // }

?>