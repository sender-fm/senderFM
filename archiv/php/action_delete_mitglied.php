<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 // $_POST['agid']   == '999999' for SYS  || aktuelle AGID
 // $_POST['id']
//var_dump($_POST['text']['ops']['insert']);
 

 
if (! $LOGIN ) {header ("Location: https://sender.fm"); exit; }

    if ($LOGIN) {
        $id =   sql_db("SELECT `id` FROM `mitglieder` WHERE `userid` = " . $_POST['userid'] ."", "SELECT");
    
     echo   $sql = "DELETE FROM `mitglieder` WHERE `userid` = " . $_POST['userid'] ."";                         
        $erg =   sql_db($sql, "DELETE");         
                    
        if ($erg == 0) {           
            
         echo   $sql1 = "DELETE FROM `user` WHERE `id` = " . $id ."";                         
            $erg1 =  sql_db($sql1, "DELETE"); 
            
            if ($erg1 == 0) {
                echo "OK";
                // NOTIZ speichern
                $sql1 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ('delete USER','" . $_SESSION["vorname"]."". $_SESSION["nachname"] ."',".$_POST['contId'].",'Ein User Beitrag wurde gelöscht. Name: " . $_SESSION["vorname"]."". $_SESSION["nachname"] ."')";
                sql_db($sql1, "INSERT");
            } else {

            echo "ERROR2";
        }
        } else {

            echo "ERROR1";
        }
        
    }


?>