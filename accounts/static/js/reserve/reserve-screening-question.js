
  const selectElement = document.getElementById('screening-question-select-options');
  const third_next_button = document.querySelector('.third-next-button');
  const third_reserve_form_screening_question = document.querySelector(".third-reserve-form");
  const fourth_reserve_form_screening_question = document.querySelector(".fourth-reserve-form");
  // const third_payment_div = document.querySelector(".third-payment-div");
  // const third_payment = document.querySelector(".third-payment");
  const under_select_university_student_status = document.querySelector(".under-select-university-student-status");
  

//   var paymentDivFunction = function() {
//     third_reserve_form_screening_question.style.display = "none";
//     first_reserve_form.style.display = "none";
//     second_reserve_form.style.display = "none";
//     fourth_reserve_form_screening_question.style.display = "block";

// }


  // third_payment_div.style.pointerEvents = "none";
  // third_payment_div.style.cursor = "pointer";

  selectElement.addEventListener('change', function() {
    if (selectElement.value !== "") {
        // third_payment_div.style.pointerEvents = "auto";
        third_next_button.classList.add("third-next-button-2");
        
        // third_payment.classList.add("third-payment-enable");
        // third_payment_div.style.pointerEvents = "auto";
        // third_next_button.addEventListener("click", paymentDivFunction);
        // third_payment_div.addEventListener("click", paymentDivFunction);
        // second_payment_div.addEventListener("click", paymentDivFunction);
        // payment_div.addEventListener("click", paymentDivFunction);
        // under_select_university_student_status.style.display = "none";

    }
    // else if (selectElement.value == 'No') {
    //   third_next_button.classList.remove("third-next-button-2");
    //   third_payment_div.style.pointerEvents = "none";
    //   second_payment_div.style.pointerEvents = "none";
    //   payment_div.style.pointerEvents = "none";
    //   third_next_button.removeEventListener("click", paymentDivFunction);
    //   third_payment_div.removeEventListener("click", paymentDivFunction);
    //   second_payment_div.removeEventListener("click", paymentDivFunction);
    //   payment_div.removeEventListener("click", paymentDivFunction);
    //   under_select_university_student_status.style.display = "block";
    // }
  });
