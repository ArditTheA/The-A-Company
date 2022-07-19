var addButton = document.getElementById("plus-icon");
var editButton = document.getElementsByClassName("edit-button");
var modalBg = document.getElementsByClassName("edit-profile-bg");
var container = document.getElementsByClassName("container");
var change_profile_picture = document.getElementsByClassName("change-profile-picture");

addButton.addEventListener("click", function() {
    modalBg.style.display = "flex";
    container.style.display = "none";
});

editButton.addEventListener("click", function() {
  modalBg.style.display = "flex";
  change_profile_picture.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == modalBg) {
      modalBg.style.display = "none";
    }
}

