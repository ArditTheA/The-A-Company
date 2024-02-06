var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

document.getElementById('addMonthButton').addEventListener('click', addMonth);

function addMonth() {
  if (currentMonth === 11) { // December
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  
  var formattedMonth = ('0' + (currentMonth + 1)).slice(-2); // Add leading zero if needed
  var newDate = new Date(currentYear, currentMonth);
  var monthName = newDate.toLocaleString('default', { month: 'long' });
  var year = newDate.getFullYear();
  
  var resultElement = document.getElementById('result');
  resultElement.innerHTML += monthName + ' ' + year + '<br>';
}
