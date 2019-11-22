<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Authorization");

if(isset($_SERVER['QUERY_STRING'])){
  $req = "https://api.yelp.com/v3/" . $_SERVER['QUERY_STRING'];
} else {
  $req = "https://api.yelp.com/v3/businesses/search?location=boston&term=italian";
}
// echo($req);

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
    "Authorization: Bearer IYDxARV6bcweTel_t49M7c6jJ1sMnD6_1_LzXEuY63xnDL_mVHHsAbbeeRf8kS3S4lieWkeHnc6C8tT8Nq5VC3Uol0dB5nAYqaxbIr66AMHF84BrCS4hoTIVfouwXXYx",
    "Cache-Control: no-cache",
    "Connection: keep-alive",
    "Host: api.yelp.com",
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
