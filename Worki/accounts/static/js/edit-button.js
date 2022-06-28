var editButton = document.querySelector(".edit-button");
var modalBg = document.querySelector(".modal-bg");

editButton.addEventListener("click", function() {
    modalBg.style.display = "flex";
});

window.onclick = function(event) {
    if (event.target == modalBg) {
      modalBg.style.display = "none";
    }
}



                // OR //


/*  window.addEventListener('click', function(event) {
        if (event.target == modalBg) {
            modalBg.style.display = "none";
        }
    })  */