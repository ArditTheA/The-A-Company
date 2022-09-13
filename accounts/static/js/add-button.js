var addButton = document.querySelector("#plus-icon");
var bg_change_profile_picture = document.querySelector(".bg-change-profile-picture");
var exit_button = document.querySelector(".exit-button-profile-picture");

addButton.addEventListener("click", function() {
    bg_change_profile_picture.style.display = "flex";
});

window.addEventListener('click', function(event) {
    if (event.target == bg_change_profile_picture) {
        bg_change_profile_picture.style.display = "none";
    }
});

/*exit_button.addEventListener('click', function() {
    bg_change_profile_picture.style.display = "none";
}); */