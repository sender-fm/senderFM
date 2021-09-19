<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {        
         
            if ( !$LOGIN && $_SESSION['member'] != "admin" ) {
                echo "schön das du unseren Code verstanden hast ;) aber das hier ist nicht für dich gedacht."; 
                exit; 
            }
        
            if (  $LOGIN &&  $_SESSION['member'] == "admin" ) { 
                
                switch($_POST['typ']){
                    case "adminboard_counts": 
                        
                             $sql_count_list="SELECT 
                                    (SELECT COUNT(`id`) FROM `mitglieder`) as u_users,
                                    (SELECT COUNT(id) FROM `text_mitglieder`) as u_texts,
                                    (SELECT COUNT(id) FROM `archiv` WHERE `agid` IS NULL ) as user_archiv_all,
                                    (SELECT COUNT(id) FROM `archiv` WHERE `f_filetyp` = 'audio') as archiv_audios,
                                    (SELECT COUNT(id) FROM `archiv` WHERE `f_filetyp` = 'video') as archiv_videos,
                                    (SELECT COUNT(id) FROM `archiv` WHERE `f_filetyp` = 'application') as archiv_documents,
                                    (SELECT COUNT(id) FROM `archiv` WHERE `f_filetyp` = 'image') as archiv_images,
                                    (SELECT COUNT(id) FROM `archiv`) as archiv_all,
                                    (SELECT COUNT(id) FROM `ags`) as ag_counts,
                                    (SELECT COUNT(id) FROM `ags` WHERE `geschlossen` = 0) as ag_offen,
                                    (SELECT COUNT(id) FROM `ags` WHERE `geschlossen` = 1) as ag_geschlossen,
                                    (SELECT COUNT(id) FROM `ag_text`) as ag_texte,
                                    (SELECT COUNT(id) FROM `archiv` WHERE `agid` > 0) as ag_archivefiles,
                                    (SELECT COUNT(id) FROM `todo` WHERE `status` = 'offen') as ag_opentodos,
                                    (SELECT COUNT(`mail`) FROM `newsletter-user` ) as countNewsletter ,
                                    (SELECT SUM(`betrag`) FROM `spenden_success_pay` ) as sumBetrag ";
                
                          echo  sql_db($sql_count_list, "SELECT");
                        
                        break;
                        
                    case "adminboard_log": 
                         $sql="SELECT `id`, `typ`, `creator`, `creatorID`, `date`, `text`, `for_user`, `gelesen` FROM `notes` order by `date` DESC LIMIT 200";
                        echo  sql_db($sql, "SELECT");
              
                        break;
                        
                    default: 
                        echo "bitte etwas auswählen";
                }
                    
                    
            }
           
    } else {
        echo "Login fehlt";
    }
           
               
        

?>