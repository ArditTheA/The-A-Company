// var contact_information_back_button = document.querySelector(".contact-information-back-button");
var reserve_form = document.querySelector(".reserve-form");
var first_post_a_gig_form = document.querySelector(".first-post-a-gig-form");
var second_post_a_gig_form = document.querySelector(".second-post-a-gig-form");
var location_form = document.querySelector(".location-form");
// var secondPostAjobForm = document.querySelector(".second-post-a-job-form");
// var thirdPostAjobForm = document.querySelector(".additional-feature-form");
var scheduleForm = document.querySelector(".schedule-form");
var payForm = document.querySelector(".pay-form");
var job_description_back_button = document.querySelector(".job-description-back-button");
var pay_back_button = document.querySelector(".pay-back-button");
var schedule_back_button = document.querySelector(".schedule-back-button");
var location_back_button = document.querySelector(".location-back-button");

// contact_information_back_button.addEventListener("click", function() {
//     second_reserve_form.style.display = "none";
//     reserve_form.style.display = "block";
// });

job_description_back_button.addEventListener("click", function() {
    second_post_a_gig_form.style.display = "none";
    first_post_a_gig_form.style.display = "block";
})


pay_back_button.addEventListener("click", function() {
    payForm.style.display = "none";
    scheduleForm.style.display = "block";
})

schedule_back_button.addEventListener("click", function() {
    scheduleForm.style.display = "none";
    location_form.style.display = "block";
});

location_back_button.addEventListener("click", function() {
    location_form.style.display = "none";
    second_post_a_gig_form.style.display = "block";
})





