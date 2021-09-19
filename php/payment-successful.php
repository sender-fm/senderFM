<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Spendenzahlung erfolgreich</title>
     <meta http-equiv="refresh" content="3;url=http://www.sender.fm/m">
</head>
<body>

	<h1>Danke, für deine Spende.</h1>
    <div>sender.fm wird geladen ... </div>

    <?php 
      /*
    echo "POST<pre>>";
    var_dump($_POST );
    echo "</pre>>";
  
    Array (
    
      
    [transaction_subject] => 
    [txn_type] => web_accept
    [payment_date] => 01:25:52 Oct 24, 2018 PDT
    [last_name] => buyer
    [residence_country] => AT
    [pending_reason] => multi_currency
    [item_name] => mit html(fallid: FL-21) ,Spender: fridolin(SpenderID: SF-2)
    [payment_gross] => 
    [mc_currency] => EUR
    [business] => webatler-facilitator2@tutanota.com
    [payment_type] => instant
    [protection_eligibility] => Ineligible
    [verify_sign] => AYuK.fkGZ2oTLW-A8lbAGEOXCqMaAToAIptvBuGnMZSHopsue0sqxx5m
    [payer_status] => verified
    [test_ipn] => 1
    [tax] => 0.00
    [payer_email] => webatler-buyer@tutanota.com
    [txn_id] => 5VP7096986105843U
    [quantity] => 0
    [receiver_email] => webatler-facilitator2@tutanota.com
    [first_name] => test
    [payer_id] => R45KTGVF6ZLUY
    [receiver_id] => MXA9BYA32J44N
    [item_number] => 21
    [payment_status] => Pending
    [mc_gross] => 3.00
    [custom] => 
    [charset] => windows-1252
    [notify_version] => 3.9
    [merchant_return_link] => Zurück zur Soli Forum's Test Store
    [auth] => ADNl9ukI8KqcRjsKZuTxT7FjYpvMjeem3encTgJzZsBgtmenTTVwC.tJVAQy7pdeltN-DILWQ1Z5kf5vp6uKymQ
    ) 
    
    */
    
    require "setup.php";
    
    
     $html =  " SELECT  `txn_id` FROM `spenden_success_pay` WHERE `txn_id` = '".$_POST['txn_id']."'";
     $txn_id = sql_db($html, "SELECT");
    if ($_POST['txn_id'] != $txn_id || $txn_id == "") {
        $html =  "  INSERT INTO `spenden_success_pay`(  `txn_id`, `fall_name`, `fall_id`, `payer_id`, `payment_date`, `payment_status`,   `payer_status`, `payer_email`, `mc_currency`, `betrag`) VALUES ";
          $html .=  " ('".$_POST['txn_id']."','".$_POST['item_name']."',".$_POST['item_number'].",'".$_POST['payer_id']."','".$_POST['payment_date']."','".$_POST['payment_status']."', '".$_POST['payer_status']."','".$_POST['payer_email']."','".$_POST['mc_currency']."',".$_POST['mc_gross'].")";
        
        // $html =  "INSERT INTO `payments` (`txnid`, `payment_amount`, `payment_status`, `itemid`, `createdtime`, `uid`)  VALUES ";
        //    $html .=  "('".$_POST['txn_id']."', '".$itemAmount."', '".$data['payment_status']."', '".$data['fallid']."', '".date('Y-m-d H:i:s')."', $UID)";
		 
     echo   $tt = sql_db($html, "INSERT");
    
        if ($tt > 0 ) {
          //  echo "OK, gespeichert und zugeordnet!";
        }
    } else {
        header('location: /'  );
    }
        
   
?>
    
    
</body>
</html>
