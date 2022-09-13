var nextButton = document.querySelector('.submit-button');
var backButton = document.querySelector('.back-button-description');
var first_main_div = document.querySelector('.container-add-a-job');
var secondMainDiv = document.querySelector('.under-main-modal-bg');

nextButton.addEventListener('click', function() {
    first_main_div.style.display = "none";
    secondMainDiv.style.display = "block";
});

backButton.addEventListener('click', function() {
    secondMainDiv.style.display = "none";
    first_main_div.style.display = "flex";
});
