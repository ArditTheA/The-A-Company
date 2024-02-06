var program_duration_div = document.querySelector(".program-duration-div");
var contact_information_div = document.querySelector(".contact-information-div");
var first_reserve_form = document.querySelector(".first-reserve-form");
var second_reserve_form = document.querySelector(".second-reserve-form");
var third_reserve_form = document.querySelector(".third-reserve-form");
var fourth_reserve_form = document.querySelector(".fourth-reserve-form");


program_duration_div.addEventListener("click", function() {
    second_reserve_form.style.display = "none";
    first_reserve_form.style.display = "block";
    
});

contact_information_div.addEventListener("click", function() {
    first_reserve_form.style.display = "none";
    third_reserve_form.style.display = "none";
    fourth_reserve_form.style.display = "none";
    second_reserve_form.style.display = "block";

});