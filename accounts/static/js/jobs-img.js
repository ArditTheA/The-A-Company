var second_jobs_img = document.querySelectorAll('.pixel');
var right_jobs = document.querySelectorAll('.right-jobs');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var jobs_left = document.querySelector('.pixel');
var parent = document.querySelector('.jobs-main-div');
var a = document.querySelector("body");
var jobs_buttons = document.querySelector('.jobs-buttons');
var second_part_right = document.querySelectorAll('.right-jobs-rows-img-second');
const firstMQ = window.matchMedia('(min-width: 768px');
const MQ = window.matchMedia('(max-width: 767px)');

        const mediaQuery1 = window.matchMedia('(max-width: 767px)');
        var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
        var jobs_left = document.querySelector('.pixel');
        var jobs_buttons = document.querySelector('.jobs-buttons');
        
        if (mediaQuery1.matches) {
            
            right_jobs_main_div.style.display = null;
            jobs_left.style.display = "flex";
            jobs_buttons.style.display = "flex";
                
                
        };

    for (let i = 0; i < second_jobs_img.length; i++) {
        second_jobs_img[i].addEventListener('click', function() {
            if (firstMQ.matches) {
            right_jobs_main_div.style.display = null;
            second_jobs_img[i].classList.add('different-background-jobs');
            }
            right_jobs[i].style.display = "flex";
            $(right_jobs[i]).siblings().css("display", "none");
            if (MQ.matches) {
                right_jobs_main_div.style.display = "block";
                jobs_left.style.display = "none";
                jobs_buttons.style.display = "none";
            //    $(this).contents().wrap('<a href="http://www.worki.global"></a>');
            };
        });

    }





     
    