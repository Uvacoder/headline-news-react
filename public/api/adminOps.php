<?php

include "includes/session.php";
include "includes/dbconfig.php";
include "includes/adminConfig.php";

if(isset($_SESSION['username']) === false)
{
    $error = new stdClass();
    $error->loggedIn = false;
    echo json_encode($error);
    return;
}
else
{
    $result = new stdClass();
    $result->loggedIn = true;
    echo json_encode($result);
    return;
}

?>