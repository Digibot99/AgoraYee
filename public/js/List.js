
function getCategory(){//edited
  console.log("I have loaded the page");

  $.ajax({
    url: "/getCategory",
    type: "GET",
    success: function(data){
      if(!data)
        alert("NO CATEGORY");
      else{
        // console.log(data);
        // currentCatg=data.category;
        // console.log("-------- " + currentCatg);
        $("#resHeading").html("Results for " + data.category);
        loadPage(data.category);
      }
    }
  });
  return false;
}

function getifSearched(){//edited
  $.ajax({
    url: "/getifSearched",
    type: "GET",
    success: function(data){
      if(!data)
        alert("NO CATEGORY");
      else{
        if(data.search){
          loadPage2(data.csearch);
        }
        else
          getCategory();

      }
    }
  });
  return false;
}

function loadPage2(curr){
 $.get("/getItemDB/" + curr,success);
}

function success(data){
  console.log(data);
  for(let i=0;i<data.length;i++){
     if(data[i] != null || data[i] != undefined){
        $("#list").append(
              "<input id='"+ data[i].name +"' class='tempImg' type='image' src= "+ data[i].img +" height='200' width='200' border='5' onClick='changeCurr(this)'/>"
              + "<p class='description'>"
              + "Name: " + data[i].name + "<br>"
              + "Price: $" + data[i].price + "<br>"
              + "Desc: " + data[i].desc
              + "</p><br>");
     }
  }
}

function loadPage(current){
  console.log("++++++++++++++ " + current);
  $.ajax({
    url: "/search",
    type: "GET",
    success: function(data){
      for(let i=0;i<data.length;i++){
        if(data[i] != null || data[i] != undefined){
          if(data[i].category == current){
            $("#list").append(
              "<input id='"+ data[i].name +"' class='tempImg' type='image' src= "+ data[i].img +" height='200' width='200' border='5' onClick='changeCurr(this)'/>"
              + "<p class='description'>"
              + "Name: " + data[i].name + "<br>"
              + "Price: $" + data[i].price + "<br>"
              + "Desc: " + data[i].desc
              + "</p><br>");
          }
        }
      }
    } ,
    dataType: "json"
  });
}

function changeCurr(e){
  // console.log($(e).attr("id"));
  let idClicked = $(e).attr("id");
  // console.log(idClicked);
  itemClicked(idClicked);
}
function itemClicked(name){
  //directs you to a certain image's route
  // alert("redirect me");
  window.location = "../itemPage/" + name;
}

$(document).ready(function(){
  $.get("/userInfo",function(data){
    if (data.username){
      $("#username").attr('href' , "../account");
      $("#username").html( data.username);
    }
  });
  getifSearched();
  // $('.tempImg').click(itemClicked);
});
