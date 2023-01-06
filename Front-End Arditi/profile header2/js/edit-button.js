var editButton = document.querySelector(".edit-button");
var modalBg = document.querySelector(".edit-profile-bg");
var bg_change_profile_picture = document.querySelector(".bg-change-profile-picture");

editButton.addEventListener("click", function() {
    modalBg.style.display = "flex";
    document.body.style.overflow = "hidden";
});

window.addEventListener('click', function(event) {
    if (event.target == modalBg) {
        modalBg.style.display = "none";
        document.body.style.overflow = "scroll";
    }
});




                // OR //


/* window.onclick = function(event) {
    if (event.target == modalBg) {
      modalBg.style.display = "none";
    }
} */



                