<!DOCTYPE HTML>

<html lang="en">

	<head>

		<meta charset="UTF-8">
		<title>Quizard Quest</title>
		<link rel="stylesheet" href="css/mainStyle.css"/>
		<link rel="stylesheet" href="css/supplyShop.css"/>
		<script type = "text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script type = "text/javascript" src="js/supplyShop.js"></script>
		<script type = "text/javascript" src="js/navigation.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Share+Tech+Mono|VT323' rel='stylesheet' type='text/css'>

		<?php
		    session_start();
		    include '../API_Server/url.php';
		    if(!isset($_SESSION['userID'])) {
		        // not logged in
		        $_SESSION['redirected'] = true;
		        header('Location:http://'.$url.'/Quizard-Quest/Website/Error.php?err=199');
		        die();
		    }
    	?>

	</head>

	<body>

		<div class="content">
			
			<header class="nonIndex">
				<img id="headerLogo" src="../Resources/Logo/VertLogo_v2.png" alt="Quizard Quest Logo"/>
				<nav class="navbar" class="nonIndex">
					<button type="button" id="home" class="navButton">Home</button>
					<button type="button" id="startGame" >Begin your Quest!</button>
					<button type="button" id="createCard" >Create a Spell!</button>
					<button type="button" id="createDeck" >Create a Spellbook!</button>
					<button type="button" id="reviewDecks" >Edit your Spellbooks</button>
					<button type="button" id="logOut" class="navButton">Log Out</button>
				</nav>
			</header>

			<div id="displayGold">You have 1000 gold</div>

			<div id="avatars">
				<div id="row" class="row"></div>
			</div>

			<footer>
				<p>Quizard Quest is brought to you by cd msc/</p>
				<p>2013 English (US)</p>
			</footer>

		</div>

	</body>

</html>