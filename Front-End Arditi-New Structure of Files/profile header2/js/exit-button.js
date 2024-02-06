var backButton = document.querySelectorAll(".back-input");
var backButtonDiv = document.querySelectorAll(".save-button");

    for (let i = 0; i < backButton.length; i++) {
    backButton[i].addEventListener("click", function() {
        backButtonDiv[i].parentElement.parentElement.parentElement.style.display = "none";
        document.body.style.overflow = "scroll";
    });
}