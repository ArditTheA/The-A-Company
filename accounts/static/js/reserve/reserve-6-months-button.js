const container = document.querySelector(".months-div");
const items = container.querySelectorAll(".month-button");
const outsideBtn = document.getElementById("6_months_button");

function selectFirstSixElements() {
  // select first 6 items
  for (let i = 0; i < 6; i++) {
    if (items[i]) {
      items[i].classList.add("selected");
      items[i]++
    }
  }
}

function clearSelection() {
  // remove "selected" class from all items
  items.forEach(item => item.classList.remove("selected"));
}

// add click event listener to outside button
outsideBtn.addEventListener("click", () => {
  clearSelection();
  selectFirstSixElements();

});

// add click event listener to all items
items.forEach(item => item.addEventListener("click", () => {
  items[i].classList.add("selected");
}));

// add click event listener to all items
items.forEach(item => item.addEventListener("click", () => {
  selectFirstSixElements.call(item);
  items[i].classList.add("selected");
}));