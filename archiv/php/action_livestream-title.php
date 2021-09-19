<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');

// den stream titel von airtime auslesen

function getMp3StreamTitle($streamingUrl, $interval, $offset = 0, $headers = true){
    $needle = 'StreamTitle=';
    $ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36';
    $streamingUrl = 'http://senderfm.out.airtime.pro:8000/senderfm_a';
    $opts = [
        'http' => [
            'method' => 'GET',
            'header' => 'Icy-MetaData: 1',
            'user_agent' => $ua
        ]
    ];

    if (($headers = get_headers($streamingUrl))) {
            
        foreach ($headers as $h) {
           
            if (strpos(strtolower($h), 'icy-metaint') !== false && ($interval = explode(':', $h)[1])) {
                break;
            }
        }
    }

    $context = stream_context_create($opts);

    if ($stream = fopen($streamingUrl, 'r', false, $context)) {
        $buffer = stream_get_contents($stream, $interval, $offset);
          
        fclose($stream);

        if (strpos($buffer, $needle) !== false) {
 
            $title = explode($needle, $buffer)[1];
            return substr($title, 1, strpos($title, ';') - 2);
        } else {
            
              
            
            //return getMp3StreamTitle($streamingUrl, $interval, $offset + $interval, false);
        }
    } else {
        throw new Exception("Unable to open stream [{$streamingUrl}]");
    }
}
   
        $sql = "SELECT `id`, `instance_id`, `end_timestamp`, `start_timestamp`, `name`   FROM `sendeplan` WHERE `end_timestamp` > NOW() ORDER BY `sendeplan`.`start_timestamp` ASC LIMIT 1 ";
        $erg = sql_db($sql, "SELECT");
        echo   print(getMp3StreamTitle('http://senderfm.out.airtime.pro:8000/senderfm_a', 19200))  .'#||#'. $erg;

 
        

?>