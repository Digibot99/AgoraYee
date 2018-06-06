if (isMobileDevice()) {
  window.location.href = window.location + "/mobile";
}
let tempSrc;
let width;
let ratio;

function previewFile() {
  var preview = document.getElementById('currImg') //selects the query named img
  var file = document.querySelector('input[type=file]').files[0]; //sames as here
  var reader = new FileReader();
  tempSrc = "/public/images/" + file.name;

  reader.onloadend = function() {
    if (!tempSrc.includes(".png") && !tempSrc.includes(".jpg") && !tempSrc.includes(
        ".tif") && !tempSrc.includes(".gif") && !tempSrc.includes(".jpeg")) {
      preview.src = "/images/blankObject.png";
    } else {
      preview.src = reader.result;
      ratio;
      if (preview.clientHeight / preview.clientWidth > 1) {
        ratio = preview.clientWidth / preview.clientHeight;
      } else {
        ratio = preview.clientHeight / preview.clientWidth;
      }
      width = preview.clientWidth;
      console.log(width);
      if (preview.clientWidth > 1000) {
        $("#currImg").attr('width', 1000 * ratio);
        width = preview.clientWidth * 1000 * ratio;
      } else if (preview.clientWidth < 500) {
        $("#currImg").attr('width', 500 * ratio);
        width = 500 * ratio;
      } else {
        $("#currImg").attr('width', preview.clientWidth * ratio);
        width = preview.clientWidth * ratio;
      }
      console.log(width);
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

      if (tempSrc.includes(" ")) {
        for (var i = 0; i < tempSrc.length; i++) {
          if (tempSrc.charAt(i) == ' ') {
            tempSrc.charAt(i) = '%';
            alert("hi");
            return false;
          }
        }
      }

      console.log("The path file is = " + tempSrc);
      if ($("#fileStuff").val() == "") {
        alert("Insert an Img");
        return false;
      }
      alert("here");
      $.ajax({
        url: "/submitItem",
        type: "POST",
        //add a path data to the img
        data: {
          name: objName,
          price: $("#objPrice").val(),
          desc: objDesc,
          img: tempSrc,
          category: $("#objCategory").val(),
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
