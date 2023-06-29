const container = document.querySelector(".months-div");
const items = container.querySelectorAll(".month-button");
const outsideBtn = document.getElementById("6_months_button");
let addedItems = []; // Keep track of added items

function selectElements(startIndex, numItems) {
  for (let i = startIndex; i < startIndex + numItems; i++) {
    if (items[i]) {
      items[i].classList.add("selected");
    }
  }
}

function deselectAllElements() {
  items.forEach(item => {
    item.classList.remove("selected");
  });
}

function selectAllElements() {
  items.forEach(item => {
    item.classList.add("selected");
  });
}

// add click event listener to outside button
outsideBtn.addEventListener("click", () => {
  deselectAllElements();
  selectAllElements();
});


// add click event listener to all items
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    const startIndex = index;
    const endIndex = Math.min(startIndex + 5, items.length - 1);
    const numItemsToSelect = endIndex - startIndex + 1;
    
    // Check if additional items need to be added
    if (numItemsToSelect < 6) {
      const numItemsToAdd = 6 - numItemsToSelect;
      
      // Remove previously added items
      addedItems.forEach(addedItem => {
        addedItem.remove();
      });
      addedItems = [];
      
      // Add new items
      for (let i = endIndex + 1; i <= endIndex + numItemsToAdd; i++) {
        const newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.textContent = `Item ${i + 1}`;
        container.appendChild(newItem);
        addedItems.push(newItem);
      }
    }
    
    deselectAllElements();
    selectElements(startIndex, numItemsToSelect);
  });
});
