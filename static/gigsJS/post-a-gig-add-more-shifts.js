// Get the "Add Shift" button element
var addShiftButton = document.querySelector('.add-shift-button');

// Initialize the shift count
var shiftCount = 1;

// Add an event listener to the "Add Shift" button
addShiftButton.addEventListener('click', function() {
  // Increment the shift count
  shiftCount++;

  // Clone the existing shift element
  var shiftElement = document.querySelector('#shift1').cloneNode(true);

  // Generate the unique id for the cloned shift element
  var shiftId = 'shift' + shiftCount;
  shiftElement.setAttribute('id', shiftId);

  var shiftClass = 'shift' + shiftCount;
  shiftElement.setAttribute('class', shiftClass);

  // Update the shift number in the cloned shift element
  var shiftNumberElement = shiftElement.querySelector('.shift');
  shiftNumberElement.textContent = 'Shift ' + shiftCount;

  // Update the ids of the inputs in the cloned shift element
  var inputs = shiftElement.querySelectorAll('input');
  inputs.forEach(function(input) {
    var inputId = input.getAttribute('id');
    var newInputId = inputId.slice(0, -1) + shiftCount;
    input.setAttribute('id', newInputId);
    input.setAttribute('name', newInputId);
    input.value = null;
  });

  var shiftsDiv = document.querySelector(".shifts-div");
  shiftsDiv.appendChild(shiftElement);
});