from pyexpat import model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from django import forms
from accounts.models import *
from django.forms import ModelForm
from ScreeningQuestion.models import *

class add_user_Exp(ModelForm):
    class Meta:
        model = UserExperiece
        fields = {"user_id", "title", "company", "Country", "city_usExp", "start_date", "end_date"}
        widgets = {
            "title": forms.TextInput(attrs={"class": "name-input profile-all-inputs-option",'placeholder':'Job title'}),
            "company": forms.TextInput(attrs={"class": "name-input profile-all-inputs-option",'placeholder':'Company'}),
            "start_date": forms.DateInput(attrs={"class": "start-date-input profile-all-inputs-option", "type": "date"}),
            "end_date": forms.DateInput(
                attrs={"class": "end-date-input mutual-stats font-fam", "type": "date", "required": "false"}),
            "Country": forms.Select(attrs={'class':'profile-all-inputs-option'}),
            "city_usExp":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option",'placeholder':'City'})
        }


class add_user_language(ModelForm):
    class Meta:
        model = UserLanguages
        fields = {"user_id", "language", "level"}


class add_user_edu(ModelForm):
    class Meta:
        model = UserEducation
        fields = {"user_id", "university", "degree","country_e","city_e", "field_of_study", "start_year", "end_year",
                  "total_examples_passed", "GPA"}
        widgets = {
            "university":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","placeholder":"University"}),
            "degree": forms.TextInput(attrs={'class': 'name-input profile-all-inputs-option',"placeholder":"Degree"}),
            "field_of_study": forms.TextInput(attrs={'class': 'name-input profile-all-inputs-option',"placeholder":"Field of Study"}),
            "country_e":forms.Select(attrs={"class":"name-input profile-all-inputs-option","list":"EduCountryList","placeholder":"Country"}),
            "city_e":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","list":"EduCityList","placeholder":"City"}),
            "start_year": forms.DateInput(attrs={"class": "start-date-input profile-all-inputs-option", "type": "date"}),
            "end_year": forms.DateInput(attrs={"class": "end-date-input profile-all-inputs-option", "type": "date"}),
            "total_examples_passed" :forms.NumberInput(attrs={'class': 'name-input profile-all-inputs-option', 'value': 'null', 'placeholder': 'Total Exams Passed'}),
            "GPA" : forms.NumberInput(attrs={'class': 'name-input profile-all-inputs-option', 'value': 'null', 'placeholder': 'GPA'}),

        }


class EditProf(ModelForm):
    class Meta:
        model = CustomUser
        fields = {"first_name", "last_name", "city", "country", "profile", "cover","phone_number"}

        widgets = {
            "first_name": forms.TextInput(attrs={'class': 'name-input profile-all-inputs-option','placeholder':'First Name'}),

            "last_name": forms.TextInput(attrs={'class': 'surname-input  profile-all-inputs-option','placeholder':'Last Name'}),
            "city": forms.TextInput(attrs={"type":"text",'class': ' profile-all-inputs-option',"placeholder":"City"}),

            "country":forms.Select(attrs={'id':'id_country','name':'country','class':'profile-all-inputs-option'}),

            'profile': forms.FileInput(attrs={'id': 'id_profile',"onchange":"document.getElementById('profilePic').src = window.URL.createObjectURL(this.files[0])"}),
            'cover': forms.FileInput(attrs={'class': 'upload_profile_pic',"id":"id_cover","onchange":"document.getElementById('coverPic').src = window.URL.createObjectURL(this.files[0])"}),
            "phone_number":forms.TextInput(attrs={"class":"profile-all-inputs-option","oninput":"addPlusPrefix(this);"}),
        }
        # fields = '__all__'


class EditExperience(ModelForm):
    class Meta:
        model = UserExperiece
        fields = {
            "user_id",
            "title",
            "company",
            "Country",
            "city_usExp",
            "start_date",
            "end_date"
        }
        widgets = {
            "title": forms.TextInput(attrs={'class': 'name-input profile-all-inputs-option'}),
            "company": forms.TextInput(attrs={'class': 'name-input profile-all-inputs-option'}),
            "start_date": forms.DateInput(attrs={"maxlength":"10","class": "start-date-input date-of-birth-input inputs-job-details start-end-date all-inputs profile-all-inputs-option", "type": "text","placeholder":"Start Date (mm/dd/yyyy)","oninput":"this.value = MMDDYYYY(this.value, event)"}),
            "end_date": forms.DateInput(attrs={"maxlength":"10","class": "end-date-input date-of-birth-input inputs-job-details start-end-date all-inputs profile-all-inputs-option", "type": "text","placeholder":"End Date (mm/dd/yyyy)","onchange":"checkForm();checkStartDate();","oninput":"this.value = MMDDYYYY(this.value, event)"}),
            "Country": forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","list":"UsExpCountryList"}),
            "city_usExp":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","list":"usExpcityList"})
        }


class EditUserEdu(ModelForm):
    class Meta:
        model = UserEducation
        fields = {
            "user_id",
            "university",
            "degree",
            "field_of_study",
            "start_year",
            "end_year",
            "country_e",
            "city_e",
            "total_examples_passed",
            "GPA",
        }

        widgets = {
            "university":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","list":"uniList"}),
            "country_e":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","list":"EduCountryList"}),
            "city_e":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","list":"EduCityList"}),
            "degree": forms.TextInput(attrs={'class': 'name-input profile-all-inputs-option'}),
            "field_of_study": forms.TextInput(attrs={'class': 'name-input profile-all-inputs-option'}),
            "start_year": forms.DateInput(attrs={"oninput":"this.value = MMDDYYYY(this.value, event)","placeholder":"Start Year (mm/dd/yyyy)","onchange":"checkForm();checkStartDate();","class": "start-date-input date-of-birth-input inputs-job-details start-end-date all-inputs mutual-input", "type": "text"}),
            "end_year": forms.DateInput(attrs={"onchange":"checkForm();checkStartDate();","placeholder":"End Year (mm/dd/yyyy)","oninput":"this.value = MMDDYYYY(this.value, event)","class": "end-date-input date-of-birth-input inputs-job-details start-end-date all-inputs mutual-input", "type": "text"}),
            "total_examples_passed": forms.NumberInput(attrs={'class': 'name-input profile-all-inputs-option'}),
            "GPA": forms.NumberInput(attrs={'class': 'name-input profile-all-inputs-option'}),


        }


class EditUserLang(ModelForm):
    class Meta:
        model = UserLanguages
        fields = {
            "user_id",
            "language",
            "level",
        }


#####################################################################
# -------------------------Authenticated-----------------------------#
#####################################################################

class RegisterForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name',"password1")
        

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        del self.fields['password2']
        self.fields['password1'].help_text = None




from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

class NewRegisterForm(UserCreationForm):
    password1 = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(attrs={"class": "input-text password-input font-fam create-account", "value": "", "placeholder": "Password", "id": "create_account_password"})
    )

    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name')
        widgets = {
            "first_name": forms.TextInput(attrs={"class": "input-text name-surname-width name-input font-fam create-account", "placeholder": "First Name"}),
            "last_name": forms.TextInput(attrs={"class": "input-text name-surname-width surname-input font-fam create-account", "placeholder": "Last Name"}),
            "email": forms.TextInput(attrs={"class": "input-text email-input font-fam create-account", "placeholder ": "Email", "value": "", "id": "email_create_account"}),
            
        }
    def __init__(self, *args, **kwargs):
        super(NewRegisterForm, self).__init__(*args, **kwargs)
        del self.fields['password2']
        self.fields['password1'].help_text = None

    




class LoginForm(AuthenticationForm):
    username = forms.CharField()
    


#####################################################################
# -------------------------JOBS--------------------------------------#
#####################################################################


class add_Jobs(ModelForm):
    class Meta:
        model = Jobs
        fields = "__all__"
        widgets = {

            "job_title": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam next-none',"onchange":"checkForm()"}),
            "company": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam next-none',"onchange":"checkForm()"}),
            "start_date": forms.DateInput(
                attrs={"class": "start-date-input mutual-stats font-fam next-none", "type": "date","onchange":"checkForm()"}),
            "end_date": forms.DateInput(
                attrs={"class": "end-date-input mutual-stats font-fam next-none", "type": "date","onchange":"checkForm()"}),
            "housing_cost_per_week": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam  next-none',"onchange":"checkForm()"}),
            "programCost": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none',"onchange":"checkForm()"}),
            "hour_per_work": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none',"onchange":"checkForm()"}),
            "salary_per_hour": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none',"onchange":"checkForm()"}),
            "approved": forms.CheckboxInput(attrs={"disabled": "disabled"}),
            "city_j": forms.TextInput(attrs={"class": "next-none","list":"city_jlist","onchange":"checkForm()"}),
            "type_of_work": forms.Select(attrs={"class": "next-none","onchange":"checkForm()"}),
            "housing": forms.Select(attrs={"class": "next-none","onchange":"checkForm()"}),
            "program": forms.Select(attrs={"class": "next-none","onchange":"checkForm()"}),
            "country_j": forms.TextInput(attrs={'class': 'next-none name-input mutual-stats font-fam',"list":"country_jList","onchange":"checkForm()"}),
            "description": forms.Textarea(
                attrs={"class": "scroll inner-text second-next-none","id":"myTextArea", "style": "display: none;"})

        }


class editjob(ModelForm):
    class Meta:
        model = Jobs
        fields = "__all__"
        widgets = {
            "job_title": forms.TextInput(attrs={'class': 'all-inputs inputs-job-details contact-information-mutual-stats',"placeholder":"Job Title"}),
            "company": forms.TextInput(attrs={'class': 'all-inputs inputs-job-details contact-information-mutual-stats mutual-input',"placeholder":"Company"}),
            
            "city_j":forms.TextInput(attrs={'class':"apply-last-name inputs-job-details apply-name-surname all-inputs mutual-input"}),
            "salary_per_hour": forms.NumberInput(attrs={'class': 'all-inputs inputs-job-details contact-information-mutual-stats mutual-input'}),
            
            "housing_cost_per_week": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam  next-none'}),
            "programCost": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "hour_per_work": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "salary_per_hour": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "logo": forms.FileInput(attrs={'style': 'display:none'}),

            "approved": forms.CheckboxInput(),
            "city_j": forms.TextInput(attrs={"class": "name-input mutual-stats font-fam next-none","list":"city_jlist"}),
            "type_of_work": forms.Select(attrs={"class": "custom-select sel select-options-input next-none padding-of-inputs"}),
            "housing": forms.Select(attrs={"class": "custom-select sel select-options-input next-none padding-of-inputs"}),
            "program": forms.Select(attrs={"class": "custom-select sel select-options-input next-none padding-of-inputs"}),
            "country_j": forms.TextInput(attrs={"class": "name-input mutual-stats font-fam next-none","type":"text","list":"country_jList"}),
            "description": forms.Textarea(
                attrs={"class": "scroll inner-text second-next-none","id":"myTextArea", "style": "display: none;"})

        }
class JobQuestionForm(forms.ModelForm):
    class Meta:
        model = JobQuestion
        fields = ['promp', 'question_type', 'ideal_answer', 'qualify']


class applyform(ModelForm):
    class Meta:
        model = Application
        fields = "__all__"


class setupProfile(ModelForm):
    class Meta:
        model = CustomUser
        fields = ("first_name", "last_name", "sex","birthday", "country", "city", "email", "phone_number")
        widgets = {
            "first_name":forms.TextInput(attrs={'class':'next-none',"required":"required"}),
            "last_name":forms.TextInput(attrs={'class':'next-none',"required":"required"}),
            "country":forms.TextInput(attrs={"class":"test mutual-stats font-fam","list":"countryList"}),
            "city": forms.TextInput(attrs={"class": "test name-input mutual-stats font-fam","required":"required","list":"cityList"}),
            "email": forms.TextInput(attrs={"class": "next-none padding-of-inputs","type":"email","required":"required"}),
            "phone_number": forms.TextInput(attrs={"class": "next-none padding-of-inputs","required":"required"}),
            "birthday":forms.DateInput(attrs ={"class":"next-none","type":"date","required":"required"}),
            "sex":forms.Select(attrs={"class":"custom-select sel select-options-input next-none padding-of-inputs"}),

        }


class setupProfile2(ModelForm):
    class Meta:
        model = UserEducation
        fields = "__all__"
        widgets ={
            "university":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","required":"required", "placeholder":"University"}),
            "start_year": forms.DateInput(attrs={"class": "next-none profile-all-inputs-option", "type": "date","required":"required"}),
            # "end_year": forms.DateInput(attrs={"class": "next-none", "type": "date"},input_formats=settings.DATE_INPUT_FORMATS),
            
            "country_e":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","list":"CountryList","required":"required","placeholder":"Country"}),
            "city_e":forms.TextInput(attrs={"class":"name-input profile-all-inputs-option","list":"CityList","required":"required","placeholder":"City"}),
            "degree":forms.Select(),
        }

class AnswerUS(ModelForm):
    class Meta:
        model = ActiveStudent
        fields = "__all__"
        widgets = {
            "answer":forms.Select(attrs={"class":"custom-select sel select-options-input next-none padding-of-inputs","required":"required"})
        }
class setupProfile3(ModelForm):
    class Meta:
        model = UserLanguages
        fields = "__all__"
        widgets={
            "language":forms.Select(attrs={"class":"custom-select sel select-options-input next-none padding-of-inputs","required":"required"}),
            "level":forms.Select(attrs={"class":"custom-select sel select-options-input next-none padding-of-inputs","required":"required"})
        }

