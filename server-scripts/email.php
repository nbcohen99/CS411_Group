<?php
ini_set('display_errors', true);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once "vendor/autoload.php";

$mail = new PHPMailer;

//Enable SMTP debugging.
$mail->SMTPDebug = 3;
//Set PHPMailer to use SMTP.
$mail->isSMTP();
//Set SMTP host name
$mail->Host = "smtp.gmail.com";
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;
//Provide username and password
$mail->Username = "split.bill.reminder@gmail.com";
$mail->Password = "QmS28ua0CUmzCSNtQENcNP6Ojhi2";
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";
//Set TCP port to connect to
$mail->Port = 587;

$mail->From = "split.bill.reminder@gmail.com";
$mail->FromName = "Split the Bill";

$mail->smtpConnect(
  array(
    "ssl" => array(
      "verify_peer" => false,
      "verify_peer_name" => false,
      "allow_self_signed" => true
    )
  )
);

$mail->addAddress($_GET['to'], $_GET['name']);

$mail->isHTML(true);

$mail->Subject = "Split Bill Payment Requested";
$mail->Body = $_GET['body'];
$mail->AltBody = $_GET['body'];

if(!$mail->send()) {
  echo "Mailer Error: " . $mail->ErrorInfo;
} else {
  echo "Message has been sent successfully";
}

?>
