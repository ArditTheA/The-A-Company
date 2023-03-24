var mainDiv = document.querySelector(".bg-add-and-edit");
var add = document.querySelector(".add-experience");
var btn = document.querySelector(".add-experience-button");
var btn2 = document.querySelector(".add-languages-button");
var btn3 = document.querySelector(".add-education-button");
var btn4 = document.querySelector(".second-add-languages-button");
var underBg = document.querySelector(".add-languages");
var uBgEducation = document.querySelector(".add-education");

btn.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    underBg.style.display = "none";
    uBgEducation.style.display = "none";
    add.style.display = "flex";
});

btn2.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    add.style.display = "none";
    uBgEducation.style.display = "none";
    underBg.style.display = "flex";
});

btn3.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    underBg.style.display = "none";
    add.style.display = "none";
    uBgEducation.style.display = "flex";
});
btn4.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    underBg.style.display = "none";
    add.style.display = "none";
    uBgEducation.style.display = "flex";
});

window.addEventListener('click', function(event) {
    if (event.target == mainDiv) {
        document.body.style.overflow="scroll";
        mainDiv.style.display = "none";
    }
});