
function updateTime() {
  // Create a new Date object
  var currentTime = new Date();

  // Get the hours, minutes, and seconds
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  // Format the time
  var formattedTime = hours + ":" + minutes + " " + "pm";

  // Update the content of the div
  document.getElementById("time-display").textContent = formattedTime;
}


function clickCheckInButton()  {
  window.location = "timestamp.html";
  updateTime();
    // var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // document.getElementById('time-display').textContent = currentTime;
// Function to update the time every second
    
}
