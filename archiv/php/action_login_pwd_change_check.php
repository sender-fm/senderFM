<?php 
     header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    require_once('setup.php');
 
   // echo " PHP => " .$_POST['code'];
    $erg = explode("-", $_POST['code']);

    //echo "SELECT `code`  FROM `user` WHERE `code` = '".$erg[0]."' AND id = ".$erg[1]." ";
    $check = sql_db("SELECT `code`  FROM `user` WHERE `code` = '".$erg[0]."' AND id = ".$erg[1]." ", 'SELECT');
   // echo " PHP2 => " .$check;

    if ($erg[0] == $check ) { echo "OK-".$erg[1].""; }
    return;
     

?>