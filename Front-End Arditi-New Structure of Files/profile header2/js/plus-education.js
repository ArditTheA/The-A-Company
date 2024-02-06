var plus_eduaction = document.querySelector(".second-add-education-button");
var educationUnderBg = document.querySelector(".bg-add-and-edit");
var bg_edit_edu = document.querySelector(".bg-add-education-edit");

plus_eduaction.addEventListener('click', function() {

    bg_edit_edu.style.display = "flex";
    educationUnderBg.style.display = "flex";
});