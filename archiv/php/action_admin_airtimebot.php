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

  

 

    if ( ! $LOGIN ) { echo $html.= "Du bist nicht angemeldet!"; return; }
    if ( $LOGIN && $_SESSION["member"] != "admin" ) { 
      echo  $html.= "Du bist nicht berechtigt dieses Script aufzurufen ! <a href='index.php'>zu sender.fm</a>"; 
        return; 
    }

 
    $startbot = time();
    $protokollName = "airtimebot_protokoll_".$startbot.".pdf";

 

    $arrContextOptions=array(
        "ssl"=>array(
             "cafile" => "/bundle/cacert.pem",
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        ),
    );  

    $erg = file_get_contents("http://senderfm.airtime.pro/api/week-info", false, stream_context_create($arrContextOptions));

    $arr = json_decode($erg, true);
    

    $html.= "<h1>sender.fm Programmplan abgleichen mit dem sender.fm Airtime Programmplan.</h1>";
    $html.= "<h2>sender.fm Airtime API wird vom sender.BOT abgerufen: <a href='http://senderfm.airtime.pro/api/week-info'> http://senderfm.airtime.pro/api/week-info </a> </h2>";
    $html.=  "<b>Start Bot:</b>" . strftime('%A, den %d %B %Y %H:%M:%S', $startbot) . "<br><br>";
    $html.= "<button>abgerufene Tage ".(count($arr)-1)." </button><br>";

    $monday         =  $arr["monday"];
    $tuesday        =  $arr["tuesday"];
    $wednesday      =  $arr["wednesday"];
    $thursday       =  $arr["thursday"];
    $friday         =  $arr["friday"];
    $saturday       =  $arr["saturday"];
    $sunday         =  $arr["sunday"];
    $nextmonday     =  $arr["nextmonday"];
    $nexttuesday    =  $arr["nexttuesday"];
    $nextwednesday  =  $arr["nextwednesday"];
    $nextthursday   =  $arr["nextthursday"];
    $nextfriday     =  $arr["nextfriday"];
    $nextsaturday   =  $arr["nextsaturday"];
    $nextsunday     =  $arr["nextsunday"];

      // löscht alle einträge die ab jetzt in der zukunft liegen oder gerade aktuell sind/ist
    $deleteRows =  sql_db("DELETE FROM `sendeplan` WHERE `end_timestamp` > NOW()","DELETE");
    $numItems = count($arr);
    $i = 0;   // die tage
    $z = 1;  // alle datensätze insgesammt aus den tagen
    $j = 0;   // wieviel datensätze in die datenbank geschreiben wurden.
    foreach ($arr as $key => $value) {                  
         $y = 1;  // die datensätze in den tagen einzeln zählen begitt jeden tag bei 1
        $value1 = "";
        if ( $value  == "1.1") {  
            $html.= "<h2>sender.fm Airtimebot ist fertig. <br>Die sender.fm `sendeplan` Tabelle ist auf dem selben stand wie das Airtime Programm.</h2>"; 
            $html.= "<b>Es wurden alle Einträge welche ein höeres EndDatum als JETZT haben aus der Datenbank gelöscht <br>>> Es wurden $z Datensätze von Airtime bearbeitet.  </b>"; 
            $html.= "<h4>von $z Datensätzen wurden ( $j ) in der Datenbank neu geschrieben oder geändert.  </h4>"; 
            $html.=  "<b>Ende Bot:</b>" . strftime('%A, den %d %B %Y %H:%M:%S', time()) . "<br><br>";
            $html.=   '<b>BOTprotokoll</b> herunterladen: <a href="airtimeprotokolle/'.$protokollName.'" target="_blank">_i/php/airtimeprotokolle/'.$protokollName.'</a><br><br><br>';
            break; /* das letzte lehrer abfangen*/ 
        }  
        
         $html.= "<h2>Tag ".$i." </h2><br>";
         $html.= "<b>Sendungen an diesen Tag:  ".count($value)." </b><br>";
        
        foreach ($value as $key => $value1) {
            
             // ist end_timestamp grösser als jetzt
            if (  strtotime($value1["end_timestamp"]) > strtotime("now")  ) { 
               
           
             // if (strtotime("now") > strtotime($value1["end_timestamp"]) { echo "true"} else { echo "false"; }, "\n";
            
                 // wenn erster datensatz eines tages dann startdatum anzeigen
                if ( $y == 1 ) { $html.= "<div>Erste Sendung: ".$value1['start_timestamp']."</div>"; }
                if ( $y == count($value) ) { $html.= "<div>letzte Sendung: ".$value1['start_timestamp']."</div>"; }
                $value1["description"] = nl2br($value1["description"]);
                $value1["instance_description"] = nl2br($value1["instance_description"]);
            
                /*
                $sql  ='INSERT INTO `sendeplan`( `instance_id`, `end_timestamp`, `start_timestamp`, `name`, `record`, `url`, `starts`, `ends`,`description`,`instance_description`,`image_path`,`image_cloud_file_id`,`auto_dj`)';
                $sql .='VALUES ('.$value1["instance_id"].',"'.$value1["end_timestamp"].'","'.$value1["start_timestamp"].'",';
                $sql .='"'.$value1["name"].'",'.$value1["record"].',"'.$value1["url"].'","'.$value1["starts"].'","'.$value1["ends"].'","'.$value1["description"].'","'.$value1["instance_description"].'","'.$value1["image_path"].'","'.$value1["image_cloud_file_id"].'","'.$value1["auto_dj"].'")';
                $sql .=' ON DUPLICATE KEY UPDATE `end_timestamp`="'.$value1["end_timestamp"].'", `start_timestamp`="'.$value1["start_timestamp"].'",' ; 
                $sql .=' `name`="'.$value1["name"].'", `record`="'.$value1["record"].'", `url`="'.$value1["url"].'", `starts`="'.$value1["starts"].'",`ends`="'.$value1["ends"].'",`description`= "'.$value1["description"].'" , `instance_description` = "'.$value1["instance_description"].'", image_path = "'.$value1["image_path"].'",image_cloud_file_id = "'.$value1["image_cloud_file_id"].'",auto_dj ="'.$value1["auto_dj"].'" ' ; 
                */
                
                $sql  ='INSERT INTO `sendeplan`( `instance_id`, `end_timestamp`, `start_timestamp`, `name`, `record`, `url`, `starts`, `ends`,`description`,`instance_description`,`image_path`,`image_cloud_file_id`,`auto_dj`)';
                $sql .='VALUES ('.$value1["instance_id"].',"'.$value1["end_timestamp"].'","'.$value1["start_timestamp"].'",';
                $sql .='"'.$value1["name"].'",'.$value1["record"].',"'.$value1["url"].'","'.$value1["starts"].'","'.$value1["ends"].'","'.$value1["description"].'","'.$value1["instance_description"].'","'.$value1["image_path"].'","'.$value1["image_cloud_file_id"].'","'.$value1["auto_dj"].'")';
                 
              // INSERT
            
                $sql_erg = sql_db($sql, "INSERT"); 
                if (  $sql_erg != 0 ) { 
                    // wenn ein ergebniss dann anzeigen
                    $j++; 
                    $html.= "<br><br><hr>";              
                    $html.= "<h1>Tag: ".$i." / Eintrag: ".$y." </h1><br>";
                    $html.= "<br>"; 
                    $html.= $sql;
                    $html.= "<br>"; 
                }
           
              
          
             }
                  $y++;   // tages einträge zähölen
                $z++; // alle tageseinträge insgesammt einträge zähöen
        }
        if ( $j == 0 ) { $html.= "Daten sind schon in der Datenbank gespeichert. Keine Änderung nötig.</b>"; }
        $html.= "<hr>";
        $i++;  // tage zählen
    }


    $html.= '</body></html>';
echo $html;

    // Notiz speichern
            $sql0 = "INSERT INTO `notes`(`typ`, `creator`, `creatorID`, `text`) VALUE ";
             $sql0 .= " ('AIRTIME-BOT Start','" . $_SESSION["uname"] ."',".$_SESSION["idi"] .",'_i/php/airtimeprotokolle/".$protokollName."#|@@|#_i/php/mysqlbackups/sendeplan_bu_".$startbot.".sql')";
            // echo $sql0;
             sql_db($sql0, "INSERT");


// TCPDF Library laden
require_once('tcpdf/tcpdf.php');

// Erstellung des PDF Dokuments
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
 
// Dokumenteninformationen
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor("setAuthor");
$pdf->SetTitle('setTitel ');
$pdf->SetSubject('setSubject ');
 
 
// Header und Footer Informationen
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
 
// Auswahl des Font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
 
// Auswahl der MArgins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
 
// Automatisches Autobreak der Seiten
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
 
// Image Scale 
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
 
// Schriftart
$pdf->SetFont('dejavusans', '', 10);
 
// Neue Seite
$pdf->AddPage();
 
// Fügt den HTML Code in das PDF Dokument ein
$pdf->writeHTML($html, true, false, true, false, '');
 
//Ausgabe der PDF
 
//Variante 1: PDF direkt an den Benutzer senden:
//$pdf->Output($protokollName, 'I');
    
 
    // alle daten ab morgen
    // SELECT * FROM sendeplan WHERE `starts` >= NOW() + INTERVAL 1 DAY

    // alle daten ab übermorgen
    // SELECT * FROM sendeplan WHERE `starts` >= NOW() + INTERVAL 1 DAY

//Variante 2: PDF im Verzeichnis abspeichern:
//$pdf->Output(dirname(__FILE__).'/'.$protokollName, 'F');
$pdf->Output(dirname(__FILE__).'/airtimeprotokolle/'.$protokollName, 'F');
//echo '<b>BOTprotokoll</b>  <a href="airtimeprotokolle/'.$protokollName.'" target="_blank">'.$protokollName.'</a><br><br><br>';




?>

 

