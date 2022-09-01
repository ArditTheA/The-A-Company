var back_button = document.querySelector('.back-button-description');
var next_none = document.querySelectorAll('.next-none');
var second_next_none = document.querySelectorAll('.second-next-none');
var main_conatiner = document.querySelector('.register-form');

for (let i = 0; i < next_none.length; i++) {

back_button.addEventListener('click', function() {

    next_none[i].style.display = "block";

    second_next_none[i].style.display = "none";

    main_conatiner.style.width = "450px";


});

}; 