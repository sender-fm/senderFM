<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
//  $_POST['uid']
//  $_POST['rid']

    if ($LOGIN) {
         
            
            $sql="SELECT a.`id`, a.`id_ag`, a.`id_mitglied`, b.vorname, b.nachname, b.img, a.`status` ";
            $sql.=" FROM `ag_mitglieder` as a ";
            $sql.=" LEFT JOIN mitglieder as b ";
            $sql.=" ON (b.userid = `a`.`id_mitglied`) ";
            $sql.=" WHERE a.`id_mitglied` = ". $_POST['uid'] ." AND id_ag = 111" . $_POST['rid'] . "";
               // echo $sql;
            
           
                   echo sql_db($sql, "SELECT");  
          
            
    } else {
        echo "Login fehlt";
    }
           
               
        

?>