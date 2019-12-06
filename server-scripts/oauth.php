<?php
header('Access-Control-Allow-Origin: https://splitcheck.github.io/');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
header('Content-Type: application/json');
error_reporting( E_ALL );

// Verify
require_once 'vendor/autoload.php';
$client = new Google_Client([
   'client_id' => '991940894202-2fiu3ivcpj8p0t1d03rjcu10qvcslira.apps.googleusercontent.com'
]);
$payload = $client->verifyIdToken($_GET['idToken']);//echo($payload);  // hit API verify
$authentic = $payload != null ;  // temporary accept

// Serialize
$authentic = ($authentic ? 'true' : 'false');
echo('{"authentic": ' . $authentic . ', "token": "' . $_GET['idToken'] . '"}');
?>
