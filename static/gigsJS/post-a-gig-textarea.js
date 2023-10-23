var first_Post_a_Job_Form = document.querySelector(".first-post-a-gig-form");
// var AdditionalFeatureForm = document.querySelector(".additional-feature-form");
var post_a_job_secondNextButton = document.getElementById('next-button-job-description');
// var first_additional_feature = document.querySelector(".first-additional-feature");
// var second_additional_feature =  document.querySelector(".second-additional-feature");
var second_Post_A_Job_Form =  document.querySelector(".second-post-a-gig-form");
var additional_Feature_Form =  document.querySelector(".location-form");
const first_location_div = document.querySelector(".first-location-div");
const second_location_div = document.querySelector(".second-location-div");
first_location_div.style.pointerEvents = "none";
var additionalFeatureClick = function() {
  second_Post_A_Job_Form.style.display = "none";
    additional_Feature_Form.style.display = "block";
}

var firstAdditionalFeatureClick = function() {
  second_Post_A_Job_Form.style.display = "none";
  additional_Feature_Form.style.display = "block";
}

const firstLocationDiv = function() {
  first_Post_a_Job_Form.style.display = "none";
  additional_Feature_Form.style.display = "block";
 }
const secondLocationDiv = function() {
  second_Post_A_Job_Form.style.display = "none";
  additional_Feature_Form.style.display = "block";
}


function validateTextarea() {
    var textarea = document.getElementById("description");
    var textareaValue = textarea.value.trim();
    // var textareaValue = textarea.value.replace(/\s/g, ''); // Remove whitespace characters
    if (textareaValue.length >= 32) {

      second_Post_A_Job_Form.style.display = "none";
      additional_Feature_Form.style.display = "block";

        // textarea.style.border = "1px solid red";
    }
    else {
      alert("Textarea must contain at least 32 characters.");
      //   secondPostAJobForm.style.display = "block";
      //   AdditionalFeatureForm.style.display = "none";
        return false; // Prevent default link behavior  
        
    }

        // Continue with your desired next action here
  }

  function updateNextButton() {
    var textarea = document.getElementById("description");
    var textareaValue = textarea.value.trim();
    
    if (textareaValue.length >= 32) {
      first_location_div.addEventListener("click", firstLocationDiv);
      first_location_div.style.pointerEvents = "auto";
      first_location_div.style.cursor = "pointer";
      second_location_div.addEventListener("click", secondLocationDiv);
      second_location_div.style.pointerEvents = "auto";
      second_location_div.style.cursor = "pointer";

        post_a_job_secondNextButton.classList.add("second-next-button");
        second_additional_feature.addEventListener("click", additionalFeatureClick);
        second_additional_feature.style.pointerEvents = "auto";
        second_additional_feature.style.cursor = "pointer";
    } else {
      first_location_div.removeEventListener("click", firstLocationDiv);
      first_location_div.style.pointerEvents = "none";
      first_location_div.style.cursor = "none";
      second_location_div.removeEventListener("click", secondLocationDiv);
      second_location_div.style.pointerEvents = "none";
      second_location_div.style.cursor = "none";
        post_a_job_secondNextButton.classList.remove("second-next-button");
        second_additional_feature.removeEventListener("click", additionalFeatureClick);
        second_additional_feature.style.pointerEvents = "none";
        second_additional_feature.style.cursor = "none";  


    }
  }
  
  