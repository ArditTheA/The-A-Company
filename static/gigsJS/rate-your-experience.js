const done_button = document.querySelector(".done-button");
const bg_rate_your_experience = document.querySelector(".bg-rate-your-experience");


done_button.addEventListener("click", function() {
    bg_rate_your_experience.style.display = "block";
})

window.addEventListener('click', function(event) {
    if (event.target == bg_rate_your_experience) {
        bg_rate_your_experience.style.display = "none";
        document.body.style.overflow = "scroll";

    }
});
