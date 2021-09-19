<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        if ($_POST["rid"]) {
        // $_POST["rid"]
        $sql  = 'SELECT `id`, `f_filetitle`, `f_fileundertitle`, `f_filetyp`,  `f_fileformat`,';
        $sql .= '`form_user`, `form_user_id`, `filenameDB`, `agid`, `agname`, `savedDate` ';
        $sql .= 'FROM `archiv` WHERE `agid` = 111'.$_POST["rid"].'  ORDER BY `savedDate` DESC'; 
      
        echo  sql_db($sql, "SELECT");
        } else {
        echo "kennung fehlt";
    }
    } else {
        echo "Login fehlt";
    }
           
               
        

?>