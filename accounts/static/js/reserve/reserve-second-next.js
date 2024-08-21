const inputFields = Array.from(document.querySelectorAll('.mutual-input'));
const myButton = document.getElementById('next-button');
const phoneNumber = document.getElementById("phone-input");
const emailAddressInput = document.getElementById('id_email');
const select_country_mutual = document.getElementById('id_country');
var second_reserve_form_next = document.querySelector(".second-reserve-form");
var third_reserve_form_next = document.querySelector(".third-reserve-form");
var screening_question_div_1 = document.querySelector(".first-screening-question-div");
var screening_question_div = document.querySelector(".second-screening-question-div");
var screening_question = document.querySelector(".second-screening-question");

screening_question_div.style.pointerEvents = "none";

var myClickFunction = function() {
  second_reserve_form_next.style.display = "none";
  third_reserve_form_next.style.display = "block";
}
var myPaymentFunction = function() {
    second_reserve_form_next.style.display = "none";
    third_reserve_form_next.style.display = "block";
    reserve_form_next.style.display = "none";
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
        errorDiv.style.marginTop = "0px";
        input.parentNode.parentNode.insertBefore(errorDiv, input.parentNode.nextSibling);
      } else {
        input.style.border = "0.5px solid red";
        input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
        errorDiv.textContent = 'This field is required';
        errorDiv.style.marginTop = "4px";

      }
    } else {
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
      if (input.id === "phone-input") {
        if (input.value.length < 12) {
          input.style.border = "0.5px solid red";
          input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
          errorDiv.textContent = 'This field is incorrect';
          errorDiv.style.marginTop = "4px";
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
        if (input.id !== "phone-input") {
          input.parentNode.insertBefore(errorDiv, input.nextSibling);

        }
        else {
          input.parentNode.parentNode.insertBefore(errorDiv, input.parentNode.nextSibling);
        }
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

      if (input.id !== "id_email") {
        if (input.value.trim() === "") {
            errorDiv.style.marginTop = "4px";

        }
        else {
          if (input.id !== "phone-input") {
          input.style.border = "";
          input.style.boxShadow = "";
          errorDiv.textContent = '';
          errorDiv.style.marginTop = "0px";
          }
          else {
              if (input.value.length < 12) {
                input.style.border = "0.5px solid red";
                input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
                errorDiv.textContent = 'This field is incorrect';
                errorDiv.style.marginTop = "4px";
              }
              else {
                input.style.border = "";
                input.style.boxShadow = "";
                errorDiv.textContent = '';
              }
          }
        }
      } else {
        const emailValue = input.value.trim();
        const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
        if (!isEmailValid) {
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
  const emailInput = document.getElementById('id_email');
  const emailValue = emailInput.value.trim();
  const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allInputsFilled = inputFields.every(input => input.value.trim() !== '');
  myButton.disabled = !allInputsFilled || !isEmailValid || phoneNumber.value.length < 12;
  
  
  if (myButton.disabled === false) {
    // isValidEmail(email);
    myButton.classList.add("second-next-button");
    myButton.style.cursor = "pointer";
    myButton.style.pointerEvents = "auto";
    myButton.addEventListener("click", myClickFunction);

    screening_question_div.style.cursor = "pointer";
    screening_question_div.style.pointerEvents = "auto";
    screening_question_div.addEventListener("click", myClickFunction);
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