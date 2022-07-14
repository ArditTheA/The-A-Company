var addButton = document.querySelector("#plus-icon");
var editButton = document.querySelector(".edit-button");
var modalBg = document.querySelector(".edit-profile-bg");
var container = document.querySelector(".container");
var change_profile_picture = document.querySelector(".change-profile-picture");

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

