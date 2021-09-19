<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        // $_POST['typ']
        // $_POST['userid']
        // $_POST['text']
        switch($_POST['typ']){
                
                // load talk für User
            case "loadMessages":
                 $sql  = 'SELECT a.`id`, a.`userid`, a.`text`, a.`datum`, a.`antwort_id`, a.`gelesen`, b.`vorname`, b.`nachname`, b.img ';
                 $sql  .= 'FROM `chat-talk` as a ';
                 $sql  .= '    LEFT JOIN `mitglieder` as b ';
                 $sql  .= '   ON a.`userid` = b.`userid` ';
                 $sql  .= 'WHERE a.`userid` = '. $_POST['userid'].' OR a.`antwort_id` = '. $_POST['userid'].'';
                echo  sql_db($sql, "SELECT");
                
                break;
                
                // load Talk für Admin
                case "loadAdminTalkMessages":
              /*
                $sql  = 'SELECT a.`id`, a.`userid`, a.`text`, MAX(a.`datum`), a.`antwort_id`, a.`gelesen`, b.`vorname`, b.`nachname`, b.img ';
                 $sql  .= 'FROM `chat-talk` as a ';
                $sql .= " LEFT JOIN `mitglieder` as b  "  ;
                 $sql .= " ON a.userid = b.userid   "  ;
                 $sql  .= 'WHERE a.`userid` > 0 AND a.`userid` < 999998 ';
                  $sql  .= 'ORDER BY a.userid DESC';
                */
                  if ( $_SESSION["status"] == "admin") { 
                $sql  = ' SELECT  a.`id`, a.`userid`,  a.`text`,  a.`datum`, a.`antwort_id`, a.`gelesen`, b.`vorname`, b.`nachname`, b.img, MAX(`datum`)';
                $sql  .= '    FROM `chat-talk` as a ';
                $sql  .= '    LEFT JOIN `mitglieder` as b ';
                 $sql  .= '   ON a.`userid` = b.`userid` ';
                  $sql  .= '    WHERE a.userid < 9999 GROUP BY userid DESC';
                  }
                    
        //   SELECT userid , MAX(datum) FROM `chat-talk` GROUP BY userid
            
                echo  sql_db($sql, "SELECT");
                
                break;
                
                // new User Talk speichern
                   case "saveMessages":
                $sql  = 'INSERT INTO `chat-talk`( `userid`, `text`) VALUES';
                $sql  .= '('.$_POST['userid'].',"'.$_POST['text'].'" )';
                echo  sql_db($sql, "INSERT");
                
                break;
                
                  // new Admin Answer Talk speichern
                   case "saveAdminAnswerMessages":
                  if ( $_SESSION["status"] == "admin" ) { 
                $sql  = 'INSERT INTO `chat-talk`( `userid`, `text`,`antwort_id`) VALUES';
                 $sql  .= '(999999,"'.$_POST['text'].'",'.$_POST['userid'].' )';
                echo  sql_db($sql, "INSERT");
                  }
                
                break;
                
                  
                  // new User to User Talk speichern
                   case "saveUser2UserMessages":
                  
                $sql  = 'INSERT INTO `chat_userTOuser`( `id_from`, `id_to`, `txt`, `gesehen`) VALUES';
                  $sql  .= ' ('.$_SESSION['id'].' ,'.$_POST['uidReciver'].' ,"'.$_POST['text'].'" ,0)';
                echo  sql_db($sql, "INSERT");
                
                
                break;
                
                 
                        // load chat user 2 user
                   case "loadChatUser2User":
                 
                $sql  = 'SELECT a.`id`, a.`id_from`,a. `id_to`, a.`date`, a.`txt`, a.`gesehen`, b.vorname, b.nachname, b.img , c.vorname, c.nachname, c.img   ';
                $sql  .= ' FROM `chat_userTOuser` as a  ';
                $sql  .= ' LEFT JOIN mitglieder as b   ';
                $sql  .= ' ON  a.id_from = b.userid  ';
                $sql  .= ' LEFT JOIN mitglieder as c   ';
                $sql  .= ' ON  a.id_to = c.userid  ';
                $sql  .= ' WHERE  `id_from` = '.$_POST['uidReciver'].' AND `id_to` =  '.$_SESSION['id'].' OR ';
                  $sql  .= ' `id_from` = '.$_SESSION['id'].' AND `id_to` = '.$_POST['uidReciver'].'';
                
                echo  sql_db($sql, "SELECT");
                 
                
                break;
                
                 
                     
                // load chat user 2 user übersicht für einen user 
            case "loadChatUser2UserOverview":
                 
                $sql   = '  SELECT a.*, b.vorname, b.nachname, b.img, c.vorname, c.nachname, c.img ';
                $sql  .= '     FROM chat_userTOuser as a ';
                $sql  .= '     LEFT JOIN `mitglieder` as b ';
                $sql  .= '     ON a.id_from = b.userid ';
                $sql  .= '       LEFT JOIN `mitglieder` as c ';
                $sql  .= '       ON a.id_to = c.userid ';
                $sql  .= '          WHERE a.`id` IN (SELECT DISTINCT id FROM `chat_userTOuser` ';
                $sql  .= '                  WHERE `id_to` =  '.$_SESSION['id'].'  OR `id_from` = '.$_SESSION['id'].' )';
                $sql  .= '                       ORDER BY a.date DESC';
                    
                
                
                
                echo  sql_db($sql, "SELECT")  ;
                 
                
                break;
                       
                // load chat user 2 user übersicht für einen user 
            case "loadChatRedaktion":
                 // SELECT `id`, `rid`, `id_from`, `text`, `date`, `answer-of-id` FROM `chat_redaktionen` WHERE 1
                 $sql   = ' SELECT a.`id`, a.`rid`, a.`id_from`, a.`text`, a.`date`, a.`answer-of-id`, b.vorname, b.nachname, b.img  ';
                 $sql   .= '   FROM `chat_redaktionen` as a ';
                 $sql   .= '   LEFT JOIN `mitglieder` as b ';
                 $sql   .= '   ON a.id_from = b.userid ';
                 $sql   .= '   WHERE a.rid =  '.$_POST["rid"].' ';
                    
                  
                echo  sql_db($sql, "SELECT")  ;
                 
                
                break;
                   
                      // load chat user 2 user übersicht für einen user 
            case "saveChatTextRedaktion":
                 // SELECT `id`, `rid`, `id_from`, `text`, `date`, `answer-of-id` FROM `chat_redaktionen` WHERE 1
                $sql   = 'INSERT INTO `chat_redaktionen` ';
                 $sql  .= '    (  `rid`, `id_from`, `text`) ';
                 $sql  .= '    VALUES ';
                echo  $sql  .= '   ('.$_POST["rid"].','.$_SESSION["id"].',"'.$_POST["text"].'") ';
                    
                 
                
                echo  sql_db($sql, "INSERT")  ;
                 
                
                break;
                  
                
            default: 
                echo "bitte etwas auswählen";
                  
        }
         
      
        
    } else {
        echo "Login fehlt";
    }
              
      
?>