<?php
// php script um daten der user in ihren ordnern zu finden und in den user_archiv_ordner zu legen #

    echo "das";
     //require_once('setup/setup.php');
     require_once('m/php/setup.php');

    echo $sql = 'SELECT  `filenameDB`,`form_user_id` FROM `archiv`  WHERE `f_filetyp` = "audio" AND `agid` IS NULL';
 
       $erg =   sql_db($sql, "SELECT");


        $row =  explode("#|#", $erg);  
        $i = 0; 
    $l=COUNT($row);
    


for ($i;$i<$l;$i++){
    
    // 0 `filenameDB`, 1`form_user_id`
    $data =    explode("#$#", $row[$i]);  
     var_dump($data);
     echo "<br>";
    
    
    $path1 = "archiv/";
        if (!file_exists("archiv")) {
            //mkdir("folder/" . $dirname, 0777);
            echo "1 ordner ist nicht da";
            echo "<br>";
           
            
        } else {
            echo "1 ordner ist da";
            echo "<br>";
            
            
             echo  $path2 = "useruploads/u".sha1($data[1])."/".$data[0]."";
            
            echo "<br>";
            
            
            if (!file_exists("useruploads/u".sha1($data[1])."/".$data[0])) {
                //mkdir("folder/" . $dirname, 0777);
                echo "2 file ist nicht da";
           
              //echo  move_uploaded_file( $path2, $path1.$data[0]);
                
                
                if (!copy($path2, $path1.$data[0])) {
                    echo "copy $path2 schlug fehl...\n";
                } else {
                    echo "copy ok! <br>";
                }
           
                echo "<br>";
            } else {
                echo "2 file ist da";
                echo "<br>";
            }
            
        }
    
  
    
   
}


 
    
?>