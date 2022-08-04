var exitButtonJd = document.querySelectorAll(".exit-job-description");
var main_div = document.querySelector('.jobs-main-div');
var left_jobs = document.querySelector('.jobs-left');
var second_jobs_img = document.querySelectorAll('.jobs-rows-img');
var right_jobs = document.querySelectorAll('.right-jobs');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var jobs_buttons = document.querySelector('.jobs-buttons');

for (let i = 0; i < exitButtonJd.length; i++){
    exitButtonJd[i].addEventListener('click', function(){
        exitButtonJd[i].parentElement.parentElement.parentElement.style.display = "none";
        left_jobs.style.display = "block";
        right_jobs_main_div.style.display = "none";
        jobs_buttons.style.display = "flex";
    });
};

