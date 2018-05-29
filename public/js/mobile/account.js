function logoutClicked() {
	$.ajax({
		url: "/logout",
		type: "GET",
		success: function(data) {
			console.log("Sucess Function");
			console.log(data);
			if (!data || data == undefined) {
				console.log("I am not logging out.");
				alert("ERROR");
			} else {
				console.log("I am logging out");
				window.location = data.redirect;
			}
		},
		dataType: "json"
	});
}

function addItemClicked() {
	window.location = "../addItem";
}
$(document).ready(function() {
	$.ajax({
		url: "/userInfo",
		type: "GET",
		success: function(data) {
			console.log("Sucess Function");
			console.log(data);
			if (!data || data == undefined) {
				console.log("I am not in the change of info.");
				alert("ERROR");
			} else {
				console.log("I am changing the info");
				console.log(data.username);
				$("#name").html(data.username + "\'s account page");
			}
		},
		dataType: "json"
	});
	////////
	$("#logout").click(logoutClicked);
	$("#addItem").click(addItemClicked);
});
