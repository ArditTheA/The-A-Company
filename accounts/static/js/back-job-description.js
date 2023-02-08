var back_button = document.querySelector('.back-button-description');
var next_none = document.querySelectorAll('.next-none');
var next_Button_2 = document.querySelector('.next-button');
var next_Button_desc = document.querySelector('.second-next-none-button');
var second_next_none = document.querySelectorAll('.second-next-none');
var main_conatiner = document.querySelector('.register-form');
var back_button_additional_feauters = document.querySelector(".back-button-additional-feauters");
var third_next_none_buttons = document.querySelector(".third-next-none-buttons");
var third_next_none = document.querySelectorAll(".third-next-none");
var back_button_screening_questions = document.querySelector(".back-button-screening-questions");
var fourth_next_none = document.querySelector(".fourth-next-none");

for (let i = 0; i < next_none.length; i++) {

back_button.addEventListener('click', function() {

    next_Button_2.removeAttribute("href");

    next_none[i].style.display = "block";

    second_next_none[i].style.display = "none";

    main_conatiner.style.width = "450px";


});

};

for (let i = 0; i < next_none.length; i++) {

    back_button_additional_feauters.addEventListener('click', function() {
        second_next_none[i].style.display = "block";

        third_next_none[i].style.display = "none";

        third_next_none_buttons.style.display = "none";

        main_conatiner.style.width = "100%";
        next_Button_desc.style.display = "flex";

        next_Button_2.removeAttribute("href");

    });

    };
    for (let i = 0; i < next_none.length; i++) {

        back_button_screening_questions.addEventListener('click', function() {
            third_next_none[i].style.display = "block";

            third_next_none_buttons.style.display = "flex";

            second_next_none[i].style.display = "none";

            fourth_next_none.style.display = "none";

            main_conatiner.style.width = "450px";

            third_next_none.style.width = "450px";



        });

        };



