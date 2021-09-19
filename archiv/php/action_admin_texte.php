<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    //var_dump($_POST);


 
            switch($_POST['typ']){
                    
                    
                case "impressum":
                    $sql=' SELECT `impressum` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");                   
                    break;
                case "ueber":
                     $sql=' SELECT `ueber` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break;
                case "agb":
                    $sql=' SELECT `agb` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break;
                case "kontakt":
                    $sql=' SELECT `kontakt` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break;
                case "spenden":
                    $sql=' SELECT `spenden` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break;
                case "lizenzvorlage":
                    $sql=' SELECT `lizenzvorlage` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break;
                case "datenschutz":
                    $sql=' SELECT `datenschutz` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break; 
                case "dsgvo":
                    $sql=' SELECT `dsgvo` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break; 
                case "partner":
                    $sql=' SELECT `partner` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break;    
                     case "kontakt_login":
                    $sql=' SELECT `kontakt_login` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break; 
                    case "login":
                    $sql=' SELECT `login` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break;
                    case "register":
                    $sql=' SELECT `register` FROM `sitemaininfo` WHERE `id` = 1'; 
                    echo  sql_db($sql, "SELECT");
                    break; 
          
            }


        if ($LOGIN) { 
            if ($_SESSION["member"] == "admin") {
                
              switch($_POST['typ']){
                    
                case "impressum-save":                  
                     $sql="UPDATE `sitemaininfo` SET `impressum`='".$_POST['text']."' WHERE `id` = 1";
                     echo  sql_db($sql, "UPDATE");                   
                    break;
                case "ueber-save":
                    $sql="UPDATE `sitemaininfo` SET `ueber`='".$_POST['text']."' WHERE `id` = 1"; 
                    echo  sql_db($sql, "UPDATE"); 
                    break;
                case "agb-save":
                    $sql="UPDATE `sitemaininfo` SET `agb`='".$_POST['text']."' WHERE `id` = 1"; 
                    echo  sql_db($sql, "UPDATE"); 
                    break;
                case "kontakt-save":
                     $sql="UPDATE `sitemaininfo` SET `kontakt`='".$_POST['text']."' WHERE `id` = 1"; 
                    echo  sql_db($sql, "UPDATE"); 
                    break;
                case "spenden-save":
                    $sql="UPDATE `sitemaininfo` SET `spenden`='".$_POST['text']."' WHERE `id` = 1"; 
                   echo  sql_db($sql, "UPDATE");                     
                    break;
                case "lizenzvorlage-save":
                    $sql="UPDATE `sitemaininfo` SET `lizenzvorlage`='".$_POST['text']."' WHERE `id` = 1"; 
                   echo  sql_db($sql, "UPDATE");                     
                    break;
                case "datenschutz-save":
                    $sql="UPDATE `sitemaininfo` SET `datenschutz`='".$_POST['text']."' WHERE `id` = 1"; 
                    echo  sql_db($sql, "UPDATE"); 
                    break; 
                case "dsgvo-save":
                    $sql="UPDATE `sitemaininfo` SET `dsgvo`='".$_POST['text']."' WHERE `id` = 1"; 
                   echo  sql_db($sql, "UPDATE");                     
                    break;     
                case "partner-save":
                    $sql="UPDATE `sitemaininfo` SET `partner`='".$_POST['text']."' WHERE `id` = 1"; 
                   echo  sql_db($sql, "UPDATE");                     
                    break;  
                case "kontakt_login-save":
                    $sql="UPDATE `sitemaininfo` SET `kontakt_login`='".$_POST['text']."' WHERE `id` = 1"; 
                   echo  sql_db($sql, "UPDATE");                     
                    break;  
                  case "login-save":
                    $sql="UPDATE `sitemaininfo` SET `login`='".$_POST['text']."' WHERE `id` = 1"; 
                   echo  sql_db($sql, "UPDATE");                     
                    break;  
                       case "register-save":
                    $sql="UPDATE `sitemaininfo` SET `register`='".$_POST['text']."' WHERE `id` = 1"; 
                   echo  sql_db($sql, "UPDATE");                     
                    break;
                       
                 
            }
            
           
        }  else {
         
            echo "du hast nicht die rechte!";
        }
    } else {
         
         
    }
           
               
        

?>