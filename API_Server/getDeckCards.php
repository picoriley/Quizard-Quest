<?php
   $q=$_GET["q"];

	include "API.php";
	session_start();
	//file_put_contents($file, $category);
        $deckCards =  get_non_deck_cards($q);
	$test = json_decode($deckCards,true);
	var_dump($test);
	
	foreach ($test as $card){
		echo $card;
	}
?>
