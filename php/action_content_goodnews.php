<?php 
    header('Content-type: text/html; charset=UTF-8');    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    require_once('setup.php');
 
    //var_dump($_POST);
 
    if (! $LOGIN ) {header ("Location: https://sender.fm"); exit; }

    if ($LOGIN) {
              
        switch($_POST['typ']){
                
            case "save":
                $sql = "INSERT INTO `ag_text`( `ag_id`, `ag_name`, `title`, `txt`, `creator`, `creator_id`, `gn-pos`) VALUES (999999,'sender.fm','','".  $_POST['text']   ."','". $_SESSION['vorname'] ."',". $_SESSION['id'] .", '".$_POST['position']."' )";
                // echo $sql;                         
                $InsertID = sql_db($sql, "INSERT");
                if ($InsertID > 0) {
                    echo "OK";
                    // NOTIZ speichern
                    $sql1 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ('new GOODNEWS','" . $_SESSION["vorname"]."". $_SESSION["nachname"] ."',".$InsertID .",'Ein neuer Beitrag in GoodNews ".$_POST["position"]." geschrieben. Name: " . $_SESSION["vorname"]."". $_SESSION["nachname"] ."')";
                    sql_db($sql1, "INSERT");
                } else {

                    echo "ERROR";
                }
                break;
                
            case "update":
                $sql = "UPDATE `ag_text` SET  `txt` = '" .$_POST['text']."'  WHERE id =  " .$_POST['id']."";
                  //echo $sql;                         
                sql_db($sql, "UPDATE");
              
                   
                    // NOTIZ speichern
                  echo  $sql1 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`, `gn-pos`) VALUES ('update GOODNEWS','" . $_SESSION["vorname"]."". $_SESSION["nachname"] ."',".$_POST['id'] .",'Ein Beitrag in GoodNews wurde bearbeitet. Name: " . $_SESSION["vorname"]."". $_SESSION["nachname"] ."', '".$_POST['position']."' )";
                    sql_db($sql1, "INSERT");
                
                break;   
                
                
            case "delete":                
                
               $sql = "DELETE FROM `ag_text` WHERE id = ".$_POST['id']."";
                  echo  sql_db($sql, "DELETE");
                     
                break;    
            
        }
    
      
        
         
    }     
               
        

?>