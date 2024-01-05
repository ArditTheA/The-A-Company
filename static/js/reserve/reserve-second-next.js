const inputFields = Array.from(document.querySelectorAll('.mutual-input'));
const myButton = document.getElementById('next-button');
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


function checkInputs() {
  const emailInput = document.getElementById('id_email');
  const phoneNumber = document.getElementById("phone-input");
  const emailValue = emailInput.value.trim();
  const isEmailValid = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const allInputsFilled = inputFields.every(input => input.value.trim() !== '');
  myButton.disabled = !allInputsFilled || !isEmailValid || phoneNumber.value.length < 6;
  
  
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
    myButton.removeEventListener("click", myClickFunction);
    screening_question_div.removeEventListener("click", myClickFunction);
    screening_question_div.style.pointerEvents = "none";

  }
}
window.onload = checkInputs;
inputFields.forEach(input => input.addEventListener('input', checkInputs));