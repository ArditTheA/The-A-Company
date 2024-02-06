const container5 = document.querySelector(".months-div");
const items5 = container5.querySelectorAll(".month-button");
var all_buttons = document.querySelectorAll(".choose-duration");
const outsideBtn5 = document.getElementById("18_months_button");
var submit_button_reserve5 = document.querySelector(".submit-button");
var reserve_form = document.querySelector(".reserve-form");
var second_reserve_form = document.querySelector(".second-reserve-form");
var contact_information = document.querySelector(".contact-information");
var contact_information_div = document.querySelector(".contact-information-div");
// var payment = document.querySelector(".first-payment");
// var payment_div = document.querySelector(".first-payment-div");
// var screening_questions = document.querySelector(".first-screening-questions");
// var screening_questions_div = document.querySelector(".first-screening-questions-div");
var first_next_button = document.querySelector(".first-next-button");
var isClickable3 = true;
const filteredElements5 = Array.from(items5).slice(0, 12);


contact_information_div.style.pointerEvents = "none";
payment_div.style.pointerEvents = "none";
screening_questions_div.style.pointerEvents = "none";


function selectSixElements5() {
  const selectedElement = this;
  const index = Array.from(items5).indexOf(selectedElement);

  // select 18 items
  for (let i = index; i < index + 18; i++) {
    if (items5[i]) {
      items5[i].classList.add("selected");
    }
  }
}

var contactInformationDiv = function() {
  reserve_form.style.display = "none";
  second_reserve_form.style.display = "block";
}

var nextButtonFunction = function() {
  reserve_form.style.display = "none";
  second_reserve_form.style.display = "block";
  contact_information_div.style.cursor = "pointer";
}


function clearSelection5() {
    // remove "selected" class from all items
    items5.forEach(item => item.classList.remove("selected"));
}

outsideBtn5.addEventListener("click", removeItems);

  
// items4[i].style.border = "1px solid #D4D5D6";
// items4[i].style.color = "#858585";    

// add click event listener to all items
outsideBtn5.addEventListener("click", () => {
  if (isClickable3) {
    outsideBtn3.addEventListener("click", removeItems);
    outsideBtn4.addEventListener("click", removeItems);
    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        const startIndex = index;
        const endIndex = Math.min(startIndex + 17, items.length - 1);
        const numItemsToSelect = endIndex - startIndex + 1;
        
        // Check if additional items need to be added
        if (numItemsToSelect <= 18) {
          const numItemsToAdd = 18 - numItemsToSelect;
          
          // Remove previously added items
          addedItems.forEach(addedItem => {
            addedItem.remove();
          });
          // addedItems = [];
          
  
          // Add new items
          for (let i = endIndex + 1; i <= endIndex + numItemsToAdd; i++) {
            // addMonth(i);
            const newItem = createNewItem(i);
            container.appendChild(newItem);
            addedItems.push(newItem);
          }
        }
        
        deselectAllElements2();
        selectElements2(startIndex, numItemsToSelect);
        outsideBtn5.removeEventListener("click", removeItems);
        outsideBtn3.addEventListener("click", removeItems);
        outsideBtn4.addEventListener("click", removeItems);

      });
    });
  
      isClickable1 = true;
      isClickable2 = true;
      clearSelection5();
      contact_information_div.style.pointerEvents = "none";
      first_next_button.removeEventListener("click", nextButtonFunction);
      first_next_button.classList.add("next-button-deselected");
      filteredElements5.forEach(item => item.addEventListener("click", () => {
      first_next_button.classList.remove("next-button-deselected");
      selectSixElements5.call(item);
      all_buttons.forEach(button => button.classList.remove("animated"));
      // document.querySelectorAll(".choose-duration").classList.remove("animated");
      submit_button_reserve5.classList.add("new-submit-style");
      submit_button_reserve5.style.color = "white";
      submit_button_reserve5.style.backgroundColor = "#1877F2";
      submit_button_reserve5.style.cursor = "pointer";
      first_next_button.addEventListener("click", nextButtonFunction);
      contact_information_div.style.cursor = "pointer";
      contact_information_div.style.pointerEvents = "auto";
      contact_information_div.addEventListener("click", function() {
        reserve_form.style.display = "none";
        second_reserve_form.style.display = "block";
    });
  }));
}
isClickable3 = false;

});

function createNewItem(index) {
  const underMainNewItem = document.createElement("div");
  underMainNewItem.classList.add("months-div-2");
  // mainNewItem.style.width = "508px";
  const newItem = document.createElement("div");
  newItem.classList.add("duration-buttons-div-2");
  // newItem.style.display = "flex";
  // newItem.style.flexWrap = "wrap";
  // newItem.style.justifyContent = "flex-start";
  // newItem.style.width = "470px";
  // newItem.title = ""
  // newItem.style.marginRight = "40px";
  const underNewItem = document.createElement("div");
  underNewItem.classList.add("duration-buttons");
  
  underNewItem.classList.add("selected");
  underNewItem.classList.add("choose-month-buttons");
  underNewItem.classList.add("first-second-buttons");
  // underNewItem.style.backgroundColor = "red";
  newItem.appendChild(underNewItem);
  // newItem.style.width = "400px";
  const secondUnderNewItem = document.createElement("div");
  underNewItem.appendChild(secondUnderNewItem);
  const newMonthIndex = (index) % 12;
  const monthName = new Date(2025, newMonthIndex).toLocaleString("default", { month: "long" });
  secondUnderNewItem.textContent = monthName;
  const secondUnderNewItem2 = document.createElement("div");
  underNewItem.appendChild(secondUnderNewItem2);
  const year = 2024 + Math.floor((index) / 12);
  secondUnderNewItem2.textContent = year;
  secondUnderNewItem2.style.marginTop = "2px";

  return newItem;
}
  