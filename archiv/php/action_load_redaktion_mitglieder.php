<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
         
            
            $sql="SELECT a.`id`, a.`id_ag`, a.`id_mitglied`, b.vorname, b.nachname, b.img, a.`status` ";
            $sql.=" FROM `ag_mitglieder` as a ";
            $sql.=" LEFT JOIN mitglieder as b ";
            $sql.=" ON (b.userid = `a`.`id_mitglied`) ";
            $sql.=" WHERE a.`id_ag` = 111". $_POST["rid"] ."";
            // echo $sql;
            
            if ($_SESSION['member'] == 'admin') {
                $sql1  = "SELECT a.userid, b.vorname, b.nachname, b.img ";
           
                $sql1.= "FROM `ag_apply_membership` as a ";
                $sql1.= " LEFT JOIN mitglieder as b ";
                $sql1.= " ON (b.userid = a.userid ) ";
                $sql1.= "WHERE a.agid = 111". $_POST["rid"] ."  ";
                 // echo $sql1;
                 echo sql_db($sql, "SELECT")."#@#". sql_db($sql1, "SELECT"); 
            } else {
                   echo sql_db($sql, "SELECT");  
            }
            
    } else {
        echo "Login fehlt";
    }
           
               
        

?>