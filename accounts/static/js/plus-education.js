var plus_eduaction = document.querySelector(".second-add-education-button");
var educationmainDiv = document.querySelector(".bg-add-and-edit");
var educationUnderBg = document.querySelector(".add-education-second");
var exitButtonEduc = document.querySelector(".exit-button-second-add-education");

plus_eduaction.addEventListener('click', function() {

educationmainDiv.style.display = "flex";
educationUnderBg.style.display = "flex";
    
})

exitButtonEduc.addEventListener('click', function() {
    educationmainDiv.style.display = "none";

})

window.addEventListener('click', function(event) {
    if (event.target == educationmainDiv) {
        educationmainDiv.style.display = "none";
    }
});
