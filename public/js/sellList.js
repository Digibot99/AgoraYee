let idClicked;

function loadPage(){
  console.log("I have loaded the User Sell page");
  $.ajax({
    url: "/getUserSellItemList",
    type: "GET",
    success: function(data){
      for(let i=0;i<data.length;i++){
        if(data[i] != null || data[i] != undefined){
          $("#list").append(
            "<input id="+ data[i].name +" class='tempImg' type='image' src= "+ data[i].img +" height='200' width='200' border='5' onClick='changeCurr(this)'/>"
            + "<p class='description'>"
            + "Name: " + data[i].name + "<br>"
            + "Price: $" + data[i].price + "<br>"
            + "Desc: " + data[i].desc
            + "</p><br>");
        }
      }
    } ,
    dataType: "json"
  });
  return false;

}

function changeCurr(e){
  console.log($(e).attr("id"));
  idClicked = $(e).attr("id");
  console.log(idClicked);
  itemClicked();
}
function itemClicked(){
  //directs you to a certain image's route
  alert("redirect me");
  $.ajax({
    url: "/loadItem",
    type: "POST",
    data: {itemID:idClicked},
    success: function(data){
      if(!data)
        alert("ERROR LOAD");
      else
        console.log("Good Load");
    } ,
    dataType: "json"
  });
  window.location = "itemPage";
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
        document.getElementById("username").innerHTML = data.name;
        // info.value = data.name;
      }
    },
    dataType: "json"
  });
  loadPage();
  $('.tempImg').click(itemClicked);
});
