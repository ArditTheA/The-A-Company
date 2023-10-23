// var program_duration_third_page = document.querySelector(".program-duration-third-page");
var contact_information_third_page = document.querySelector(".contact-information-third-page");
// var first_reserve_form = document.querySelector(".first-reserve-form");
var second_reserve_form = document.querySelector(".second-reserve-form");
var third_reserve_form = document.querySelector(".third-reserve-form");
// var fourth_reserve_form = document.querySelector(".fourth-reserve-form");
var screening_question_back_button = document.querySelector(".screening-question-back");
// var payment_back_button = document.querySelector(".payment-back-button");

// program_duration_third_page.addEventListener("click", function() {
//     second_reserve_form.style.display = "none";
//     third_reserve_form.style.display = "none";
//     first_reserve_form.style.display = "block";
// });

contact_information_third_page.addEventListener("click", function() {
    // reserve_form.style.display = "none";
    third_reserve_form.style.display = "none";
    second_reserve_form.style.display = "block";
});

screening_question_back_button.addEventListener("click", function() {
    third_reserve_form.style.display = "none";
    second_reserve_form.style.display = "block";
})

// payment_back_button.addEventListener("click", function() {
//     fourth_reserve_form.style.display = "none";
//     third_reserve_form.style.display = "block";
// });


