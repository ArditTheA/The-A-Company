const starImages = document.querySelectorAll('.star-image');
const rate_button_pop_up = document.querySelector(".rate-button-pop-up");


starImages.forEach((starImage, index) => {
  starImage.addEventListener('click', () => {
    for (let i = index; i < starImages.length; i++) {
      starImages[i].src = "/static/img/Star 1.png";  // Update the path here
    }
    console.log("--------");
      console.log(index+1);
      console.log("--------");
    for (let i = 0; i <= index; i++) {
      starImages[i].src = "/static/img/Star 6.png";  // Update the path here
      
    }
    inputRate = document.getElementById("rateValue");
    inputRate.value=index+1;
   
  });
});
