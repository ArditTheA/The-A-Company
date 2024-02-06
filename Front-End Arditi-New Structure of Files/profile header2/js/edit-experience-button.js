var bgEditExperience = document.querySelector(".bg-edit-experience");
var bg_exp = document.querySelector(".bg-exp");
var bg_Edit_education = document.querySelector(".bg-edit-education");
var bg_edit_languages = document.querySelector(".bg-edit-languages");

window.addEventListener('click', function(event) {
    if (event.target == bgEditExperience) {
        window.location = "experience.html";
    }
});

window.addEventListener('click', function(event) {
    if (event.target == bg_Edit_education) {
        window.location = "education.html";
    }
});

window.addEventListener('click', function(event) {
    if (event.target == bg_edit_languages) {
        window.location = "languages.html";
    }
});

function backtoEditExpPage() {
    window.location.href = "experience.html";
}
function backtoEditEduPage() {
    window.location.href = "education.html";
}
function backtoEditLangPage() {
    window.location.href = "languages.html";
}




