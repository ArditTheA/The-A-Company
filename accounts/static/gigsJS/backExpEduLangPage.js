var bgEditExperience = document.querySelector(".bg-edit-experience");
var bg_exp = document.querySelector(".bg-exp");
var bg_Edit_education = document.querySelector(".bg-edit-education");
var bg_edit_languages = document.querySelector(".bg-edit-languages");
var editExprienceUrl = "{% url 'editExprience' %}";
var editEduUrl = "{% url 'editEdu' %}";
var editLanguageUrl = "{% url 'editLanguage' %}";
window.addEventListener('click', function(event) {
    if (event.target == bgEditExperience) {
        window.location.href = editExprienceUrl;
    }
});

window.addEventListener('click', function(event) {
    if (event.target == bg_Edit_education) {
        window.location.href = "{% url 'editEdu' %}";
    }
});

window.addEventListener('click', function(event) {
    if (event.target == bg_edit_languages) {
        window.location.href = "{% url 'editLanguage' %}";
    }
});

function backtoEditExpPage() {
    window.location = "";
}
function backtoEditEduPage() {
    window.location.href = "{% url 'editEdu' %}";
}

function backtoEditLangPage() {
    window.location.href = "{% url 'editLanguage' %}";
}