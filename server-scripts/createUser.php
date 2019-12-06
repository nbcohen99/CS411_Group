<?php 
require_once 'vendor/autoload.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 

header("Access-Control-Allow-Headers: X-Requested-With, Content-Type"); // connect to mongodb 

header('Content-Type: application/json');
error_reporting(-1); 
ini_set('display_errors', 'On');





//echo extension_loaded("mongodb") ? "loaded\n" : "not loaded\n";
//echo "Welcome to the backend!";
//echo "\nPlease work!";
//echo "\nAttempting to connect to DB";
$m = new MongoDB\Client("mongodb://root:root@localhost:27017");
//echo "\nConnection to database successfully";


   // select a database
   $db = $m->SplitCheck;
   //echo "\nDatabase SplitCheck selected";
   $collection = $db->users;
   //echo "\nusers collection selected succsessfully\n";
   
$insertOneResult = $collection->insertOne([
     'id' => $_GET["id"],
	 'name' => $_GET["name"],
	 'token' => $_GET["token"],
	 'email' => $_GET["email"],
	 'friends' => [],
	 'groups' => [],
]);
$temp = $insertOneResult->getInsertedCount();
//echo "Inserted ". $temp . " document(s)\n";

echo json_encode(var_dump($insertOneResult));
?>
