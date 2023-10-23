
const job_details_inputFields = Array.from(document.querySelectorAll('.gig-inputs-job-details'));
const location_inputFields = Array.from(document.querySelectorAll('.gig-location-inputs'));
const schedule_inputFields = Array.from(document.querySelectorAll('.gig-schedule-inputs'));
const pay_inputFields = Array.from(document.querySelectorAll('.gig-pay-inputs'));

const post_a_job_firstNextButton = document.getElementById('first-next-button-gig-details');
const gig_schedule_form_next_button = document.getElementById("gig-schedule-form-next-button");
const gig_location_next_button = document.getElementById("gig-location-form-next-button");
const gig_pay_next_button = document.getElementById("post_a_gig");

// const fileInput = document.getElementById('file-input');
const first_job_description_post_a_job = document.querySelector(".first-job-description-post-a-job");
const location_page_schedule = document.querySelector(".locationNextButton");
const firstPostAJobForm =  document.querySelector(".first-post-a-gig-form");
const secondPostAJobForm = document.querySelector(".second-post-a-gig-form");
const gig_location_form = document.querySelector(".location-form");
const gig_schedule_form = document.querySelector(".schedule-form");
const location_form_schedule = document.querySelector(".location-form-schedule");
const schedule_form_pay = document.querySelector(".schedule-form-pay");
const pay_form = document.querySelector(".pay-form");
const gig_location_form_details = document.querySelector(".gig-location-form-details");
const gig_location_form_description = document.querySelector(".gig-location-form-description");
const first_schedule_div = document.querySelector(".first-schedule-div");
const second_schedule_div = document.querySelector(".second-schedule-div");
const first_pay_div = document.querySelector(".first-pay-div");
const second_pay_div = document.querySelector(".second-pay-div");
const third_pay_div = document.querySelector(".location-form-pay-div");

// const idLogo = document.getElementById("id_logo");

first_job_description_post_a_job.style.pointerEvents = "none";
location_form_schedule.style.pointerEvents = "none";
// location_div_details.style.pointerEvents = "none";

const firstJobDescriptionClickFunction = function() {
    firstPostAJobForm.style.display = "none";
    secondPostAJobForm.style.display = "block";
  }

  const firstNextClickFunction = function() {
    firstPostAJobForm.style.display = "none";
    secondPostAJobForm.style.display = "block";
  }

  const locationPageSchedule = function() {
    gig_location_form.style.display = "none";
    gig_schedule_form.style.display = "block";
  }

  const locationNextButton = function() {
    gig_location_form.style.display = "none";
    gig_schedule_form.style.display = "block";
  }

  const fromScheduletoPay = function() {
    gig_schedule_form.style.display = "none";
    pay_form.style.display = "block";
  }

  const fromScheduletoDetails = function() {
    gig_schedule_form.style.display = "none";
    firstPostAJobForm.style.display = "block";
  }

  const fromScheduletoDescription = function() {
    gig_schedule_form.style.display = "none";
    firstPostAJobForm.style.display = "block";
  }

  const firstScheduleDiv = function() {
    firstPostAJobForm.style.display = "none";
    gig_schedule_form.style.display = "block";
  }
  const secondScheduleDiv = function() {
    secondPostAJobForm.style.display = "none";
    gig_schedule_form.style.display = "block";
  }

  const firstPayDiv = function() {
    firstPostAJobForm.style.display = "none";
    pay_form.style.display = "block";
  }
  const secondPayDiv = function() {
    secondPostAJobForm.style.display = "none";
    pay_form.style.display = "block";
  }
  const thirdPayDiv = function() {
    gig_location_form.style.display = "none";
    pay_form.style.display = "block";
  }


function checkInputs() {

  // const emailInput = document.getElementById('email-input');
  // const emailValue = emailInput.value.trim();
  // const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allJobDetailsInputsFilled = job_details_inputFields.every(input => input.value.trim() !== '');

  // Add an event listener to the file input element
  // fileInput2.addEventListener('change', function() {
  //   // Get the selected file
  //   var file2 = fileInput2.files[0];
  
  //   // Create a FileReader object to read the file
  //   var reader2 = new FileReader();
  
  //   // Set the callback function when the file is loaded
  //   reader2.onload = function(e) {
  //     // Update the image source with the data URL of the selected file
  //     main_profile_picture2.src = e.target.result;
  //   };
  
  //   // Read the selected file as a data URL
  //   reader2.readAsDataURL(file2);
  // });
  
  // const hasDomainExtension = emailValue.endsWith('.com') || emailValue.endsWith('.cn') || emailValue.endsWith('.xyz') || emailValue.endsWith('.net') // Modify as needed
  // const domainExtensionPattern = /\.(?:[a-zA-Z]{2,}|[^\s.]{2,})$/;
  // const hasDomainExtension = domainExtensionPattern.test(emailValue);

  // post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled;
  
  post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled;

//   post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled || fileInput.files.length === 0;

  
  if (post_a_job_firstNextButton.disabled === false) {

    // isValidEmail(email);
    post_a_job_firstNextButton.classList.add("second-next-button");
    first_job_description_post_a_job.style.pointerEvents = "auto";
    first_job_description_post_a_job.style.cursor = "pointer";

    first_job_description_post_a_job.addEventListener("click", firstJobDescriptionClickFunction);
    post_a_job_firstNextButton.addEventListener("click", firstNextClickFunction);

    
  }

  else {
    post_a_job_firstNextButton.classList.remove("second-next-button");
    first_job_description_post_a_job.removeEventListener("click", firstJobDescriptionClickFunction);
    post_a_job_firstNextButton.removeEventListener("click", firstNextClickFunction);
    first_job_description_post_a_job.style.pointerEvents = "none";

  }

  // Add an event listener to the file inputs

}

job_details_inputFields.forEach(input => input.addEventListener('input', checkInputs));


function LocationcheckInputs() {

  // const emailInput = document.getElementById('email-input');
  // const emailValue = emailInput.value.trim();
  // const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allLocationInputs = location_inputFields.every(input => input.value.trim() !== '');

  // Add an event listener to the file input element
  // fileInput2.addEventListener('change', function() {
  //   // Get the selected file
  //   var file2 = fileInput2.files[0];
  
  //   // Create a FileReader object to read the file
  //   var reader2 = new FileReader();
  
  //   // Set the callback function when the file is loaded
  //   reader2.onload = function(e) {
  //     // Update the image source with the data URL of the selected file
  //     main_profile_picture2.src = e.target.result;
  //   };
  
  //   // Read the selected file as a data URL
  //   reader2.readAsDataURL(file2);
  // });
  
  // const hasDomainExtension = emailValue.endsWith('.com') || emailValue.endsWith('.cn') || emailValue.endsWith('.xyz') || emailValue.endsWith('.net') // Modify as needed
  // const domainExtensionPattern = /\.(?:[a-zA-Z]{2,}|[^\s.]{2,})$/;
  // const hasDomainExtension = domainExtensionPattern.test(emailValue);s

  // post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled;
  
  gig_location_next_button.disabled = false;

//   post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled || fileInput.files.length === 0;

  
  if (gig_location_next_button.disabled === false) {

    // isValidEmail(email);
    gig_location_next_button.style.pointerEvents = "auto";
    gig_location_next_button.classList.add("second-next-button");
    location_form_schedule.style.pointerEvents = "auto";
    location_form_schedule.style.cursor = "pointer";

    location_form_schedule.addEventListener("click", locationPageSchedule);
    gig_location_next_button.addEventListener("click", locationNextButton);
    first_schedule_div.addEventListener("click", firstScheduleDiv);
    first_schedule_div.style.pointerEvents = "auto";
    first_schedule_div.style.cursor = "pointer";
    second_schedule_div.addEventListener("click", secondScheduleDiv);
    second_schedule_div.style.pointerEvents = "auto";
    second_schedule_div.style.cursor = "pointer";
  }

  else {
    gig_location_next_button.classList.remove("second-next-button");
    location_form_schedule.removeEventListener("click", locationPageSchedule);
    gig_location_next_button.removeEventListener("click", locationNextButton);
    first_schedule_div.removeEventListener("click", firstScheduleDiv);
    first_schedule_div.style.pointerEvents = "none";
    first_schedule_div.style.cursor = "none";
    second_schedule_div.removeEventListener("click", secondScheduleDiv);
    second_schedule_div.style.pointerEvents = "none";
    second_schedule_div.style.cursor = "none";
    location_form_schedule.style.pointerEvents = "none";
  }

  // Add an event listener to the file inputs

}

location_inputFields.forEach(input => input.addEventListener('input', LocationcheckInputs));

gig_location_form_description.addEventListener("click", function() {
    gig_location_form.style.display = "none";
    secondPostAJobForm.style.display = "block";
})

gig_location_form_details.addEventListener("click", function() {
  gig_location_form.style.display = "none";
  firstPostAJobForm.style.display = "block";
})

function SchedulecheckInputs() {

  // const emailInput = document.getElementById('email-input');
  // const emailValue = emailInput.value.trim();
  // const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const AllScheduleInputs = schedule_inputFields.every(input => input.value.trim() !== '');

  const startDateValue = document.getElementById('start_date1').value.trim();
  const endDateValue = document.getElementById('end_date1').value.trim();
  const isStartDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(startDateValue);
  const isEndDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(endDateValue);

  const startTimeValue = document.getElementById('start_time1').value.trim();
  const endTimeValue = document.getElementById('end_time1').value.trim();
  const isStartTimeValid = /^\d{2}:\d{2}$/.test(startTimeValue);
  const isEndTimeValid = /^\d{2}:\d{2}$/.test(endTimeValue);
  

  // Add an event listener to the file input element
  // fileInput2.addEventListener('change', function() {
  //   // Get the selected file
  //   var file2 = fileInput2.files[0];
  
  //   // Create a FileReader object to read the file
  //   var reader2 = new FileReader();
  
  //   // Set the callback function when the file is loaded
  //   reader2.onload = function(e) {
  //     // Update the image source with the data URL of the selected file
  //     main_profile_picture2.src = e.target.result;
  //   };
  
  //   // Read the selected file as a data URL
  //   reader2.readAsDataURL(file2);
  // });
  
  // const hasDomainExtension = emailValue.endsWith('.com') || emailValue.endsWith('.cn') || emailValue.endsWith('.xyz') || emailValue.endsWith('.net') // Modify as needed
  // const domainExtensionPattern = /\.(?:[a-zA-Z]{2,}|[^\s.]{2,})$/;
  // const hasDomainExtension = domainExtensionPattern.test(emailValue);

  // post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled;
  
  gig_schedule_form_next_button.disabled = !AllScheduleInputs || !isStartDateValid || !isEndDateValid || !isStartTimeValid || !isEndTimeValid;

//   post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled || fileInput.files.length === 0;

  
  if (gig_schedule_form_next_button.disabled === false) {

    // isValidEmail(email);
    gig_schedule_form_next_button.style.pointerEvents = "auto";
    gig_schedule_form_next_button.classList.add("second-next-button");
    schedule_form_pay.style.pointerEvents = "auto";
    schedule_form_pay.style.cursor = "pointer";
    schedule_form_details.addEventListener("click", fromScheduletoDetails);
    schedule_form_description.addEventListener("click", fromScheduletoDescription);
    first_pay_div.addEventListener("click", firstPayDiv);
    first_pay_div.style.pointerEvents = "auto";
    first_pay_div.style.cursor = "pointer";
    second_pay_div.addEventListener("click", secondPayDiv);
    second_pay_div.style.pointerEvents = "auto";
    second_pay_div.style.cursor = "pointer";
    third_pay_div.addEventListener("click", thirdPayDiv);
    third_pay_div.style.pointerEvents = "auto";
    third_pay_div.style.cursor = "pointer";



    schedule_form_pay.addEventListener("click", fromScheduletoPay);
    gig_schedule_form_next_button.addEventListener("click", fromScheduletoPay);
    first_pay_div.addEventListener("click", firstPayDiv);
    first_pay_div.style.pointerEvents = "auto";
    first_pay_div.style.cursor = "pointer";
  }

  else {
    gig_schedule_form_next_button.classList.remove("second-next-button");
    schedule_form_pay.removeEventListener("click", fromScheduletoPay);
    gig_schedule_form_next_button.removeEventListener("click", fromScheduletoPay);
    schedule_form_details.removeEventListener("click", fromScheduletoDetails);
    schedule_form_description.removeEventListener("click", fromScheduletoDescription);
    schedule_form_pay.style.pointerEvents = "none";
    first_pay_div.addEventListener("click", firstPayDiv);
    first_pay_div.style.pointerEvents = "none";
    first_pay_div.style.cursor = "none";
    second_pay_div.removeEventListener("click", secondPayDiv);
    second_pay_div.style.pointerEvents = "none";
    second_pay_div.style.cursor = "none";
    third_pay_div.removeEventListener("click", thirdPayDiv);
    third_pay_div.style.pointerEvents = "none";
    third_pay_div.style.cursor = "none";

  }

  // Add an event listener to the file inputs

}

schedule_inputFields.forEach(input => input.addEventListener('input', SchedulecheckInputs));

function PaycheckInputs() {

  const allPayInputsFilled = pay_inputFields.every(input => input.value.trim() !== '');

  gig_pay_next_button.disabled = !allPayInputsFilled;
  
  if (gig_pay_next_button.disabled === false) {

    gig_pay_next_button.classList.add("second-next-button");
    // first_job_description_post_a_job.style.pointerEvents = "auto";
    // first_job_description_post_a_job.style.cursor = "pointer";

    // first_job_description_post_a_job.addEventListener("click", firstJobDescriptionClickFunction);
    // gig_pay_next_button.addEventListener("click", firstNextClickFunction);
    
  }

  else {
    gig_pay_next_button.classList.remove("second-next-button");
    // first_job_description_post_a_job.removeEventListener("click", firstJobDescriptionClickFunction);
    // gig_pay_next_button.removeEventListener("click", firstNextClickFunction);
    // first_job_description_post_a_job.style.pointerEvents = "none";

  }

  // Add an event listener to the file inputs

}

pay_inputFields.forEach(input => input.addEventListener('input', PaycheckInputs));

