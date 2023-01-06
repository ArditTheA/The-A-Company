var plus_languages = document.querySelector(".second-add-languages-button");
var languagesmainDiv = document.querySelector(".bg-add-and-edit");
var languagesUnderBg = document.querySelector(".add-languages-second");
var exitButton = document.querySelector(".exit-button-second-add-languages");

plus_languages.addEventListener('click', function() {

languagesmainDiv.style.display = "flex";
languagesUnderBg.style.display = "flex";
    
})

exitButton.addEventListener('click', function() {
    languagesmainDiv.style.display = "none";

})

window.addEventListener('click', function(event) {
    if (event.target == languagesmainDiv) {
        languagesmainDiv.style.display = "none";
    }
});

