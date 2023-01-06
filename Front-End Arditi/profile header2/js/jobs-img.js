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
            right_jobs_main_div.style.display = null;
            second_jobs_img[i].classList.add('different-background-jobs');
            $(second_jobs_img[i]).siblings().removeClass('different-background-jobs').addClass("same-background-jobs");
            
            //  second_jobs_img[i].style.backgroundColor = "red";
            //  $(second_jobs_img[i]).siblings().css("background-color", "white");
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

    }

    // if (firstMediaQuery.matches) {
    //     for (let i = 0; i < second_jobs_img.length; i++) {
    //     }
    // }

    // if (mediaQuery.matches) {
    //     for (let i = 0; i < second_jobs_img.length; i++) {
            
    //     }
    // }



    // var url = $("#clickable a").attr("href");s

    // $("#clickable").click(function() {
    //     window.location = url;
    //     return true;
    // });




    // $(".edit-job-button")[i].click(function(e) {
    //     // Do something
    //     e.stopPropagation();
    // });        


    // $(".jobs-rows-img")[i].click(function(e) {
    //     var senderElement = e.target;
    //     // Check if sender is the <div> element e.g.
    //     // if($(e.target).is("div")) {
    //     window.location = url;
    //     return true;
    // });

     
    
