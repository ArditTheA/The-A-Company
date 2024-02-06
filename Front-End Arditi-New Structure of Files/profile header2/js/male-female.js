var male_button = document.querySelector('.male-sex');
var female_button = document.querySelector('.female-sex');

female_button.addEventListener('click', function() {
   
    male_button.style.backgroundColor = "white";
    male_button.style.color = "black";
    female_button.style.color = "white";
    male_button.style.border = "0.5px solid #9E9E9E";
    female_button.style.border = "0.5px solid black";
    female_button.style.backgroundColor = "black";
    female_button.blur(); /* blur() removes input's horizontal line */


    // for "placeholder" cases instead of "value"

     $('male-sex').addClass('male-sex');
     $('body').append('<style>.male-sex::placeholder{color:black}</style>');
     $('female-sex').addClass('female-sex');
     $('body').append('<style>.female-sex::placeholder{color:white}</style>');
});

male_button.addEventListener('click', function() {
    male_button.style.backgroundColor = "black";
    male_button.style.color = "white";
    female_button.style.color = "black";
    male_button.style.border = "0.5px solid black";
    female_button.style.border = "0.5px solid #9E9E9E";
    female_button.style.backgroundColor = "white";
    male_button.blur();

    // for "placeholder" cases

     $('male-sex').addClass('male-sex');
     $('body').append('<style>.male-sex::placeholder{color:white}</style>');
     $('female-sex').addClass('female-sex');
     $('body').append('<style>.female-sex::placeholder{color:black}</style>');
});