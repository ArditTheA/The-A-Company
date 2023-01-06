var plus_experience = document.querySelector(".second-add-experience-button");
var experiencemainDiv = document.querySelector(".bg-add-and-edit");
var experienceUnderBg = document.querySelector(".add-experience-second");
var exitButtonExp = document.querySelector(".exit-button-second-add-experience");

plus_experience.addEventListener('click', function() {

experiencemainDiv.style.display = "flex";
experienceUnderBg.style.display = "flex";
})

exitButtonExp.addEventListener('click', function() {
    experiencemainDiv.style.display = "none";

})

window.addEventListener('click', function(event) {
    if (event.target == experiencemainDiv) {
        experiencemainDiv.style.display = "none";
    }
});
