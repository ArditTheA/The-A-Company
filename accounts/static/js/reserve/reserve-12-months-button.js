const container2 = document.querySelector(".months-div");
const items2 = container2.querySelectorAll(".month-button");
const outsideBtn2 = document.getElementById("12_months_button");

function selectAllElements() {
  // select first 6 items
  for (let i = 0; i < 12; i++) {
    if (items2[i]) {
      items2[i].classList.add("selected");
    }
  }
}


function clearSelection2() {
  // remove "selected" class from all items
  items2.forEach(item => item.classList.remove("selected"));
}

// add click event listener to outside button
outsideBtn2.addEventListener("click", () => {
  clearSelection2();
  selectAllElements();
  selectFirstSixElements.remove();
  outsideBtn2.style.border = "1px solid #1877F2";
  outsideBtn2.style.color = "#1877F2";

});

