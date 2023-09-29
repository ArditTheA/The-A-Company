var password = document.getElementById("id_password");
var togglePassword = document.getElementById("togglePassword");
 var pass1 = document.getElementsByClassName("bi-eye");



function ShowOrHidePassword(){

    if (password.type === "password") {
        password.type = "text";
      
      } 
      else {
        password.type = "password";
        
      }
      
      this.classList.toggle("bi-eye");
      togglePassword.title = "Hide Password";
      
      
}