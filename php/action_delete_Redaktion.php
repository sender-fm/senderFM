<?php 
    //action_delete_Redaktion.php
    header('Content-type: text/html; charset=UTF-8');    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);
    require_once('setup.php');

        if ($LOGIN) {
            // $_POST['rid']
              if ( $_SESSION["status"] == "admin") { 
                  // #1
                  $sql =' DELETE FROM `ags` WHERE `ags`.`id` = '.$_POST["rid"].'';
                  echo sql_db($sql, "UPDATE");
                      
                  // #2
                  $sql =' DELETE FROM `ag_apply_membership` WHERE `ag_apply_membership`.`agid` = 111'.$_POST["rid"].'';
                  echo sql_db($sql, "DELETE");
            
                  // #3
                echo   $sql =' DELETE FROM `ag_mitglieder` WHERE `ag_mitglieder`.`id_ag` = 111'.$_POST["rid"].'';
                  echo sql_db($sql, "DELETE");
                  
                  
                  
                  // #4
                  $sql ='DELETE FROM `ag_comment` WHERE `ag_text_id` IN (SELECT `id` FROM `ag_text` WHERE `ag_id` = 111'.$_POST["rid"].' )';
                  echo sql_db($sql, "DELETE");  
                  
                  // #5
                  $sql ='DELETE FROM `ag_text` WHERE `ag_id` = 111'.$_POST["rid"].'';
                  echo sql_db($sql, "DELETE");
                  
                  
              }
            
            
         
                
        }

?>