if (isMobileDevice()) {
  window.location.href = window.location + "/mobile";
}

function userClicked() {
  $.post("/login", {
    username: $("#username").val(),
    password: $("#psw").val()
  }, function(data) {
    if (isMobileDevice()) {
      window.location = "/";
    } else {
      window.location = data.redirect;
    }
  });

  return false;
}

function signupClicked() {
  if (isMobileDevice()) {
    window.location = 'signup/mobile'
  } else {
    window.location = "signup";
  }
}

$(document).ready(function() {

  $("#username").keydown(function(event) {
    if (event.which === 13) {
      userClicked();
      event.preventDefault();
      return false;
    }
  });

  $("#psw").keydown(function(event) {
    if (event.which === 13) {
      userClicked();
      event.preventDefault();
      return false;
    }
  });

  $("#login").click(userClicked);
});
