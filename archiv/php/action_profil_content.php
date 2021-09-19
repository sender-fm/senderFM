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
                
                
                
            case "profil_save": 
                $base = addslashes($_POST["text"]);
                $sql = "INSERT INTO `text_mitglieder`(`creator_id`, `creator`, `txt`) VALUES ";
                $sql .= " (" . $_SESSION['id']  . ",'" . $_SESSION["uname"]  . "','". $base ."') ";
         
        
                $InsertID = sql_db($sql, "INSERT");
                if ($InsertID > 0) {
                    echo "OK";
                    // NOTIZ speichern
                    $sql1 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ('new USERBEITRAG','" . $_SESSION["vorname"]."". $_SESSION["nachname"] ."',".$InsertID .",'Ein neuer User-Beitrag von ". $_SESSION["uname"]." geschrieben. Name: " . $_SESSION["vorname"]."". $_SESSION["nachname"] ."')";
                    sql_db($sql1, "INSERT");
                } else {

                    echo "ERROR";
                }
                break;
                
                
                
                
            case "profil_update": 
                $base = addslashes($_POST["text"]);
                 $sql = "UPDATE `text_mitglieder` SET  `txt`='". $base ."'  WHERE `id`= ".$_POST['id']." ";
                echo sql_db($sql, "UPDATE");
                break;
                
                
                
                
            case "profil_BeitragDelete":
                
                $sql = "DELETE FROM `text_mitglieder` WHERE `id` = " . $_POST['id'] ."";
                           
                $erg =   sql_db($sql, "DELETE");
                    
                if ($erg == 0) {
                    echo "OK";
                    // NOTIZ speichern
                    $sql1 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ('delete USERBEITRAG','" . $_SESSION["vorname"]."". $_SESSION["nachname"] ."',".$_POST['id'].",'Ein User Beitrag wurde gelöscht. Name: " . $_SESSION["vorname"]."". $_SESSION["nachname"] ."')";
                    sql_db($sql1, "INSERT");
                    
                   
                    
                } else {

                    echo "ERROR";
                }
                break;
                
                
            case "fileDelete":
                //  typ:"fileDelete", aid:aid, filename:file
                 $sql = "DELETE FROM `archiv` WHERE `id` = " . $_POST['aid'] ."";
                           
                $erg =   sql_db($sql, "DELETE");
                    
                if ($erg == 0) {
                   
                    // NOTIZ speichern
                    $sql1 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ('Delete Datei aus Archiv','" . $_SESSION["vorname"]."". $_SESSION["nachname"] ."',".$_POST['aid'].",'Ein User Beitrag wurde gelöscht. Name: " . $_SESSION["vorname"]."". $_SESSION["nachname"] ."')";
                    sql_db($sql1, "INSERT");
                    
                       $path = "../archiv/" . $_POST['filename'] .""; 
                    
                    if(copy($path,"../archiv-x/" . $_POST['filename'] ."")){
                        unlink($path);
                         echo "OK";
                    }
                       
                } else {

                    echo $erg . " - ";
                    echo "ERROR";
                }
                break;
                
                
                
                 case "save_comment": 
                // $_POST["pid"]
                // $_POST["txt"]
                // $_POST["creatorid"] userid vom content
                // $_SESSION['id'] userid vom commentar
                $base = addslashes($_POST["txt"]);
                   $sql = 'INSERT INTO `text_mitglieder_comment`(`txtid`, `txt`, `user_id`) VALUES ('. $_POST["pid"].',"'. $base.'",'. $_SESSION['id'].')';
                 echo sql_db($sql, "INSERT");
                 
                break;
                
                  case "save_comment_redaktion": 
                // $_POST["pid"]
                // $_POST["txt"]
                // $_POST["creatorid"] userid vom content
                // $_SESSION['id'] userid vom commentar
                $base = addslashes($_POST["txt"]);
                  $sql = 'INSERT INTO `ag_comment`(`ag_text_id`, `txt`, `user_id`) VALUES ('. $_POST["pid"].',"'.$base.'",'. $_SESSION['id'].')';
                  echo sql_db($sql, "INSERT");
                 
                break;
                
                
            default: echo "bitte etwas auswählen";
        }
    

        
                
        
    }     
               
        

?>