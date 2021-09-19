<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
         
        $sql1 = "SELECT ";
        $sql1.= "	  `text_mitglieder` .*,";
        $sql1.= "	   ( SELECT img FROM mitglieder WHERE `text_mitglieder`.`creator_id` = mitglieder.userid ),";
        $sql1.= "	   ( SELECT COUNT(`txtid`) FROM `text_mitglieder_comment` WHERE `txtid` = `text_mitglieder`.id ),";
        $sql1.= "	   ( SELECT COUNT(`txtidi`) FROM `text_mitglieder_likes` WHERE `txtidi` = `text_mitglieder`.id )";
        
        $sql1.= "FROM  `text_mitglieder` ";

        $sql1.= " ORDER BY `text_mitglieder`.id DESC LIMIT 20";
        // echo   $sql1 ;
        echo  sql_db($sql1, "SELECT");   
    } else {
         
        echo "Login fehlt";
    }
           
               
        

?>