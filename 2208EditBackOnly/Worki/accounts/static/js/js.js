var dropdown = document.querySelector(".dropdown");
var profile = document.querySelector("#profile-image-button");

profile.addEventListener("click", function() {
   dropdown.classList.toggle("showDropdown");
});
