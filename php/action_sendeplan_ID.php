<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');

 
 
// den stream titel von airtime auslesen
 
      $sql = "SELECT `id`, `instance_id`, `end_timestamp`, `start_timestamp`, `name`,`description`,`instance_description`   FROM `sendeplan` WHERE `id` = ".$_POST['id'] ;
      echo  sql_db($sql, "SELECT");
  
    
        

?>