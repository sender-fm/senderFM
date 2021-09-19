<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        // typ = "myAbos"
        // typ = "abonnenten"
        switch($_POST['typ']){
            case "myabos":
                $sql  = 'SELECT `id`, `userid`,   `vorname`, `nachname`,`img` ';
                $sql  .= 'FROM `mitglieder` ';
                $sql  .= ' WHERE `userid` IN ';
                 $sql  .= '(SELECT `abouserid` FROM `mitglider_abos` WHERE `userid` = '.$_SESSION["id"].')';
                echo  sql_db($sql, "SELECT");
                
                break;
                
                
            case "abonnenten":
                $sql  = 'SELECT `id`, `userid`,   `vorname`, `nachname`,`img` ';
                $sql  .= 'FROM `mitglieder` ';
                $sql  .= ' WHERE `userid` IN ';
                 $sql  .= '(SELECT `userid` FROM `mitglider_abos` WHERE `abouserid` = '.$_SESSION["id"].')';
                echo  sql_db($sql, "SELECT");
                
                break;
                
                
            case "deleteABO":
                
                
                $sql  = 'DELETE FROM `mitglider_abos` WHERE `userid` = '.$_SESSION["id"].' AND `abouserid` = '.$_POST['uid'].' ';
                echo  sql_db($sql, "DELETE");
                
                break;
                
            case "saveABO":
                
                  $sql  = 'SELECT `abouserid` FROM `mitglider_abos` WHERE `userid` = '.$_SESSION["id"].' AND `abouserid` = '.$_POST["uid"].''; 
                $erg =  sql_db($sql, "SELECT");
                
                if ($_POST['uid'] != $erg) {
                     $sql  = 'INSERT INTO `mitglider_abos`( `userid`, `abouserid`) VALUES ('.$_SESSION["id"].','.$_POST['uid'].') ';
                   sql_db($sql, "INSERT");
                    echo "OK";
                }
               
                
                break; 
                    
        }
         
      
        
    } else {
        echo "Login fehlt";
    }
              
      
?>