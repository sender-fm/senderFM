<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    require_once('setup.php');
 
 
   //  var_dump($_FILES );
 
 
 
   $split =  explode("/", $_FILES['file']['type']);  // 'audio/mp3'
 
 
 
     $f_filetyp          =   $split[0] ;
      $f_filemedium       =   $_FILES['file']['type'] ;
      $f_fileformat       =   $split[1] ; 
      $file_orginalname   =   $_FILES['file']['name']  ;
      $file_size          =   $_FILES['file']['size'] ;    
      $form_user_id       =   $_SESSION['id'] ;
      $file_tmp_name       =   $_FILES['file']['tmp_name'] ;


        $path = "../useruploads/profilbilder/"; 


     /*
            if (!file_exists($path)) {
                //mkdir("folder/" . $dirname, 0777);
                echo "ordner ist nicht da";
                exit;
            } else {
                echo "". $path ." ordner ist da";
            }
 */
         // echo   $NEWfileName =   $form_user_id. '_u.'.$f_fileformat.'';
              $NEWfileName =   $form_user_id. '_u.'.$f_fileformat;

       // echo "FILES";

  
        $upl =  move_uploaded_file( $file_tmp_name,  $path.$NEWfileName);
        
        //  var_dump(  $upl);
         
    
        if ( $upl ) {	
      
		 	   	   
                 $sql1="UPDATE `mitglieder` SET `img`='".$NEWfileName."' WHERE `userid` = ". $form_user_id."";
      
            sql_db($sql1, "UPDATE");
               $_SESSION['img'] = $NEWfileName;
               
      echo "OK";
		        
              
		     
		 
        } else {
            echo "No files uploaded ...";
        }
 
 

      ?>