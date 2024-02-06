// var monthsDiv = document.querySelector('.months-div');
// if (monthsDiv) {
//   monthsDiv.parentNode.removeChild(monthsDiv);
// }

// // Create the new HTML structure
// var newMonthsDiv = document.createElement('div');
// newMonthsDiv.className = 'months-div';

// var monthNames = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'
// ];

// // Get the current month and year
// var currentDate = new Date();
// var currentMonth = currentDate.getMonth();
// var currentYear = currentDate.getFullYear();

// for (var i = 0; i < 12; i++) {
//   var monthButton = document.createElement('div');
//   monthButton.className = 'duration-buttons choose-month-buttons month-button';
//   monthButton.style.borderRadius = '25px';

//   var monthName = document.createElement('div');
//   monthName.textContent = monthNames[currentMonth];
  
//   var year = document.createElement('div');
//   year.textContent = currentYear;
//   year.style.marginTop = '2px';

//   monthButton.appendChild(monthName);
//   monthButton.appendChild(year);

//   newMonthsDiv.appendChild(monthButton);

//   // Update current month and year for the next iteration
//   currentMonth++;
//   if (currentMonth === 12) {
//     currentMonth = 0;
//     currentYear++;
//   }
// }

// // Add the new HTML code to the document
// var monthsContainer = document.getElementById('monthsContainer');
// monthsContainer.appendChild(newMonthsDiv);