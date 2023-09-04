

    var password = document.getElementById("password");
    var togglePassword = document.getElementById("togglePassword");
    togglePassword.addEventListener("click", function() {

        if (password.type === "password") {
          password.type = "text";
        }
        else {
          password.type = "password";
        }

        this.classList.toggle("bi-eye");
  });

