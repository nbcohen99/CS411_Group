<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Authorization");
header('Content-Type: application/json');

if(isset($_SERVER['QUERY_STRING'])){
  $req = "https://api.yelp.com/v3/" . $_SERVER['QUERY_STRING'];
} else {
  $req = "https://api.yelp.com/v3/businesses/search?location=boston&term=italian";
}
// echo($req);




$cookie_jar = tempnam('/tmp','cookie');

// log in
$c = curl_init('https://venmo.com/account/sign-in/');
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_COOKIEJAR, $cookie_jar);
$page = curl_exec($c);
$err = curl_error($c);
curl_close($c);

echo(file_get_contents($cookie_jar)."\n\n");

// log in
$c = curl_init('https://venmo.com/account/login/');

$headers = array(
  'POST /account/login HTTP/1.1',
  'Host: venmo.com',
  'Connection: keep-alive',
  'Content-Length: 58',
  'Pragma: no-cache',
  'Cache-Control: no-cache',
  'Origin: https://venmo.com',
  'Upgrade-Insecure-Requests: 1',
  'Content-Type: application/x-www-form-urlencoded',
  'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
  'Sec-Fetch-Mode: navigate',
  'Sec-Fetch-User: ?1',
  'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'Sec-Fetch-Site: same-origin',
  'Referer: https://venmo.com/',
  'Accept-Encoding: gzip, deflate, br',
  'Accept-Language: en-US,en;q=0.9'
);
curl_setopt($c, CURLOPT_HTTPHEADER, $headers);

curl_setopt($c, CURLOPT_POST, 1);
$post = "phoneEmailUsername=whowe%40bu.edu&password=2K4-uNs-h8q-dXY";
curl_setopt($c, CURLOPT_POSTFIELDS, $post);

curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_COOKIEFILE, $cookie_jar);
$page = curl_exec($c);
$err = curl_error($c);
curl_close($c);

echo(file_get_contents($cookie_jar));

// // make a deposit
// $c = curl_init('http://bank.example.com/deposit.php');
// curl_setopt($c, CURLOPT_POST, 1);
// curl_setopt($c, CURLOPT_POSTFIELDS, 'account=checking&amount=122.44');
// curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($c, CURLOPT_COOKIEFILE, $cookie_jar);
// $page = curl_exec($c);
// $err = curl_error($c);
// curl_close($c);



// remove the cookie jar
unlink($cookie_jar) or die("Can't unlink $cookie_jar");

echo(base64_encode($page));
