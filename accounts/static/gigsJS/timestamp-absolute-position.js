function calculateTimeStampPosition() {
    const timeDifferenceDiv = document.querySelector('.time-difference-div');
    const timestampDivForm = document.querySelector('.timestamp-div-main-form');
  
    // Calculate the height of div2
    const halfDiv2Height = timestampDivForm.clientHeight * 0.5;
  
    // Set the height of div1 to 50% of its own height plus half of div2's height
    timeDifferenceDiv.style.top = `calc(50% - ${halfDiv2Height}px)`;
  }
  calculateTimeStampPosition();
  