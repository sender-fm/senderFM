<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 // $_POST['typ']
 // $_POST['rname']
 // $_POST['rid']
//var_dump($_POST['text']['ops']['insert']);
 

echo nl2br("foo ist nicht\n bar");
if (! $LOGIN ) {header ("Location: https://sender.fm"); exit; }

    if ($LOGIN) {
              
    
          $sql = "INSERT INTO `ag_text`( `ag_id`, `ag_name`, `title`, `txt`, `creator`, `creator_id`) VALUES (111".$_POST['rid'].",'".$_POST['rname']."','','".  $_POST['text']   ."','". $_SESSION['username'] ."',". $_SESSION['id'] ." )";
                     echo $sql;
                         
                       $InsertID = sql_db($sql, "INSERT");
                        if ($InsertID > 0) {
                            echo "OK";
                             // NOTIZ speichern
                              $sql1 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ('new GOODNEWS','" . $_SESSION["vorname"]."". $_SESSION["nachname"] ."',".$InsertID .",'Ein neuer Beitrag in GoodNews ".$_POST["name"]." geschrieben. Name: " . $_SESSION["vorname"]."". $_SESSION["nachname"] ."')";
                           sql_db($sql1, "INSERT");
                        } else {

                            echo "ERROR";
                        }
        
                 
        
    }     
               
        

?>