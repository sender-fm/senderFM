<?php 
    header('Content-type: text/html; charset=UTF-8');
    date_default_timezone_set('Europe/Berlin'); 
    header('Content-type: application/json');

    require_once('setup.php');
    //var_dump($_POST);
    //var_dump($_POST);
    if(!isset($_SESSION['id']) ) {
      //  echo $_COOKIE["login"]; 
        if ($_COOKIE["login"] ){
            //echo "cookie=> ". $_COOKIE["login"]; 
        }
        $array = array (false, 'nein', '', '', '' );
        echo json_encode ($array);  
        return;

    }

    if (  isset($_SESSION['id']) ) { 
      
        switch($_POST["typ"]){
            case'user':
                
                      // load talk für User
            
                 $sql  = 'SELECT COUNT(`id`) FROM `chat-talk` WHERE `userid` = '. $_SESSION['id'].' AND `gelesen` LIKE NULL';
                echo  sql_db($sql, "SELECT");
                
                 
                break;
             
             case'admin':
                
               
                 
                break;
              
            default:
                echo "bitte etwas angeben im 'typ' checksession.php";
                break;
        }
      
    
    }  else {
        echo false;
    }
 //  if ($_POST['user_captcha'] == $_POST['cap']) {
          
 
  return;

?>