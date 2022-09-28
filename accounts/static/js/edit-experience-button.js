var bgEditExperience = document.querySelector(".bg-edit-experience");
var bg_exp = document.querySelector(".bg-exp");

window.addEventListener('click', function(event) {
    if (event.target == bg_exp) {
        bg_exp.style.display = "none";
    }
});

