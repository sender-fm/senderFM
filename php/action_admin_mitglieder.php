<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 

// $_POST['filter']   == alphabet   ||    datum
    if ($LOGIN) {
        
        
        
      
              
            $sql  = 'SELECT a.`userid`, a.`vorname`, a.`nachname`, a.`ort` , a.`img`, b.`aktiviert` FROM `mitglieder` as a INNER JOIN `user` as b ON a.userid = b.id ORDER BY a.`userid` DESC ';
      
            echo  sql_db($sql, "SELECT");
      
        
        
        
        
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>