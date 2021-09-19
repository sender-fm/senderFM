<?php
 
 
    session_destroy();
    header("Content-Type: text/html; charset=utf-8");
    require_once('setup.php');
  
    ini_set('display_errors', TRUE);
 
   // var_dump($_GET);

 

    if(!$_GET['id'] )  { echo "Solltest du ein Profil bei sender.fm haben dann wurde dein Passwort zurück gesetzt aber es gab einen Fehler. Uns fehlen noch deine Nummer um dich erkennen zu können [!id]. <br><a href='https://sender.fm'>zu sender.fm</a>"; } //header ("Location: index.php");
    if(!$_GET['code'] ) { echo "Solltest du ein Profil bei sender.fm haben dann wurde dein Passwort zurück gesetzt aber es gab einen Fehler. Uns fehlen noch deine Nummer um dich erkennen zu können. [!code]<br><a href='https://sender.fm'>zu sender.fm</a>"; } //header ("Location: index.php");

  

       $sql= "SELECT `aktiviert` FROM `user` WHERE id = '".$_GET['id']."' AND code = '".$_GET['code']."'";
       
       $aktiviert = sql_db($sql, "SELECT");


      $sql2 = "UPDATE `user` SET `aktiviert` = 'mail_ok', code = '' WHERE id = ".$_GET['id']."";
          
             $erg1 = sql_db($sql2, "UPDATE") ;
            //  if($erg1 == 0) { echo "ist 0 als zahl"; }         
            //  if($erg1 == "0") { echo "ist 0 als string"; }         
            //  if($erg1) { echo "ist da aber nicht 0"; }      
            if( $erg1 == 0 ) {
                
         
       
             header("location:https://sender.fm/m");
          
            }



 ?>