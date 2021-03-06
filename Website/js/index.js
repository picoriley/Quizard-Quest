/*\
|*|		Javascript for the index.html
\*/

$(document).ready(function() {

	function signinCallback(authResult) {
	  if (authResult['access_token']) {
	    // Update the app to reflect a signed in user
	    // Hide the sign-in button now that the user is authorized, for example:
	    document.getElementById('signinButton').setAttribute('style', 'display: none');
	  } else if (authResult['error']) {
	    // Update the app to reflect a signed out user
	    // Possible error values:
	    //   "user_signed_out" - User is signed-out
	    //   "access_denied" - User denied access to your app
	    //   "immediate_failed" - Could not automatically log in the user
	    console.log('Sign-in state: ' + authResult['error']);
	  }
	}

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1473724932853450', // App ID
			channelUrl : '//54.200.82.84/Quizard-Quest/Website/channel.php', // Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});

		// Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
		// for any authentication related change, such as login, logout or session refresh. This means that
		// whenever someone who was previously logged out tries to log in again, the correct case below 
		// will be handled. 
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			// Here we specify what we do with the response anytime this event occurs. 
			if (response.status === 'connected') {
			    // The response object is returned with a status field that lets the app know the current
			    // login status of the person. In this case, we're handling the situation where they 
			    // have logged in to the app.
			    //window.location.href = "index.html";
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						// the user is logged in and has authenticated your
						// app, and response.authResponse supplies
						// the user's ID, a valid access token, a signed
						// request, and the time the access token 
						// and signed request each expire
						var uid = response.authResponse.userID;
						var accessToken = response.authResponse.accessToken;
						logIn(uid,accessToken);
					} else if (response.status === 'not_authorized') {
						// the user is logged in to Facebook, 
						// but has not authenticated your app
						FB.login();
					} else {
						// the user isn't logged in to Facebook.
					}
				});
			} else if (response.status === 'not_authorized') {
			  // In this case, the person is logged into Facebook, but not into the app, so we call
			  // FB.login() to prompt them to do so. 
			  // In real-life usage, you wouldn't want to immediately prompt someone to login 
			  // like this, for two reasons:
			  // (1) JavaScript created popup windows are blocked by most browsers unless they 
			  // result from direct interaction from people using the app (such as a mouse click)
			  // (2) it is a bad experience to be continually prompted to login upon page load.
			  FB.login();
			} else {
			  // In this case, the person is not logged into Facebook, so we call the login() 
			  // function to prompt them to do so. Note that at this stage there is no indication
			  // of whether they are logged into the app. If they aren't then they'll see the Login
			  // dialog right after they log in to Facebook. 
			  // The same caveats as above apply to the FB.login() call here.
			  FB.login();
			}
		});

		FB.getLoginStatus(function(response) {
			  if (response.status === 'connected') {
			    // the user is logged in and has authenticated your
			    // app, and response.authResponse supplies
			    // the user's ID, a valid access token, a signed
			    // request, and the time the access token 
			    // and signed request each expire
			    var uid = response.authResponse.userID;
			    var accessToken = response.authResponse.accessToken;
			    logIn(uid,accessToken);
			  } else if (response.status === 'not_authorized') {
			    // the user is logged in to Facebook, 
			    // but has not authenticated your app
			    FB.login();
			  } else {
			    // the user isn't logged in to Facebook.
			  }
		});
	};

	// Load the SDK asynchronously
    (function(d){
	   var js, id = 'facebook-jssdk',
	   ref = d.getElementsByTagName('script')[0];
	   if (d.getElementById(id)) {return;}
	   js = d.createElement('script');
	   js.id = id;
	   js.async = true;
	   js.src = "http://connect.facebook.net/en_US/all.js";
	   ref.parentNode.insertBefore(js, ref);
	}(document));

	// Load the SDK asynchronously
	(function(){
	    // If we've already installed the SDK, we're done
	    if (document.getElementById('facebook-jssdk')) {return;}

	    // Get the first script element, which we'll use to find the parent node
	    var firstScriptElement = document.getElementsByTagName('script')[0];

	    // Create a new script element and set its id
	    var facebookJS = document.createElement('script'); 
	    facebookJS.id = 'facebook-jssdk';

	    // Set the new script's source to the source of the Facebook JS SDK
	    facebookJS.src = '//connect.facebook.net/en_US/all.js';

	    // Insert the Facebook JS SDK into the DOM
	    firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
	}());

	  // Here we run a very simple test of the Graph API after login is successful. 
	  // This testAPI() function is only called in those cases. 
	function testAPI() {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
		  console.log('Good to see you, ' + response.name + '.');
		});
	}

	function logIn(uid, accessToken) {

	  	var formData = {logInFrom:"Facebook", id:uid};

		$.post("../API_Server/logIn.php",formData,function(data){	

			if(data['success']) {
            	// do successful things
            	window.location.href = "mainMenu.php";
        	} else {
            	// create new account
            	window.location.href = "newUser.html";
        	}

		}, "json");

	}

	var newHeight = $("#logInSection").height()*1.6;
	$("#headerIndex").css({
		'height':newHeight + 'px',
	});
		
	/*\
	|*|				:: >> Authenticate User After Login << ::
	|*|
	|*|		# add a click listener to the submit button associated 
	|*|			with the log in form (not the create account form)
	|*|		# make an ajax request that sends the form data to 
	|*|			logIn.php for authentication
	|*|		# if it is authenticated (i.e., success) the page will 
	|*|			be redirected to the mainMenu.html page
	|*|		# otherwise an alert will go off and form submission will 
	|*|			be aborted
	|*|
	\*/
	
	$("#logInButton").click(function(e) {
		var username = $("#user").val();
		var password = $("#password").val();

		var formData = {pass: password, user: username};

		$.post("../API_Server/logIn.php",formData,function(data){

			if(data['success']) {
            	// do successful things
            	window.location.href = "mainMenu.php";
        	} else {
            	// do failure things
            	alert("Username or Password is Invalid!");
        	}
		},"json");

		e.preventDefault();

	});

	// $("#resetPassword").click(function (e) {
	// 	window.location.href= "passwordReset.php";
	// })

	$("#createAccount").submit(function (e) {

		var fname = $("#firstName").val();
		var lname = $("#lastName").val();
		var Email = $("#email").val();
		var username = $("#username").val();
		var newpwd = $("#newPassword").val();
		var SecurityQuestion = $("#securityQuestion").val();
		var SecurityAnswer = $("#securityAnswer").val();
		var gender = null;
		var passCheck = $("#passwordCheck").val();

		if ($('input[name="gender"]:checked'))
			gender = $('input[name="gender"]:checked').val();

		var Grade = $("#grade").val();

		formData = {
			'fname':fname,
			'lname':lname,
			'Email':Email,
			'username':username,
			'newpwd':newpwd,
			'gender':gender,
			'Grade':Grade,
			'SecurityAnswer':SecurityAnswer,
			'SecurityQuestion':SecurityQuestion
		};

		if (newpwd !== passCheck) {

			alert("You passwords do no match!");

		} else {

			$.post("../API_Server/createAccount.php",formData, function(data) {

				if (data['success'] === 'username') {
					// do failure things
	            	alert("That username is already in use!");

	        	} else if (data['success'] === 'email') {
	            	// do failure things
	            	alert("That email is already in use!");

	        	} else {
	        		// do successful things
	            	window.location.href = "mainMenu.php";
	        	}

			},"json");

		}

		e.preventDefault();
		
	});

});

// window.fbAsyncInit = function() {
// 	FB.init({
// 		appId      : '1473724932853450', // App ID
// 		channelUrl : '//54.200.66.93/Quizard-Quest/Website/channel.php', // Channel File
// 		status     : true, // check login status
// 		cookie     : true, // enable cookies to allow the server to access the session
// 		xfbml      : true  // parse XFBML
// 	});

// 	// Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
// 	// for any authentication related change, such as login, logout or session refresh. This means that
// 	// whenever someone who was previously logged out tries to log in again, the correct case below 
// 	// will be handled. 
// 	FB.Event.subscribe('auth.authResponseChange', function(response) {
// 		// Here we specify what we do with the response anytime this event occurs. 
// 		if (response.status === 'connected') {
// 		  // The response object is returned with a status field that lets the app know the current
// 		  // login status of the person. In this case, we're handling the situation where they 
// 		  // have logged in to the app.
// 		  testAPI();
// 		} else if (response.status === 'not_authorized') {
// 		  // In this case, the person is logged into Facebook, but not into the app, so we call
// 		  // FB.login() to prompt them to do so. 
// 		  // In real-life usage, you wouldn't want to immediately prompt someone to login 
// 		  // like this, for two reasons:
// 		  // (1) JavaScript created popup windows are blocked by most browsers unless they 
// 		  // result from direct interaction from people using the app (such as a mouse click)
// 		  // (2) it is a bad experience to be continually prompted to login upon page load.
// 		  FB.login();
// 		} else {
// 		  // In this case, the person is not logged into Facebook, so we call the login() 
// 		  // function to prompt them to do so. Note that at this stage there is no indication
// 		  // of whether they are logged into the app. If they aren't then they'll see the Login
// 		  // dialog right after they log in to Facebook. 
// 		  // The same caveats as above apply to the FB.login() call here.
// 		  FB.login();
// 		}
// 	});
// };

// // Load the SDK asynchronously
// (function(d){
// 	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
// 	if (d.getElementById(id)) {
// 		return;
// 	}
// 	js = d.createElement('script'); js.id = id; js.async = true;
// 	js.src = "http://connect.facebook.net/en_US/all.js";
// 	ref.parentNode.insertBefore(js, ref);
// }(document));

// // Here we run a very simple test of the Graph API after login is successful. 
// // This testAPI() function is only called in those cases. 
// function testAPI() {
// 	console.log('Welcome!  Fetching your information.... ');
// 	FB.api('/me', function(response) {
//   		console.log('Good to see you, ' + response.name + '.');
// 	});
// }
