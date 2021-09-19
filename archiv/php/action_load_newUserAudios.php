<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
        
                $sql  = "  SELECT a.`id`, a.`f_filetitle`, a.`f_fileundertitle`, a.`f_publisher`,   a.`f_filetyp`,    "; 
                $sql .= "         a.`f_fileformat`, a.`f_name`,   a.`ichek`, a.`form_user`,  ";           
                $sql .= "        a.`form_user_id`, a.`filenameDB`,  COUNT(b.`date`) as favorit, `agid`, `savedDate` "; 
	            $sql .= "   FROM `archiv` as a "; 
                $sql .= "        LEFT JOIN `audio_favoriten` as b "; 
                $sql .= "        ON ( b.`archivid` = a.`id` AND b.`userid` = ".$_SESSION["idi"].") ";  
                $sql .= "   WHERE a.`f_filetyp` = 'audio' AND a.`agid` IN (SELECT `agid` FROM `ags` WHERE `geschlossen` = 0) OR  a.`f_filetyp` = 'audio' AND a.`agid` IS NULL ";  
              $sql .= "    GROUP BY a.`id` DESC "; 
                 // echo   $sql  ; 
        
        
         $erg =  sql_db($sql, "SELECT");
        
       if ($erg != "") {
        //0id 1f_filetitle 2f_fileundertitle 3f_publisher 4f_filetyp 5f_fileformat 6f_name 7ichek 
        // 8form_user 9form_user_id 10filenameDB 11favorit 12agid
        $row = explode("#|#", $erg);     
        $i =0;
        $l = COUNT($row);        
         $newerg="";
        
         for($i; $i<$l;$i++){
            //echo( $row[$i]);
             $data = explode("#$#",$row[$i]);        
              
            
                 $filename = '../archiv/'.$data[10].'';
          
          
             if (file_exists($filename)) {
                 if ($i == 0) {
                     $newerg =  "".$row[$i]."";
                 } else {
                     $newerg  .=   "#|#" . $row[$i];
                 }
             }          
         }
           if ($newerg == "") {
               echo "nix";
           } else {
               echo $newerg;
           }
       } else {
           echo "nix";
       }
        
    } else {
        echo "Login fehlt";
    }
           
               
        

?>