function addbuttonClicked() {

  $.ajax({
    url: "/addUserItem",
    type: "POST",
    data: {
      name: $("#name").val()
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
      $("#image").attr("src", data.img);
    }
  });

  $.get("/userInfo", function(data) {
    if (data != null) {
      if (data.username) {
        $("#username").attr('href', "../../../account");
        $("#username").html(data.username);
      }
    }
  });
  $('#addbutn').click(addbuttonClicked);
  $('#updatebutn').click(updatebuttonClicked);
});
