// var dropdown_all_applicants = document.querySelector(".all-applicants-dropdown");
// var button_all_applicants = document.querySelector(".all-applicants-button");

// button_all_applicants.addEventListener('click', function () {
//     if (dropdown_all_applicants.style.display == "block") {
//         dropdown_all_applicants.style.display = "none";
//     }
//     else {
//         dropdown_all_applicants.style.display = "block";
//     }
//     document.addEventListener('click', function(e) {
//         if (!dropdown_all_applicants.contains(e.target) && !container_fluid.contains(e.target)) {
//             dropdown_all_applicants.style.display = 'none';
//         }
//     });

// });

var dropdown_all_applicants = document.querySelector("#applicants-dropdown");
var dropdown_all_my_jobs = document.querySelector(".all-my-jobs-dropdown");

var all_applicants = document.querySelector(".all-applicants-button");
var all__my_jobs = document.querySelector(".all-my-jobs-button");
var input_form_all_applicants = document.querySelector(".all-applicants-button-form");
var white_icon = document.querySelector(".div-white-icon");


input_form_all_applicants.addEventListener("click", function() {
    if (dropdown_all_applicants.style.display == "flex") {
        dropdown_all_applicants.style.display = "none";
    }
    else {
       dropdown_all_applicants.style.display = "flex";

    }
 })

 document.addEventListener('click', function(e) {

    if (!dropdown_all_applicants.contains(e.target) && !input_form_all_applicants.contains(e.target)) {
        dropdown_all_applicants.style.display = 'none';
   }

 });

//  input_form_all_applicants.addEventListener("click", function() {
//     if (dropdown_all_my_jobs.style.display == "flex") {
//         dropdown_all_my_jobs.style.display = "none";
//     }
//     else {
//        dropdown_all_my_jobs.style.display = "flex";

//     }
//  })

 document.addEventListener('click', function(e) {

    if (!dropdown_all_my_jobs.contains(e.target) && !input_form_all_applicants.contains(e.target)) {
        dropdown_all_my_jobs.style.display = 'none';
   }

 });
 