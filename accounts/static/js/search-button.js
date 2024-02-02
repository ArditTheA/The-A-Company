var search_button = document.querySelector('.search-icon-jobs');
var search_div = document.querySelector('.search-input');
var exit_input = document.querySelector('.input-exit-button');
var inputForm = document.querySelectorAll('.input-form');
var second_input = document.querySelector('.second-input-form');
var y = document.querySelectorAll('.selectOptions');
var inputForm = document.querySelectorAll('.input-form');
var second_input = document.querySelector('.second-input-form');
var img_search = document.querySelector('.search-icon-jobs');


search_button.addEventListener('click', function () {
   // console.log(search_button);
    search_div.style.display = "block";
    exit_input.style.display = "block";
    search_div.focus();

    search_button.style.display = "none";
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

exit_input.addEventListener('click', function () {
    search_div.style.display = "none";
    exit_input.style.display = "none";
    $("#userSearchInput").val("");
    searchUsers();
    search_button.style.display = "block";
})
