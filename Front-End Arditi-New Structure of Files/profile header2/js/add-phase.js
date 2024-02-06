var searchInput = document.querySelector(".search-input");
var searchDIv = document.querySelector(".second-input-form");
var plusPhaseIcon = document.querySelector(".phase-plus-icon");
var exit_input = document.querySelector('.input-exit-button');

var jobsButtons = document.querySelector(".jobs-buttons");
var Inputform = document.querySelector(".main-input-form");
var add_subphase_div = document.querySelector(".add-subphase-div");
var search_exit = document.querySelector(".input-exit-button");
var dropdown_all_applicants = document.querySelector(".all-applicants-dropdown");
var all_applicants_over_main = document.querySelector(".all-applicants-over-main");
const min_media_query = window.matchMedia('(min-width: 481px)');
const max_media_query = window.matchMedia('(max-width: 480px)');

plusPhaseIcon.addEventListener("click", function() {

plusPhaseIcon.style.display = "none";

// var exitButton = document.createElement("img");

// exitButton.src = "../img/Vector 81 (1).png";
// console.log(exitButton);


var secondsearchInput = document.createElement("input");

secondsearchInput.classList.add("search-input-without-width");   // the problem (plus button on higher position than search input) is: "search-input";

secondsearchInput.classList.add("inputs-right-margin");

secondsearchInput.style.paddingLeft = "20px";
searchDIv.appendChild(secondsearchInput);
secondsearchInput.style.width = " 131px";
secondsearchInput.style.paddingRight = "20px";
secondsearchInput.placeholder = "Add New Phase";
searchDIv.focus();
secondsearchInput.focus();

// searchDIv.appendChild(exitButton);
// exitButton.style.position = "absolute";
// exitButton.style.width = "12px";
// exitButton.style.height = "12px";

Inputform.style.marginRight = "20px";
plusPhaseIcon.style.marginLeft = "0px";

jobsButtons.appendChild(secondsearchInput);


    secondsearchInput.style.display = "block";

    var mDiv = document.createElement("div");

mDiv.style.display = "flex";
mDiv.style.flexDirection = "row-reverse";
mDiv.style.alignItems = "center";
mDiv.appendChild(plusPhaseIcon);
mDiv.appendChild(secondsearchInput);
mDiv.style.height = "100%";
// mDiv.appendChild(exitButton);
jobsButtons.appendChild(mDiv);

$(plusPhaseIcon).on('click', function() {
    $(this).disable();
});


    // exitButton.addEventListener("click", function() {
    //     secondsearchInput.remove();
    //     exitButton.remove();
    //     plusPhaseIcon.style.display = "block";
    // })

    // var replaceInput = document.createElement("div");
    // replaceInput.style.color = "#65676B"
    // replaceInput.style.fontSize = "18px";

    plusPhaseIcon.disabled = "true";
    var number_of_clicks = 3;

    secondsearchInput.addEventListener("keyup", function(e) {
        if (e.key == "Enter") {
    
            add_phase();
            plusPhaseIcon.style.display = "block";
        }
    })

    var ClickCount = 0;
    var clickLimit = 3; //Max number of clicks
        
function add_phase(){

    let input_form = document.createElement("div");
    input_form.classList.add("main-input-form");
    input_form.classList.add("main-input-form-second");
    all_applicants_over_main.appendChild(input_form);
    let under_input_form = document.createElement("div");
    under_input_form.classList.add("input-form");
    under_input_form.classList.add("inputs-right-margin");
    under_input_form.classList.add("all-applicants-button-form");
    input_form.appendChild(under_input_form);
    let under_input_div = document.createElement("div");
    under_input_div.style.display = "flex";
    under_input_div.classList.add("under_input_div-font-size");
    under_input_form.appendChild(under_input_div);
    let new_button = document.createElement("button");
    new_button.classList.add("applied-button-jobs");
    new_button.classList.add("outline-none");
    new_button.classList.add("all-applicants-button");
    new_button.style.paddingLeft = "20px";
    new_button.style.backgroundColor = "white";
    new_button.style.color = "#65676B";
    new_button.textContent = secondsearchInput.value;
    new_button.title = new_button.textContent;
    under_input_div.appendChild(new_button);
    let img_div = document.createElement("div");
    img_div.style.display = "flex";
    img_div.style.alignItems = "center";
    under_input_div.appendChild(img_div);
    let dropdown_icon = document.createElement("img");


    dropdown_icon.src = "../img/dropdown-icon.png";
    dropdown_icon.classList.add("icon");
    dropdown_icon.style.cursor = "pointer";
    img_div.appendChild(dropdown_icon);
    // var vleraInputit = secondsearchInput.value;  
    // replaceInput.textContent = vleraInputit;
    secondsearchInput.style.display = "none";
    // replaceInput.style.display = "inline";
    // replaceInput.style.paddingLeft = "20px";
    // replaceInput.style.marginRight = "20px";
    // plusPhaseIcon.style.marginLeft = "0px";

    // add_subphase_div.style.display = "block";
    // new_button.appendChild(exitButton);
    // exitButton.style.marginLeft = "10px";
    // exitButton.addEventListener("click", function() {
    //     input_form.remove();
    //     exitButton.remove();
    // })

    let all_applicants_dropdown = document.createElement("div");
        all_applicants_dropdown.classList.add("all-applicants-dropdown");
        all_applicants_dropdown.style.paddingBottom = "20px";
        all_applicants_dropdown.style.paddingRight = "20px";
        all_applicants_dropdown.style.overflowY = "scroll";
        all_applicants_dropdown.style.maxHeight = "140px";
        all_applicants_dropdown.style.width = "100px";
        all_applicants_dropdown.style.flexDirection = "column";
        all_applicants_dropdown.style.alignItems = "center";
        all_applicants_dropdown.style.paddingLeft = "20px";
        console.log(all_applicants_dropdown);
        input_form.appendChild(all_applicants_dropdown);


        let under_all_applicants_dropdown = document.createElement("div");
        under_all_applicants_dropdown.classList.add("add-subphase-div");
        under_all_applicants_dropdown.style.paddingTop = "20px";
        
        all_applicants_dropdown.appendChild(under_all_applicants_dropdown);
        let under_dropdown_img = document.createElement("img");
        under_dropdown_img.src = "../img/add_subphase.png";
        under_dropdown_img.classList.add("add-subphase-button");
        under_dropdown_img.classList.add("applied-posted-plus-icon-mobile");
        under_all_applicants_dropdown.appendChild(under_dropdown_img);
        under_dropdown_img.style.padding = "0";
        under_dropdown_img.style.width = "16px"; 
        under_dropdown_img.style.height = "16px";
        under_dropdown_img.style.cursor = "pointer";
        under_dropdown_img.title = "Add a Subphase"                     
        input_form.appendChild(all_applicants_dropdown);             

        // new_button.addEventListener("click", function() {
        //     if (all_applicants_dropdown.style.display == "block") {
        //         all_applicants_dropdown.style.display = "none";
        //     }
        //     else {
        //         all_applicants_dropdown.style.display = "block";
        //     }


        // })


    
    // Inputform.addEventListener("click", function() {

    //     // let all_applicants_dropdown = document.createElement("div");
    //     // all_applicants_dropdown.classList.add("all-applicants-dropdown");
    //     // all_applicants_dropdown.style.paddingBottom = "20px";
    //     // all_applicants_dropdown.style.paddingRight = "20px";
    //     // all_applicants_dropdown.style.overflowY = "scroll";
    //     // all_applicants_dropdown.style.maxHeight = "140px";
    //     // all_applicants_dropdown.style.flexDirection = "column";
    //     // all_applicants_dropdown.style.alignItems = "center";
    //     // all_applicants_dropdown.style.paddingLeft = "20px";
    //     // input_form.appendChild(all_applicants_dropdown);

    //     // all_applicants_dropdown.style.display = "block";
    //     // let under_all_applicants_dropdown = document.createElement("div");
    //     // under_all_applicants_dropdown.classList.add("add-subphase-div");
    //     // under_all_applicants_dropdown.style.paddingTop = "20px";
        
    //     // all_applicants_dropdown.appendChild(under_all_applicants_dropdown);
    //     // let under_dropdown_img = document.createElement("img");
    //     // under_dropdown_img.src = "../img/add_subphase.png";
    //     // under_dropdown_img.classList.add("add-subphase-button");
    //     // under_dropdown_img.classList.add("applied-posted-plus-icon-mobile");
    //     // under_all_applicants_dropdown.appendChild(under_dropdown_img);
    //     // under_dropdown_img.style.padding = "0";
    //     // under_dropdown_img.style.width = "16px"; 
    //     // under_dropdown_img.style.height = "16px";
    //     // under_dropdown_img.style.cursor = "pointer";                     
    //     // input_form.appendChild(all_applicants_dropdown);    

    //     if (dropdown_all_applicants.style.display == "none") {
    //         dropdown_all_applicants.style.display = "block";
    //         console.log(dropdown_all_applicants);
    //     }
    //     else {
    //         dropdown_all_applicants.style.display = "none";
    //     }

    // })





var ClickCount = 0;
var clickLimit = 3 ; //Max number of clicks
    if(input_form<=clickLimit) {
        add_phase();
    }
    else if(input_form > clickLimit) {
        // add_phase.remove();
        return;
    }

}


});