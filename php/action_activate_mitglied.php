<?php
 
 
    session_destroy();
    header("Content-Type: text/html; charset=utf-8");
    require_once('setup.php');
  
    ini_set('display_errors', TRUE);
 
   // var_dump($_GET);

  

       $sql2 = "UPDATE `user` SET `aktiviert` = 'Ja', code = '' WHERE id = '".$_POST['userid']."'";
          
              sql_db($sql2, "UPDATE") ;
             
    echo "aktiviert";



 ?>