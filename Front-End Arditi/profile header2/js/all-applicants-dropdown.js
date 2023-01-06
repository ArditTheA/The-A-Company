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

var dropdown_all_applicants = document.querySelector(".all-applicants-dropdown");
var all_applicants = document.querySelector(".all-applicants-button");

all_applicants.addEventListener("click", function() {
    if (dropdown_all_applicants.style.display == "flex") {
       dropdown_all_applicants.style.display = "none";
    }
    else {
       dropdown_all_applicants.style.display = "flex";
    }
 })
 document.addEventListener('click', function(e) {
    if (!dropdown_all_applicants.contains(e.target) && !all_applicants.contains(e.target)) {
        dropdown_all_applicants.style.display = 'none';
    }

 });    
 
