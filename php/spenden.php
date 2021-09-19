<?php 
    header('Content-type: text/html; charset=UTF-8');
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    require_once('setup.php');
    // require('sendmailscript.php');
    //var_dump($_POST['typ']);

 switch($_POST['typ']){
          
            // lädt alle spenden 
        case "loadAllDonates_admin" :
           
        if (isset($_SESSION["login"])) { 
           if ( $_SESSION["status"] == "admin") { 
                 $html = "SELECT `id`, `txn_id`, `fall_name`, `payer_email`,  `betrag`, `db_date` FROM `spenden_success_pay`   ";
               echo sql_db($html, "SELECT");
           }  
        }
         
            break;
            
            // lädt anzahl und summe der spenden für alle falles
        case "loadCountDonate" :
            $html1 = " SELECT COUNT(`betrag`), ROUND(SUM(`betrag`),0) FROM `spenden_success_pay` ";
            $erg1 =   sql_db($html1, "SELECT");
            $html2 = "  SELECT   RIGHT(`txn_id`,7) ,  `betrag`, `db_date` FROM `spenden_success_pay` ORDER BY `db_date` DESC LIMIT 5";
            $erg2 =   sql_db($html2, "SELECT");
            echo $erg1 ."#$$#". $erg2;
            break;  
            
            // lädt anzahl und summe eines falles
        
         
 }
    
?>