let tempSrc;

function previewFile() {
  var preview = document.getElementById('currImg') //selects the query named img
  var file = document.querySelector('input[type=file]').files[0]; //sames as here
  var reader = new FileReader();
  tempSrc = "/public/images/" + file.name;

  reader.onloadend = function() {
    if (!tempSrc.includes(".png") && !tempSrc.includes(".jpg") && !tempSrc.includes(
        ".tif") && !tempSrc.includes(".gif")) {
      preview.src = "/images/blankObject.png";
    } else {
      preview.src = reader.result;
    }
  }
  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
  } else {
    preview.src = "";
  }
}

$(document).ready(
  function() {
    $("form").submit(function(event) {
      if ($("#objName").val().includes("script>")) {
        var objName = $("#objName").val();
        for (var i = 0; i < objName.length; i++) {
          if (objName.charAt(i) == '<') {
            alert("ERROR SUBMIT");
            return false;
          }
        }
      } else {
        var objName = $("#objName").val();
      }

      if ($("#objDesc").val().includes("script>")) {
        var objDesc = $("#objDesc").val();
        for (var i = 0; i < objDesc.length; i++) {
          if (objDesc.charAt(i) == '<') {
            alert("ERROR SUBMIT");
            return false;
          }
        }
      } else {
        var objDesc = $("#objDesc").val();
      }

      console.log("The path file is = " + tempSrc);
      if ($("#fileStuff").val() == "") {
        alert("Insert an Img");
        return false;
      }
      $.ajax({
        url: "/submitItem",
        type: "POST",
        //add a path data to the img
        data: {
          name: objName,
          price: $("#objPrice").val(),
          desc: objDesc,
          img: tempSrc,
          category: $("#objCategory").val()
        },
        success: function(data) {
          if (!data) {
            alert("ERROR SUBMIT");
          } else {
            alert("SUBMIT VALID");
          }
        },
        dataType: "json"
      });
      $.ajax({
        url: "/addUserSellItem",
        type: "POST",
        //add a path data to the img
        data: {
          name: objName,
          price: $("#objPrice").val(),
          desc: objDesc,
          img: tempSrc,
          category: $("#objCategory").val()
        },
        success: function(data) {
          if (!data) {
            alert("ERROR SUBMIT USER");
          } else {
            console.log("SUBMIT USER VALID");
            // alert("SUBMIT VALID");
          }
        },
        dataType: "json"
      });
    });
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
          document.getElementById("username").innerHTML = data.username;
          // info.value = data.name;
        }
      },
      dataType: "json"
    });
  });

