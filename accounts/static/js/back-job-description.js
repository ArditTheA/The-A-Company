var back_button = document.querySelector('.back-button-description');
var next_none = document.querySelectorAll('.next-none');
var second_next_none = document.querySelectorAll('.second-next-none');
var main_conatiner = document.querySelector('.register-form');
var back_button_additional_feauters = document.querySelector(".back-button-additional-feauters");
var third_next_none_buttons = document.querySelector(".third-next-none-buttons");
var third_next_none = document.querySelectorAll(".third-next-none");
var buttons = document.querySelector(".back-submit-buttons");

for (let i = 0; i < next_none.length; i++) {

back_button.addEventListener('click', function() {

    next_none[i].style.display = "block";

    second_next_none[i].style.display = "none";

    main_conatiner.style.width = "450px";

});

};

for (let i = 0; i < next_none.length; i++) {

    back_button_additional_feauters.addEventListener('click', function() {

        second_next_none[i].style.display = "block";
        buttons.style.display ="flex";

        third_next_none[i].style.display = "none";

        third_next_none_buttons.style.display = "none";

        main_conatiner.style.width = "100%";


    });

    };