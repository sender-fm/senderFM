<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        
        // counts  - 
        // 0 COUNT programm_allInDB,  
        // 1 COUNT programm_open_send, 
        // 2 DATE  airtimebot_last_run, 
        // 3 TEXT  link_last_airprotokoll
        // 4 DATE: link_last_mysqlbackup
        // 5 TEXT: link_last_mysqlbackup
        /*
        
            1458
            #$#58
            #$#2019-01-18 10:05:21
            #$#_i/php/airtimeprotokolle/airtimebot_protokoll_1547802317.pdf
            #$#php/mysqlbackups/sendeplan_bu_1547802317.sql
        */
           
        switch($_POST['typ']){

            case"counts":  
                $sql_count_list="SELECT 
                                   
                                   (SELECT COUNT(`id`) FROM `sendeplan`) as programm_allInDB,
                                   (SELECT COUNT(`id`) FROM `sendeplan` WHERE `end_timestamp` > NOW() ) as programm_open_send,
                                   (SELECT `date` FROM `notes` WHERE `typ` = 'AIRTIME-BOT Start' ORDER BY id DESC LIMIT 1) as airtimebot_last_run,
                                   (SELECT `text` FROM `notes` WHERE `typ` = 'AIRTIME-BOT Start' ORDER BY id DESC LIMIT 1) as link_last_airprotokoll,
                                   (SELECT `date` FROM `notes` WHERE `typ` = 'Datenbank Sendepland Backup' ORDER BY id DESC LIMIT 1) as date_last_mysqlbackup, 
                                   (SELECT `text` FROM `notes` WHERE `typ` = 'Datenbank Sendepland Backup' ORDER BY id DESC LIMIT 1) as link_last_mysqlbackup ";
             
                  $erg_count =  sql_db($sql_count_list, "SELECT");
                
                $sql="SELECT `id`, `instance_id`, `end_timestamp`, `start_timestamp`, `name` FROM `sendeplan` ORDER BY `start_timestamp` DESC LIMIT 1";
                 $erg_lastSendung =   sql_db($sql, "SELECT");
                    
                echo  $erg_count . "#&&#" .$erg_lastSendung;
                
                break;
            
            default: echo "bitte etwas auswählen";
        }
            
    } else {
        echo "Login fehlt";
    }
           
               
        

?>