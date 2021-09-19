<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    require_once('setup.php');
 

/*
    if(isset($_POST)) {
        var_dump( $_POST);
 
        
        if($_POST['action'] == "formdata"){


            $sql ='INSERT INTO `archiv`(';
            $sql .='`f_filetitle`, `f_fileundertitle`, `f_shortdesc`, `f_filelongdesc`, `f_fileautor`, ';
            $sql .='`f_filemitwirkende`, `f_publisher`, `f_produktdate`, `f_firstplaytime`, `f_filetyp`, ';
            $sql .='`f_filemedium`, `f_fileformat`, `f_playtime`, `f_name`, `f_herkunft`, `f_sprache`, ';
            $sql .='`f_lizenz`, `f_rechteinhaber`, `ichek`, `form_user`, `form_user_id`, `filenameDB`, ';
            $sql .='`agid`, `agname`, `savedDate`, `updatedDate`, `data-downloadable`, `data-buy-url`, ';
            $sql .='`f_size`) VALUES (';
            $sql .='[value-1],';
            $sql .='[value-2],';
            $sql .='[value-3],';
            $sql .='[value-4],';
            $sql .='[value-5],';
            $sql .='[value-6],';
            $sql .='[value-7],';
            $sql .='[value-8],';
            $sql .='[value-9],';
            $sql .='[value-10],';
            $sql .='[value-11],';
            $sql .='[value-12],';
            $sql .='[value-13],';
            $sql .='[value-14],';
            $sql .='[value-15],';
            $sql .='[value-16],';
            $sql .='[value-17],';
            $sql .='[value-18],';
            $sql .='[value-19],';
            $sql .='[value-20],';
            $sql .='[value-21],';
            $sql .='[value-22],';
            $sql .='[value-23],';
            $sql .='[value-24],';
            $sql .='[value-25],';
            $sql .='[value-26],';
            $sql .='[value-27],';
            $sql .='[value-28],';
            $sql .='[value-29])';
           
     


           echo  sql_db($sql, "INSERT");

            return null;
        }
        return null;
    }  
*/
 
 


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
    $form_AG_id         =   '' ;
    $form_user_id       =   $_SESSION['id'] ;
    $form_user          =   $_SESSION['uname'] ;
    $agid               =   'NULL' ;
    $agname             =   '' ;

   
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
            /*
                if($f_produktdate === NULL) {
                   $sql.="      NULL, ";
                }else {
                     $sql.="      '". $f_produktdate ."', ";
                }
                 if($f_firstplaytime === NULL) {
                   $sql.="      NULL, ";
                }else {
                     $sql.="      '". $f_firstplaytime ."', ";
                }
            
            */
            
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
            $sql.="      ".$agid." ,";
            $sql.="      '".$agname."' ,";
            $sql.="      '".$f_downloadbar."' ,";
            $sql.="      '".$f_kauflink."', ";
             $sql.="      '".$file_size."' )";
 
 
 
              $erg = sql_db($sql, "INSERT");

          

            date_default_timezone_set('GMT');

/*
                $text =  '<div class="">';                
                $text.='   <a href="#" class="item item-content player-play-button"  data-file="'.$NEWfileName.'" data-id="'.$erg.'" data-uid="'.$form_user_id.'" data-agid="">';
                $text.='       <div class="item-media"><i class="fa fa-play fa-2x" aria-hidden="true"></i></div>';
                $text.='       <div class="item-inner">';
                $text.='               <div class="link">'. $file_orginalname .'</div>  '; 
                $text.='           <div class="item-subtitle">'. $f_fileundertitle .'</div>';
                $text.='           <div class="item-text">Upload: '. date("d-m-Y,h:m:s") .' </div>';
                if ($agid != "NULL") {
                     $text.='             | in Redaktion: '. $agid .'</div>';
                    }                   
                $text.='      </div>';
                $text.='   </a>';                   
                $text.='</div>';    
*/

    /*
                $text.='<div class="audiodata" ';   
                $text.='     data-file="'.$NEWfileName.'"';   
                $text.='     data-id="'.$erg.'"';
                $text.='     data-uid="'.$form_user_id.'"';
                $text.='     data-agid=""';
                $text.='     data-filetitle="'.$f_filetitle.'"';
                $text.='     data-fileundertitle="'.$f_fileundertitle.'"';
                $text.='     data-filesize="'.$file_size.'"';
                $text.='     data-playtime="'.$playtime.'"';
                $text.='>';   
                $text.='</div>';   
      */          
/*
               $text='
                {                    
                    "data_file":"'.$NEWfileName.'",   
                    "data_id":"'.$erg.'",
                    "data_uid":"'.$form_user_id.'",
                    "data_agid":"",
                    "data_filetitle":"'.$f_filetitle.'",
                    "data_fileundertitle":"'.$f_fileundertitle.'",
                    "data_filesize":"'.$file_size.'",
                    "data_playtime":"'.$f_playtime.'"                     
                
                }';
*/
            $text=''.$NEWfileName.'#$$#'.$erg.'#$$#'.$form_user_id.'#$$#'.$agid.'#$$#'.$f_filetitle.'#$$#'.$f_fileundertitle.'#$$#'.$file_size.'#$$#'.$f_playtime.'                   
                
                ';



            // einen neuen beitrag schreiben für den upload des files 
            $sql_text =" INSERT INTO `text_mitglieder` ";
            $sql_text .=" ( `txt`, `creator_id`, `creator`,`zusatz` ) VALUES ";
              $sql_text .=" ( '".$text."',".$form_user_id.",'".$f_fileautor."','UPLOAD-AUDIO' )";

             $erg2 = sql_db($sql_text, "INSERT");

            if ( $erg2 != "ERROR") { 
                echo "OK"; 
            }

     

      ?>