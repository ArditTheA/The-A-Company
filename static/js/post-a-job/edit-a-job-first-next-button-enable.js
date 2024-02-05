
const job_details_inputFields = Array.from(document.querySelectorAll('.inputs-job-details'));
const post_a_job_firstNextButton = document.getElementById('first-next-button-job-details');
// const fileInput = document.getElementById('file-input');
const first_job_description_post_a_job = document.querySelector(".first-job-description-post-a-job");
const firstPostAJobForm =  document.querySelector(".first-post-a-job-form");
const idLogo = document.getElementById("id_logo");

first_job_description_post_a_job.style.pointerEvents = "none";

const firstJobDescriptionClickFunction = function() {
    firstPostAJobForm.style.display = "none";
    secondPostAJobForm.style.display = "block";
  }

  const firstNextClickFunction = function() {
    firstPostAJobForm.style.display = "none";
    secondPostAJobForm.style.display = "block";
  }
  
function checkInputs() {

  // const emailInput = document.getElementById('email-input');
  // const emailValue = emailInput.value.trim();
  // const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allJobDetailsInputsFilled = job_details_inputFields.every(input => input.value.trim() !== '');
  const isFileUploaded = idLogo.files.length > 0;




  const startDateValue = document.getElementById('id_start_date').value.trim();
  const endDateValue = document.getElementById('id_end_date').value.trim();
  const isStartDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(startDateValue);
  const isEndDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(endDateValue);

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
  
  post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled || !isStartDateValid || !isEndDateValid  ;

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

// const inputFields = document.querySelectorAll('input');
// const myButton = document.getElementById('next-button');

// function checkInputs() {
//     let allInputsFilled = true;
//     inputFields.forEach((input) => {
//       if (input.value.trim() === '') {
//         allInputsFilled = false;
//         myButton.addEventListener("click", function() {
//             window.location = "jobs.html";
//         })
//       }
//     });
//     myButton.disabled = !allInputsFilled;
//   }
  
//   inputFields.forEach((input) => {
//     input.addEventListener('input', checkInputs);
//   });
// const inputFields = document.querySelectorAll('input');
// const myButton = document.getElementById('next-button');

// function checkInputs() {
//   const allInputsFilled = Array.from(inputFields).every(input => input.value.trim() !== '');
//   myButton.disabled = allInputsFilled;
//   myButton.addEventListener("click", function() {
//     window.location = "jobs.html";
//   })
// }

// inputFields.forEach((input) => {
//   input.addEventListener('input', checkInputs);
// });  


var imageElement = document.getElementById('profilePic');

// Add an event listener to the file input element
idLogo.addEventListener('change', function() {
  // Get the selected file
  var file = idLogo.files[0];

  // Create a FileReader object to read the file
  var reader = new FileReader();

  // Set the callback function when the file is loaded
  reader.onload = function(e) {
    // imageElement.src = e.target.result;

    // Update the image source with the data URL of the selected file
    const allJobDetailsInputsFilled = job_details_inputFields.every(input => input.value.trim() !== '');
    const startDateValue = document.getElementById('id_start_date').value.trim();
    const endDateValue = document.getElementById('id_end_date').value.trim();
    const isStartDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(startDateValue);
    const isEndDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(endDateValue);  
    if (allJobDetailsInputsFilled && isStartDateValid && isEndDateValid) {
      first_job_description_post_a_job.addEventListener("click", firstJobDescriptionClickFunction);
      post_a_job_firstNextButton.addEventListener("click", firstNextClickFunction);
      post_a_job_firstNextButton.classList.add("second-next-button");
      first_job_description_post_a_job.style.pointerEvents = "auto";
      first_job_description_post_a_job.style.cursor = "pointer";

    }
    

  };

  // Read the selected file as a data URL
  reader.readAsDataURL(file);
});
