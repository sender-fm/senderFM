<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        $sql  = 'SELECT `id`, `userid`,  `status`, `anrede`, `vorname`, `nachname`,  `www`,  `img`, `des`   '; 
        $sql  .= '  FROM `mitglieder` WHERE `userid` LIKE '. $_SESSION["idi"] ;
      
        echo  sql_db($sql, "SELECT");
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>