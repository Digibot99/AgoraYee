function loadList(obj){//edited
	$.ajax({
    url: "/setCategory",
    type: "POST",
    data: {spec:obj},
    success: function(data){
      if(!data)
        alert("ERROR LOAD LIST");
      else
        console.log("Good Load List");
    } ,
    dataType: "json"
  });
	Window.location = "List";
}

function check(obj){//edited
	// alert("I called it=" + $(obj).attr("id"));
	loadList($(obj).attr("id"));
}

$(document).ready(function(){

});