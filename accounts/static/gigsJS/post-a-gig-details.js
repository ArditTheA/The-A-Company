var mutual_job_details_div = document.querySelector(".mutual-job-details-div");
var post_a_job_form = document.querySelector(".first-post-a-gig-form");
var second_post_a_job_form = document.querySelector(".second-post-a-gig-form");
var third_post_a_job_form = document.querySelector(".location-form");
var second_job_details_div =  document.querySelector(".second-details-div");
var third_job_details_div =  document.querySelector(".third-job-details-div");
var job_description_third_page = document.querySelector(".job-description-third-page");
var mutual_job_details_div = document.querySelector(".mutual-job-details-div");
var schedule_form_details =  document.querySelector(".schedule-form-details");
var schedule_form_description =  document.querySelector(".schedule-form-description");
var schedule_form_location =  document.querySelector(".schedule-form-location");

var gigScheduleForm = document.querySelector(".schedule-form");

second_job_details_div.addEventListener("click", function() {
    second_post_a_job_form.style.display = "none";
    post_a_job_form.style.display = "block";
});

third_job_details_div.addEventListener("click", function() {
    third_post_a_job_form.style.display = "none";
    post_a_job_form.style.display = "block";
});

// job_details_third_page.addEventListener("click", function() {
//     third_post_a_job_form.style.display = "none";
//     post_a_job_form.style.display = "block";
// })

job_description_third_page.addEventListener("click", function() {
    third_post_a_job_form.style.display = "none";
    second_post_a_job_form.style.display = "block";
});

schedule_form_details.addEventListener("click", function() {
    gigScheduleForm.style.display = "none";
    post_a_job_form.style.display = "block";
})

schedule_form_description.addEventListener("click", function() {
    gigScheduleForm.style.display = "none";
    second_post_a_job_form.style.display = "block";
})

schedule_form_location.addEventListener("click", function() {
    gigScheduleForm.style.display = "none";
    third_post_a_job_form.style.display = "block";
})