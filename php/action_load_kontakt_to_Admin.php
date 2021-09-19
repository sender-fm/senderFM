<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

 require( 'PHPMailer-master/PHPMailerAutoload.php');
    require_once('setup.php');
    // require('sendmailscript.php');
 


      var_dump( $_POST );
 
        $sql="SELECT  `id`, `typ`, `name`, `mail`, `text`,  `date`,  `uid`, `answerPerMail` FROM  `kontakt_to_senderfm` ORDER BY `date` DESC";
        
        
         echo sql_db($sql, "SELECT");
        
         
                    
          
    
    
?>