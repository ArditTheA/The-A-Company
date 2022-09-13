var filters_forms = document.querySelectorAll('.checkbox_select_anchor');
var filters_dropdowns = document.querySelectorAll('.show');
var second_filters_dropdowns = document.querySelectorAll('.checkbox_select_dropdown');
var click_select = document.querySelectorAll('.checkbox_select');
for (let i = 0; i < filters_forms.length; i++) {
    document.addEventListener('click', function(e) {
        if (!filters_dropdowns[i].contains(e.target) && !filters_forms[i].contains(e.target)) {
            filters_dropdowns[i].style.backgroundColor = "red";
        }
    });  
};