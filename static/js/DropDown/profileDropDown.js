var dropdown = document.querySelectorAll(".profileDropDown");
var profile = document.querySelectorAll(".header-icon-profile");
for (let i = 0; i < dropdown.length; i++) {
    profile[i].addEventListener("click", function() {
       if (dropdown[i].style.display == "block") {
          dropdown[i].style.display = "none";
       }
       else {

          dropdown[i].style.display = "block";

       }
    })
    document.addEventListener('click', function(e) {
       if (!dropdown[i].contains(e.target) && !profile[i].contains(e.target)) {
           dropdown[i].style.display = 'none';
       }
    });
}


function showDropDown(id){
           var dropName = "drop"+id;
          var elem = document.getElementById(dropName);
          var foo = window.getComputedStyle(elem, null);
          if(elem.style.display == "flex"){
            elem.style.display="none";
          }else{
            $('.drop').css('display','none');
            elem.style.display="flex"
          }
       }