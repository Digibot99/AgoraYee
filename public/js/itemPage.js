function buttonClicked(){
  console.log($('#price').val());

  $.ajax({
    url: "/addUserItem",
    type: "POST",
    data: {name:$("#name").val()},
    success: function(data){
      if(!data)
        alert("NOT ADDED TO CART");
      else{
        alert("ADDED TO CART");
      }
    },
    dataType: "json"
  });
}

$(document).ready(function(){
  $.get("/searchName",function(data){
    if(!data)
      alert("ERROR LOAD");
    else{
      // alert("LOADING ITEM");
      console.log(data.name + " ++ " + data.price + " ++ " + data.desc);
      $("#name").html(data.name);
      $("#price").html(data.price);
      $("#desc").html(data.desc);
      $("#image").attr("src",data.img);
    }
  });


  $.get("/userInfo",function(data){
		if (data.username)
			$("#username").html( data.username);
	});
  $('#butn').click(buttonClicked);
});
