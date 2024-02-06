const dropdown_all_applicants = document.querySelectorAll(".all-applicants-dropdown");
const input_form_all_applicants = document.querySelectorAll(".input-form");
const all_checkbox_jobs = Array.from(document.querySelectorAll(".checkbox-jobs"));
const main_input_form = document.querySelectorAll('.main-input-form');
const label_all = document.querySelector(".label-all");

for (let i = 0; i < dropdown_all_applicants.length; i++) {
input_form_all_applicants[i].addEventListener("click", function() {
    if (dropdown_all_applicants[i].style.display == "flex") {
        dropdown_all_applicants[i].style.display = "none";
    }
    else {
       dropdown_all_applicants[i].style.display = "flex";

    }
 })

document.addEventListener('click', function(e) {
    var isCheckboxClicked = all_checkbox_jobs.some(function(checkbox) {
        return checkbox.contains(e.target);
    });

    if (!dropdown_all_applicants[i].contains(e.target) && !main_input_form[i].contains(e.target) && !isCheckboxClicked && !label_all.contains(e.target)) {
        dropdown_all_applicants[i].style.display = 'none';
    }
});
}