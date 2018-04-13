
$(document).ready(function(){

//add or modify.  Do a get request on /userInfo to get user session data
//                about the currently logged in user.  Use that data to
//                modify the DOM to personalize the session.
	$.ajax({
		url: "/userInfo",
		type: "GET",
		success: function(data){
			console.log("Sucess Function");
      console.log(data);
			if (!data || data == undefined){
				console.log("I am not in the change of info.");
				alert("ERROR");
			}
			else
			{
        console.log("I am changing the info");
				console.log(data.name);
        document.getElementById("username").innerHTML = data.name;
				// info.value = data.name;
			}
		},
		dataType: "json"
	});
	// $.get('/userInfo', successSubmit());
  // function successSubmit(data){
  // 	console.log("Sucess Function");
  // 	console.log(data);
  // 				if (!data){
  // 					console.log("I am not in the change of info.");
  // 					alert("ERROR");
  // 				}
  // 				else
  // 				{
  // 					console.log(data.name);
  // 					info = data.name;
  // 				}
  // 			}

// document.getElementById("username").innerHTML = info;
//add or modify.  Call logoutClicked when logout button is pressed.
});
