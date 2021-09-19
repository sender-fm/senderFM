<?php 
    header('Content-type: text/html; charset=UTF-8');
    date_default_timezone_set('Europe/Berlin'); 
    error_reporting(E_ALL);
    error_reporting(-1);
    ini_set('error_reporting', E_ALL);
    require_once('setup.php');
 
    if ( $_POST['typ'] == "news") {
        $sql1 = "SELECT ";
        $sql1.= "	  `ag_text` .*";
        $sql1.= "	 , ( SELECT img FROM mitglieder WHERE `ag_text`.`creator_id` = mitglieder.userid )";
        $sql1.= "	 , ( SELECT anrede FROM mitglieder WHERE `ag_text`.`creator_id` = mitglieder.userid )";
        $sql1.= "	 , ( SELECT COUNT(`ag_text_id`) FROM `ag_comment` WHERE `ag_text_id` = `ag_text`.id )";
                
        $sql1.= "FROM `ag_text` ";
        $sql1.= "WHERE `ag_id` = 999999 ORDER BY `ag_text`.id DESC LIMIT 30";
        
        echo  sql_db($sql1, "SELECT"); 
    }

    if ( $_POST['typ'] == "einzeln") {
        $sql1 = "SELECT ";
        $sql1.= "	  `ag_text` .*";
        $sql1.= "	 , ( SELECT img FROM mitglieder WHERE `ag_text`.`creator_id` = mitglieder.userid )";
        $sql1.= "	 , ( SELECT anrede FROM mitglieder WHERE `ag_text`.`creator_id` = mitglieder.userid )";
        $sql1.= "	 , ( SELECT COUNT(`ag_text_id`) FROM `ag_comment` WHERE `ag_text_id` = `ag_text`.id )";
                
        $sql1.= "FROM `ag_text` ";
        $sql1.= "WHERE `id` = ".$_POST['id']." ORDER BY `ag_text`.id DESC LIMIT 30";
        
        echo  sql_db($sql1, "SELECT"); 
    }


 
    
   
  ?>

 