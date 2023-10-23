const check_out_button = document.querySelector(".a-check-out-button");
const bg_end_this_job = document.querySelector(".bg-end-this-job");
const no_button = document.querySelector(".pop-up-no-button");
check_out_button.addEventListener("click", function() {
    bg_end_this_job.style.display = "block";
});


window.addEventListener('click', function(event) {
    if (event.target == bg_end_this_job) {
        bg_end_this_job.style.display = "none";
        document.body.style.overflow = "scroll";

    }
});

no_button.addEventListener("click", function() {
    bg_end_this_job.style.display = "none";
});