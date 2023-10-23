const details_pay_form = document.querySelector(".details-pay-form");
const description_pay_form = document.querySelector(".description-pay-form");
const location_pay_form = document.querySelector(".location-pay-form");
const schedule_pay_form = document.querySelector(".schedule-pay-form");
const first_gig_form = document.querySelector(".first-post-a-gig-form");
const second_gig_form = document.querySelector(".second-post-a-gig-form");
const third_gig_form = document.querySelector(".location-form");
const fourth_gig_form = document.querySelector(".schedule-form");
const fifth_gig_form = document.querySelector(".pay-form");


details_pay_form.addEventListener("click", function() {
    fifth_gig_form.style.display = "none";
    first_gig_form.style.display = "block";
});

description_pay_form.addEventListener("click", function() {
    fifth_gig_form.style.display = "none";
    second_gig_form.style.display = "block";
});

location_pay_form.addEventListener("click", function() {
    fifth_gig_form.style.display = "none";
    third_gig_form.style.display = "block";
});

schedule_pay_form.addEventListener("click", function() {
    fifth_gig_form.style.display = "none";
    fourth_gig_form.style.display = "block";
});