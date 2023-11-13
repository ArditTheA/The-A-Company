var meet_with_us_form = document.querySelector(".meet-us-form-content");
var applicants_documents = document.querySelector(".documents-for-work-permit-form-content");
var work_permit = document.querySelector(".your-work-permit-is-here-form-content");
var meet_with_us_div = document.querySelectorAll(".meet-with-us-div");
var documents_div = document.querySelectorAll(".documents-div");
var work_permit_div = document.querySelectorAll(".work-permit-div");
var screening_questions_title = document.querySelector(".screening-questions-title");
var documents_for_work_permit_label_dropdown = document.querySelector(".documents-for-work-permit-label-dropdown");
var your_work_permit_is_here_label_dropdown = document.querySelector(".your-work-permit-is-here-label-dropdown");

// Modify your existing event listeners to pass the text content to the createFilterDiv function

// function createFilterDiv(buttonName) {
//     const mainInputForm = document.querySelector(".meet-with-us-main-input-form");
//     mainInputForm.innerHTML = ''; // Clear the existing content

//     const newFilterDiv = document.createElement("div");
//     newFilterDiv.classList.add("meet-with-us-main-input-form");

//     const inputFormDiv = document.createElement("div");
//     inputFormDiv.classList.add("input-form", "inputs-right-margin", "all-applicants-button-form");

//     const newButton = document.createElement("button");
//     newButton.title = buttonName;
//     newButton.classList.add("applied-button-jobs", "outline-none", "all-applicants-button");
//     newButton.textContent = buttonName;

//     const newDivImg = document.createElement("div");
//     newDivImg.classList.add("div-white-icon");
//     const newImg = document.createElement("img");
//     newImg.src = "../img/white-dropdown-icon.png";
//     newImg.classList.add("white-icon");
//     newImg.style.cursor = "pointer";
//     newDivImg.appendChild(newImg);

//     inputFormDiv.appendChild(newButton);
//     inputFormDiv.appendChild(newDivImg);
//     newFilterDiv.appendChild(inputFormDiv);

//     mainInputForm.appendChild(newFilterDiv);
// }

// for (let i = 0; i < documents_div.length; i++) {
//     documents_div[i].addEventListener("click", function() {
//         meet_with_us_form.style.display = "none";
//         work_permit.style.display = "none";
//         applicants_documents.style.display = "block";
//         // createFilterDiv(this.textContent); // Pass the text content to createFilterDiv
//     });
// }

documents_for_work_permit_label_dropdown.addEventListener("click", function() {
    meet_with_us_form.style.display = "none";
    work_permit.style.display = "none";
    applicants_documents.style.display = "block";
})

your_work_permit_is_here_label_dropdown.addEventListener("click", function() {
            meet_with_us_form.style.display = "none";
        work_permit.style.display = "block";
        applicants_documents.style.display = "none";
})
for (let i = 0; i < work_permit_div.length; i++) {
work_permit_div[i].addEventListener("click", function() {
    meet_with_us_form.style.display = "none";
    work_permit.style.display = "block";
    applicants_documents.style.display = "none";
})
}

for (let i = 0; i < documents_div.length; i++) {
    documents_div[i].addEventListener("click", function() {
        meet_with_us_form.style.display = "none";
        work_permit.style.display = "none";
        applicants_documents.style.display = "block";
    })
}