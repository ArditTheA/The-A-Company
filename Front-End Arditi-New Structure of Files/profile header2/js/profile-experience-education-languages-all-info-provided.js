const ExperienceinputFields = Array.from(document.querySelectorAll('.experience-mutual-input'));
const EducationinputFields = Array.from(document.querySelectorAll('.education-mutual-input'));
const EditProfileinputFields = Array.from(document.querySelectorAll('.edit-profile-mutual-input'));
const ExperienceSelects = Array.from(document.querySelectorAll(".experience-selects"));
const EducationSelects = Array.from(document.querySelectorAll(".education-selects"));
const LanguagesSelects = Array.from(document.querySelectorAll(".languages-selects"));
const EditPorfileSelects = Array.from(document.querySelectorAll(".edit-profile-selects"));
const ExperienceSaveSubmitInput = document.getElementById('addUserExp');
const ExperienceSaveSubmitInputEdit = document.getElementById('editUserExp');
const EducationSaveSubmitInput = document.getElementById('addUserEdu');
const EducationSaveSubmitInputEdit = document.getElementById('editUserEdu');
const LanguagesSaveSubmitInput = document.getElementById('AddUserLang');
const LanguagesSaveSubmitInputEdit = document.getElementById('EditUserLang');
const EditProfileSaveSubmitInput = document.getElementById('editProfileSave');

document.getElementById("editUserExp").classList.add("save-button-enabled");
document.getElementById('editUserEdu').classList.add("save-button-enabled");
document.getElementById('EditUserLang').classList.add("save-button-enabled");
document.getElementById('editUserExp').disabled = false;
document.getElementById('editUserEdu').disabled = false;
document.getElementById('EditUserLang').disabled = false;

function present(){
  var textbox = document.getElementById('id_end_date')
  if (textbox.disabled) {
      textbox.disabled = false;
      // ExperienceCheckInputs();
      textbox.placeholder = "End Date dd/mm/yyyy";
  }else{
      textbox.disabled = true;
      textbox.placeholder = "Present";
      textbox.value = "";
  }
}
function presentEnd(){
  var textbox = document.getElementById('id_end_year')
  if (textbox.disabled) {
      textbox.disabled = false;
      textbox.placeholder = "End Year dd/mm/yyyy";
  }else{
      textbox.disabled = true;
      textbox.placeholder = "Present";
      textbox.value = "";
  }
}

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
    ExperienceSaveSubmitInputEdit.disabled = !allInputsFilled || !allSelectsFilled || !isExperienceStartDateValid;

  } else {
    // If checkbox is not checked, include end date validation
    ExperienceSaveSubmitInput.disabled = !allInputsFilled || !allSelectsFilled || !isExperienceStartDateValid || !isExperienceEndDateValid;
    ExperienceSaveSubmitInputEdit.disabled = !allInputsFilled || !allSelectsFilled || !isExperienceStartDateValid || !isExperienceEndDateValid;

    // Check if end date is fully filled, enable and add class
    if (isExperienceEndDateValid) {
      ExperienceSaveSubmitInput.disabled = false;
      ExperienceSaveSubmitInputEdit.disabled = false;
      ExperienceSaveSubmitInput.classList.add("save-button-enabled");
      ExperienceSaveSubmitInputEdit.classList.add("save-button-enabled");
    } else {
      ExperienceSaveSubmitInput.classList.remove("save-button-enabled");
      ExperienceSaveSubmitInputEdit.classList.remove("save-button-enabled");

    }
  }

  if (ExperienceSaveSubmitInput.disabled === false) {
    ExperienceSaveSubmitInput.classList.add("save-button-enabled");
  } else {
    ExperienceSaveSubmitInput.classList.remove("save-button-enabled");
  }
  if (ExperienceSaveSubmitInputEdit.disabled === false) {
    ExperienceSaveSubmitInputEdit.classList.add("save-button-enabled");
  } else {
    ExperienceSaveSubmitInputEdit.classList.remove("save-button-enabled");
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
    EducationSaveSubmitInputEdit.disabled = !allInputsFilled || !allSelectsFilled || !isEducationStartDateValid;

  } else {
    // If checkbox is not checked, include end date validation
    EducationSaveSubmitInput.disabled = !allInputsFilled || !allSelectsFilled || !isEducationStartDateValid || !isEducationEndDateValid;
    EducationSaveSubmitInputEdit.disabled = !allInputsFilled || !allSelectsFilled || !isEducationStartDateValid || !isEducationEndDateValid;

    // Check if end date is fully filled, enable and add class
    if (isEducationEndDateValid) {
      EducationSaveSubmitInput.disabled = false;
      EducationSaveSubmitInputEdit.disabled = false;
      EducationSaveSubmitInput.classList.add("save-button-enabled");
      EducationSaveSubmitInputEdit.classList.add("save-button-enabled");
    } else {
      EducationSaveSubmitInput.classList.remove("save-button-enabled");
      EducationSaveSubmitInputEdit.classList.remove("save-button-enabled");
    }
  }

  if (EducationSaveSubmitInput.disabled === false) {
    EducationSaveSubmitInput.classList.add("save-button-enabled");
  } else {
    EducationSaveSubmitInput.classList.remove("save-button-enabled");
  }
  if (EducationSaveSubmitInputEdit.disabled === false) {
    EducationSaveSubmitInputEdit.classList.add("save-button-enabled");
  } else {
    EducationSaveSubmitInputEdit.classList.remove("save-button-enabled");
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
    LanguagesSaveSubmitInputEdit.disabled = !allSelectsFilled;

    if (LanguagesSaveSubmitInput.disabled === false) {
        // isValidEmail(email);
        LanguagesSaveSubmitInput.classList.add("save-button-enabled");
    } else {
        LanguagesSaveSubmitInput.classList.remove("save-button-enabled");
    }
    
    if (LanguagesSaveSubmitInputEdit.disabled === false) {
      // isValidEmail(email);
      LanguagesSaveSubmitInputEdit.classList.add("save-button-enabled");
  } else {
    LanguagesSaveSubmitInputEdit.classList.remove("save-button-enabled");

  }

}

window.onload = LanguagesCheckInputs;

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
  