var dropdown = document.querySelector(".dropdown");
var profile = document.querySelector("#profile-image-button");

profile.addEventListener("click", function() {
   dropdown.classList.toggle("showDropdown");
});

window.addEventListener('click', function(event) {
   if (event.target == dropdown) {
      dropdown.style.display = "none";
   }
});

