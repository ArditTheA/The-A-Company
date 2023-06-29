var contact_information_back_button = document.querySelector(".contact-information-back-button");
var reserve_form = document.querySelector(".reserve-form");
var second_reserve_form = document.querySelector(".second-reserve-form");
var postAjobForm = document.querySelector(".first-post-a-job-form");
var secondPostAjobForm = document.querySelector(".second-post-a-job-form");
var thirdPostAjobForm = document.querySelector(".additional-feature-form");
var job_description_back_button = document.querySelector(".job-description-back-button");
var additional_feature_back_button = document.querySelector(".additional-feature-back-button");

contact_information_back_button.addEventListener("click", function() {
    second_reserve_form.style.display = "none";
    reserve_form.style.display = "block";
});

job_description_back_button.addEventListener("click", function() {
    secondPostAjobForm.style.display = "none";
    postAjobForm.style.display = "block";
})
additional_feature_back_button.addEventListener("click", function() {
    thirdPostAjobForm.style.display = "none";
    secondPostAjobForm.style.display = "block";
})


