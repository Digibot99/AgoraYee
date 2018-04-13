// function submitItem(){
//   console.log("I want to submit an item");
//   $.ajax({
//     url: "/submitItem",
//     type: "POST",
//     data: {name:$("#objName").val(), price:$("#objPrice").val(), desc:$("#objDesc").val(), img:$("#currImg").attr("src")},
//     success: function(data){
//       if (!data)
//         alert("ERROR");
//       else{
//         $("#objName").val("");
//         $("#objPrice").val("");
//         $("#objDesc").val("");
//         alert("SUBMIT VALID");
//       }
//     } ,
//     dataType: "json"
//   });
//   return false;
// }

function testFunc(){
  console.log($("#currImg").attr('src'));
}
let tempSrc;
function previewFile(){
       var preview = document.getElementById('currImg') //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();
       tempSrc = "/images/" + file.name;
       // console.log(file.name);

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }

  $(document).ready(
    function()
    {
      $("form").submit(function(event){
        console.log("The path fiel is = " + tempSrc);
        if($("#fileStuff").val() == ""){
          alert("Insert an Img");
          return false;
        }
        $.ajax({
          url: "/submitItem",
          type: "POST",
          //add a path data to the img
          data: {name:$("#objName").val(),
                price:$("#objPrice").val(),
                desc:$("#objDesc").val(),
                img:tempSrc,
                category:$("#objCategory").val()},
          success: function(data){
            if (!data){
              alert("ERROR SUBMIT");
              }else{
              alert("SUBMIT VALID");
            }
          } ,
          dataType: "json"
        });
        $.ajax({
          url: "/addUserSellItem",
          type: "POST",
          //add a path data to the img
          data: {name:$("#objName").val(),
                price:$("#objPrice").val(),
                desc:$("#objDesc").val(),
                img:tempSrc,
                category:$("#objCategory").val()},
          success: function(data){
            if (!data){
              alert("ERROR SUBMIT USER");
              }else{
                console.log("SUBMIT USER VALID");
              // alert("SUBMIT VALID");
            }
          } ,
          dataType: "json"
        });
      });
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
    });
