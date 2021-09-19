<?php 
   header('Content-type: text/html; charset=UTF-8');
    date_default_timezone_set('Europe/Berlin'); 
    error_reporting(E_ALL);
    error_reporting(-1);
    ini_set('error_reporting', E_ALL);
        require_once('setup.php');
 
 

     if ( is_session_started() === FALSE ) { session_start(); }


  
    $LOGIN = false;
          
    setcookie("login", "nein", 0, "/");

  
    session_destroy();
       echo "TOT";
   
  ?>

 