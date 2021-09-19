<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        
        
         $sql  = 'SELECT * FROM `ags` WHERE `agid` IN (SELECT `id_ag` FROM `ag_mitglieder` WHERE `id_mitglied` = '.$_POST["userid"].')';
      
         echo  sql_db($sql, "SELECT");
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>