const first_Post_a_Job_Form = document.querySelector(".first-post-a-job-form");
const secondPostAJobForm = document.querySelector(".second-post-a-job-form");
const AdditionalFeatureForm = document.querySelector(".additional-feature-form");
const post_a_job_secondNextButton = document.getElementById('next-button-job-description');
const first_additional_feature = document.querySelector(".first-additional-feature");
const second_additional_feature =  document.querySelector(".second-additional-feature");
const second_Post_A_JobForm =  document.querySelector(".second-post-a-job-form");
const additional_Feature_Form =  document.querySelector(".additional-feature-form");

var additionalFeatureClick = function() {
    second_Post_A_JobForm.style.display = "none";
    additional_Feature_Form.style.display = "block";
}

var firstAdditionalFeatureClick = function() {
  first_Post_a_Job_Form.style.display = "none";
  second_Post_A_JobForm.style.display = "none";
  additional_Feature_Form.style.display = "block";
}

function validateTextarea() {
    var textarea = document.getElementById("descriptionArea");
    var textareaValue = textarea.value.trim();
    // var textareaValue = textarea.value.replace(/\s/g, ''); // Remove whitespace characters
    if (textareaValue.length < 32) {

        // textarea.style.border = "1px solid red";
      alert("Textarea must contain at least 32 characters.");
    //   secondPostAJobForm.style.display = "block";
    //   AdditionalFeatureForm.style.display = "none";
      return false; // Prevent default link behavior
    }
    else {
        secondPostAJobForm.style.display = "none";
        AdditionalFeatureForm.style.display = "block";
    }

        // Continue with your desired next action here
  }

  function updateNextButton() {
    var textarea = document.getElementById("descriptionArea");
    var textareaValue = textarea.value.trim();
    
    if (textareaValue.length >= 32) {
        post_a_job_secondNextButton.classList.add("second-next-button");
        first_additional_feature.addEventListener("click", firstAdditionalFeatureClick);
        second_additional_feature.addEventListener("click", additionalFeatureClick);
        first_additional_feature.style.pointerEvents = "auto";
        second_additional_feature.style.pointerEvents = "auto";
        first_additional_feature.style.cursor = "pointer";
        second_additional_feature.style.cursor = "pointer";
    } else {
        post_a_job_secondNextButton.classList.remove("second-next-button");
        first_additional_feature.removeEventListener("click", firstAdditionalFeatureClick);
        second_additional_feature.removeEventListener("click", additionalFeatureClick);
        first_additional_feature.style.pointerEvents = "none";
        first_additional_feature.style.cursor = "none";
        second_additional_feature.style.pointerEvents = "none";
        second_additional_feature.style.cursor = "none";


    }
  }
  
  