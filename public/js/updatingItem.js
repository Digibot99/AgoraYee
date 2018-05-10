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
          else if(data.name)
          {
            console.log("I am changing the info");
            console.log(data.name);
            document.getElementById("username").innerHTML = data.name + "\'s account page";
            // info.value = data.name;
          }
          else if(data.redirect)
          {
            document.getElementById("name").innerHTML = "Login";
            $('#username').attr("href",data.redirect);
          }
        },
        dataType: "json"
      });
      $.ajax({
          url: "/getCurrentItemInfo",
          type: "GET",
          success: function(data){
            if (!data){
              alert("ERROR");
              }else{
              $("#objName").val(data.name);
              $("#objPrice").val(data.price);
              $("#objDesc").val(data.desc);
              $("#objCategory").val(data.category).prop("selected",true);
              $("#currImg").attr("src",data.img);
            }
          } ,
          dataType: "json"
        });


      $("form").submit(function(event){

          $("form").submit(function(event){
            if ($("#objName").val().includes("script>")){
              var objName = $("#objName").val();
              for (var i = 0; i < objName.length; i++) {
                if (objName.charAt(i) == '<')
                {
                  alert("ERROR SUBMIT");
                  return false;
                }
              }
            }else {
              var objName = $("#objName").val();
            }

            if ($("#objDesc").val().includes("script>")){
              var objDesc = $("#objDesc").val();
              for (var i = 0; i < objDesc.length; i++) {
                if (objDesc.charAt(i) == '<')
                {
                  alert("ERROR SUBMIT");
                  return false;
                }
              }
            }else {
              var objDesc = $("#objDesc").val();
            }

        console.log("The path fiel is = " + tempSrc);
        $.ajax({
          url: "/updateItem",
          type: "POST",
          //add a path data to the img
          data: {name:objName, price:$("#objPrice").val(), desc:objDesc, img:tempSrc},
          success: function(data){
            if (!data){
              alert("ERROR UPDATE");
              }else{
              alert("UPDATE VALID");
            }
          } ,
          dataType: "json"
        });
      });
    });
});
