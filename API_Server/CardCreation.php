<?php

	include "API.php";

	$username = $_SESSION['username'];
	$category = $_POST['category'];
	$subcategory = $_POST['subcategory'];
	$question = $_POST['question'];
	$answer = $_POST['answer'];
	$difficulty = $_POST['difficulty'];


	$file = "../Design_Documents/test.txt";
	file_put_contents($file, $category);
	$card = create_card($username,$question,$answer,$category,$subcategory,$difficulty);

?>