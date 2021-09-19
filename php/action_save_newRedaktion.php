<?php 
    //action_save_newRedaktion.php
    header('Content-type: text/html; charset=UTF-8');    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);
    require_once('setup.php');
    
    if ($LOGIN) {
        // $_POST['name']
        // $_POST['uname']
        // $_POST['uid']
             
        if ( $_SESSION["status"] == "admin") { 
                 
              $sql1 ='INSERT INTO `ags`(  `name`,`sprecherid`,`geschlossen`) VALUES ("'.$_POST["name"].'", '.$_POST["uid"].', 1 )';
               $id  = sql_db($sql1, "INSERT");
                  
               $sql2 ='UPDATE `ags` SET  `agid`= "111'.$id.'"  WHERE `ags`.`id` = '.$id.' ';
            echo sql_db($sql2, "UPDATE");
                      
            
            
                  // NOTIZ speichern
           $sql1 = 'INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ("Neue Redaktion angelegt von:","' . $_SESSION["vorname"].''. $_SESSION["nachname"] .'",111' . $id.', "NEUE REDAKTION. Name: ' .  $_POST["name"] .' ( 111' . $id.') ")';
            echo sql_db($sql1, "INSERT");
         
            
            
            
            
             $sql  = 'INSERT INTO `ag_mitglieder`( `id_ag`, `id_mitglied`, `status`) VALUES (111'.$id.','.$_POST["uid"].',"Sprecher " ) ';
      
             $id2  = sql_db($sql, "SELECT");
        
            // NOTIZ speichern
            $sql1 = 'INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ';
         echo   $sql1 .= '("Neuer Redaktionsprecher angelegt von", "' . $_SESSION["vorname"].''. $_SESSION["nachname"] .'", '. $_POST["uid"] .', "Wurde als Sprecher für eine Redaktion angelegt. Name: ' .  $_POST["uname"] .' ( '. $_POST["uid"] .') ")';
            echo sql_db($sql1, "INSERT");
         
        }
                  
    }

?>