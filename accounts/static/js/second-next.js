var next_Button = document.querySelector('.next-button');
var second_next_button = document.querySelector(".second-next-button");
var third_next_button = document.querySelector(".third-next-button");
var next_none = document.querySelectorAll('.next-none');
var second_next_none = document.querySelectorAll('.second-next-none');
var main_conatiner = document.querySelector('.register-form');
var third_next_none = document.querySelectorAll(".third-next-none");
var third_next_none_buttons = document.querySelector(".third-next-none-buttons");
var fourth_next_none = document.querySelector(".fourth-next-none");
var container = document.querySelector(".container-add-a-job");
var textarea = document.querySelectorAll(".textarea-question");
var under_parent_screening_questions = document.querySelector(".screening-questions-under-parent");
var additional_width = document.querySelectorAll(".additional-width");

for (let i = 0; i < next_none.length; i++) {

    next_Button.addEventListener('click', function() {

        next_none[i].style.display = "none";

        second_next_none[i].style.display = "block";

        main_conatiner.style.width = "100%";
    });
};

for (let i = 0; i < next_none.length; i++) {

    second_next_button.addEventListener('click', function() {

        second_next_none[i].style.display = "none";

        third_next_none[i].style.display = "block";

        third_next_none_buttons.style.display = "flex";
       
        main_conatiner.style.width = "450px";

    });
};

for (let i = 0; i < next_none.length; i++) {

    third_next_button.addEventListener('click', function() {
        

        second_next_none[i].style.display = "none";

        third_next_none[i].style.display = "none";

        third_next_none_buttons.style.display = "none";

        fourth_next_none.style.display = "flex";

        main_conatiner.style.width = "100%";

        // under_parent_screening_questions.style.width = "100%";

    });
};



// document.querySelector('button').parentElement.style='pointer-events:none'
