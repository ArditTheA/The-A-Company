var second_jobs_img = document.querySelectorAll('.jobs-rows-img');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
const mediaQuery = window.matchMedia('(max-width: 767px)');

    if (mediaQuery.matches) {

    for (let i = 0; i < second_jobs_img.length; i++) {
        second_jobs_img[i].addEventListener('click', function() {
                right_jobs_main_div.style.display = "flex";
        });
    };
};
