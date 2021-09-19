<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        $sql  = 'SELECT `id`, `txt`, `creator_id`, `creator`, `date`   '; 
        $sql  .= '  FROM `text_mitglieder` WHERE `creator_id` = '. $_POST["uid"] .' ORDER BY date DESC' ;
      
        echo  sql_db($sql, "SELECT");
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>