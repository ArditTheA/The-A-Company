var second_jobs_img = document.querySelectorAll('.job-left-row');
var right_jobs = document.querySelectorAll('.right-jobs');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var jobs_left = document.querySelector('.job-left');
var parent = document.querySelector('.jobs-main-div');
var a = document.querySelector("body");
var jobs_buttons = document.querySelector('.jobs-buttons');
var main_header = document.querySelector(".profileHeader");
var second_part_right = document.querySelectorAll('.right-jobs-rows-img-second');
var under_header = document.querySelector(".under-header-wishes");
const firstMediaQuery = window.matchMedia('(min-width: 768px');
const mediaQuery = window.matchMedia('(max-width: 767px)');
const map_containter_div = document.querySelectorAll(".map-container-div");
// const address_job = document.querySelector(".address-second-job").textContent;
// const name_job = document.querySelector(".second-job").textContent;

    for (let i = 0; i < second_jobs_img.length; i++) {
        
        second_jobs_img[i].addEventListener('click', function() {
            if (firstMediaQuery.matches) {
                // initMap(address_job, name_job);
        
            right_jobs_main_div.style.display = null;
            second_jobs_img[i].classList.add('different-background-jobs');
            $(second_jobs_img[i]).siblings().removeClass('different-background-jobs').addClass("same-background-jobs");
            // const mapContainer = document.createElement('div');
            // mapContainer.setAttribute('id', 'map-container');
            
            // // Create the locations panel div
            // const locationsPanel = document.createElement('div');
            // locationsPanel.setAttribute('id', 'locations-panel');
            
            // // Create the gmp-map div
            // const gmpMap = document.createElement('div');
            // gmpMap.setAttribute('id', 'gmp-map');
            
            // // Append the locations panel and gmp-map divs to the map container
            // mapContainer.appendChild(locationsPanel);
            // mapContainer.appendChild(gmpMap);
            
            // // Append the map container to the body or any other parent element
            // document.body.appendChild(mapContainer);
            // map_containter_div[i].appendChild(mapContainer);
            // right_jobs[i].appendChild(map_containter_div[i]);
            // right_jobs[i].appendChild(map_containter_div[i]);
            
            //  second_jobs_img[i].style.backgroundColor = "red";
            //  $(second_jobs_img[i]).siblings().css("background-color", "white");
            }
            right_jobs[i].style.display = "flex";
            $(right_jobs[i]).siblings().css("display", "none");

        });

    };
        
    for (let i = 0; i < second_jobs_img.length; i++) {
        second_jobs_img[i].addEventListener('click', function() {
            if (mediaQuery.matches) {
                right_jobs_main_div.style.display = "block";
                main_header.style.display = "none";
                jobs_left.style.display = "none";
                jobs_buttons.style.display = "none";
                under_header.style.display = "none";

            //    $(this).contents().wrap('<a href="http://www.worki.global"></a>');
            };

        });

    };

