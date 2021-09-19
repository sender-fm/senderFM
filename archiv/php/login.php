<?php 
   header('Content-type: text/html; charset=UTF-8');
    date_default_timezone_set('Europe/Berlin'); 

   if ($LOGIN || !isset( $_POST["mail"]) && !isset($_POST["pwd"]))     {  
        header ("Location: ../index.html");
        exit; 
    }
    require_once('setup.php');
 
 
 
/*
 //  if ($_POST['user_captcha'] == $_POST['cap']) {
         
    
      $html1 = "SELECT `id` FROM `ss_mitglieder` WHERE `mail` = '".$_POST['mail']."' AND `pwd` = '".$_POST['pwd']."'" ;
      $x_id = sql_db($html1, "SELECT");

    $html2 = "SELECT `username` FROM `ss_mitglieder` WHERE `mail` = '".$_POST['mail']."' AND `pwd` = '".$_POST['pwd']."'" ;
     $x_uname = sql_db($html2, "SELECT");

    $html3 = "SELECT `status` FROM `ss_mitglieder` WHERE `mail` = '".$_POST['mail']."' AND `pwd` = '".$_POST['pwd']."'" ;
     $x_status = sql_db($html3, "SELECT");

    $html4 = "SELECT `code` FROM `ss_mitglieder` WHERE `mail` = '".$_POST['mail']."' AND `pwd` = '".$_POST['pwd']."'" ;
     $x_activ = sql_db($html4, "SELECT");


    if ($x_id > 0 ) {
   
        // if ( is_session_started() === FALSE ) { session_start(); }
        // Example
        if ( is_session_started() === FALSE ) { session_start(); }
        
        $session_id = session_id();
        
        setcookie("login", "ja", time() + (86400 * 30), "/");
        $_SESSION["login"] = "ja";
        $_SESSION["id"] = $x_id;
        $_SESSION["uname"] = $x_uname;
        $_SESSION["status"] = $x_status;
        $_SESSION["mail"] = $_POST['mail'];
         echo "OK" ;      
        
    } else {
        echo "ERROR";
    }
 
  
*/


 
    
    if (isset($_POST["mail"]) && isset($_POST["pwd"])) { 
                
        $secPWD =   $_POST["pwd"];         
   
        $sql0 = "SELECT `id`, member,timelogout FROM `user` WHERE `email` = '". $_POST["mail"] ."' AND `passwort` = '". $secPWD ."'";
     
          $er =  sql_db($sql0, "SELECT");  
       
        if(!$er || $er == "" ) {
            echo "FAIL NO DATA";
            exit;
        }
        session_start();
        $session_id = session_id();
     
     
        $tt =  explode("#$#", $er);
        $id = $tt[0];
        $member = $tt[1];
        $timelogout = $tt[2];
        
        
    } else { 
        echo "FAIL MAIL PWD";
        exit; 
    }  
        
         
        
    // ruft alle daten zum netzwerk auf , namen herausgeber impressum
    //NETZWERKDATEN EINTRAGEN
    //name#$#desc#$#creator#$#str#$#23#$#drescfg#$#12345#$#1234567#$#1234567#$#landmatrosen@googlemail.com

    $sql ="SELECT `name`, `desc`, `herausgeber`, `strasse`, `nr`, `ort`, `plz`, `tel`, `mobil`, `mail` FROM `sitemaininfo`";
    // echo $sql;
    $maininfo = sql_db($sql, "SELECT");
    $tdata =  explode("#$#", $maininfo);

    $var = array($tdata[0], $tdata[1], $tdata[2],$tdata[3],$tdata[4],$tdata[5],$tdata[6],$tdata[7],$tdata[8],$tdata[9]); 
    $_SESSION['maininfo'] = $var; 



    /*
        $_SESSION["bc_name"] = $tdata[0];
         $_SESSION["bc_desc"] = $tdata[1];
         $_SESSION["bc_creator"] = $tdata[2];
         $_SESSION["bc_str"] = $tdata[3];
         $_SESSION["bc_ort"] = $tdata[4];
         $_SESSION["bc_nr"] = $tdata[5];
         $_SESSION["bc_plz"] = $tdata[6];
         $_SESSION["bc_tel"] = $tdata[7];
         $_SESSION["bc_mobil"] = $tdata[8];
         $_SESSION["bc_mail"] = $tdata[9];
         */
        
    if ($id && $id != "ERROR" ) { 
       
        
        $sql = "SELECT `id`, `userid`, `date`, `status`, `anrede`, `vorname`, `nachname`, `strasse`, `nr`,"; 
        $sql .= "`plz`, `ort`, `bundesland`, `tel`, `www`, `geb`, `beruf`, `taetig`,  ";
        $sql .= " `des`, `ip`, `public`, `img`, `img_public`,";
        $sql .= "( SELECT `date` FROM `notes` WHERE `creatorID` = mitglieder.userid AND `typ` = 'userlogout' ORDER BY `date` DESC LIMIT 1)";
        $sql .= "FROM `mitglieder` ";			
        $sql .= "WHERE `userid` = ".$id."";


        //echo $sql;      
        // echo "<br>---------</br>";
         
        $erg =  sql_db($sql, "SELECT");
       
   
        $teile = explode("#$#", $erg);
        // 0`id`, 1`userid`, 2`date`, 3`status`, 4`anrede`, 5`vorname`, 6`nachname`, 7`strasse`, 8`nr`, 
        // 9`plz`, 10`ort`, 11`bundesland`, 12`tel`, 13`www`, 14`geb`, 15`beruf`, 16`taetig`, 
        // 17`des`, 18`ip`, 19`public`, 20`img`, 21`img_public` 22  lastlogin
        
            
        $now = time();
         
        $ip = $_SERVER['REMOTE_ADDR'];
    
        //veraltete Einträge löschen 
         $sql0="DELETE FROM `useronline` WHERE  zeit < UNIX_TIMESTAMP() - 900000";
      
        //echo $sql0;
        $row0 = sql_db($sql0, "DELETE"); 
    
        $sql1="SELECT useridi FROM `useronline` WHERE useridi=".$teile[1]; 
        //echo $sql1;
        $isid = sql_db($sql1, "SELECT"); 
    
         $sql2="SELECT `aktiviert` FROM `user` WHERE id=".$teile[1]; 
        //echo $sql1;
        $aktiviert = sql_db($sql2, "SELECT"); 
        
        //Zeitpunkt erneuern
        if ($isid == $teile[1]) {
            $sql3="UPDATE `useronline` SET `zeit` = UNIX_TIMESTAMP(NOW()), `session_id`=  '".$session_id."' WHERE useridi=".$teile[1]; 
            //  echo $sql3;
            $row1 = sql_db($sql3, "UPDATE"); 
        } else {

    
            // ist der Besucher noch nicht eigetragen, so wird ein neuer Eintrag erzeugt. 
            $sql2="INSERT INTO `useronline` (`ip`,`zeit`,`useridi`,`session_id`) VALUES ('$ip',UNIX_TIMESTAMP(NOW()), ".$teile[1].",`session_id`='$session_id')"; 

            //echo $sql2;
	         
            sql_db($sql2, "INSERT");
	   
	   
        }
        $sql11 = "INSERT INTO `notes`( `typ`, `creator`, `creatorID`, `text`) VALUES ( 'userlogin', '". $teile[5] . " " . $teile[6]."',".$teile[1]." ,'". $teile[5] . " " . $teile[6]." hat sich eingeloggt.')";
        sql_db($sql11, null);
	   
	   
        setcookie("login", "ja", 0, "/");
        setcookie("lastlogin",  "".time()."", 0, "/");
      
           
        # Userdaten korrekt - User ist eingeloggt 
        # Login merken ! 
        $_SESSION["login"] = 1;
        $_SESSION["id"] = $teile[1];
        $_SESSION["idi"] = $teile[1];
        $_SESSION["session_id"] = $session_id;
        $_SESSION["member"] = $member;
        $_SESSION["status"] = $member;
        $_SESSION["date"] = $teile[2];
            
        $_SESSION["mail"] = $_POST["mail"];
        $_SESSION["uname"] = $teile[5] . " " . $teile[6];
        $_SESSION["vorname"] = $teile[5];
        $_SESSION["nachname"] = $teile[6];
        $_SESSION["lastlogintime"] = $teile[22];            
        $_SESSION["lastOnlineActiv"] = time();            
        $_SESSION["anrede"] = $teile[4];
        $_SESSION["bundesland"] = $teile[11];
        $_SESSION["work"] = $teile[15];
        $_SESSION["membersice"] = $teile[2];
        $_SESSION["desc"] = $teile[17];
        $_SESSION["www"] = $teile[13];
        $_SESSION["aktiviert"] = $aktiviert;
            
           
        if ( $teile[20] && $teile[20] != "" )   {
           	
            $_SESSION["img"] = $teile[20];
           	   
        } else {         
                
            if ($teile[4] == "Frau" ) {
               	
                $_SESSION["img"] = "nobody_f_250.jpg";
            	   
            } else {
            		
                $_SESSION["img"] = "nobody_m_250.jpg";
            }
          
          
        }
           

        
 
        // uploadordner anlegen
        $_SESSION["folder"] = "u".sha1($_SESSION["idi"]);
        
                 
                
        // echo "useruploads user ordner gibts noch nicht"; 
        if (!is_dir("../useruploads")) {                      
            mkdir("../useruploads/", 0777); 
            chmod("../useruploads/",0777);                         
        }                   
                     
        if (!is_dir("../useruploads/profilbilder")) {
            mkdir("../useruploads/profilbilder", 0777); 
            chmod("../useruploads/profilbilder",0777); 
        }
                     
        if (!is_dir("../useruploads/agheads")) {
            mkdir("../useruploads/agheads", 0777); 
            chmod("../useruploads/agheads",0777); 
        }
                      	 
                      	
        if (!is_dir("../useruploads/". $_SESSION["folder"]."")) {
            mkdir("../useruploads/". $_SESSION["folder"]."", 0777); 
            chmod("../useruploads/". $_SESSION["folder"]."",0777); 
                            
        }
                     
                     
                 
            
		        
         
        if (!isset($_SESSION["login"])) { 
            echo "Keine Session";  
            exit; 
        } else { 
            $_SESSION['start'] = time(); // Taking now logged in time.
            // Ending a session in 30 minutes from the starting time.
            $_SESSION['expire'] = $_SESSION['start'] + (30 * 60);
                    
            
                    
            $ses_id = $session_id;
            if (empty($ses_id)) {
        
                $ses_id = $session_id;
            }
                    
          echo "OK";          
        //  header ("Location: ../../index.php");
        }
         
    } else {
        echo "na denk nach !?";
    }




?>