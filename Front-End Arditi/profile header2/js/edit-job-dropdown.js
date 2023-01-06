var second_dropdown = document.querySelectorAll(".edit_dropdown");
var work_and_travel_dropdown = document.querySelectorAll(".dropdown-work-and-travel");
var profile = document.querySelectorAll("#profile-image-button");
var work_and_travel_button = document.querySelectorAll('.button-work-and-travel');
var mutual_button_div = document.querySelectorAll('.mutual-padding-of-div');
var jobs_buttons_icon = document.querySelectorAll('.icon');
var jobs_buttons_white_icon = document.querySelectorAll('.white-icon')
var show_dropdown = document.querySelectorAll('.showDropdown');
var button_content = document.querySelectorAll('.button-content');
var editButton = document.querySelectorAll(".edit-job-button");
var JobsRowsImg = document.querySelectorAll(".jobs-rows-img");
for (let i = 0; i < second_dropdown.length; i++) {
editButton[i].addEventListener("click", function() {
   if (second_dropdown[i].style.display == "block") {
      second_dropdown[i].style.display = "none";

   }
   else {
        for(j = 0; j < second_dropdown.length; j++){
            second_dropdown[j].style.display = "none"
        }
      second_dropdown[i].style.display = "block";
     //   exitButton[i].parentElement.parentElement.parentElement.parentElement.style.display = "none";

   }
})
document.addEventListener('click', function(e) {
   if (!second_dropdown[i].contains(e.target) && !editButton[i].contains(e.target)) {
       second_dropdown[i].style.display = 'none';
   }

});    

}

for (let i = 0; i < second_dropdown.length; i++) {

    if (second_dropdown[i].style.display == "block") {
        $(second_dropdown[i]).siblings().css("display", "none");

    }
}

// for (let i = 0; i < mutual_button_div.length; i++) {
//    mutual_button_div[i].addEventListener('click', function() {
//    mutual_button_div[i].style.backgroundColor = "#1877F2";
//    mutual_button_div[i].style.color = "white";
//    $(mutual_button_div[i]).siblings().css("background-color", "white");
//    jobs_buttons_white_icon[i].style.display = "block";
//    });
// };