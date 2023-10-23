var mainDiv = document.querySelector(".bg-add-and-edit");
var add = document.querySelector(".add-experience");
var btn = document.querySelector(".add-experience-button");
var btn2 = document.querySelector(".add-languages-button");
var btn3 = document.querySelector(".add-education-button");
var underBg = document.querySelector(".add-languages");
var uBgEducation = document.querySelector(".add-education");
var header_border = document.querySelector(".header-border");
const mediaQueryThree = window.matchMedia('(max-width: 480px)');

btn.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    underBg.style.display = "none";
    uBgEducation.style.display = "none";
    add.style.display = "flex";
    document.body.style.overflow = "hidden";
});

btn2.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    add.style.display = "none";
    uBgEducation.style.display = "none";
    underBg.style.display = "block";
    document.body.style.overflow = "hidden";
});

btn3.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    underBg.style.display = "none";
    add.style.display = "none";
    uBgEducation.style.display = "flex";
    document.body.style.overflow = "hidden";
});

window.addEventListener('click', function(event) {
    if (event.target == mainDiv) {
        mainDiv.style.display = "none";
        document.body.style.overflow = "scroll";
    }
});

if (mediaQueryThree.matches) {
}