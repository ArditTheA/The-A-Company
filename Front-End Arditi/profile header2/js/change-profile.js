var nameP = document.querySelector(".profile-firstname");
var surname = document.querySelector(".profile-surname");
var city = document.querySelector(".profile-city")
var country = document.querySelector(".profile-country");

var nameEdit = document.querySelector(".name-input");
var surnameEdit = document.querySelector(".surname-input");
var cityEdit = document.querySelector(".city-input");
var countryEdit = document.querySelector(".country-input");

nameEdit.value = nameP.textContent;
surnameEdit.value = surname.textContent;
cityEdit.value = city.textContent;
countryEdit.value = country.textContent;

var saveButton = document.querySelector(".save-submit-input");
var modalBg = document.querySelector(".edit-profile-bg");

saveButton.addEventListener('click', function() {
    nameP.textContent = nameEdit.value;
    surname.textContent = surnameEdit.value;
    city.textContent = cityEdit.value;
    country.textContent = countryEdit.value;
                                                                                                    
    modalBg.style.display = "none";
});


