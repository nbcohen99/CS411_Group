<?php 
require_once 'vendor/autoload.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type"); // connect to mongodb 
header('Content-Type: application/json');



try {
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

	$filter = array("id"=>$_GET["id"]);
	$func = array('$set'=>array("token" => $_GET["token"]));
	$collection->updateOne($filter,$func);
	echo('{"ok": ' . true . ', "msg": "Token Update Success"}');

} catch (Exception $e) {
    echo('{"ok": ' . false . ', "msg": "' . $e->getMessage() . '"}');
}




?>
