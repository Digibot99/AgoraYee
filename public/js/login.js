	function successSubmit(data){
		if(data != null){
			window.location = data.redirect;

		}
		else {
			alert("ERROR LOGIN");
		}
	}

	function submitClicked(){
		$.post('/login', {userName: $('#username').val() , password: $('#password').val()}, successSubmit);
	}
	function createClicked(){
		window.location = "signup";
	}

	$(document).ready(function(){
        $("#submit").click(submitClicked);
        $("#create").click(createClicked);
  	});
