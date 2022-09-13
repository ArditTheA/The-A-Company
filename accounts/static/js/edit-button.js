var editButton = document.querySelector(".edit-button");
var modalBg = document.querySelector(".edit-profile-bg");
var bg_change_profile_picture = document.querySelector(".bg-change-profile-picture");

editButton.addEventListener("click", function() {
    modalBg.style.display = "flex";
});

window.addEventListener('click', function(event) {
    if (event.target == modalBg) {
        modalBg.style.display = "none";
    }
});

                // OR //


/* window.onclick = function(event) {
    if (event.target == modalBg) {
      modalBg.style.display = "none";
    }
} */



                