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
            case'logged':
                
                $array = array (true, 'ja', ''.$_SESSION["id"].'', ''.$_SESSION["uname"].'',''.$_SESSION["status"].'',''.$_SESSION["mail"].'',''.$_SESSION["member"].'',''.$_SESSION["img"].'' );
                echo json_encode ($array);
                 
                break;
             
            case'id':
                echo  $_SESSION["id"] ; 
                break;
             
            case'username':
                echo $_SESSION["uname"]; 
                break;
             
            case'status':
                echo $_SESSION["status"]; 
                break;
             
            case'mail':
                echo $_SESSION["mail"]; 
                break;
              
            case'all':
                echo "{
                    login: 'ja',
                    id: ".$_SESSION["id"].",
                    username: ".$_SESSION["uname"].",
                    status: ".$_SESSION["status"].",
                    mail: ".$_SESSION["mail"].",
                    member: ". $_SESSION["member"].",
                    img: ".$_SESSION["img"]." }";  
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