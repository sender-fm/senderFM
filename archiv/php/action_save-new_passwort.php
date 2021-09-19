<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
//var_dump($_POST);

    // $_POST["pwd_old"]  
    // $_POST["pwd_new"]  
    // $_POST["pwd_new2"]

 
if ($LOGIN) {
  
    if ($_POST["pwd_new"]  != $_POST["pwd_new2"] ) { 
        
            // prüfen ob neue passwörter gleich             
        echo "passwort nicht gleich";  
    } else {
         
        // prüfen ob das alte passwort zum user passt         
        $sql  = ' SELECT `id` FROM `user` WHERE `id` = ' . $_SESSION["id"]. ' AND `passwort` = "' . $_POST["pwd_old"]. '"'; 
        $erg =  sql_db($sql, "SELECT");
            
        if ( $_SESSION['id'] == $erg ) { 
            //  echo "ok: altes passwort passt zu user!";
                
            // speichern / updaten    
             $sql1  = 'UPDATE `user` SET  `passwort`="' . $_POST["pwd_new"]. '" WHERE `id` = ' . $_SESSION["id"]. ''; 
            $erg1 =  sql_db($sql1, "UPDATE");
            
             echo "OK";  
            
        } else { 
            echo "false: altes passwort passt NICHT zu user!";
        }
        
    }
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>