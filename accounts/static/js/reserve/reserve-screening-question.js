
  const selectElement = document.getElementById('screening-question-select-options');
  const third_next_button = document.querySelector('.third-next-button');

  selectElement.addEventListener('change', function() {
    if (selectElement.value !== "") {
        third_next_button.classList.add("third-next-button-2");
        third_next_button.style.cursor = "pointer";
        third_next_button.style.pointerEvents = "auto";

    }

  });
