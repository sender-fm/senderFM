<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 

// $_POST['filter']   == alphabet   ||    datum
    if ($LOGIN) {
      
            $sql  = 'UPDATE `ag_mitglieder` SET  `status`="Sprecher"  WHERE   `id_mitglied` = '. $_POST["uid"].' ';
      
            echo  sql_db($sql, "SELECT");
       
        // NOTIZ speichern
                $sql1 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ('Neuer Redaktionsprecher angelegt','" . $_SESSION["vorname"]."". $_SESSION["nachname"] ."'," . $_SESSION["id"].",'Wurde als Sprecher für eine Redaktion angelegt. Name: " .  $_POST["name"] ." ( ". $_POST["uid"] .")')";
                sql_db($sql1, "INSERT");
        
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>