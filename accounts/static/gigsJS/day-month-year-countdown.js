    // Set the target date
    var targetDate = new Date("2023-03-01T00:00:00");
                
                    //    or    //

        // var countDownDate = new Date("Mar 1, 2023 00:00:00");


    // Update the count down every 1 second

    var x = setInterval(function() {
      // Get the current date and time
      var currentDate = new Date().getTime();
      
      // Calculate the difference between the current and target dates in milliseconds
      var diff = targetDate - currentDate;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);
        var day = document.createElement("span");
        day.classList.add("day_number");
        day.textContent = "days";
      
      var hour = "hours";
      var minute = "minutes";
    //   var second = document.createElement("span");
    //     second.id = "second_number";
    //   second.textContent = "seconds";
    //   var ssecond = second.textContent;
    var second = "seconds";
      let text = "HELLO WORLD";

    //   var str = "test1/test2/test3";
      var old_string = 'abc123';
      var x = document.getElementById("countdown");
    
      // Display the result
      document.getElementById("over-countdown").innerHTML = "Apply for Work and Travel.";

      document.querySelector("#over-countdown").style.padding = "8px 0px 3px 0px";

      document.getElementById("countdown").innerHTML = days + " " + day.textContent + ", " + hours + " " + hour + ", "
      + minutes + " " + minute + ", " + seconds + " " + "second" + " " + "left.";

      document.querySelector("#countdown").style.paddingBottom = "8px";

      if (days < 2) {
        document.getElementById("countdown").innerHTML = days + " " + day.textContent + ", " + hours + " " + hour + ", "
      + minutes + " " + minute + ", " + seconds + " " + "seconds" + " " + "left.";

      }
    if (hours < 2) {
        document.getElementById("countdown").innerHTML = days + " " + day.textContent + ", " + hours + " " + "hour" + ", "
      + minutes + " " + minute + ", " + seconds + " " + "seconds" + " " + "left.";

}
    if (minutes < 2) {
    document.getElementById("countdown").innerHTML = days + " " + day.textContent + ", " + hours + " " + hour + ", "
      + minutes + " " + "minute" + ", " + seconds + " " + "seconds" + " " + "left.";


}
    if (seconds < 2) {

        // ssecond = ssecond.substring(0, ssecond.length - 1);
        // second = second.replace('seconds', 'second');
        // console.log(second);

    // var newSecond = $('<span />').addClass('second_number');
    // document.getElementById("countdown").appendChild(newSecond);
    // $(".second_number").text("second");
    document.getElementById("countdown").innerHTML = days + " " + day.textContent + ", " + hours + " " + hour + ", "
      + minutes + " " + minute + ", " + seconds + " " + "second" + " " + "left.";

}
//     if (day >= 2 && hours >= 2 && minutes >= 2 && seconds >= 2) {          
//       document.getElementById("countdown").innerHTML = days + " " + day.textContent + ", " + hours + " " + hour + ", "
//       + minutes + " " + minute + ", " + seconds + " " + second.textContent + " " + "left.";
// }

      // If the count down is finished, write some text
      if (diff < 0) {
        clearInterval(x);
        $('.under-header-wishes').remove();

      }

    });
