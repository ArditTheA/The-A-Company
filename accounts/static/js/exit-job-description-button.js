var exitButtonJd = document.querySelectorAll(".job-right-exit");
var main_div = document.querySelector('.jobs-main-div');
var left_jobs = document.querySelector('.job-left');
var second_jobs_img = document.querySelectorAll('.jobs-right-details');
var right_jobs = document.querySelectorAll('.right-jobs');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var jobs_buttons = document.querySelector('.jobs-buttons');

for (let i = 0; i < exitButtonJd.length; i++){
    exitButtonJd[i].addEventListener('click', function(){
        left_jobs.style.display = "block";
        right_jobs_main_div.style.display = null;
        for(let i = 0; i < right_jobs.length; i++){
            right_jobs[i].style.display = null;
        }
        second_jobs_img[0].classList.add('different-background-jobs');
        $(second_jobs_img[0]).siblings().removeClass('different-background-jobs').addClass("same-background-jobs");
        jobs_buttons.style.display = "flex";
    });
};