function MMDDYYYY(value) {
  // Remove non-digit characters
  value = value.replace(/\D/g, '');

  // Separate the month, day, and year
  var month = value.substr(0, 2);
  var day = value.substr(2, 2);
  var year = value.substr(4, 4);

  // Format the value with "/"
  var formattedValue = "";
  if (month) {
    formattedValue += month;
    if (month.length === 2 && day) {
      formattedValue += "/" + day;
      if (day.length === 2 && year) {
        formattedValue += "/" + year;
      }
    }
  }

  return formattedValue;
}

function HHMMSS(secondValue) {
  // Remove non-digit characters
  secondValue = secondValue.replace(/\D/g, '');

  // Separate the month, day, and year
  var month = secondValue.substr(0, 2);
  var day = secondValue.substr(2, 2);

  // Format the value with "/"          //    month.length === 2 &&   //
  var formattedValue = "";
  if (month) {
    formattedValue += month;
    if (day) {
      formattedValue += ":" + day;
    }
  }

  return formattedValue;
}

function YYMM(thirdValue) {
  // Remove non-digit characters
  thirdValue = thirdValue.replace(/\D/g, '');

  // Separate the month, day, and year
  var month = thirdValue.substr(0, 2);
  var day = thirdValue.substr(2, 2);

  // Format the value with "/"          //    month.length === 2 &&   //
  var formattedValue = "";
  if (month) {
    formattedValue += month;
    if (day) {
      formattedValue += ":" + day;
    }
  }

  return formattedValue;
}






//     function updateFormattedValue(value) {
//   var formattedValue = '';
//   var digitsOnly = value.replace(/\D/g, '');

//   if (digitsOnly.length > 0) {
//     formattedValue = digitsOnly.slice(0, 2);
//   }
//   if (digitsOnly.length > 2) {
//     formattedValue += '/' + digitsOnly.slice(2, 4);
//   }
//   if (digitsOnly.length > 4) {
//     formattedValue += '/' + digitsOnly.slice(4, 8);
//   }

//   var startDateInput = document.querySelectorAll('id_start_date');
//   startDateInput.value = formattedValue;
// }

// // Attach event listener to the start date input
// var startDateInput = document.getElementById('id_start_date');
// startDateInput.addEventListener('input', function(event) {
//   var inputValue = event.target.value;
//   updateFormattedValue(inputValue);
// });

// function MMDDYYYY(value, event) {
//   // Format input value to MM/DD/YYYY format
//   value = value.replace(/\D/g, '');
//   value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
//   return value;
// }
// function MMDDYYYY(input, event) {
//   var value = input.value;
//   var sanitizedValue = value.replace(/\D/g, '');
  
//   var month = sanitizedValue.substr(0, 2);
//   var day = sanitizedValue.substr(2, 2);
//   var year = sanitizedValue.substr(4, 4);
  
//   var formattedValue = '';
  
//   if (month.length > 0) {
//     formattedValue += month;
//     if (month.length === 2) {
//       formattedValue += '/';
//     }
//   }
  
//   if (day.length > 0) {
//     formattedValue += day;
//     if (day.length === 2) {
//       formattedValue += '/';
//     }
//   }
  
//   if (year.length > 0) {
//     formattedValue += year;
//   }
  
//   input.value = formattedValue;
// }


  
// function updateFormattedValue2(value) {
// var formattedValue2 = '';
// var digitsOnly2 = value.replace(/\D/g, '');

// if (digitsOnly2.length > 0) {
//   formattedValue2 = digitsOnly2.slice(0, 2);
// }
// if (digitsOnly2.length > 2) {
//   formattedValue2 += '/' + digitsOnly2.slice(2, 4);
// }
// if (digitsOnly2.length > 4) {
//   formattedValue2 += '/' + digitsOnly2.slice(4, 8);
// }

// var endDateInput = document.getElementById('id_end_date');
// endDateInput.value = formattedValue2;
// }

// Attach event listener to the start date input
// var endDateInput = document.getElementById('id_end_date');
// endDateInput.addEventListener('input', function(event) {
// var second_inputValue = event.target.value;
// updateFormattedValue2(second_inputValue);
// });


// <div title="You can add up to three questions for students" type="text" class=" add-question-button" onclick="showNextFormGroup()"><span style="padding-right: 10px;">+</span>Add Question</div>

// function updateFormattedValues(value, startDateInputId, endDateInputId) {
//   var formattedValue = '';
//   var digitsOnly = value.replace(/\D/g, '');

//   if (digitsOnly.length > 0) {
//     formattedValue = digitsOnly.slice(0, 2);
//   }
//   if (digitsOnly.length > 2) {
//     formattedValue += '/' + digitsOnly.slice(2, 4);
//   }
//   if (digitsOnly.length > 4) {
//     formattedValue += '/' + digitsOnly.slice(4, 8);
//   }

//   var startDateInput = document.getElementById(startDateInputId);
//   startDateInput.value = formattedValue;

//   var endDateInput = document.getElementById(endDateInputId);
//   endDateInput.value = formattedValue;
// }

// // Attach event listener to the start date input
// var startDateInput = document.getElementById('id_start_date');
// startDateInput.addEventListener('input', function(event) {
//   var inputValue = event.target.value;
//   updateFormattedValues(inputValue, 'id_start_date', 'id_end_date');
// });

// // Attach event listener to the end date input
// var endDateInput = document.getElementById('id_end_date');
// endDateInput.addEventListener('input', function(event) {
//   var secondInputValue = event.target.value;
//   updateFormattedValues(secondInputValue, 'id_start_date', 'id_end_date');
// });
// function updateFormattedValue(value, inputId) {
//   var formattedValue = '';
//   var digitsOnly = value.replace(/\D/g, '');

//   if (digitsOnly.length > 0) {
//     formattedValue = digitsOnly.slice(0, 2);
//   }
//   if (digitsOnly.length > 2) {
//     formattedValue += '/' + digitsOnly.slice(2, 4);
//   }
//   if (digitsOnly.length > 4) {
//     formattedValue += '/' + digitsOnly.slice(4, 8);
//   }

//   var input = document.getElementById(inputId);
//   input.value = formattedValue;
// }

// // Attach event listener to the start date input
// var startDateInput = document.getElementById('id_start_date');
// startDateInput.addEventListener('input', function(event) {
//   var inputValue = event.target.value;
//   updateFormattedValue(inputValue, 'id_start_date');

//   // Update the second input only if the first input is filled
//   if (inputValue.length === 8) {
//     var endDateInput = document.getElementById('id_end_date');
//     updateFormattedValue(inputValue, 'id_end_date');
//   }
// });


