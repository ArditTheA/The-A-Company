var contact_information_back_button = document.querySelector(".second-job-details-div");
var post_a_job_form = document.querySelector(".first-post-a-job-form");
var second_post_a_job_form = document.querySelector(".second-post-a-job-form");

contact_information_back_button.addEventListener("click", function() {
    second_post_a_job_form.style.display = "none";
    post_a_job_form.style.display = "block";
});