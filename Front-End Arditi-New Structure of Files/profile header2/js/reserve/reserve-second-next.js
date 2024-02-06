const inputFields = Array.from(document.querySelectorAll('.mutual-input'));
const myButton = document.getElementById('next-button');
var second_reserve_form_next = document.querySelector(".second-reserve-form");
var third_reserve_form_next = document.querySelector(".third-reserve-form");
var screening_question_div_1 = document.querySelector(".first-screening-question-div");
var screening_question_div = document.querySelector(".second-screening-question-div");
var screening_question = document.querySelector(".second-screening-question");

// second_payment_div.style.pointerEvents = "none";
screening_question_div.style.pointerEvents = "none";

var myClickFunction = function() {
  second_reserve_form_next.style.display = "none";
  third_reserve_form_next.style.display = "block";
}

var myDisableClickFunction = function() {
  inputFields.forEach(input => {
    const errorDivId = input.id + '-error-message';
    let errorDiv = document.getElementById(errorDivId);

    if (input.value.trim() === '') {
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = errorDivId;
        errorDiv.classList.add('error-message');
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "14px";
        errorDiv.textContent = 'This field is required';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
      } else {
        errorDiv.textContent = 'This field is required'; // Update error message
      }
    } else if (!isEmailValid) {
      errorDiv.textContent = 'This field is not fully completed';
    } else {
      errorDiv.textContent = '';
    }

    // Remove error div when typing starts
    input.addEventListener('input', function() {
      if (errorDiv) {
        if (input.value.trim() === '') {
          errorDiv.textContent = 'This field is required';
        } else {
          errorDiv.textContent = '';
        }
      }
    });
  });
}
var myPaymentFunction = function() {
    second_reserve_form_next.style.display = "none";
    third_reserve_form_next.style.display = "block";
}

function checkInputs() {
  const emailInput = document.getElementById('id_email');
  const emailValue = emailInput.value.trim();
  const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allInputsFilled = inputFields.every(input => input.value.trim() !== '');
  // const domainExtensionPattern = /\.(?:[a-zA-Z]{2,}|[^\s.]{2,})$/;

  // const hasDomainExtension = domainExtensionPattern.test(emailValue);

  myButton.disabled = !allInputsFilled || !isEmailValid;
  
  if (myButton.disabled === false) {
    // isValidEmail(email);
    myButton.classList.add("second-next-button");
    myButton.addEventListener("click", myClickFunction);
    screening_question_div.style.cursor = "pointer";
    screening_question_div.style.pointerEvents = "auto";
    screening_question_div.addEventListener("click", myClickFunction);
    myButton.removeEventListener("click", myDisableClickFunction);

  }
  else {
    myButton.classList.remove("second-next-button");
    myButton.addEventListener("click", myDisableClickFunction);
    myButton.removeEventListener("click", myClickFunction);
    screening_question_div.removeEventListener("click", myClickFunction);
    screening_question_div.style.pointerEvents = "none";

  }
}
window.onload = checkInputs;
inputFields.forEach(input => input.addEventListener('input', checkInputs));
