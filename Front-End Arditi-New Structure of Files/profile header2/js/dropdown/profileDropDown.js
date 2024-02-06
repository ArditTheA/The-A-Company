var dropdown = document.querySelectorAll(".profileDropDown");

var profile = document.querySelectorAll(".header-icon-profile");
var editDropdown = document.querySelectorAll(".edit_dropdown");


for (let i = 0; i < dropdown.length; i++) {
    profile[i].addEventListener("click", function() {
       if (dropdown[i].style.display == "block") {
          dropdown[i].style.display = "none";
       }
       else {
          dropdown[i].style.display = "block";
       }
    })
    document.addEventListener('click', function(e) {
       if (!dropdown[i].contains(e.target) && !profile[i].contains(e.target)) {
           dropdown[i].style.display = 'none';
       }
    });

}