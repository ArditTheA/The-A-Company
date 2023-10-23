  // // Get the input and the shift type div
  // const inputNumber = document.getElementById('number_of_workers');
  // const shiftType = document.getElementById('shift-type');

  // // Listen for changes in the input field
  // inputNumber.addEventListener('change', function() {
  //   const inputValue = inputNumber.value;
  //   // if (inputValue === 1) {
  //   //     shiftType.textContent = shiftType.textContent;
  //   // }
  //   shiftType.textContent = 'x' + inputValue + ' ' + shiftType.textContent;

  // });

  // Get the input and the shift type div
  const inputNumber = document.getElementById('number_of_workers');
  const shiftType = document.getElementById('shift-type');
  const salaryPerHour = document.getElementById("");

  // Store the initial shift type content
  const initialShiftTypeContent = shiftType.textContent;

  // Listen for changes in the input field
  inputNumber.addEventListener('input', function() {
    const inputValue = inputNumber.value;
    shiftType.textContent = 'x' + inputValue + ' ' + initialShiftTypeContent;
  });

  salaryPerHour.addEventListener('input', function() {
    const inputValue = inputNumber.value;
    shiftType.textContent = 'x' + inputValue + ' ' + initialShiftTypeContent;
  });


