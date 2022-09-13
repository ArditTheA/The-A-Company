var search_button = document.querySelector('.search-icon-jobs');
var search_div = document.querySelector('.search-input');

search_button.addEventListener('click', function() {
    console.log(search_button);
    search_div.style.display = "block";
    search_button.style.display = "none";
});

// window.addEventListener('click', function(event) {
//     if (event.target == search_div) {
//         search_div.style.display = "none";
//         search_button.style.display = "block";
//         }
// });
