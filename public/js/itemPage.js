if (isMobileDevice()) {
  window.location.href = window.location + "/mobile";
}

function buttonClicked() {
  console.log("The objects price is " + $('#price').val());
  console.log("The objects name is " + $('#name').val());
  $.ajax({
    url: "/addUserItem",
    type: "POST",
    data: {
      name: $("#name").val(),
      img: $("#image").attr("src"),
      price: $("#price").val(),
      desc: $("#desc").val()
    },
    success: function(data) {
      if (!data)
        alert("NOT ADDED TO CART");
      else {
        console.log("data.image = " + data.image);
        alert("ADDED TO CART");
      }
    },
    dataType: "json"
  });
}

function updatebuttonClicked() {

  $.ajax({
    url: "/updateItem",
    type: "POST",
    data: {
      name: $("#name").val(),
      price: $("#price").val(),
      desc: $("#desc").val()
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

$(document).ready(function() {
  $.get("/searchName", function(data) {
    if (!data)
      alert("ERROR LOAD");
    else {
      // alert("LOADING ITEM");
      console.log(data.name + " ++ " + data.price + " ++ " + data.desc);
      $("#name").html(data.name);
      $("#price").html(data.price);
      $("#desc").html(data.desc);
      $("#name").val(data.name);
      $("#price").val(data.price);
      $("#desc").val(data.desc);
      $("#image").attr("src", data.img);
      $("#title").html(data.name);
      $("#title").val(data.name);
      console.log("Inside searchName name " + $("#name").val());
      console.log("Inside searchName image src = " + $("#image").attr(
        "src") + " image val = " + $("#image").val());
    }
  });


  $.get("/userInfo", function(data) {
    if (data != null) {
      if (data.username) {
        $("#username").attr('href', "../account");
        $("#username").html(data.username);
      }
    }
  });
  $('#addbutn').click(buttonClicked);
});
