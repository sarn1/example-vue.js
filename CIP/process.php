<?php
header('Content-Type: application/json');
require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
$_POST = json_decode(file_get_contents('php://input'), true);

// init
$cart = $_POST['cart'];
$success = false;
$order_num = null;
$order_details = "";

// some validation
if (strtoupper($cart['entries']['bumper']) == "SPRINGFIELD") {
  $success = true;
  $now = new DateTime();
  $now->setTimezone(new DateTimeZone('America/Chicago'));

  $sendto='xxxx@gmail.com';

  foreach ($cart['summaries'] as $d) {
    $order_details .= "<li>".$d['label']."</li>";
  }

  $subject="Reservation/Payment From CIP - " . $cart['order_num'];
  $body='
    <table border="1" cellpadding="1" cellspacing="0" style="font-size: 10px">
    <tr>
      <td width="300"><b>Bride Name:</b></td>
      <td>'.$cart['entries']['bride_name'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Bride Address:</b></td>
      <td>'.$cart['entries']['bride_addr'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Bride Phone:</b></td>
      <td>'.$cart['entries']['bride_phone'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Bride Email:</b></td>
      <td>'.$cart['entries']['bride_email'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Groom Name:</b></td>
      <td>'.$cart['entries']['groom_name'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Groom Address:</b></td>
      <td>'.$cart['entries']['groom_addr'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Groom Phone:</b></td>
      <td>'.$cart['entries']['groom_phone'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Groom Email:</b></td>
      <td>'.$cart['entries']['groom_email'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Wedding Time:</b></td>
      <td>'.$cart['entries']['start_time'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Wedding Date:</b></td>
      <td>'.$cart['entries']['date'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Total:</b></td>
      <td>$'.$cart['total'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Payment/Deposit:</b></td>
      <td>$'.$cart['payment'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Comments:</b></td>
      <td>'.trim($cart['entries']['comments']).'</td>
    </tr>
    <tr>
      <td width="300"><b>Order Number:</b></td>
      <td>'.$cart['order_num'].'</td>
    </tr>
    <tr>
      <td width="300"><b>Order Details:</b></td>
      <td><ul>'.$order_details.'</ul></td>
    </tr>
    <tr>
      <td width="300"><b>Timestamp:</b></td>
      <td>'.$now->format("m/d/y : h:i:s A") .'</td>
    </tr>
    <tr>
      <td width="300" style="font-size: 9px"><b>Additional User Info:</b></td>
      <td>'. $_SERVER['HTTP_USER_AGENT'] .'</td>
    </tr>
    </table>
  ';

  // email
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  $headers .= "From: Chapel In The Pines Payment <forwarder@chapelinthepines.com>" . "\r\n";
  wp_mail($sendto, $subject, $body, $headers);

  //save to database
  $con=mysqli_connect(DB_HOST,DB_NAME,DB_PASSWORD,DB_NAME);
  $stmt = mysqli_prepare($con,"INSERT INTO _reservation (order_num, bride_email, body, date_modified) values (?,?,?,now())");
  mysqli_stmt_bind_param($stmt,'iss',$cart['order_num'],$cart['entries']['bride_email'],$body);
  mysqli_stmt_execute($stmt);

}

// output to json
echo json_encode([
  "success " => $success,
  "order_num" => $order_num,
]);
