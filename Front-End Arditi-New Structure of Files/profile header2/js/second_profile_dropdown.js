var dropdown = document.querySelector(".dropdown");
var work_and_travel_dropdown = document.querySelectorAll(".dropdown-work-and-travel");
var profile = document.querySelector("#profile-image-button");
var workAndTravelButton = document.querySelectorAll('.button-work-and-travel');
var mutual_button_div = document.querySelectorAll('.mutual-padding-of-div');
var jobs_buttons_icon = document.querySelectorAll('.icon');
var jobs_buttons_white_icon = document.querySelectorAll('.white-icon');
var show_dropdown = document.querySelectorAll('.showDropdown');
var button_content = document.querySelectorAll('.button-content');
var mainButtonsDiv = document.querySelectorAll('.jobs-button-dropdown');

for (let i = 0; i < mainButtonsDiv.length; i++) {

mainButtonsDiv[i].addEventListener('click', function() {

    mainButtonsDiv[i].style.backgroundColor = "#1877F2";
    mainButtonsDiv[i].style.color = "white";
    jobs_buttons_white_icon[i].style.display = "block";

    $(mainButtonsDiv[i]).siblings().css("background-color", "white");
    $(mainButtonsDiv[i]).siblings().css("color", "#65676B");

});


};

