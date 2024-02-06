var search_button = document.querySelector('.search-icon-jobs');
var search_div = document.querySelector('.search-input');
var search_div = document.querySelector('.search-input');
var third_question = document.querySelector(".screening-questions-third-question-div")
var exit_input = document.querySelector('.input-exit-button');
var inputForm = document.querySelectorAll('.input-form');
var second_input = document.querySelector('.second-input-form');
var y = document.querySelectorAll('.selectOptions');
var inputForm = document.querySelectorAll('.input-form');
var second_input = document.querySelector('.second-input-form');
var img_search = document.querySelector('.search-icon-jobs');
var exit_third_question = document.querySelector(".exit-third-question");
var add_question_button = document.querySelector(".input-add-question-button");


search_div.addEventListener('click', function () {
   // console.log(search_button);
    third_question.style.display = "block";
    // search_div.focus();
    search_div.style.display = "none";
    exit_input.style.display = "none";

    // search_button.style.display = "none";
});

add_question_button.addEventListener('click', function () {
    // console.log(search_button);\
    
     third_question.style.display = "block";
     // search_div.focus();
     search_div.style.display = "none";
     exit_input.style.display = "none";
 
     // search_button.style.display = "none";
 });
 

// document.addEventListener('click', function (e) {
//     if (!search_div.contains(e.target) && !search_button.contains(e.target)) {
//         search_div.style.display = "none";
//         search_button.style.display = "block";
//         exit_input.style.display = "none";
//     }
// });


// window.addEventListener('click', function(event) {
//     if (event.target == search_div) {
//         search_div.style.display = "none";
//         search_button.style.display = "block";
//         }
// });

exit_third_question.addEventListener('click', function () {
    third_question.style.display = "none";
    search_div.style.display = "block";
    exit_input.style.display = "block";
    // search_button.style.display = "block";
})
