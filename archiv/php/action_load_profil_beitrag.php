<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
       
            
        switch($_POST['typ']){
        
            case"all_forUser": 
                $sql  = 'SELECT `id`, `txt`, `creator_id`, `creator`, `date`,`zusatz`   '; 
                $sql  .= '  FROM `text_mitglieder` WHERE `creator_id` = '. $_SESSION["idi"] .' ORDER BY date DESC' ;
      
                echo  sql_db($sql, "SELECT");
         
                break;
                    
                    
            case"einenBeitrag_forUser": 
                $sql  = 'SELECT `txt`    '; 
                $sql  .= '  FROM `text_mitglieder` WHERE `id` = '. $_POST['id'] .' ' ;
      
                echo  sql_db($sql, "SELECT");
         
                break;
            
            default: echo "bitte etwas auswählen";
        }
        
        
      
        
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>