<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

   require_once('setup.php');
 
    if ($LOGIN) {
         
        $se  = $_SESSION['idi'];
        $ai = 999999;
                 
        $sql = "SELECT  ";
        $sql .= " a.`name` as name,";
        $sql .= " a.`img` as img,";
        $sql .= " a.`desc` as des,";
        $sql .= " a.`sprecherid` as sprecherid,";
        $sql .= " a.`geschlossen` as geschlossen,";
        $sql .= " (SELECT id_mitglied FROM ag_mitglieder WHERE id_mitglied = " . $se." AND id_ag = " . $ai." ) as  isMitglied, ";
        $sql .= " (SELECT e.agid FROM `ag_apply_membership` as e WHERE e.agid = " . $ai." AND e.userid = ".$se." ) as applyForList, ";
        $sql .= "  (SELECT COUNT(`id`) FROM `ag_mitglieder` WHERE `id_ag` =  " . $ai.") as countMitglieder, ";

        $sql .= "  (SELECT COUNT(`id`) FROM `ag_text` WHERE `ag_id` = " . $ai.") as countBeitraege, ";

        $sql .= "  (SELECT COUNT(`id`) FROM `archiv` WHERE `agid` = " . $ai.") as countArchiv, ";
        $sql .= "  (SELECT COUNT(`id`) FROM `todo` WHERE `agidi` = " . $ai.") as countTodo ";

        $sql .= " FROM  `ags` as a ";
        echo $sql .= " WHERE  a.`agid` =" . $ai ." ORDER by  ;
 
                 
        $data1 = sql_db($sql,"SELECT");
                  
        if ($data1 == ""  ) {
            echo "keine Daten";
            return;
        } else {                           
            echo $data1  ;
            return;
        }                    
    
    } else {
         
        echo "Login fehlt";
    }
           
               
        

?>