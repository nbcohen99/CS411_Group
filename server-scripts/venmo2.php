<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.venmo.com/v1/me",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    "Accept-Encoding: gzip, deflate, br",
    "Accept-Language: en-US,en;q=0.9",
    "Cache-Control: no-cache",
    "Connection: keep-alive",
    "Cookie: api_access_token=acd80f92ea5e5006158d2d6438a37cfff620a39c76fbfb59bfe20524c74e5be5,api_access_token=acd80f92ea5e5006158d2d6438a37cfff620a39c76fbfb59bfe20524c74e5be5; csrftoken2=31520cd1343248e6b7090271303312cd",
    "Host: api.venmo.com",
    "Postman-Token: bbda645b-e3cf-4b6e-987b-daf83c18c55d,10385cae-46c9-40ae-8dc6-20f890bb9fa6",
    "Pragma: no-cache",
    "Sec-Fetch-Mode: navigate",
    "Sec-Fetch-Site: none",
    "Sec-Fetch-User: ?1",
    "Upgrade-Insecure-Requests: 1",
    "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
