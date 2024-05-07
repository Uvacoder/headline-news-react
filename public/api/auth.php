<?php
    include "includes/session.php";
    include "includes/dbconfig.php";
    include "includes/adminConfig.php";

    if(isset($_POST['username']) && $_POST['username'] == "admin" && isset($_POST['password']))
    {
        include './includes/adminConfig.php';
        $hashedPass = hash("sha512", $_POST['password']);

        if($hashedPass == $adminPass)
        {
            $_SESSION['username'] = $_POST['username'];
            $_SESSION['password'] = $hashedPass;
            $result = new stdClass();
            $result->loggedIn = true;
            echo json_encode($result);
            return;
        }

        $result = new stdClass();
        $result->loggedIn = false;
        echo json_encode($result);
        return;
    }

?>