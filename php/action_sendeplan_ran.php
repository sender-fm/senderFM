<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');

 

// den stream titel von airtime auslesen
 
     $sql = "SELECT `id`, `instance_id`, `end_timestamp`, `start_timestamp`, `name`   FROM `sendeplan` WHERE `start_timestamp` <= NOW() ORDER BY `sendeplan`.`start_timestamp` ASC LIMIT 10 ";
      echo  sql_db($sql, "SELECT");
  
    
        

?>