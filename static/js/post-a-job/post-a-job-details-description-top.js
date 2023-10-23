var mutual_job_details_div = document.querySelector(".mutual-job-details-div");
var post_a_job_form = document.querySelector(".first-post-a-job-form");
var second_post_a_job_form = document.querySelector(".second-post-a-job-form");
var third_post_a_job_form = document.querySelector(".additional-feature-form");
var second_job_details_div =  document.querySelector(".second-job-details-div");
var third_job_details_div =  document.querySelector(".third-job-details-div");
var job_description_third_page = document.querySelector(".job-description-third-page");
var mutual_job_details_div = document.querySelector(".mutual-job-details-div");

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