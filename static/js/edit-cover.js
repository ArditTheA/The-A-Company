var editCoverButton = document.querySelector(".edit-button-cover");
var bgCoverEdit = document.querySelector(".bg-cover-edit");

editCoverButton.addEventListener('click', function() {
    bgCoverEdit.style.display = "flex";
});

window.addEventListener('click', function(event) {
    if (event.target == bgCoverEdit) {
        bgCoverEdit.style.display = "none";
    }
});