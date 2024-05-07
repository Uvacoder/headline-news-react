<?php
// Comment out post dev enviroment, needed for dev server to allow remote development and allow cors access
header("Access-Control-Allow-Origin: http://" . $_SERVER['SERVER_NAME'] . ":3000");
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

session_start();
?>