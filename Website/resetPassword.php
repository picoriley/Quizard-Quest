<!DOCTYPE HTML>
<!-- 
	Password Reset Page
	Author : Gustavo Castillo
 -->
<html lang="en">

	<head>

		<meta charset="UTF-8">
		<link rel="stylesheet" href="css/mainStyle.css"/>
		<title>Password Reset</title>
		<script type = "text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script type = "text/javascript" src="js/navigation.js"></script>
		<script type = "text/javascript" src="js/passwordReset.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Share+Tech+Mono|VT323' rel='stylesheet' type='text/css'>


	</head>
	
	<body>
			<form id="pwReset" action="../API_Server/changePassword.php" method="POST" >
				<p>Type New Password</p>
				<input type="password" placeholder="Password" id="newPW" name="password" required />
				<p>Confirm New Password</p>
				<input type="password" placeholder="Password" id="checkPW"required />
				<input class="submitButton" type="submit" value="Submit" id="changePW" />
			</form>


			<footer>
				<p>Quizard Quest is brought to you by cd msc/</p>
				<p>2013 English (US)</p>
			</footer>

		</div>
	</body>

</html>