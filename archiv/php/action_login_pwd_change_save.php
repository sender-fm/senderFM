<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
//var_dump($_POST);

    // $_POST["id"]  
    // $_POST["pwd_new"]  
    // $_POST["pwd_new2"]

 

 
             $sql1  = 'UPDATE `user` SET  `passwort`="' . $_POST["pwd_new"]. '", aktiviert = "Ja",  `code` = "" WHERE `id` = ' . $_POST["id"]. ''; 
            $erg1 =  sql_db($sql1, "UPDATE");
            
            echo "OK";
           
               
        

?>