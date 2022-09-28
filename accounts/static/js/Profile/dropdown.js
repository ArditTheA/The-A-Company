var dropdown = document.querySelectorAll(".dropdown");
var work_and_travel_dropdown = document.querySelectorAll(".dropdown-work-and-travel");
var profile = document.querySelectorAll("#profile-image-button");
var work_and_travel_button = document.querySelectorAll('.button-work-and-travel');
var mutual_button_div = document.querySelectorAll('.mutual-padding-of-div');
var jobs_buttons_icon = document.querySelectorAll('.icon');
var jobs_buttons_white_icon = document.querySelectorAll('.white-icon')
var show_dropdown = document.querySelectorAll('.showDropdown');
var button_content = document.querySelectorAll('.button-content');
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

// for (let i = 0; i < mutual_button_div.length; i++) {
//    mutual_button_div[i].addEventListener('click', function() {
//    mutual_button_div[i].style.backgroundColor = "#1877F2";
//    mutual_button_div[i].style.color = "white";
//    $(mutual_button_div[i]).siblings().css("background-color", "white");
//    jobs_buttons_white_icon[i].style.display = "block";
//    });
// };