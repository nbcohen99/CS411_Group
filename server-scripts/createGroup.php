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

   
$randID = "g" . time() . rand(1000,9999);
$_GET["uid"] = $_GET["ownerID"];
$_GET["gid"] = $randID;
//echo "trying to joinGroup\n";
include "joinGroup.php";  

//echo "HI WE BACK HERE NOW\n";
$m = new MongoDB\Client("mongodb://root:root@localhost:27017");
//echo "\nConnection to database successfully";


   // select a database
   $db = $m->SplitCheck;
   //echo "\nDatabase SplitCheck selected";
   $collection = $db->groups;
   //echo "\nusers collection selected succsessfully\n";
$insertOneResult = $collection->insertOne([
	 'id' => $randID,
	 'name' => $_GET["name"],
	 'ownerID' => $_GET["ownerID"],
	 'userIDs' => [$_GET["ownerID"]]
]);
$temp = $insertOneResult->getInsertedCount();
//echo "Inserted ". $temp . " document(s)\n";

//echo json_encode($insertOneResult->getInsertedId());
?>
