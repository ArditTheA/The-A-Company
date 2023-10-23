var editCoverButton = document.querySelector(".edit-button-cover");
var bgCoverEdit = document.querySelector(".bg-cover-edit");

editCoverButton.addEventListener('click', function() {
    bgCoverEdit.style.display = "flex";
    document.body.style.overflow = "hidden";
});

window.addEventListener('click', function(event) {
    if (event.target == bgCoverEdit) {
        bgCoverEdit.style.display = "none";
        document.body.style.overflow = "scroll";

    }
});