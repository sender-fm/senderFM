<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    require_once('setup.php');
 
  
     //   var_dump( $_POST);
 


   // var_dump($_FILES );
   //  var_dump($_POST );
     


   $split =  explode("/", $_FILES['file']['type']);  // 'audio/mp3'
 
 
    $f_filetitle        =   $_POST["f_title"] ;
    $f_filetyp          =   $split[0] ;
    $f_filemedium       =   $_FILES['file']['type'] ;
    $f_fileformat       =   $split[1] ;
    $f_playtime         =   $_POST["f_playtime"] ;
    $file_orginalname   =   $_FILES['file']['name']  ;
    $file_size          =   $_FILES['file']['size'] ;
    $f_fileautor        =    $_SESSION['uname'] ;
    $f_produktdate      =   'NULL' ;
    $f_firstplaytime    =   'NULL' ;
    $f_fileundertitle   =   $_POST["f_subtitle"] ;
    $f_shortdesc        =   '' ;
    $f_filelongdesc     =   '' ;
    $f_filemitwirkende  =   '' ;
    $f_publisher        =   '' ;
    $f_herkunft         =   '' ;
    $f_sprache          =   '' ;
    $f_lizenz           =   '' ;
    $f_rechteinhaber    =   '' ;
    $ichek              =   '' ;
    $f_downloadbar      =   '' ;
    $f_kauflink         =   '' ;
    $form_AG_id         =    $_POST["rid"] ;
    $form_user_id       =   $_SESSION['id'] ;
    $form_user          =   $_SESSION['uname'] ;
    $agid               =    $_POST["rid"] ;
    $agname             =    $_POST["rname"]  ;

   
        $path = "../archiv/"; 
 
      /*
            if (!file_exists($path)) {
                //mkdir("folder/" . $dirname, 0777);
                echo "ordner ist nicht da";
                exit;
            } else {
                echo "". $path ." ordner ist da";
            }
*/
            

       // echo "FILES";

        $file_orginalname = $_FILES['file']['name'];
        $file_type = $_FILES['file']['type'];
        $file_size = $_FILES['file']['size'];
        $file_tmp_name = $_FILES['file']['tmp_name'];


        $str = zufallsstring(25);

        $NEWfileName = $str."_".$file_orginalname;

        $suchmuster = array();
        $suchmuster[0] = '/ /';
        $suchmuster[1] = '/&/';
        $suchmuster[2] = '/#/';
        $suchmuster[3] = '/$/';
        $suchmuster[4] = '/\.mp3_/';
        $suchmuster[5] = '/\.ogg_/';
        $suchmuster[6] = '/\.m4a_/';


        $ersetzungen = array();
        $ersetzungen[0] = '_';
        $ersetzungen[1] = '_';
        $ersetzungen[2] = '_';
        $ersetzungen[3] = '_';
        $ersetzungen[4] = '.mp3';
        $ersetzungen[5] = '.ogg';
        $ersetzungen[6] = '.m4a';

        $NEWfileName = preg_replace($suchmuster, $ersetzungen, $NEWfileName);

        $upl =  move_uploaded_file( $file_tmp_name, $path.$NEWfileName);

        // var_dump( "upload file upl => " .$upl);



            $sql=" INSERT INTO `archiv` ";
            $sql.="     ( `f_filetitle`, `f_fileundertitle`, `f_shortdesc`, `f_filelongdesc`, `f_fileautor`, `f_filemitwirkende`, ";
            $sql.="      `f_publisher`,  `f_filetyp`, `f_filemedium`, `f_fileformat`, `f_playtime`, ";
            $sql.="      `f_name`, `f_herkunft`, `f_sprache`, `f_lizenz`, `f_rechteinhaber`, `ichek`, `form_user`, `form_user_id`,";
            $sql.="       `filenameDB`, `agid`, `agname`, `data-downloadable`, `data-buy-url`, `f_size`) ";
            $sql.="     VALUES (";
            $sql.="      '".$f_filetitle."', ";
            $sql.="      '".$f_fileundertitle."', ";
            $sql.="      '".$f_shortdesc."', ";
            $sql.="      '".$f_filelongdesc."', ";
            $sql.="      '".$f_fileautor."', ";
            $sql.="      '".$f_filemitwirkende."', ";
                 
            $sql.="      '".$f_publisher."', ";
        
            
            $sql.="      '".$f_filetyp."', ";
            $sql.="      '".$f_filemedium."', ";
            $sql.="      '".$f_fileformat."', ";
            $sql.="      '".$f_playtime."', ";
            
            $sql.="      '".$file_orginalname."' ,";
            $sql.="      '".$f_herkunft."' ,";
            $sql.="      '".$f_sprache."' ,";
            $sql.="      '".$f_lizenz."',";
            $sql.="      '".$f_rechteinhaber."' ,";
            $sql.="      '".$ichek."' ,";
            $sql.="      '".$form_user."' ,";
            $sql.="      ".$form_user_id." ,";
            
            $sql.="      '".$NEWfileName."' ,";
            $sql.="      111".$agid." ,";
            $sql.="      '".$agname."' ,";
            $sql.="      '".$f_downloadbar."' ,";
            $sql.="      '".$f_kauflink."', ";
          echo   $sql.="      '".$file_size."' )";
 
 
 
              $erg = sql_db($sql, "INSERT");

          

            date_default_timezone_set('GMT');

 
            $text=''.$NEWfileName.'#$$#'.$erg.'#$$#'.$form_user_id.'#$$#111'.$agid.'#$$#'.$f_filetitle.'#$$#'.$f_fileundertitle.'#$$#'.$file_size.'#$$#'.$f_playtime.' ';                  
                
              


            // einen neuen beitrag schreiben für den upload des files 
             

            $sql_text =" INSERT INTO `ag_text`( `ag_id`, `ag_name`, `title`, `txt`, `creator`, `creator_id`) VALUES ";
           echo   $sql_text .="   (111".$agid.",'".$agname."','UPLOAD-AUDIO','".$text."','".$f_fileautor."',".$form_user_id.")";
    
    
    
             $erg2 = sql_db($sql_text, "INSERT");

            if ( $erg2 != "ERROR") { 
                echo "OK"; 
            }

     

      ?>