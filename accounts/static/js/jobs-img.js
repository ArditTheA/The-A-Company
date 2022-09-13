var second_jobs_img = document.querySelectorAll('.jobs-rows-img');
var right_jobs = document.querySelectorAll('.right-jobs');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var jobs_left = document.querySelector('.jobs-left');
var parent = document.querySelector('.jobs-main-div');
var a = document.querySelector("body");
var jobs_buttons = document.querySelector('.jobs-buttons');
var second_part_right = document.querySelectorAll('.right-jobs-rows-img-second');
const firstMediaQuery = window.matchMedia('(min-width: 768px');
const mediaQuery = window.matchMedia('(max-width: 767px)');

    for (let i = 0; i < second_jobs_img.length; i++) {
        second_jobs_img[i].addEventListener('click', function() {
            if (firstMediaQuery.matches) {
            second_jobs_img[i].style.backgroundColor = "#E7F1FE";
            $(second_jobs_img[i]).siblings().css("background-color", "white")
            }
            right_jobs[i].style.display = "flex";
            $(right_jobs[i]).siblings().css("display", "none");
            if (mediaQuery.matches) {
                right_jobs_main_div.style.display = "block";
                jobs_left.style.display = "none";
                jobs_buttons.style.display = "none";
            //    $(this).contents().wrap('<a href="http://www.worki.global"></a>');
            };
        });
    };


