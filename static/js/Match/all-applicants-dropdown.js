

var dropdown_all_applicants = document.querySelector(".all-applicants-dropdown");
var all_applicants = document.querySelector(".all-applicants-button");
 var onBoard_button = document.querySelector(".phase-on-board-button");
var onBoard_dropdown = document.querySelector(".phase-on-board-dropdown")
all_applicants.addEventListener("click", function() {
    if (dropdown_all_applicants.style.display == "flex") {
       dropdown_all_applicants.style.display = "none";
    }
    else {
       dropdown_all_applicants.style.display = "flex";
    }
 });

 onBoard_button.addEventListener("click",function(){
    if(onBoard_dropdown.style.display=="flex"){
        onBoard_dropdown.style.display ="none";
    }
    else{
        onBoard_dropdown.style.display="flex";
    }
 });
 document.addEventListener('click', function(e) {
    if (!dropdown_all_applicants.contains(e.target) && !all_applicants.contains(e.target)) {
        dropdown_all_applicants.style.display = 'none';

    }
    if(!onBoard_dropdown.contains(e.target) && !onBoard_button.contains(e.target)){
        onBoard_dropdown.style.display ='none';
    }

 });















