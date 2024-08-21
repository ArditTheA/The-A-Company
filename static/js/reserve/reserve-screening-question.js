
// const selectElement = document.getElementsByClassName('screening-question-select-options');
// const third_next_button = document.querySelector('.third-next-button');
// const third_reserve_form_screening_question = document.querySelector(".third-reserve-form");
// const second_reserve_meet_with_us = document.querySelector(".second-reserve-form");
// const meet_with_us_form = document.querySelector(".meet-with-us-form");
// const enable_disable_meet_with_us = document.querySelectorAll(".meet-with-us-sq-page");
// const selects_Div = document.querySelector(".selects-div");
// const inputs_select = selects_Div.querySelectorAll(".inputs-selects-mutual");
// const selects = selects_Div.querySelectorAll('select');
// const inputs = selects_Div.querySelectorAll('input');

// var myDisableClickFunctionScreeningQuestion = function() {
//   inputs_select.forEach(input => {
    
//     const errorDivId = input.id + '.error-message';
//     let errorDiv = document.getElementById(errorDivId);

//     if (input.value.trim() === '') {
//       if (!errorDiv) {
//         errorDiv = document.createElement('div');
//         errorDiv.id = errorDivId;
//         errorDiv.classList.add('error-message');
//         errorDiv.style.color = "red";
//         errorDiv.style.fontSize = "14px";
//         errorDiv.style.marginTop = "4px";
//         input.parentNode.insertBefore(errorDiv, input.nextSibling);
//       } else {
//         errorDiv.textContent = 'This field is required';
//         input.style.border = "0.5px solid red";
//         input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";

//       }
//     } else {
      
//     }

//     input.addEventListener('focus', function() {
//       const errorDivId = input.id + '.error-message';
//       let errorDiv = document.getElementById(errorDivId);
//       input.style.border = "1px solid #1877f2";
//       input.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
//       errorDiv.textContent = '';
//     });

//     input.addEventListener('blur', function() {
//       const errorDivId = input.id + '.error-message';
//       let errorDiv = document.getElementById(errorDivId);
      
//       if (!errorDiv) {
//         errorDiv = document.createElement('div');
//         errorDiv.id = errorDivId;
//         errorDiv.classList.add('error-message');
//         errorDiv.style.color = "red";
//         errorDiv.style.fontSize = "14px";
//         errorDiv.style.marginTop = "4px";
//         input.parentNode.insertBefore(errorDiv, input.nextSibling);
//         input.style.border = "0.5px solid red";
//         input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
//         errorDiv.textContent = 'This field is required';
//     }
//       else {
//         input.style.border = "0.5px solid red";
//         input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
//         errorDiv.textContent = 'This field is required';
//       }

//       if (input.id !== "id_email") {
//         if (input.value.trim() === "") {

//         }
//         else {
//           input.style.border = "";
//           input.style.boxShadow = "";
//           errorDiv.textContent = '';
//         }
//       }
//     });

//   });

// };

// myDisableClickFunctionScreeningQuestion();


// function checkAllSelectsAndInputs() {
//   const allSelectsChosen = Array.from(selects).every(select => select.value !== "");
//   const allInputsFilled = Array.from(inputs).every(input => input.value.trim() !== "");

//   third_next_button.disabled = !allSelectsChosen || !allInputsFilled;

//   // Update button styles and event listeners based on the state
//   if (third_next_button.disabled === false) {
//     third_next_button.classList.add("third-next-button-2");
//     third_next_button.removeEventListener("click", myDisableClickFunctionScreeningQuestion);
//     addSubmitListeners();
//   } else {
//     third_next_button.classList.remove("third-next-button-2");
//     third_next_button.addEventListener("click", myDisableClickFunctionScreeningQuestion);
//   }
// }

// function addSubmitListeners() {
//   // Add listeners responsible for form submission and UI changes
//   third_next_button.addEventListener("click", submitFormHandler);
//   enable_disable_meet_with_us.forEach(button => {
//     button.addEventListener("click", meetWithUsHandler);
//   });
// }


// function submitFormHandler() {
//   document.getElementById('answerForm').submit();
//   third_reserve_form_screening_question.style.display = "none";
//   meet_with_us_form.style.display = "block";
//   return false;
// }

// function meetWithUsHandler() {
//   third_reserve_form_screening_question.style.display = "none";
//   second_reserve_meet_with_us.style.display = "none";
//   meet_with_us_form.style.display = "block";
// }

// // Add event listeners for select and input change events
// selects.forEach(select => {
//   select.addEventListener('change', checkAllSelectsAndInputs);
// });

// inputs.forEach(input => {
//   input.addEventListener('input', checkAllSelectsAndInputs);
// });

// checkAllSelectsAndInputs();
