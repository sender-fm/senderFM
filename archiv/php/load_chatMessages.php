<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 // $_POST['typ']
 // $_POST['name']
 // $_POST['id']
    if ($LOGIN) {
        
    switch($_POST['typ']){
        case "redaktion":
                    $sql  = 'SELECT `id`, `uid_send`, `uid_empfaenger`, `rid_empfaenger`, `text`, `date`  '; 
                    $sql  .= 'FROM `chats_text` WHERE `rid_empfaenger`  = 111'.$_POST["rid"].' '; 

            break;
            
        case "user":
                    $sql  = 'SELECT `id`, `name`, `img`, `desc`, `sprecherid`, `agid`   FROM `ags` WHERE `id` = '.$_POST["rid"].' '; 

            break;
            
        default: echo "bitte einen chat typ auswählen."
            
    }
        
       
      
        echo  sql_db($sql, "SELECT");
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>