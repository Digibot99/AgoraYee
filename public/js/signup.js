


  		function userClicked(){

//add or modify.  Add a post request on path /signup.  Pass the needed data
//                to the server and have the success callback either say
//                signup is bad or redirect to /session.
        if($('#password').val() == $('#passwordCheck').val())
        {
          $.ajax({
            url: "/signup",
            type: "POST",
            data: {password:$("#password").val() , userName:$("#username").val()},
            success: function(data){
              if (!data)
                alert("ERROR");
              else
                window.location = data.redirect;
            },
            dataType: "json"
          });
        }
        else {
          alert("Error: Passwords do not match");
        }
    			return false;
    		}


  		$(document).ready(function(){
        $("#submit").click(userClicked);
//add or modify.  Add code to call userClicked() when enter key is pressed
//                for username and password text input.


  		});
