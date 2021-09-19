<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {        
         
      $sql ='SELECT `id`, `userid`, `date`, `status`, `anrede`, `vorname`, `nachname`, `www`,  `des`, `img`, `plz`,`ort`,  ';
      $sql .='(SELECT `abouserid` FROM `mitglider_abos` WHERE `userid` = '.$_SESSION["id"].' AND `abouserid` = '.$_POST["uid"].')  ';
      $sql .=' FROM `mitglieder` ';
        $sql .='WHERE `userid` = '.$_POST["uid"].'';
        
     
       echo  sql_db($sql, "SELECT");
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>