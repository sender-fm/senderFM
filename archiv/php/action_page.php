<?php 
      header('Content-type: text/html; charset=UTF-8');
    date_default_timezone_set('Europe/Berlin'); 
 
    require_once('setup.php');  
require_once( 'PHPMailer-master/PHPMailerAutoload.php');
if ($LOGIN) {
        
     if ( is_session_started() === FALSE ) { session_start(); }
}
   // GLOBALE VARIABLE 
  
    
  
    $timestamp  = time();
    $datum      = date("d.m.Y",$timestamp);
    $uhrzeit    = date("H:i",$timestamp);
    $zeit       =  $datum."-".$uhrzeit;
    $ip         = getenv ("REMOTE_ADDR");

        
    switch( $_POST['typ']){
            
        case "registSTatus":
            // $_POST["registSTatus"] = 0 || 1
             $html = 'UPDATE `ss_admintexte` SET `registrieren`= '.$_POST["registSTatus"].' WHERE `id` = 1';
            echo     sql_db($html, "UPDATE");
             break;
            
             case "alertShow":
            // $_POST["alertShowTyp"] = start || mitglieder
            // $_POST["alertShowStatus"]  0 || 1
            if ($_POST["alertShowTyp"] == "start") {
                $html = 'UPDATE `ss_admintexte` SET `alertShowStart`= '.$_POST["alertShowStatus"].' WHERE `id` = 1';
            }
            if ($_POST["alertShowTyp"] == "mitglieder") {
              echo  $html = 'UPDATE `ss_admintexte` SET `alertShowMitglieder`= '.$_POST["alertShowStatus"].' WHERE `id` = 1';
            }
            
             echo     sql_db($html, "UPDATE");
             break;
            
        case "save_alertTXT":
                 // $_POST["alertShowTyp"] =  save_start_alertShow || save_mitglieder_alertShow
            // $_POST["text"]   
            
            if ($_POST["alertShowTyp"] == "save_start_alertShow") {
                 $html = 'UPDATE `ss_admintexte` SET  `txt_alertShowStart`="'.$_POST["text"].'"  WHERE `id` = 1';
            }
            if ($_POST["alertShowTyp"] == "save_mitglieder_alertShow") {
                 $html = 'UPDATE `ss_admintexte` SET  `txt_alertShowMitglieder`="'.$_POST["text"].'" WHERE `id` = 1';
            }
            
            
              
            
            if ($_POST["alertShowTyp"] == "save_datenschutz") {
              echo   $html = 'UPDATE `ss_admintexte` SET  `datenschutz`="'.$_POST["text"].'" WHERE `id` = 1';
            }
            
            
            
            if ($_POST["alertShowTyp"] == "save_nutzungsbedingung") {
               echo  $html = 'UPDATE `ss_admintexte` SET  `agb`="'.$_POST["text"].'" WHERE `id` = 1';
            }
            
            if ($_POST["alertShowTyp"] == "save_text_begruessung") {
                 $html = 'UPDATE `ss_admintexte` SET  `starttext_offline`="'.$_POST["text"].'" WHERE `id` = 1';
            }
            if ($_POST["alertShowTyp"] == "save_text_begruessung_mitglieder") {
                 $html = 'UPDATE `ss_admintexte` SET  `starttext_online`="'.$_POST["text"].'" WHERE `id` = 1';
            }
              echo     sql_db($html, "UPDATE");
            break;
            
            
        case "loadADMINtxt":
              
            
            if ($LOGIN) {
                $html = 'SELECT `starttext_offline`, `starttext_online`, `agb`, `datenschutz`, `alertShowStart`, `alertShowMitglieder`, `txt_alertShowStart`, `txt_alertShowMitglieder` ';
                $html .= ' FROM `ss_admintexte` WHERE `id` = 1';
             echo     sql_db($html, "SELECT");
            }
            
            break;
            
            
            
            
            
            
            
            
                  // einen fall laden
        case "setCAPTCHA" :
         
             echo canvasIMG();
         
            break;
            
            
        case "laden" :
            if ($LOGIN) {
                if($_POST['select'] == "startTextLogout") {
                      $html = "SELECT    `starttext_offline` FROM `ss_admintexte` WHERE `id` = 1 "  ;
                } 
                if($_POST['select'] == "startTextLogin") {
                    $html = "SELECT    `starttext_online` FROM `ss_admintexte` WHERE `id` = 1 "  ;
                }
                 
            } else {
                 $html = "SELECT    `starttext_offline` FROM `ss_admintexte` WHERE `id` = 1 "  ;
            }
            
            echo     sql_db($html, "SELECT");
            break;
        
        // alle fälle laden
        case "fallLaden" :
             if (!$LOGIN) { return; }
            if ($LOGIN) {
                $html = " SELECT a.`id`, a.`title`, a.`beschreibung`, a.`euro`, a.`userid`, a.`datum`, a.`freigabe`, b.`username` , "  ;

                    $html .= " (SELECT COUNT( `betrag`) FROM `ss_success_pay` WHERE `fall_id` = a.id) as anzahl, "  ;
                    $html .= " (SELECT ROUND(SUM( `betrag`),0) FROM `ss_success_pay` WHERE `fall_id` = a.id) as summe"  ;
  
                $html .= " FROM `ss_fall` as a   "  ;
                $html .= " LEFT JOIN `ss_mitglieder` as b  "  ;
                $html .= " ON a.userid = b.id   ORDER BY a.id DESC"  ;
             
              
                 echo     sql_db($html, "SELECT");
            }  else {
                echo ERROR;
            }
             
            break;
            
            // einen fall laden
        case "saveFall" :
             if (!$LOGIN) { return; }
              //  $html = "INSERT INTO `ss_fall`(  `title`, `beschreibung`, `userid`, `euro`  ) VALUES ('".$_POST['title']."','".$_POST['text']."',".$_SESSION["id"].",".$_POST['euro']." )"  ;
           // echo     sql_db($html, "INSERT");
            if ($_POST['id'] == "") {$_POST['id'] = "null";}
            
            $sql="INSERT INTO `ss_fall` ";
            $sql.="( `id`,`title`, `beschreibung`, `userid`, `euro`) ";
            $sql.="VALUES (".$_POST['id'].",'".$_POST['title']."','".$_POST['text']."',".$_SESSION['id'].",".$_POST['euro'].") ";
            $sql.="ON DUPLICATE KEY UPDATE `id`=".$_POST['id'].",`title`='".$_POST['title']."',`beschreibung`='".$_POST['text']."', ";
          echo  $sql.="`userid`=".$_SESSION['id'].", `euro`=".$_POST['euro']."";
              echo     sql_db($sql, "INSERT");
            
            break; 
            
            // einen fall laden
        case "showFall" :
            if (!$LOGIN) { return; }
            $html = "SELECT `a`.`id`,`a`.`title`, `a`.`beschreibung`, `a`.`userid`, `a`.`euro`,`a`.`datum`,`a`.`freigabe`, `b`.`username`, COUNT(`c`.`betrag`), ROUND(SUM(`c`.`betrag`),0) FROM `ss_fall` as a "  ;
            $html .= "LEFT JOIN `ss_mitglieder` as b "  ;                
            $html .= "ON `a`.`userid` = `b`.`id`  "  ;
            $html .= "LEFT JOIN `ss_success_pay` as c "  ;
            $html .= "ON `a`.`id` = `c`.`fall_id` WHERE a.id = ".$_POST['id'].""  ;
            
              
            //$html = "SELECT COUNT(`betrag`), ROUND(SUM(`betrag`),0) FROM `ss_success_pay` WHERE `fall_id` = ".$_POST['id']."";
            //echo     sql_db($html, "SELECT");
            
            echo     sql_db($html, "SELECT");
            break;
            
                 
            
                     // einen fall löschen
        case "deleteFall" :
             if (!$LOGIN) { return; }
                $html = "DELETE FROM `ss_fall` WHERE `id`  = ".$_POST['id'].""  ;
                echo     sql_db($html, "DELETE");
            break;
            
            
              // einen fall freigeben oder sperren
        case "freigebenFall" :
             if (!$LOGIN) { return; }
                $html = "UPDATE `ss_fall` SET   `freigabe`= '".$_POST['select']."'  WHERE id = ".$_POST['id'].""  ;
                echo     sql_db($html, "UPDATE");
            break;
            
             
            
            // alle user laden
        case "overviewUser" :
             
             if (!$LOGIN) { return; }
            
             $html = "SELECT `id`, `mail`, `username`, `datum`, `code`, `status` FROM `ss_mitglieder` "  ;
            
           
            
             echo  sql_db($html, "SELECT");
            /*
             $teile = explode("#|#", $data);
             $l = COUNT($teile);
            $neueDatas ="" ;
            $i=0;
            for ($i;$i<$l;$i++){
               
                $zeile =   explode("#$#", $teile[$i]);  
                
                if (file_exists('../images/uploads/userimg/'.$zeile[0].'.png')) {
                  
                   array_push($teile[$i], 'images/uploads/userimg/'.$zeile[0].'.png');
                } else {
                    array_push($teile[$i], 'images/user_dummy.png');
                  
                }
                
                if ($i == 0 ) {
                   echo $neueDatas =   implode("#|#", $teile[$i]);  
                } else {
                 echo   $neueDatas .=   implode("#|#", $teile[$i]); 
                }
                 
                
            }
            
            echo  $neueDatas ;
            */
            break; 
            
            
            // einen user laden
        case "showUser" :     
             if (!$LOGIN) { return; }       
            $html = "SELECT `id`, `mail`, `username`, `datum`, `code`, `status` FROM `ss_mitglieder` WHERE id = ".$_POST['id'].""  ;
            $erg =  sql_db($html, "SELECT");
           
            if ( $_POST['id'] != $_SESSION['id'] ){
                $IMGx = '../images/uploads/userimg/'.$_POST['id'].'.png';
                if (!file_exists($IMGx)) {                   
                    $IMGx = 'images/user_dummy.png';                     
                }
                echo $erg ;
                echo "#$#" ;
                echo  $IMGx ;
            } else {
                echo $erg;
            }
    
            /*
            if ( $_POST['id'] != $_SESSION['id'] ){
                $IMGx = '../images/uploads/userimg/'.$_POST['id'].'.png';
                if (!file_exists($IMGx)) {                   
                    $IMGx = 'images/user_dummy.png';                     
                }
                echo $erg . "#$#" . $IMGx."";
            } echo {
                echo $erg;
            }
         */
            
            break;   
            
    
              // kontaktformular speichern
        case "save_kontakt_form" :
              

            // an die admins der Seite geht folgende Mail 

                $nachricht = '<html>
                                <head>
                                    <title>Es gab eine Kontaktanfrage</title>
                                </head>
                                <body>
                                    <p>gesendet am: <b> '. date("d-m-Y H:i:s") .' Uhr</b> </p>
                                    <p>Text: <b> '. $_POST["text"].' Uhr</b> </p>
                                    <br>
                                    <hr>
                                    <a href="https://hanfinformant.de" target="_blank">Zur Webseite</a>
                                </body>
                            </html>';

                $subject = "Kontaktformular - Neue Nachricht hanfinformant.de";
    
                if($LOGIN) {
                    $name_to =  $_SESSION["uname"]; 
                } else {
                    $name_to = "GAST";
                }
 
         echo  $send1 = sendmail(ADMINMAIL, $name_to, $subject, $nachricht);
           
               /*       [typ] => save_kontakt_form
                [email] => fridolin@tutanota.com
                [text] => ycycasaddadadadaaaaaaaaaaa
                */ 
                if ($LOGIN) {
                       $html = "INSERT INTO `ss_log`(  `typ`, `ip`, `txt`, `uid`) VALUES ('kontaktMail','IPkommtnoch','".$_POST['email']." :: ".$_POST['text']."',".$_SESSION['id']." )"  ;
                
                } else {
                
                      $html = "INSERT INTO `ss_log`(  `typ`, `ip`, `txt`, `uid`) VALUES ('kontaktMail','".$_POST['email']."',' '".$_POST['text']."', 0 )"  ;

                }
               echo    sql_db($html, "INSERT");    
            
         
             
             // echo "ERROR: Mail konnte nicht gesendet werden. Ist aber in unserer Datenbank gespeichert! Die Redaktion wird benachrichtigt über diese unstimmigkeit und deine Nachricht wird uns erreichen. Wir entschuldigen uns das es zu diesem Fehler kam. ";
         
              
            
            
    //send message an admi
            break;    
         
              
         
            
            
            
            
        case "saveEditor" :
             if (!$LOGIN) { return; }
                if($_POST['select'] == "startTextLogout") {
                    if ($LOGIN) {
                    $html = "UPDATE `ss_admintexte` SET  `starttext_offline`='".$_POST['text']."'  WHERE `id` = 1"  ;
                    echo     sql_db($html, "UPDATE"); 
                } 
                } 
                if($_POST['select'] == "startTextLogin") {
                    if ($LOGIN) {
                    $html = "UPDATE `ss_admintexte` SET   `starttext_online`='".$_POST['text']."' WHERE `id` = 1"  ;
                     echo     sql_db($html, "UPDATE"); 
                }
                }
            
             if($_POST['select'] == "redaktionsChat") {
                 if ($LOGIN) {
                      $html = "INSERT INTO `ss_redaktion`( `typ`,   `txt`, `uid`) VALUES "  ;
                        $html .= "  ('chat','".$_POST['text']."',".$_SESSION["id"].")"  ;
                     echo     sql_db($html, "INSERT"); 
                }
                }
            
            break; 
            
            
            // show redaktion chat
        case "showRedaktion" :
            if ($LOGIN && $STATUS > 1) {
              $html = "SELECT a.`id`, a.`typ`, a.`datum`, a.`ip`, a.`txt`, a.`uid`, b.username FROM `ss_redaktion` as a LEFT JOIN `ss_mitglieder` as b ON a.`uid` = b.`id`"  ;
                     echo     sql_db($html, "SELECT");
            }
            break; 
            
            
            
            
            // passwort ändern
        case "changePWD" :
             if (!$LOGIN) { return; }
              // o, n1
            if ($LOGIN) {
                // altes passwort abfragen
                  $html = "SELECT `pwd` FROM `ss_mitglieder` WHERE `id` = ".$_SESSION["id"]." AND `pwd` = ".$_POST['o'].""  ;
                      echo $o =   sql_db($html, "SELECT");
                if ($o === $_POST['o']) {
                    $html = "UPDATE `ss_mitglieder` SET `pwd`=".$_POST['n1']." WHERE `id` =  ".$_SESSION["id"]." "  ;
                     echo sql_db($html, "UPDATE");
                } else {
                    echo "pwd error";
                }
                }
            break; 
            
            
            
            
            
            
              // save new forum post
        case "saveNewsPost" :
              // text
            if ($LOGIN) {
                // altes passwort abfragen
                 echo $html = "INSERT INTO `ss_news_posts`(`uid`, `title`,`text`, `link`) VALUES (".$_SESSION["id"]." , '".$_POST['titel']."', '".$_POST['text']."', '".$_POST['link']."')"  ;
                      echo $o =   sql_db($html, "INSERT");
                 
                }
             if (!$LOGIN) { return; }
            break; 
            
                
                    // load all forum posts
        case "loadAllNews" :
              // text
            
                // altes passwort abfragen
                $html = "SELECT a.`id`,a.`uid`, a.`title`, a.`text`, a.`datum`, a.`freigegeben`, b.username, (SELECT COUNT(*) FROM ss_comments WHERE postid = a.id) AS memberCount, a.`link` FROM `ss_news_posts` as a LEFT JOIN ss_mitglieder as b ON a.uid = b.id ORDER BY a.id DESC"  ;
                echo $o =   sql_db($html, "SELECT");
                     
                /*   $html = "SELECT a.*, b.username, COUNT(c.*)"  ;
                  $html .= "FROM `ss_news_posts` as a"  ;
                  $html .= "LEFT JOIN ss_mitglieder as b "  ;
                  $html .= "LON a.uid = b.id "  ;
                  $html .= "LEFT JOIN ss_comments as c "  ;
                  $html .= "LON a.id = c.postid "  ;
                  echo   $html .= "ORDER BY id DESC"  ;*/
       
            break; 
              
                
                    // load all forum posts
        case "showThisPost" :
              // text
            if ($LOGIN) {
                // altes passwort abfragen
                $html = "SELECT a.`id`,a.`uid`, a.`title`, a.`text`, a.`datum`, a.`freigegeben`, b.username, (SELECT COUNT(*) FROM ss_comments WHERE postid = a.id) AS memberCount, a.`link` FROM `ss_news_posts` as a LEFT JOIN ss_mitglieder as b ON a.uid = b.id  WHERE a.`id` =".$_POST['id'].""  ;

               // $html = "SELECT a.*, b.username FROM `ss_news_posts` AS a LEFT JOIN ss_mitglieder as b ON a.uid = b.id WHERE a.`id` =".$_POST['id'].""  ;
                echo  sql_db($html, "SELECT");
                   
            }
             if (!$LOGIN) { return; }
            break; 
            
            
            
              // einen fall freigeben oder sperren
        case "freigebenPost" :
             if (!$LOGIN) { return; }
            $html = "UPDATE `ss_news_posts` SET `freigegeben`= '".$_POST['select']."'  WHERE id = ".$_POST['id'].""  ;
            echo     sql_db($html, "UPDATE");
            break;
            
             
            
            
            
                     // einen Forum Beitrag löschen
        case "deletePost" :
             if (!$LOGIN) { return; }
            $html = "DELETE FROM `ss_news_posts` WHERE `id`  = ".$_POST['id'].""  ;
            echo     sql_db($html, "DELETE");
            break;
            
            
            
            
        case "saveComments" :
             if (!$LOGIN) { return; }
            $html = "INSERT INTO `ss_comments`( `postid`, `uid`, `text`) VALUES "  ;
            $html .= "(".$_POST['postid'].",".$_SESSION["id"].",'".$_POST['text']."')"  ;
            echo     sql_db($html, "INSERT");
            break;
            
            
            
        case "loadCommentsforPost" :
             if (!$LOGIN) { return; }
            $html = "SELECT * FROM `ss_comments` WHERE `postid` = ".$_POST['id'].""  ;
            echo     sql_db($html, "SELECT");
            break;
            
        case "deleteComments" :
             if (!$LOGIN) { return; }
            $html = "DELETE FROM `ss_comments` WHERE `id` = ".$_POST['id']  ;
            echo     sql_db($html, "DELETE");
            break;
            
        case "user_load_falls" :
             if (!$LOGIN) { return; }
            $html = " SELECT `id`, `title`, `beschreibung`, `euro`, `userid`, `datum`, `freigabe` FROM `ss_fall` WHERE `userid` = ".$_POST['uid'].""  ;
            echo     sql_db($html, "SELECT");
            break;
        case "user_load_posts" :
             if (!$LOGIN) { return; }
            $html = "SELECT `id`, `uid`, `text`, `datum`, `freigegeben`, `link` FROM `ss_news_posts` WHERE `uid` = ".$_POST['uid']." "  ;
            echo     sql_db($html, "SELECT");
            break;
        case "user_load_comments" :
             if (!$LOGIN) { return; }
            $html = "SELECT `id`, `postid`, `uid`, `text`, `datum`, `freigabe` FROM `ss_comments` WHERE `uid` = ".$_POST['uid']." "  ;
            echo     sql_db($html, "SELECT");
            break;
            
        case "user_load_donates" :
             if (!$LOGIN) { return; }
            $html = "SELECT COUNT(`betrag`), ROUND(SUM(`betrag`),0) FROM `ss_success_pay` WHERE `spenderid` = ".$_POST['uid'];
            echo     sql_db($html, "SELECT");
            break;
            
        case "savedDatafromUser" :
            if (!$LOGIN) { return; }
            if ($_POST['id'] != $_SESSION["id"]) { $_POST['id'] = $_SESSION["id"]; }
                
            
            // Userdaten            
                // Fall daten            
                // Beiträge            
                // Kommentare
                // Spenden
            // BLOCKTRENNER [ #§§# ]
            // ZEILENTRENNER [ #|#]
            // DATENTRENNER [ #$#]
            
                $data_user      = "SELECT * FROM `ss_mitglieder` WHERE `id` = ".$_POST['id']  ;
                $data_fall      = "SELECT * FROM `ss_fall` WHERE `userid` = ".$_POST['id']  ;
                $data_beitrag   = "SELECT * FROM `ss_news_posts` WHERE `uid` = " .$_POST['id'] ;
                $data_kommentar = "SELECT * FROM `ss_comments` WHERE `uid` = ".$_POST['id']  ;
                $data_spenden   = "SELECT * FROM `payments` WHERE `uid` = ".$_POST['id']  ;
            
            
                $e1=     sql_db($data_user, "SELECT");
                $e2=     sql_db($data_fall, "SELECT");
                $e3=     sql_db($data_beitrag, "SELECT");
                $e4=     sql_db($data_kommentar, "SELECT");
                $e5=     sql_db($data_spenden, "SELECT");
                
            echo  "".$e1."#§§#".$e2."#§§#".$e3."#§§#".$e4."#§§#".$e5."";
            break;
            
            
            
            
            
            
            
            // lädt alle spenden aller fälle
        case "loadAllDonates" :
             if (!$LOGIN) { return; }
            $html = "SELECT `id`, `txn_id`, `fall_name`, `fall_id`,  `betrag`, `db_date` FROM `ss_success_pay`  ORDER BY id DESC  ";
            echo     sql_db($html, "SELECT");
            break;
            
            // lädt anzahl und summe der spenden für alle falles
        case "loadCountDonate" :
             if (!$LOGIN) { return; }
            $html = " SELECT COUNT(`betrag`), ROUND(SUM(`betrag`),0) FROM `ss_success_pay` ";
            echo     sql_db($html, "SELECT");
            break;  
            
            // lädt anzahl und summe eines falles
        case "loadForFallAllDonates" :
             if (!$LOGIN) { return; }
            $html = "SELECT COUNT(`betrag`), ROUND(SUM(`betrag`),0) FROM `ss_success_pay` WHERE `fall_id` = ".$_POST['id'];
             echo     sql_db($html, "SELECT");
            break;
    
            
            
             // speichert ein neues TODO
        case "saveNew_TODO" :
             if (!$LOGIN) { return; }
             $html = "INSERT INTO `ss_todo`( `text`, `userid`) VALUES ('".$_POST['text']."',".$UID.")";
            echo     sql_db($html, "INSERT");
            break; 
           case "loadALL_TODO" :
             if (!$LOGIN) { return; }
             $html = "SELECT * FROM `ss_todo` ORDER BY id DESC";
            echo     sql_db($html, "SELECT");
            break; 
             case "TODO_erledigt" :
             if (!$LOGIN) { return; }
               $html = "UPDATE `ss_todo` SET  `status`='ok'  WHERE `id` = ".$_POST['id']."";
                  sql_db($html, "UPDATE");
            break;  
              case "TODO_setoffen" :
             if (!$LOGIN) { return; }
               $html = "UPDATE `ss_todo` SET  `status`='offen'  WHERE `id` = ".$_POST['id']."";
                  sql_db($html, "UPDATE");
            break; 
              case "TODO_delete" :
             if (!$LOGIN) { return; }
               $html = "DELETE FROM `ss_todo` WHERE `id` = ".$_POST['id']."";
                  sql_db($html, "DELETE");
            break; 
            
            
            
              case "showProduct" :
             if (!$LOGIN) { return; }
              $html = "SELECT * FROM `ss_products` WHERE `id` = ".$_POST['id']."";
                echo  sql_db($html, "SELECT");
            break; 
            
            
               case "loadAllProducts" :
             if (!$LOGIN) { return; }
              $html = "SELECT * FROM `ss_products` ORDER BY id DESC";
                echo  sql_db($html, "SELECT");
            break; 
            
       default :
            print_r($_POST);
        echo   " +++++++ PHP wartet mein Freund <3 ... leg was an !!   +++++++++++ ";
            break;     
    }

   

 
    

?>