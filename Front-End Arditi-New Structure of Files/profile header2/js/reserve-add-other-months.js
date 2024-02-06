var container = document.querySelector('.months-div');
var children = document.querySelectorAll('.month-button');
var displayedCount = 12;
var startIndex = 0;

function displayElements(startIndex, count) {
  for (var i = startIndex; i < startIndex + count; i++) {
    if (children[i]) {
      children[i].classList.add('displayed');
    }
  }
}

displayElements(startIndex, displayedCount);

container.addEventListener('click', function (event) {
  if (event.target.classList.contains('child')) {
    startIndex = Array.prototype.indexOf.call(children, event.target);
    displayElements(startIndex, displayedCount);
  }
});
