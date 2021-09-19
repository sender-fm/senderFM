<?php 
   
    if(  isset($_COOKIE['login'] )  ) {
        //if( ! $_COOKIE['login']  ) {
        if(  $_COOKIE['login']   ==  "nein" ) {
            $LOGIN = false;  
            $NAME = "Gast";
        }   
        if(  $_COOKIE['login']   ==  "ja" ) {            
            session_start();  
            if (isset($_SESSION['login'])){
                 $LOGIN = true; 
            }else {
                $LOGIN = false;  
                $NAME = "Gast";
            }
            
        }
    } else {
        $LOGIN = false;  
        $NAME = "Gast";
    }
    

 
    require_once('setup.php');
     
    header('Content-type: text/html; charset=UTF-8');
    date_default_timezone_set('Europe/Berlin');
    error_reporting(-1);
    ini_set('display_errors', true);
    setlocale(LC_TIME, "de_DE");
    $html="";

     
    if ( ! $LOGIN ) { echo  "nicht angemeldet"; return; }
    if ( $LOGIN && $_SESSION["member"] != "admin" ) { 
      echo  "kein Admin"; 
        return; 
    }

  $startbot = time();
 

    // BACKUP MYSQL 'sendeplan'
    $return_var = NULL;
    $output = NULL;
    $command = "mysqldump -u".USER." -h".HOST." -p".PASSWORD." ".DB." sendeplan >  mysqlbackups/sendeplan_bu_".time().".sql";
    exec($command, $output, $return_var);
    $html.= "Dump Datenbank Tabelle `senderplan` abgeschlossen <br> ";
    $html.= "<b>Das Backup wurde unter sendeplan_bu_".$startbot.".sql gespeichert. </b><br>";
    $html.= "Download: <a href='_i/php/mysqlbackups/sendeplan_bu_".$startbot.".sql' target='_blank'> sendeplan_bu_".$startbot.".sql<a/><br><hr><br><br>";

 
   echo $html;

    // Notiz speichern
    $sql0 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUE ";
    $sql0 .= " ('Datenbank Sendepland Backup',' " . $_SESSION["uname"] ."',".$_SESSION["idi"] .",'php/mysqlbackups/sendeplan_bu_".$startbot.".sql')";
    // echo $sql0;
   sql_db($sql0, "INSERT");







 



?>

 

