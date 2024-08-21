const ExperienceinputFields = Array.from(document.querySelectorAll('.experience-mutual-input'));
const EducationinputFields = Array.from(document.querySelectorAll('.education-mutual-input'));
const EditProfileinputFields = Array.from(document.querySelectorAll('.edit-profile-mutual-input'));
const ExperienceSelects = Array.from(document.querySelectorAll(".experience-selects"));
const EducationSelects = Array.from(document.querySelectorAll(".education-selects"));
const LanguagesSelects = Array.from(document.querySelectorAll(".languages-selects"));
const EditPorfileSelects = Array.from(document.querySelectorAll(".edit-profile-selects"));
const ExperienceSaveSubmitInput = document.getElementById('addUserExp') && document.getElementById('editUserExp');

var myDisableClickFunction = function() {
  ExperienceinputFields.forEach(input => {
    const errorDivId = input.id + '-error-message';
    let errorDiv = document.getElementById(errorDivId);
    if (input.value.trim() === '') {
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = errorDivId;
        errorDiv.classList.add('error-message');
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "14px";
        errorDiv.style.marginTop = "0px";
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
      } else {
        input.style.border = "0.5px solid red";
        input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
        errorDiv.textContent = 'This field is required';
        errorDiv.style.marginTop = "4px";

      }
    }
    else {
      if (input.id === 'id_email') {
        const emailValue_second = input.value.trim();
        const isEmailValid_second = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+\.[^\s@]+$/.test(emailValue_second);

        if (!isEmailValid_second) {
          input.style.border = "0.5px solid red";
          input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
          errorDiv.textContent = 'This email is invalid';
        } else {
        }
      }
      
    }


    input.addEventListener('focus', function() {
      const errorDivId = input.id + '-error-message';
      let errorDiv = document.getElementById(errorDivId);
      input.style.border = "1px solid #1877f2";
      input.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
      errorDiv.textContent = '';
      errorDiv.style.marginTop = "0px";
    });

    if (input.id === "id_logo") {
      input.addEventListener('input', function() {
        const errorDivId = input.id + '-error-message';
        let errorDiv = document.getElementById(errorDivId);
        input.style.border = "1px solid #1877f2";
        input.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
        errorDiv.textContent = '';
        errorDiv.style.marginTop = "0px";
    })
  }

    input.addEventListener('blur', function() {
      const errorDivId = input.id + '-error-message';
      let errorDiv = document.getElementById(errorDivId);
      
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = errorDivId;
        errorDiv.classList.add('error-message');
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "14px";
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
        input.style.border = "0.5px solid red";
        input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
        errorDiv.textContent = 'This field is required';
        errorDiv.style.marginTop = "0px";
    }
      else {
        input.style.border = "0.5px solid red";
        input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
        errorDiv.textContent = 'This field is required';
      }

      if (input.id !== "id_start_date" && input.id !== "id_end_date") {
        if (input.value.trim() === "") {
            errorDiv.style.marginTop = "4px";

        }
        else {
          input.style.border = "";
          input.style.boxShadow = "";
          errorDiv.textContent = '';
          errorDiv.style.marginTop = "0px";
        }
      } else {
        const startDateValue = document.getElementById('id_start_date').value.trim();
        const endDateValue = document.getElementById('id_end_date').value.trim();
        const isStartDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(startDateValue);
        const isEndDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(endDateValue);
        if (input.id === "id_start_date") {
        if (!isStartDateValid) {
          if (input.value.trim() !== "") {
            input.style.border = "0.5px solid red";
            input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
            errorDiv.textContent = 'This field is incorrect';
          } else {
            input.style.border = "0.5px solid red";
            input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
            errorDiv.textContent = 'This field is required';
          }
        }
        else {
          input.style.border = "";
          input.style.boxShadow = "";
          errorDiv.textContent = '';
        }
      }
        else if (input.id === "id_end_date") {
          if (!isEndDateValid) {
          if (input.value.trim() !== "") {
            input.style.border = "0.5px solid red";
            input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
            errorDiv.textContent = 'This field is incorrect';
          } else {
            input.style.border = "0.5px solid red";
            input.style.boxShadow = "0 0 3px rgba(255, 0, 0, 0.5)";
            errorDiv.textContent = 'This field is required';
          }
        }
        else {
          input.style.border = "";
          input.style.boxShadow = "";
          errorDiv.textContent = '';
        }

        }
        
      }
    });



    input.addEventListener('input', function() {
      if (input !== emailAddressInput) {
        // Update the value with the first letter uppercase
        input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
      }
    });
  });
};

myDisableClickFunction();

const EducationSaveSubmitInput = document.getElementById('addUserEdu') || document.getElementById('editUserEdu');
const LanguagesSaveSubmitInput = document.getElementById('addUserLang') || document.getElementById('editUserLang');
const EditProfileSaveSubmitInput = document.getElementById('editProfileSave');

function ExperienceCheckInputs() {
  const allInputsFilled = ExperienceinputFields.every(input => input.value.trim() !== '');
  const allSelectsFilled = ExperienceSelects.every(select => select.value.trim() !== '');

  const startExperienceDateValue = document.getElementById('id_start_date').value.trim();
  const endExperienceDateValue = document.getElementById('id_end_date').value.trim();
  const isCheckboxChecked = document.getElementById('experienceCheck').checked;

  const isExperienceStartDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(startExperienceDateValue);
  const isExperienceEndDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(endExperienceDateValue);

  if (isCheckboxChecked) {
    // If checkbox is checked, disable end date validation
    ExperienceSaveSubmitInput.disabled = !allInputsFilled || !allSelectsFilled || !isExperienceStartDateValid;
  } else {
    // If checkbox is not checked, include end date validation
    ExperienceSaveSubmitInput.disabled = !allInputsFilled || !allSelectsFilled || !isExperienceStartDateValid || !isExperienceEndDateValid;

    // Check if end date is fully filled, enable and add class
    if (isExperienceEndDateValid) {
      ExperienceSaveSubmitInput.disabled = false;
      ExperienceSaveSubmitInput.classList.add("save-button-enabled");
    } else {
      ExperienceSaveSubmitInput.classList.remove("save-button-enabled");
    }
  }

  if (ExperienceSaveSubmitInput.disabled === false) {
    ExperienceSaveSubmitInput.classList.add("save-button-enabled");
  } else {
    ExperienceSaveSubmitInput.classList.remove("save-button-enabled");
  }
}

window.onload = ExperienceCheckInputs;
ExperienceinputFields.forEach(input => input.addEventListener('input', ExperienceCheckInputs));
ExperienceSelects.forEach(select => select.addEventListener('change', ExperienceCheckInputs));
document.getElementById('experienceCheck').addEventListener('change', ExperienceCheckInputs);
document.getElementById('id_end_date').addEventListener('input', ExperienceCheckInputs);


function EducationCheckInputs() {
  const allInputsFilled = EducationinputFields.every(input => input.value.trim() !== '');
  const allSelectsFilled = EducationSelects.every(select => select.value.trim() !== '');

  const startEducationDateValue = document.getElementById('id_start_year').value.trim();
  const endEducationDateValue = document.getElementById('id_end_year').value.trim();
  const isCheckboxChecked = document.getElementById('educationCheck').checked;

  const isEducationStartDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(startEducationDateValue);
  const isEducationEndDateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(endEducationDateValue);

  if (isCheckboxChecked) {
    // If checkbox is checked, disable end date validation
    EducationSaveSubmitInput.disabled = !allInputsFilled || !allSelectsFilled || !isEducationStartDateValid;
  } else {
    // If checkbox is not checked, include end date validation
    EducationSaveSubmitInput.disabled = !allInputsFilled || !allSelectsFilled || !isEducationStartDateValid || !isEducationEndDateValid;

    // Check if end date is fully filled, enable and add class
    if (isEducationEndDateValid) {
      EducationSaveSubmitInput.disabled = false;
      EducationSaveSubmitInput.classList.add("save-button-enabled");
    } else {
      EducationSaveSubmitInput.classList.remove("save-button-enabled");
    }
  }

  if (EducationSaveSubmitInput.disabled === false) {
    EducationSaveSubmitInput.classList.add("save-button-enabled");
    console.log("Ardit");
  } else {
    EducationSaveSubmitInput.classList.remove("save-button-enabled");
  }
}

window.onload = EducationCheckInputs;
EducationinputFields.forEach(input => input.addEventListener('input', EducationCheckInputs));
EducationSelects.forEach(select => select.addEventListener('change', EducationCheckInputs));
document.getElementById('educationCheck').addEventListener('change', EducationCheckInputs);
document.getElementById('id_end_year').addEventListener('input', EducationCheckInputs);

  function LanguagesCheckInputs() {
    const allSelectsFilled = LanguagesSelects.every(select => select.value.trim() !== '');

    LanguagesSaveSubmitInput.disabled = !allSelectsFilled;

    if (LanguagesSaveSubmitInput.disabled === false) {
        // isValidEmail(email);
        LanguagesSaveSubmitInput.classList.add("save-button-enabled");
    } else {
        LanguagesSaveSubmitInput.classList.remove("save-button-enabled");
    }
}

window.onload = LanguagesCheckInputs;

// Initially, the class is not added
// LanguagesSaveSubmitInput.classList.remove("save-button-enabled");

LanguagesSelects.forEach(select => select.addEventListener('change', LanguagesCheckInputs));

function EditProfileCheckInputs() {
    const allInputsFilled = EditProfileinputFields.every(input => input.value.trim() !== '');
    const allSelectsFilled = EditPorfileSelects.every(select => select.value.trim() !== '');
    
    EditProfileSaveSubmitInput.disabled = !allInputsFilled || !allSelectsFilled;
  
    if (EditProfileSaveSubmitInput.disabled === false) {
      EditProfileSaveSubmitInput.classList.add("save-button-enabled");
    } else {
      EditProfileSaveSubmitInput.classList.remove("save-button-enabled");
    }
  }

  window.onload = EditProfileCheckInputs;

// Initially, the class is not added
// LanguagesSaveSubmitInput.classList.remove("save-button-enabled");
EditProfileinputFields.forEach(input => input.addEventListener('input', EditProfileCheckInputs));
EditPorfileSelects.forEach(select => select.addEventListener('change', EditProfileCheckInputs));

  