

    var password = document.getElementById("password");
    var togglePassword = document.getElementById("togglePassword");
     var pass1 = document.getElementsByClassName("bi-eye");
    togglePassword.addEventListener("click", function() {

    if (password.type === "password") {
      password.type = "text";

    } 
    else {
      password.type = "password";
      
    }

    this.classList.toggle("bi-eye");
    togglePassword.title = "Hide Password";

  });