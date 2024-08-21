// const input1 = document.querySelector('.all-inputs1');
// const input2 = document.querySelector('.all-inputs2');
// const myButton = document.getElementById('next-button');

// function checkInputs() {
//   if (input1.value.trim() !== '' && input2.value.trim() !== '') {
//     myButton.addEventListener("click", function() {
//         window.location = "jobs.html";
//     })
//   } 
// }

const additional_feature_inputFields = Array.from(document.querySelectorAll('.positions-deadline-date-inputs'));
const post_a_job_submitButton = document.getElementById('additional-feature-submit-button');
var reserve_form_next = document.querySelector(".first-reserve-form");
var second_reserve_form_next = document.querySelector(".second-reserve-form");
var third_reserve_form_next = document.querySelector(".third-reserve-form");
var payment = document.querySelector(".second-payment");
var second_payment_div = document.querySelector(".second-payment-div");
var payment_1 = document.querySelector(".first-payment");
var payment_div_1 = document.querySelector(".first-payment-div");
var screening_question_div_1 = document.querySelector(".first-screening-question-div");
var screening_question_1 = document.querySelector(".first-screening-question");
var screening_question_div = document.querySelector(".second-screening-question-div");
var screening_question = document.querySelector(".second-screening-question");

second_payment_div.style.pointerEvents = "none";
screening_question_div.style.pointerEvents = "none";

// var myClickFunction = function() {
//   second_reserve_form_next.style.display = "none";
//   third_reserve_form_next.style.display = "block";
// }
// var myPaymentFunction = function() {
//     second_reserve_form_next.style.display = "none";
//     third_reserve_form_next.style.display = "block";
//     reserve_form_next.style.display = "none";
// }

var myDisableSecondClickFunction = function() {
  additional_feature_inputFields.forEach(input => {
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
    } else {

      if (input.id === 'id_deadline_date') {
        const deadlineDateValue = document.getElementById('id_deadline_date').value.trim();
        const isDeadlineDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(deadlineDateValue);
  
        if (!isDeadlineDateValid) {
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

      if (input.id !== "id_deadline_date") {
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
        const deadlineDateValue = document.getElementById('id_deadline_date').value.trim();
        const isDeadlineDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(deadlineDateValue);
      if (!isDeadlineDateValid) {
          if (input.value.trim() !== "") {
            input.style.border = "0.5px solid red";
            input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
            errorDiv.textContent = 'This email is invalid';
            errorDiv.style.marginTop = "4px";
          } else {
            input.style.border = "0.5px solid red";
            input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
            errorDiv.textContent = 'This field is required';
            errorDiv.style.marginTop = "4px";
          }
        } else {
          input.style.border = "";
          input.style.boxShadow = "";
          errorDiv.textContent = '';
          errorDiv.style.marginTop = "0px";
        }
      }
    });

  });
};

myDisableSecondClickFunction();

function checkInputs() {
  // const emailInput = document.getElementById('email-input');
  // const emailValue = emailInput.value.trim();
  // const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allAdditionalFeatureInputsFilled = additional_feature_inputFields.every(input => input.value.trim() !== '');
  const deadlineDateValue = document.getElementById('id_deadline_date').value.trim();
  const isDeadlineDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(deadlineDateValue);
  // const hasDomainExtension = emailValue.endsWith('.com') || emailValue.endsWith('.cn') || emailValue.endsWith('.xyz') || emailValue.endsWith('.net') // Modify as needed
  // const domainExtensionPattern = /\.(?:[a-zA-Z]{2,}|[^\s.]{2,})$/;

  // const hasDomainExtension = domainExtensionPattern.test(emailValue);

  post_a_job_submitButton.disabled = !allAdditionalFeatureInputsFilled || !isDeadlineDateValid;
  
  if (post_a_job_submitButton.disabled === false) {
    // isValidEmail(email);
    post_a_job_submitButton.classList.add("second-next-button");
    post_a_job_submitButton.removeEventListener("click", myDisableSecondClickFunction);
    addSubmitPostAJobListeners();

    // myButton.addEventListener("click", myClickFunction);
    // // payment_div.style.cursor = "pointer";
    // // payment_div_1.style.cursor = "pointer";
    // // payment_div.style.pointerEvents = "auto";  
    // // payment_div_1.style.pointerEvents = "auto";
    // screening_question_div.style.cursor = "pointer";
    // screening_question_div_1.style.cursor = "pointer";
    // screening_question_div.style.pointerEvents = "auto";
    // screening_question_div_1.style.pointerEvents = "auto";
    // screening_question.addEventListener("click", myPaymentFunction);
    // screening_question_div.addEventListener("click", myPaymentFunction);
    // screening_question_div_1.addEventListener("click", myPaymentFunction);

  }
  else {
    post_a_job_submitButton.addEventListener("click", myDisableSecondClickFunction);
    post_a_job_submitButton.removeEventListener("click", submitPostAJobFormHandler);

    post_a_job_submitButton.classList.remove("second-next-button");
    // myButton.removeEventListener("click", myClickFunction);
    // screening_question_1.removeEventListener("click", myPaymentFunction);
    // screening_question_div_1.removeEventListener("click", myPaymentFunction);
    // screening_question_div.style.pointerEvents = "none";
    // screening_question_div_1.style.pointerEvents = "none";

  }
}

function addSubmitPostAJobListeners() {
  // Add listeners responsible for form submission and UI changes
  post_a_job_submitButton.addEventListener("click", submitPostAJobFormHandler);
}

function submitPostAJobFormHandler() {
  document.getElementById('form-id').submit();
}

additional_feature_inputFields.forEach(input => input.addEventListener('input', checkInputs));

checkInputs();  
  