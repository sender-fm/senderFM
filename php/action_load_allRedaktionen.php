<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        
        
        $sql  = 'SELECT `id`, `name`, `img`, `desc`, `sprecherid`, `agid`   FROM `ags` WHERE `geschlossen` = 0'; 
       
      
        echo  sql_db($sql, "SELECT");
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>