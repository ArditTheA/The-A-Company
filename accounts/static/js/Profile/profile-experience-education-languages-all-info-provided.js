const ExperienceinputFields = Array.from(document.querySelectorAll('.experience-mutual-input'));
const EducationinputFields = Array.from(document.querySelectorAll('.education-mutual-input'));
const EditProfileinputFields = Array.from(document.querySelectorAll('.edit-profile-mutual-input'));
const ExperienceSelects = Array.from(document.querySelectorAll(".experience-selects"));
const EducationSelects = Array.from(document.querySelectorAll(".education-selects"));
const LanguagesSelects = Array.from(document.querySelectorAll(".languages-selects"));
const EditPorfileSelects = Array.from(document.querySelectorAll(".edit-profile-selects"));
const ExperienceSaveSubmitInput = document.getElementById('addUserExp') || document.getElementById('editUserExp');
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

  