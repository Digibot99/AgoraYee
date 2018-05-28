if (isMobileDevice()) {
	window.location.href = window.location + "/mobile";
}


function buttonClicked() {
	console.log($('#price').val());


	$.ajax({
		url: "/addUserItem",
		type: "POST",
		data: {
			name: "Football",
			img: "/public/images/waifu1",
			price: 9.99,
			dsc: "Hello"
		},
		success: function(data) {
			if (!data)
				alert("NOT ADDED TO CART");
			else {
				alert("ADDED TO CART");
			}
		},
		dataType: "json"
	});
}

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
				if (isMobileDevice()) {
					window.location.href = data.redirect + "/mobile";
				} else {
					window.location = data.redirect;
				}
			}
		},
		dataType: "json"
	});
}

function addItemClicked() {
	window.location = "addItem";
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
				$("#name").html(data.username + " account page");
			}
		},
		dataType: "json"
	});
	////////
	$("#logout").click(logoutClicked);
	$("#addItem").click(addItemClicked);
});
