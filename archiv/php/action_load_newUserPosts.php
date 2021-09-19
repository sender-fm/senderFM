<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        if ($_POST['typ'] == "news") {
            $sql1 = "SELECT ";
            $sql1.= "	  a.`id`, a.`txt`, a.`creator_id`, a.`creator`, a.`date`, a.`zusatz`, b.`vorname`, b.`nachname`, b.`img`, ";
             $sql1.= "	   ( SELECT COUNT(c.`txtid`) FROM `text_mitglieder_comment` as c WHERE c.`txtid` = a.`id` ) as comments, ";
            $sql1.= "	   ( SELECT COUNT(d.`txtidi`) FROM `text_mitglieder_likes` as d  WHERE d.`txtidi` = a.`id` ) as likes ";        
            $sql1.= " FROM  `text_mitglieder` as a ";
            $sql1.= " LEFT JOIN  `mitglieder` as b ";
            $sql1.= " ON a.`creator_id` = b.`userid` ";
              $sql1.= " ORDER BY a.`id` DESC LIMIT 30";
            
            // echo   $sql1 ;
            echo  sql_db($sql1, "SELECT");   
        }
        
          if ($_POST['typ'] == "einzeln") {
            
            $sql1 = "SELECT ";
            $sql1.= "	  `text_mitglieder` .*,";
            $sql1.= "	   ( SELECT img FROM mitglieder WHERE `text_mitglieder`.`creator_id` = mitglieder.userid ),";
            $sql1.= "	   ( SELECT COUNT(`txtid`) FROM `text_mitglieder_comment` WHERE `txtid` = `text_mitglieder`.id ),";
            $sql1.= "	   ( SELECT COUNT(`txtidi`) FROM `text_mitglieder_likes` WHERE `txtidi` = `text_mitglieder`.id )";        
            $sql1.= "FROM  `text_mitglieder` WHERE `id` = ". $_POST['tid']." ";
            
             
            //  echo   $sql1;
            echo  sql_db($sql1, "SELECT"); 
        }     
        if ($_POST['typ'] == "einzelnComments") {
        
              
              $sql2 = "SELECT  a.`id`, a.`txtid`, a.`txt`, a.`user_id`, a.`date`, b.`vorname`, b.`nachname`, b.`img`  ";
              $sql2 .= "  FROM `text_mitglieder_comment` as a ";
              $sql2 .= "  LEFT JOIN `mitglieder` as b";
              $sql2 .= "  ON a.`user_id` = b.`id` ";
              $sql2 .= "  WHERE a.`txtid` = ". $_POST['tid']."";
            
            //  echo   $sql1;
            echo  sql_db($sql2, "SELECT") ; 
        }
        
        
    } else {
      
        echo "Login fehlt";
    }
           
               
        

?>