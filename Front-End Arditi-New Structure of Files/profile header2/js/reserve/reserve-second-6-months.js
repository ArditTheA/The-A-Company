const container3 = document.querySelector(".months-div");
const items3 = container3.querySelectorAll(".month-button");
const outsideBtn3 = document.getElementById("6_months_button");
var all_buttons = document.querySelectorAll(".choose-duration");
var submit_button_reserve = document.querySelector(".submit-button");
var submit_button_reserve2 = document.querySelector(".submit-button");
var reserve_form = document.querySelector(".reserve-form");
var second_reserve_form = document.querySelector(".second-reserve-form");
var contact_information = document.querySelector(".contact-information");
var contact_information_div = document.querySelector(".contact-information-div");
var payment = document.querySelector(".first-payment");
var payment_div = document.querySelector(".first-payment-div");
var screening_questions = document.querySelector(".first-screening-question");
var screening_questions_div = document.querySelector(".first-screening-question-div");
var first_next_button = document.querySelector(".first-next-button");
const container = document.querySelector(".months-div");
const items = container.querySelectorAll(".month-button");
const newItem = container.querySelectorAll(".month-button-2");
const outsideBtn = document.getElementById("6_months_button");

const second_part_of_months = document.querySelector(".second-part-of-month-buttons");
const duration_buttons_div = document.querySelectorAll(".duration-buttons-div");
const duration_buttons_div_2 = document.querySelectorAll(".duration-buttons-div-2");

var isClickable1 = true;
var isClickable2 = true;
var isClickable3 = true;
let addedItems = []; // Keep track of added items

// let selectedItem = null;

contact_information_div.style.pointerEvents = "none";
payment_div.style.pointerEvents = "none";
screening_questions_div.style.pointerEvents = "none";

const filteredElements3 = Array.from(items3).slice(0, 12);
const all_three_buttons = Array.from(document.querySelectorAll(".choose-duration"));

var selectSixElements3 = function() {
  const selectedElement = this;
  const index = Array.from(items3).indexOf(selectedElement);

  // select 6 items
  for (let i = index; i < index + 6; i++) {
    if (items3[i]) {
      items3[i].classList.add("selected");
    }
  }
  if (index < 6) {
    
  }
}

function clearSelection3() {
    // remove "selected" class from all items
    items3.forEach(item => item.classList.remove("selected"));
}

function deselectAllElements() {
  selectedItems.forEach(item => {
    item.classList.remove("selected");
  });
  selectedItems = [];
}

function selectAllElements() {
  items.forEach(item => {
    item.classList.add("selected");
    selectedItems.push(item);
  });
}

// function isValidEmail(email) {
//   // Regular expression to match email addresses
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// const email = "example@example.com";
// if (isValidEmail(email)) {
// console.log("Valid email address");
// } else {
// console.log("Invalid email address");
// }  

var monthsSelect = function() {
    clearSelection3();
    selectSixElements3.call(items3);
    all_buttons.forEach(button => button.classList.remove("animated"));
    submit_button_reserve2.classList.add("new-submit-style");
    submit_button_reserve2.style.color = "white";
    submit_button_reserve2.style.backgroundColor = "#1877F2";
    submit_button_reserve2.style.cursor = "pointer";
    document.querySelector(".first-next-button").addEventListener("click", function () {
        reserve_form.style.display = "none";
        second_reserve_form.style.display = "block";
    })
    contact_information_div.style.cursor = "pointer";
    contact_information_div.style.pointerEvents = "auto";
    contact_information_div.addEventListener("click", function() {
      reserve_form.style.display = "none";
      second_reserve_form.style.display = "block";
    });
}

// var OutSideBtnThree = function() {
//       contact_information_div.style.pointerEvents = "none";

//   first_next_button.removeEventListener("click", nextButtonFunction);
//   first_next_button.classList.add("next-button-deselected");
//   clearSelection3();
//   filteredElements3.forEach(item => item.addEventListener("click", () => {
//     first_next_button.classList.remove("next-button-deselected");
//     clearSelection3();
//     selectSixElements3.call(item);
//     all_buttons[0].classList.remove("animated");
//     all_buttons[1].classList.remove("animated");
//     all_buttons[2].classList.remove("animated");
//     submit_button_reserve2.classList.add("new-submit-style");
//     submit_button_reserve2.style.color = "white";
//     submit_button_reserve2.style.backgroundColor = "#1877F2";
//     submit_button_reserve2.style.cursor = "pointer";
//     first_next_button.addEventListener("click", nextButtonFunction);
//     contact_information_div.style.cursor = "pointer";
//     contact_information_div.style.pointerEvents = "auto";
//     contact_information_div.addEventListener("click", function() {
//       reserve_form.style.display = "none";
//       second_reserve_form.style.display = "block";
//     });

//   }));

// }
var nextButtonFunction = function() {
  reserve_form.style.display = "none";
  second_reserve_form.style.display = "block";
  contact_information_div.style.cursor = "pointer";
}

function selectElements2(startIndex, numItems) {
  for (let i = startIndex; i < startIndex + numItems; i++) {
    if (items[i]) {
      items[i].classList.add("selected");
    }
  }
}

function deselectAllElements2() {
  items.forEach(item => {
    item.classList.remove("selected");
  });
}

function selectAllElements2() {
  items.forEach(item => {
    item.classList.add("selected");
  });
}

// function removeItems() {
//   // Remove items from the DOM
//   addedItems.forEach(item => {
//     item.remove();
//   });

//   // Clear the addedItems array
//   addedItems = [];
// }
// outsideBtn3.addEventListener("click", removeItems);

// add click event listener to all items
outsideBtn3.addEventListener("click", () => {
  outsideBtn4.addEventListener("click", removeItems);
  outsideBtn5.addEventListener("click", removeItems);


  // outsideBtn3.addEventListener("click", removeItems);

    if (isClickable1) {

  selectAllElements2();
  
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      const startIndex = index;
      const endIndex = Math.min(startIndex + 5, items.length - 1);
      const numItemsToSelect = endIndex - startIndex + 1;
      
      // Check if additional items need to be added
      if (numItemsToSelect <= 6) {
        const numItemsToAdd = 6 - numItemsToSelect;
        
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
      outsideBtn3.removeEventListener("click", removeItems);
      outsideBtn4.addEventListener("click", removeItems);
      outsideBtn5.addEventListener("click", removeItems);
    });
  });
      
    // function selectAllElements() {
    //   items.forEach(item => {
    //     item.classList.add("selected");
    //   });
    // }
    
    // add click event listener to outside button
    
    // add click event listener to all items
    // items.forEach((item, index) => {
    //   item.addEventListener("click", () => {
    //     const startIndex = index;
    //     const endIndex = Math.min(startIndex + 5, items.length - 1);
    //     const numItemsToSelect = endIndex - startIndex + 1;

    //     // Check if additional items need to be added
      
    //     if (numItemsToSelect < 6) {
    //       const numItemsToAdd = 6 - numItemsToSelect;
    //       for (let i = endIndex + 1; i <= endIndex + numItemsToAdd; i++) {
    //           // const newItemDiv = document.createElement("div");
    //           // newItemDiv.classList.add("newItemDiv");
    //           // newItemDiv.appendChild(newItem[i]);
    //           // duration_buttons_div_2[i].classList.add("selected");
              
    //           // newItem[i].style.display = "block";
    //           // newItem[i].classList.add("selected");

    
    //         // newItem[i]++;            
    //         container.appendChild(newItem[i]);
    //         // container.appendChild(newItemDiv);
    //       }
    //     }
    //     // else {
    //     //   deselectAllElements2();
    //     // }

    //     // selectElements(startIndex, numItemsToSelect);
        
    //   });
    // });
      isClickable2 = true;
      isClickable3 = true;
      clearSelection3();
      contact_information_div.style.pointerEvents= "none";
      first_next_button.removeEventListener("click", nextButtonFunction);
      first_next_button.classList.add("next-button-deselected");
      filteredElements3.forEach(item => item.addEventListener("click", () => {
      first_next_button.classList.remove("next-button-deselected");
      clearSelection3();
      selectSixElements3.call(item);
      all_buttons.forEach(button => button.classList.remove("animated"));
      // document.querySelectorAll(".choose-duration").classList.remove("animated");
      submit_button_reserve2.classList.add("new-submit-style");
      submit_button_reserve2.style.color = "white";
      submit_button_reserve2.style.backgroundColor = "#1877F2";
      submit_button_reserve2.style.cursor = "pointer";
      first_next_button.addEventListener("click", nextButtonFunction);
      contact_information_div.style.cursor = "pointer";
      contact_information_div.style.pointerEvents = "auto";
      contact_information_div.addEventListener("click", function() {
        reserve_form.style.display = "none";
        second_reserve_form.style.display = "block";
    });
  }));
}
isClickable1 = false;

});

function createNewItem(index) {
  const underMainNewItem = document.createElement("div");
  underMainNewItem.classList.add("months-div-2");

  newItem.classList.add("duration-buttons-div-2");
  // mainNewItem.style.width = "508px";
  const newItem = document.createElement("div");
  // newItem.classList.add("duration-buttons-div-2");
  // newItem.style.display = "flex";
  // newItem.style.flexWrap = "wrap";
  // newItem.style.justifyContent = "flex-start";
  // newItem.style.width = "470px";
  // newItem.title = ""
  // newItem.style.marginRight = "40px";
  const underNewItem = document.createElement("div");
  underNewItem.classList.add("duration-buttons");
  // underNewItem.style.marginRight = "auto";
  underNewItem.classList.add("first-second-buttons");
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
  const year = 2024 + Math.floor((index + 1) / 12);
  secondUnderNewItem2.textContent = year;
  secondUnderNewItem2.style.marginTop = "2px";

  return newItem;
}



