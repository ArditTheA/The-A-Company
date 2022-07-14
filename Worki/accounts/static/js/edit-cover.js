var editCoverButton = document.querySelector(".edit-button-cover");
var bgCoverEdit = document.querySelector(".bg-cover-edit");
var exitCoverEdit = document.querySelector(".exit-button-cover-picture");


editCoverButton.addEventListener('click', function() {
    bgCoverEdit.style.display = "flex";
});

exitCoverEdit.addEventListener('click', function() {
    bgCoverEdit.style.display = "none";
});

window.addEventListener('click', function(event) {
    if (event.target == bgCoverEdit) {
        bgCoverEdit.style.display = "none";
    }
});