<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
                $sql  = "  SELECT a.`id`, a.`f_filetitle`, a.`f_fileundertitle`, a.`f_shortdesc`, a.`f_filelongdesc`, a.`f_fileautor`, a.`f_filemitwirkende`, "; 
                $sql .= "        a.`f_publisher`, a.`f_produktdate`, a.`f_firstplaytime`, a.`f_filetyp`, a.`f_filemedium`, a.`f_fileformat`, a.`f_playtime`, "; 
                $sql .= "        a.`f_name`, a.`f_herkunft`,a.`f_sprache`, a.`f_lizenz`, a.`f_rechteinhaber`, a.`ichek`, a.`form_user`, "; 
                $sql .= "        a.`form_user_id`, a.`filenameDB`, a.`agid`, a.`agname`, a.`savedDate`, a.`updatedDate` , COUNT(b.`date`) as favorit "; 
	            $sql .= "   FROM `archiv` as a "; 
                $sql .= "        LEFT JOIN `audio_favoriten` as b "; 
                $sql .= "        ON ( b.`archivid` = a.`id` AND b.`userid` = ".$_SESSION["idi"].") ";  
                $sql .= "   WHERE `f_filetyp` = 'audio' ";  
        echo     $sql .= "    GROUP BY a.`id` "; 
        // echo   $sql1 ;
        echo  sql_db($sql, "SELECT");   
    } else {
         
        echo "Login fehlt";
    }
           
               
        

?>