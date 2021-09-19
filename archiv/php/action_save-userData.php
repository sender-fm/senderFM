<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

  
    require_once('setup.php');
 
 
    // vorname  , nachname  ,gender,  plz,  ort  , www , textarea
      var_dump( $_POST );
 
    $sql= "UPDATE `mitglieder` SET `anrede`='".$_POST['gender']."',`vorname`='".$_POST['vorname']."',`nachname`='".$_POST['nachname']."',";
    echo $sql.= "`plz`='".$_POST['plz']."',`ort`='".$_POST['ort']."',`www`='".$_POST['www']."',`des`='".$_POST['text']."' WHERE `userid` = " .$_SESSION['id']."";
                 
    $erg = sql_db($sql, "UPDATE");
          
       
    // Notiz speichern
    $sql0 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUES ('Profil geändert','" . $_POST["vorname"]."". $_POST["nachname"] ."',". $erg .",'Ein  Mitglied hat seine Daten geändert. Name: " . $_POST["vorname"]." ". $_POST["nachname"] ."',".$erg." )";
    // echo $sql0;
    sql_db($sql0, "INSERT");
        
      
   
      echo "OK";
   
    
    
?>