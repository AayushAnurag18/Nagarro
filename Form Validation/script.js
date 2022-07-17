$(document).ready(function () {
  $("#usernamevalidation").hide();
  $("#emailvalidation").hide();
  $("#passwordvalidation").hide();
  $("#confirmpasswordvalidation").hide();

  var Error = true;
  var email_error = true;
  var password_error = true;
  var confirmpassword_error = true;

  $("#username").keyup(function () {
    username_validation();
  });

  function username_validation() {
    var username_val = $("#username").val();
    if (username_val.length == "") {
      $("#usernamevalidation").show();
      $("#usernamevalidation").html("Username is required");
      $("#usernamevalidation").css("color", "red");
      Error = false;
      return false;
    } else {
      $("#usernamevalidation").hide();
      Error = true;
    }

    if (username_val.length < 3 || username_val.length > 20) {
      $("#usernamevalidation").show();
      $("#usernamevalidation").html(
        "Username should be between 3 and 20 characters"
      );
      $("#usernamevalidation").css("color", "red");
      Error = false;
      return false;
    } else {
      $("#usernamevalidation").hide();
      Error = true;
    }
  }

  $("#email").keyup(function () {
    email_validation();
  });
  function email_validation() {
    var email_val = $("#email").val();
    var emailregex = /^([\-\.0-9a-zA-Z]+)@([\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    if (emailregex.test(email_val)) {
      $("#emailvalidation").hide();
      email_error = true;
    } else {
      $("#emailvalidation").show();
      $("#emailvalidation").html("Invalid email");
      $("#emailvalidation").css("color", "red");
      email_error = false;
      return false;
    }
  }

  $("#password").keyup(function () {
    password_validation();
  });
  function password_validation() {
    var password_val = $("#password").val();
    if (password_val.length == "") {
      $("#passwordvalidation").show();
      $("#passwordvalidation").html("Password is required");
      $("#passwordvalidation").css("color", "red");
      Error = false;
      return false;
    } else {
      $("#passwordvalidation").hide();
      Error = true;
    }
    if (password_val.length < 8) {
      $("#passwordvalidation").show();
      $("#passwordvalidation").html("Password should be of 8 characters");
      $("#passwordvalidation").css("color", "red");
      Error = false;
      return false;
    } else {
      $("#passwordvalidation").hide();
      Error = true;
    }
  }

  $("#confirmpassword").keyup(function () {
    confirm_password();
  });
  function confirm_password() {
    var confirm_password_val = $("#confirmpassword").val();
    var password_val = $("#password").val();
    if (password_val != confirm_password_val) {
      $("#confirmpasswordvalidation").show();
      $("#confirmpasswordvalidation").html("Password does not match");
      $("#confirmpasswordvalidation").css("color", "red");
      Error = false;
      return false;
    } else {
      $("#confirmpasswordvalidation").hide();
      Error = true;
    }
  }

  $("#submitvalidation").click(function () {
    username_validation();
    email_validation();
    password_validation();
    confirm_password();
    if (
      Error == true &&
      email_error == true &&
      password_error == true &&
      confirmpassword_error == true
    ) {
      alert("Form submitted successfully");
    } else {
      alert("Form not submitted....Fill the required details");
    }
  });
});
