
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

  var myDisableClickFunction = function() {
    job_details_inputFields.forEach(input => {
      const errorDivId = input.id + '-error-message';
      let errorDiv = document.getElementById(errorDivId);
      if (input.value.trim() === '') {
        if (!errorDiv) {
          errorDiv = document.createElement('div');
          errorDiv.id = errorDivId;
          errorDiv.classList.add('error-message');
          errorDiv.style.color = "red";
          errorDiv.style.fontSize = "14px";
          errorDiv.style.marginTop = "0px";
          input.parentNode.insertBefore(errorDiv, input.nextSibling);
        } else {
          input.style.border = "0.5px solid red";
          input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
          errorDiv.textContent = 'This field is required';
          errorDiv.style.marginTop = "4px";
  
        }
      }
      else {
        if (input.id === 'id_email') {
          const emailValue_second = input.value.trim();
          const isEmailValid_second = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue_second);
  
          if (!isEmailValid_second) {
            input.style.border = "0.5px solid red";
            input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
            errorDiv.textContent = 'This email is invalid';
          } else {
          }
        }
        
      }
  
  
      input.addEventListener('focus', function() {
        const errorDivId = input.id + '-error-message';
        let errorDiv = document.getElementById(errorDivId);
        input.style.border = "1px solid #1877f2";
        input.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
        errorDiv.textContent = '';
        errorDiv.style.marginTop = "0px";
      });

      if (input.id === "id_logo") {
        input.addEventListener('input', function() {
          const errorDivId = input.id + '-error-message';
          let errorDiv = document.getElementById(errorDivId);
          input.style.border = "1px solid #1877f2";
          input.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
          errorDiv.textContent = '';
          errorDiv.style.marginTop = "0px";
      })
    }
  
      input.addEventListener('blur', function() {
        const errorDivId = input.id + '-error-message';
        let errorDiv = document.getElementById(errorDivId);
        
        if (!errorDiv) {
          errorDiv = document.createElement('div');
          errorDiv.id = errorDivId;
          errorDiv.classList.add('error-message');
          errorDiv.style.color = "red";
          errorDiv.style.fontSize = "14px";
          input.parentNode.insertBefore(errorDiv, input.nextSibling);
          input.style.border = "0.5px solid red";
          input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
          errorDiv.textContent = 'This field is required';
          errorDiv.style.marginTop = "0px";
      }
        else {
          input.style.border = "0.5px solid red";
          input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
          errorDiv.textContent = 'This field is required';
        }
  
        if (input.id !== "id_start_date" && input.id !== "id_end_date") {
          if (input.value.trim() === "") {
              errorDiv.style.marginTop = "4px";
  
          }
          else {
            input.style.border = "";
            input.style.boxShadow = "";
            errorDiv.textContent = '';
            errorDiv.style.marginTop = "0px";
          }
        } else {
          const startDateValue = document.getElementById('id_start_date').value.trim();
          const endDateValue = document.getElementById('id_end_date').value.trim();
          const isStartDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(startDateValue);
          const isEndDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(endDateValue);
          if (input.id === "id_start_date") {
          if (!isStartDateValid) {
            if (input.value.trim() !== "") {
              input.style.border = "0.5px solid red";
              input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
              errorDiv.textContent = 'This field is incorrect';
            } else {
              input.style.border = "0.5px solid red";
              input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
              errorDiv.textContent = 'This field is required';
            }
          }
          else {
            input.style.border = "";
            input.style.boxShadow = "";
            errorDiv.textContent = '';
          }
        }
          else if (input.id === "id_end_date") {
            if (!isEndDateValid) {
            if (input.value.trim() !== "") {
              input.style.border = "0.5px solid red";
              input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
              errorDiv.textContent = 'This field is incorrect';
            } else {
              input.style.border = "0.5px solid red";
              input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
              errorDiv.textContent = 'This field is required';
            }
          }
          else {
            input.style.border = "";
            input.style.boxShadow = "";
            errorDiv.textContent = '';
          }

          }
          
        }
      });
  
  
  
      input.addEventListener('input', function() {
        if (input !== emailAddressInput) {
          // Update the value with the first letter uppercase
          input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
        }
      });
    });
  };
  
myDisableClickFunction();
  
function checkInputs() {

  // const emailInput = document.getElementById('email-input');
  // const emailValue = emailInput.value.trim();
  // const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allJobDetailsInputsFilled = job_details_inputFields.every(input => input.value.trim() !== '');
  // const isFileUploaded = idLogo.files.length > 0;

  const startDateValue = document.getElementById('id_start_date').value.trim();
  const endDateValue = document.getElementById('id_end_date').value.trim();
  const isStartDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(startDateValue);
  const isEndDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(endDateValue);

   
  post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled || !isStartDateValid || !isEndDateValid;

//   post_a_job_firstNextButton.disabled = !allJobDetailsInputsFilled || fileInput.files.length === 0;


  if (post_a_job_firstNextButton.disabled === false) {

    // isValidEmail(email);
    post_a_job_firstNextButton.classList.add("second-next-button");
    first_job_description_post_a_job.style.pointerEvents = "auto";
    first_job_description_post_a_job.style.cursor = "pointer";
    post_a_job_firstNextButton.removeEventListener("click", myDisableClickFunction);
    first_job_description_post_a_job.addEventListener("click", firstJobDescriptionClickFunction);
    post_a_job_firstNextButton.addEventListener("click", firstNextClickFunction);
  }

  else {
    post_a_job_firstNextButton.addEventListener("click", myDisableClickFunction);
    
    post_a_job_firstNextButton.classList.remove("second-next-button");
    first_job_description_post_a_job.removeEventListener("click", firstJobDescriptionClickFunction);
    post_a_job_firstNextButton.removeEventListener("click", firstNextClickFunction);
    first_job_description_post_a_job.style.pointerEvents = "none";

  }

  // Add an event listener to the file inputs

}
window.onload = checkInputs;
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
