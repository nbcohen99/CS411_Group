<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Authorization");

if(isset($_SERVER['QUERY_STRING'])){
  $req = "https://www.lyft.com/api/costs?" . $_SERVER['QUERY_STRING'];
} else {
  $req = "https://api.yelp.com/v3/businesses/search?location=boston&term=italian";
}
 //echo($req);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $req,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Accept: */*",
    "Accept-Encoding: gzip, deflate",
    "Cache-Control: no-cache",
    "Connection: keep-alive",
    "User-Agent: API_SCRAPER",
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  // echo "\n\n<br><pre>" . $response . "</pre>";

  header('Content-Type: application/json');
  echo($response);
}
