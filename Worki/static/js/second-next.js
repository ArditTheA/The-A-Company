var next_Button = document.querySelector('.next-button');
var next_none = document.querySelectorAll('.next-none');
var second_next_none = document.querySelectorAll('.second-next-none');
var main_conatiner = document.querySelector('.register-form');

for (let i = 0; i < next_none.length; i++) {

next_Button.addEventListener('click', function() {

    next_none[i].style.display = "none";

    second_next_none[i].style.display = "block";

    main_conatiner.style.width = "100%";
});

};