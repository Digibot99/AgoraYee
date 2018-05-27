
$(document).ready(function(){

	$.get("/userInfo",function(data){
		if(data != null)
			if (data.username){
				$("#username").attr('href' , "account");
				$("#username").html( data.username);
			}
	});
});
