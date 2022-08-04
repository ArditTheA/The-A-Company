/*var exitButton = document.querySelector(".exit-button-profile-picture");
var modalBg = document.querySelector(".edit-profile-bg");
var exitB = document.querySelector(".exit-button-edit-profile");
;
var exitBtn = document.querySelector(".exit-button");
var x = document.querySelector(".bg-add-and-edit");

var exitButtonProfileP = document.querySelector(".exit-img-profile-picture");
var bgChangeProfilePicture = document.querySelector(".bg-change-profile-picture");


exitButtonProfileP.addEventListener('click', function() {
    bgChangeProfilePicture.style.display = "none";
});

exitB.addEventListener('click', function() {
    modalBg.style.display = "none";
});

exitBtn.addEventListener('click', function() {
    x.style.display = "none";
}) */

var exitButton = document.querySelectorAll(".exit-button");

for (let i = 0; i < exitButton.length; i++){
    exitButton[i].addEventListener('click', function(){
        exitButton[i].parentElement.parentElement.parentElement.parentElement.style.display = "none";
    });
};
