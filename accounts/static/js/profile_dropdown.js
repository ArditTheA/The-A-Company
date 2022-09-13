var dropdown = document.querySelector(".dropdown");
var work_and_travel_dropdown = document.querySelectorAll(".dropdown-work-and-travel");
var profile = document.querySelector("#profile-image-button");
var work_and_travel_button = document.querySelectorAll('.button-work-and-travel');
var mutual_button_div = document.querySelectorAll('.mutual-padding-of-div');
var jobs_buttons_icon = document.querySelectorAll('.icon');
var jobs_buttons_white_icon = document.querySelectorAll('.white-icon')
var show_dropdown = document.querySelectorAll('.showDropdown');
var button_content = document.querySelectorAll('.button-content');
profile.addEventListener("click", function() {
   dropdown.classList.toggle("showDropdown");
});

window.addEventListener('click', function(event) {
   if (event.target == dropdown) {
      dropdown.style.display = "none";
   }
});
for (let i = 0; i < work_and_travel_button.length; i++) {

   work_and_travel_button[i].addEventListener('click', function() {
   work_and_travel_dropdown[i].classList.toggle("showDropdown");
});
};

// for (let i = 0; i < mutual_button_div.length; i++) {
//    mutual_button_div[i].addEventListener('click', function() {
//    mutual_button_div[i].style.backgroundColor = "#1877F2";
//    mutual_button_div[i].style.color = "white";
//    $(mutual_button_div[i]).siblings().css("background-color", "white");
//    jobs_buttons_white_icon[i].style.display = "block";
//    });
// };