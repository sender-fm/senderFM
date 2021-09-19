<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        
        
        $sql  = 'SELECT `id`, `f_filetitle`, `f_fileundertitle`, `f_fileformat`, `f_name`, `form_user`, `form_user_id`, `filenameDB`, `savedDate`, `agid`, `f_filetyp`  FROM `archiv` '; 
         $sql .= ' WHERE `form_user_id` = '.$_POST["uid"].' AND `agid` IS NULL' ;
      
        echo  sql_db($sql, "SELECT");
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>