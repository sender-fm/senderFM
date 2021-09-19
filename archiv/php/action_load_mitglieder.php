<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 

// $_POST['filter']   == alphabet   ||    datum
    if ($LOGIN) {
        
        
        
        if ($_POST['filter']   == "datum" ){
            
            $sql  = 'SELECT `userid`, `vorname`, `nachname`, `ort` , `img` FROM `mitglieder` ORDER BY `userid` DESC ';
      
            echo  sql_db($sql, "SELECT");
        }
        
        
        
        
         if ($_POST['filter']   == "alphabet" ){
            $sql  = 'SELECT `userid`, `vorname`, `nachname`, `ort` , `img` FROM `mitglieder` ORDER BY binary(`vorname`) ASC ';
      
            echo  sql_db($sql, "SELECT");
        }
        
        
        
        
        if ($_POST['filter']   == "show_NOT_Mitglieder_Redaktion" ){
            
            $sql = 'SELECT `id`, `userid`, `vorname`, `nachname`, `img`  FROM `mitglieder` as a ';
            $sql .= ' WHERE `userid` NOT IN (SELECT `id_mitglied` FROM `ag_mitglieder` WHERE `id_ag` = 111'.$_POST['rid'].')';
                  
            echo  sql_db($sql, "SELECT");
        }
        
        
        
        
        if ($_POST['filter']   == "save_mitgliedTo_Redaktion" ){
            // $_POST['rid']  $_POST['uid']  $_POST['sid'] 
            // 1 prüfen ob der user sprecher oder admin ist
            // 2. neues mitglied speichern
            // 3. log schreiben
            
            
            //1
          echo  $sql = 'SELECT `sprecherid` FROM `ags` WHERE `agid` = 111'.$_POST['rid'].'';
         echo   $sprecherID =  sql_db($sql, "SELECT");
          
            
             if ($_SESSSION["status"] == "admin" || $sprecherID == $_POST['sid']) {
               echo   $sql = 'INSERT INTO `ag_mitglieder`( `id_ag`, `id_mitglied`, `status`) VALUES (111'.$_POST['rid'].','.$_POST['uid'].',"Mitglied")';
               echo  sql_db($sql, "SELECT");
             }
              
        }
        
        
        if ($_POST['filter']  == "delete_mitgliedFROM_Redaktion" ){
            // $_POST['rid']  $_POST['uid']  $_POST['sid'] 
            // 1 prüfen ob der user sprecher oder admin ist
            // 2. neues mitglied speichern
            // 3. log schreiben
            
             
            echo  $sql = 'SELECT `sprecherid` FROM `ags` WHERE `agid` = 111'.$_POST["rid"].'';
            echo   $sprecherID =  sql_db($sql, "SELECT");
            
            if ($sprecherID == $_POST['uid']) {
                echo "speekerNOTDELETE";
                return;
            }
            
             if ($_SESSSION["member"] == "admin" || $sprecherID == $_POST['sid']) {
                 echo   $sql = 'DELETE FROM `ag_mitglieder` WHERE `id_mitglied` = '.$_POST["uid"].' AND `id_ag` = 111'.$_POST["rid"].' AND `status` = "Mitglied" ';
                 echo  sql_db($sql, "SELECT");
             }
                 
        }
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>