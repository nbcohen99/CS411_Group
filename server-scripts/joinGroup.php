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

$filter = array("id"=>$_GET["uid"]);
$func = array('$push'=>array("groups" => $_GET["gid"]));
//echo "filters made successfully\n";

$collection->updateOne($filter,$func);

$collection = $db->groups;
$filter = array("id"=>$_GET["gid"]);
$func = array('$push'=>array("userIDs" => $_GET["uid"]));
$collection->updateOne($filter,$func);
//echo "Query finished";
?>
