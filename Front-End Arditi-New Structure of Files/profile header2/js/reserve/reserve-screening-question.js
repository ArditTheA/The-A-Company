
const selectElement = document.getElementsByClassName('screening-question-select-options');
const third_next_button = document.querySelector('.third-next-button');
const third_reserve_form_screening_question = document.querySelector(".third-reserve-form");
const second_reserve_meet_with_us = document.querySelector(".second-reserve-form");
const meet_with_us_form = document.querySelector(".meet-with-us-form");
const enable_disable_meet_with_us = document.querySelectorAll(".meet-with-us-sq-page");
const selects_Div = document.querySelector(".selects-div");
const selects = selects_Div.querySelectorAll('select');
const inputs = selects_Div.querySelectorAll('input');
let allSelectsAndInputsFilled = false;

for (let i = 0; i < selects.length; i++) {
  selects[i].addEventListener('change', checkAllSelectsAndInputs);
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', checkAllSelectsAndInputs);
}

function checkAllSelectsAndInputs() {
  // Check if all select elements have a value chosen
  const allSelectsChosen = Array.from(selects).every(select => select.value !== "");


  // Check if all input elements are filled
  const allInputsFilled = Array.from(inputs).every(input => input.value.trim() !== "");

  // Update the combined condition
  allSelectsAndInputsFilled = allSelectsChosen && allInputsFilled;

  if (allSelectsAndInputsFilled) {
    third_next_button.classList.add("third-next-button-2");
    third_next_button.addEventListener("click", function() {
        document.getElementById('answerForm').submit();
        return false;
    });
  
    // third_next_button.addEventListener("click", function() {
    //   third_reserve_form_screening_question.style.display = "none";
    //   meet_with_us_form.style.display = "block";
    // });

    enable_disable_meet_with_us[i].addEventListener("click", function() {
      third_reserve_form_screening_question.style.display = "none";
      second_reserve_meet_with_us.style.display = "none";
      meet_with_us_form.style.display = "block";
    });
  } else {
    third_next_button.classList.remove("third-next-button-2");
  }
}