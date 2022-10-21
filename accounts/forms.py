from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from django import forms
from accounts.models import *
from django.forms import ModelForm


class add_user_Exp(ModelForm):
    class Meta:
        model = UserExperiece
        fields = {"user_id", "title", "company", "Country", "city_usExp", "start_date", "end_date"}
        widgets = {
            "title": forms.TextInput(attrs={"class": "name-input mutual-stats font-fam"}),
            "company": forms.TextInput(attrs={"class": "name-input mutual-stats font-fam"}),
            "start_date": forms.DateInput(attrs={"class": "start-date-input mutual-stats font-fam", "type": "date"}),
            "end_date": forms.DateInput(
                attrs={"class": "end-date-input mutual-stats font-fam", "type": "date", "required": "false"}),
            "Country": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam',"list":"usExpCountryList"}),
            "city_usExp":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"usExpCityList"})
            

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
            "university":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"University"}),
            "degree": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam'}),
            "field_of_study": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam'}),
            "country_e":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"EduCountryList"}),
            "city_e":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"EduCityList"}),
            "start_year": forms.DateInput(attrs={"class": "start-date-input mutual-stats font-fam", "type": "date"}),
            "end_year": forms.DateInput(attrs={"class": "end-date-input mutual-stats font-fam", "type": "date"}),
            "total_examples_passed": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam'}),
            "GPA": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam'}),

        }


class EditProf(ModelForm):
    class Meta:
        model = CustomUser
        fields = {"first_name", "last_name", "city", "country", "profile", "cover"}

        widgets = {
            "first_name": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam'}),

            "last_name": forms.TextInput(attrs={'class': 'surname-input mutual-stats font-fam'}),
            "city": forms.TextInput(attrs={"type":"text",'class': 'city-input font-fam',"list":"cityList"}),

            "country":forms.TextInput(attrs={"class":"test name-input mutual-stats font-fam","list":"countryList"}),

            'profile': forms.FileInput(attrs={'id': 'id_profile'}),
            'cover': forms.FileInput(attrs={'class': 'upload_profile_pic',"id":"id_cover"}),

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
            "title": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam'}),
            "company": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam'}),
            "start_date": forms.DateInput(attrs={"class": "start-date-input mutual-stats font-fam", "type": "date"}),
            "end_date": forms.DateInput(attrs={"class": "end-date-input mutual-stats font-fam", "type": "date"}),
            "Country": forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"UsExpCountryList"}),
            "city_usExp":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"usExpcityList"})
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
            "university":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"uniList"}),
            "country_e":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"EduCountryList"}),
            "city_e":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"EduCityList"}),
            "degree": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam'}),
            "field_of_study": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam'}),
            "start_year": forms.DateInput(attrs={"class": "start-date-input mutual-stats font-fam", "type": "date"}),
            "end_year": forms.DateInput(attrs={"class": "end-date-input mutual-stats font-fam", "type": "date"}),
            "total_examples_passed": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam'}),
            "GPA": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam'}),


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
        fields = ('email', 'first_name', 'last_name', 'password1')

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
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

            "job_title": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "company": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "start_date": forms.DateInput(
                attrs={"class": "start-date-input mutual-stats font-fam next-none", "type": "date"}),
            "end_date": forms.DateInput(
                attrs={"class": "end-date-input mutual-stats font-fam next-none", "type": "date"}),
            "housing_cost_per_week": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam  next-none'}),
            "programCost": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "hour_per_work": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "salary_per_hour": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "approved": forms.CheckboxInput(attrs={"disabled": "disabled"}),
            "city_j": forms.TextInput(attrs={"class": "next-none","list":"city_jlist"}),
            "type_of_work": forms.Select(attrs={"class": "next-none"}),
            "housing": forms.Select(attrs={"class": "next-none"}),
            "program": forms.Select(attrs={"class": "next-none"}),
            "country_j": forms.TextInput(attrs={'class': 'next-none name-input mutual-stats font-fam',"list":"country_jList"}),
            "description": forms.Textarea(
                attrs={"class": "scroll inner-text second-next-none","id":"myTextArea", "style": "display: none;"})

        }


class editjob(ModelForm):
    class Meta:
        model = Jobs
        fields = "__all__"
        widgets = {
            "job_title": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "company": forms.TextInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "start_date": forms.DateInput(
                attrs={"class": "start-date-input mutual-stats font-fam next-none", "type": "date"}),
            "end_date": forms.DateInput(
                attrs={"class": "end-date-input mutual-stats font-fam next-none", "type": "date"}),
            "housing_cost_per_week": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam  next-none'}),
            "programCost": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "hour_per_work": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "salary_per_hour": forms.NumberInput(attrs={'class': 'name-input mutual-stats font-fam next-none'}),
            "logo":forms.FileInput(attrs={"style":"display:none"}),
            "approved": forms.CheckboxInput(),
            "city_j": forms.TextInput(attrs={"class": "name-input mutual-stats font-fam next-none","list":"cityList"}),
            "type_of_work": forms.Select(attrs={"class": "custom-select sel select-options-input next-none padding-of-inputs"}),
            "housing": forms.Select(attrs={"class": "custom-select sel select-options-input next-none padding-of-inputs"}),
            "program": forms.Select(attrs={"class": "custom-select sel select-options-input next-none padding-of-inputs"}),
            "country_j": forms.TextInput(attrs={"class": "name-input mutual-stats font-fam next-none","type":"text","list":"countryList"}),
            "description": forms.Textarea(
                attrs={"class": "scroll inner-text second-next-none","id":"myTextArea", "style": "display: none;"})

        }


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
            "country":forms.TextInput(attrs={"class":"test name-input mutual-stats font-fam","list":"countryList"}),
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
            "university":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","required":"required", "list":"univ"}),
            "start_year": forms.DateInput(attrs={"class": "next-none", "type": "date","required":"required"}),
            # "end_year": forms.DateInput(attrs={"class": "next-none", "type": "date"},input_formats=settings.DATE_INPUT_FORMATS),
            
            "country_e":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"CountryList","required":"required"}),
            "city_e":forms.TextInput(attrs={"class":"name-input mutual-stats font-fam","list":"CityList","required":"required"}),
            "degree":forms.Select(),
        }

class setupProfile3(ModelForm):
    class Meta:
        model = UserLanguages
        fields = "__all__"
        widgets={
            "language":forms.Select(attrs={"class":"custom-select sel select-options-input next-none padding-of-inputs","required":"required"}),
            "level":forms.Select(attrs={"class":"custom-select sel select-options-input next-none padding-of-inputs","required":"required"})
        }

