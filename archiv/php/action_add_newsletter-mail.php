<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');

 
  
         //$_POST["email"]
        
        // prüfen ob die email schon vorhanden ist
          $sqlc =  "SELECT `mail` FROM `newsletter-user` WHERE `mail` = '" .  $_POST['email']."'" ;
          $erg = sql_db($sqlc, "SELECT");
        
         if ( $erg != $_POST['email']) {
             $code = rand(1, 99999999);
            
            $sql =  "INSERT INTO `newsletter-user`(`mail`, `code`) VALUES ('". $_POST['email'] ."','" . $code . "')";
            sql_db($sql, "INSERT");
             echo "OK";
             
                // Notiz speichern
          $sql0 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ";
          $sql0 .= " ('Newsletter bestellt ','" . $_POST['email'] ."','0','". $_POST['email'] ." hat den Newsletter bestellt.')";
        sql_db($sql0, "INSERT");
             
             
         } else {
             if ( $erg == $_POST['email'] ) {
                 // ist schon in der datenbank gespeichert
                 echo "ist in DB";
             }
             
         }
      
   
               

?>