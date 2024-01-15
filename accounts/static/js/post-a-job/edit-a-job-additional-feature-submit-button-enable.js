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


function validateEmail() {
  var emailInput = document.getElementById("emailInput");
  var email = emailInput.value;

  if (email === "") {
    alert("Please enter an email address.");
  } else if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
  } else {
    alert("Email is valid: " + email);
  }
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkInputs() {
  // const emailInput = document.getElementById('email-input');
  // const emailValue = emailInput.value.trim();
  // const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allAdditionalFeatureInputsFilled = additional_feature_inputFields.every(input => input.value.trim() !== '');
  const deadlineDateValue = document.getElementById('id_deadline').value.trim();
  const isDeadlineDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(deadlineDateValue);
  // const hasDomainExtension = emailValue.endsWith('.com') || emailValue.endsWith('.cn') || emailValue.endsWith('.xyz') || emailValue.endsWith('.net') // Modify as needed
  // const domainExtensionPattern = /\.(?:[a-zA-Z]{2,}|[^\s.]{2,})$/;

  // const hasDomainExtension = domainExtensionPattern.test(emailValue);

  post_a_job_submitButton.disabled = !allAdditionalFeatureInputsFilled || !isDeadlineDateValid;
  
  if (post_a_job_submitButton.disabled === false) {
    // isValidEmail(email);
    post_a_job_submitButton.classList.add("second-next-button");
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
    post_a_job_submitButton.classList.remove("second-next-button");
    // myButton.removeEventListener("click", myClickFunction);
    // screening_question_1.removeEventListener("click", myPaymentFunction);
    // screening_question_div_1.removeEventListener("click", myPaymentFunction);
    // screening_question_div.style.pointerEvents = "none";
    // screening_question_div_1.style.pointerEvents = "none";

  }
}

additional_feature_inputFields.forEach(input => input.addEventListener('input', checkInputs));

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
  
  