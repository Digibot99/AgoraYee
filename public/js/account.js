
function logoutClicked(){
//add or modify.  Do a get request on /logout and have the callback
//                from the server redirect to /login.
	$.ajax({
		url: "/logout",
		type: "GET",
		success: function(data){
			console.log("Sucess Function");
			console.log(data);
			if (!data || data == undefined){
				console.log("I am not logging out.");
				alert("ERROR");
			}
			else
			{
				console.log("I am logging out");
				window.location = data.redirect;
			}
		},
		dataType: "json"
	});
}

function addItemClicked(){
	window.location = "addItem";
}
$(document).ready(function(){
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
        document.getElementById("name").innerHTML = data.name + " account page";
				// info.value = data.name;
			}
		},
		dataType: "json"
	});
		////////
		$("#logout").click(logoutClicked);
		$("#addItem").click(addItemClicked);
	});
