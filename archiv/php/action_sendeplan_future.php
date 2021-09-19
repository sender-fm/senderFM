<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if (isset($_POST['day'])){
        // den stream titel von airtime auslesen
         
        $d = $_POST['day'];
        $m = $_POST['mon'];
        $j = $_POST["year"];
        
        $sql ='SELECT `id`, `instance_id`, `end_timestamp`, `start_timestamp`, `name`, `record`, `url`, `starts`, `ends`, `save_stream_url`, `description`, `instance_description`, `image_path`, `image_cloud_file_id`, `auto_dj` ';
        $sql .= ' FROM `sendeplan` WHERE `start_timestamp` > "'. $j.'-'.$m.'-'. $d .' 00:00:00" AND `end_timestamp` < "'. $j.'-'.$m.'-'. ($d +1) .' 00:00:01" ORDER BY `sendeplan`.`start_timestamp` ASC ';
        echo  sql_db($sql, "SELECT");
    } else {
        // den stream titel von airtime auslesen
        $sql = "SELECT `id`, `instance_id`, `end_timestamp`, `start_timestamp`, `name`, `description`, `url`, `instance_description`   FROM `sendeplan` WHERE `end_timestamp` > NOW() ORDER BY `sendeplan`.`start_timestamp` ASC LIMIT 10 ";
        echo  sql_db($sql, "SELECT");
    }
?>