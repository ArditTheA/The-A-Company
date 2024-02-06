var third_jobs_img = document.querySelectorAll('.job-left-row');
const media_query = window.matchMedia('(max-width: 480px)');

for (let i = 0; i < third_jobs_img.length; i++) {

    if (last_media_query.matches) {

        third_jobs_img[third_jobs_img.length - 1].style.marginBottom = "-10px";
        
    }
}
