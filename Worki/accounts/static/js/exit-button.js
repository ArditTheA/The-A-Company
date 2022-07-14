var exitButton = document.querySelector(".exit-button-profile-picture");
var modalBg = document.querySelector(".edit-profile-bg");
;
var exitButtonProfileP = document.querySelector(".exit-img-profile-picture");
var bgChangeProfilePicture = document.querySelector(".bg-change-profile-picture");


exitButton.addEventListener('click', function() {
    modalBg.style.display = "none";
});


exitButtonProfileP.addEventListener('click', function() {
    bgChangeProfilePicture.style.display = "none";
});