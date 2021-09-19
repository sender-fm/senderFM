<?php 
   header('Content-type: text/html; charset=UTF-8');
    date_default_timezone_set('Europe/Berlin'); 


    require_once('setup.php');
   

  $filename1 = '../index.html';
             if (file_exists($filename1)) {
                 echo "Die Datei $filename1 existiert";
             } else {
                 echo "Die Datei $filename1 existiert nicht";
             }
             echo "<hr>";






// Der Punkt steht für das Verzeichnis, in der auch dieses
// PHP-Programm gespeichert ist
$verzeichnis = "../archiv/";
echo "ist verzeichnis => " . is_dir ( $verzeichnis );
echo "<ol>";
 
// Test, ob es sich um ein Verzeichnis handelt
if ( is_dir ( $verzeichnis ))
{
    // öffnen des Verzeichnisses
    if ( $handle = opendir($verzeichnis) )
    {
        // einlesen der Verzeichnisses
        while (($file = readdir($handle)) !== false)
        {
            if ($file != "." || $file != "..") {
            echo "<li style='background-color:yellow;'>  ";
            echo $file;
  
            echo "</li></ul>\n";
            }
        }
        closedir($handle);
    }
}
echo "</ol>";

     echo "<hr>";
 echo "<p> in der Datenbank sind gespeichert: </p>";
 echo   sql_db("SELECT COUNT(`id`) FROM archiv",  "SELECT");
 echo "<br><hr><br>";

 
               
            $sql  = "  SELECT  `id`, `f_filetitle`, `f_fileundertitle`, `f_publisher`,   `f_filetyp`,    "; 
            $sql .= "         `f_fileformat`, `f_name`,   `ichek`, `form_user`,  ";           
            $sql .= "        `form_user_id`, `filenameDB`, `savedDate`, `agid` "; 
            $sql .= "   FROM `archiv`   ";  
      echo  $sql .= "    GROUP BY  `id` "; 


     echo  $erg =  sql_db($sql, "SELECT");
    echo "<br><hr><br>";


    $row = explode("#|#", $erg);
     
      $i = 0;
      $l =   COUNT($row) ;
    echo  "IN der Datenbank sind " .  COUNT($row) . " ergebnisse";


         for($i; $i<$l;$i++){
            //echo( $row[$i]);
             $data = explode("#$#",$row[$i]);
              
             echo "<h3># ".$i."</h3> ";
             echo "<br> Format: ".$data[5] ." ";
             echo "<br> AGID: ".$data[12] ." ";
             echo "<br> url: ".$data[10]." ";
              
            echo  $filename = '../archiv/'.$data[10].'';
             /*
             if($data[12] != '') {
                 
                    $filename = '../archiv/'.$data[10].'';
             } else {
                  $filename = '../useruploads/u'.sha1($data[9]).'/'.$data[10].'';
             }
          */

             if (file_exists($filename)) {
                
                 echo "<div style='color:green'>";
                 echo "Die Datei existiert";
                  echo '<br> url: <a   ';
                   if($data[12] != '') {
                       echo '  href="'. $filename .'"   >'. $filename .'';

                   } else {
                       echo ' href="'. $filename .'" >'. $filename .'';

                   }
                      
                    echo '$filename </a>';
                     
             } else {
                  echo "<div style='color:red'>";
                 echo "Die Datei existiert nicht";
                  echo '<br> url: <a   ';
                   if($data[12] != '') {
                       echo '  href="'. $filename .'"   >'. $filename .'';

                   } else {
                       echo ' href="'. $filename .'" >'. $filename .'';

                   }
                      
                    echo '</a>';
             }
             echo "</div>";
             echo "<hr>";
         }

?> 