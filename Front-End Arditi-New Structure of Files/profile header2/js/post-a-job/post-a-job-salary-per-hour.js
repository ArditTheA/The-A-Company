  // function displaySalary() {
    
  //   // Retrieve the input field element
  //   var salaryInput = document.getElementById("salaryInput");

  //   // Retrieve the value entered in the input fields
  //   var salaryValue = salaryInput.value;

  //   // Retrieve the caret (cursor) position within the input field
  //   var caretPos = salaryInput.selectionStart;

  //   // Remove any non-digit characters from the entered value
  //   var cleanedValue = salaryValue.replace(/(\.\d*\.|\.)+/g, '.');

  //   // Extract the first number found in the cleaned value
  //   var numberMatch = cleanedValue.match(/[\d.]+/);
  //   var number = numberMatch ? numberMatch[0] : '';

  //   // Set the value of the input field with the extracted number preceded by "$" and followed by "/hour"
  //   salaryInput.value = number ? "$" + number + "/hour" : '';

  //   // Calculate the new caret (cursor) position based on the length of the extracted number
  //   var newCaretPos = number.length + 1; // Add 1 to account for the additional "$" symbol

  //   // Set the caret (cursor) position within the input field
  //   salaryInput.setSelectionRange(newCaretPos, newCaretPos);


  //   if (salaryInput.value.trim() == "") {
        
  //   }
  // }


  
