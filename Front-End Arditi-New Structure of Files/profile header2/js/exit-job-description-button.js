var exitButtonJd = document.querySelectorAll(".job-right-exit");
var main_div = document.querySelector('.jobs-main-div');
var left_jobs = document.querySelector('.job-left');
var second_jobs_img = document.querySelectorAll('.job-left-row');
var right_jobs = document.querySelectorAll('.right-jobs');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var jobs_buttons = document.querySelector('.jobs-buttons');
var under_header = document.querySelector(".under-header-wishes");
const thirdMediaQuery = window.matchMedia('(max-width: 767px');


for (let i = 0; i < exitButtonJd.length; i++){
    exitButtonJd[i].addEventListener('click', function() {
        if (thirdMediaQuery.matches) {
        left_jobs.style.display = "block";
        right_jobs_main_div.style.display = null;
        main_header.style.display = null;
        for(let i = 0; i < right_jobs.length; i++){
            right_jobs_main_div.style.display = null;
        }
    
    

        second_jobs_img[0].classList.add('different-background-jobs');
        $(second_jobs_img[0]).siblings().removeClass('different-background-jobs').addClass("same-background-jobs");
        jobs_buttons.style.display = "flex";
        under_header.style.display = "block";
    }

    });
};