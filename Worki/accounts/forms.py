from dataclasses import field, fields
from pyexpat import model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from django import forms
from accounts.models import *
from django.forms import ModelForm

class add_user_Exp(ModelForm):
    class Meta:
        model = UserExperiece
        fields = {"user_id","title","company","Country","city_usExp","start_date","end_date"}
        widgets ={
            "title": forms.TextInput(attrs={"class":"name-input mutual-stats font-fam"}),
            "company": forms.TextInput(attrs={"class":"name-input mutual-stats font-fam"}),
            "start_date": forms.DateInput(attrs={"class":"start-date-input mutual-stats font-fam","type":"date"}),
            "end_date": forms.DateInput(attrs={"class":"end-date-input mutual-stats font-fam","type":"date","required":"false"}),
            
        }
class add_user_language(ModelForm):
    class Meta:
        model  = UserLanguages
        fields = {"user_id","language","level"}

class add_user_edu(ModelForm):
    class Meta:
        model = UserEducation
        fields = {"user_id","university","degree","field_of_study","start_year","end_year","total_examples_passed","GPA"}  
        widgets ={
            "degree": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            "field_of_study": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            "start_year": forms.DateInput(attrs={"class":"start-date-input mutual-stats font-fam","type":"date"}),
            "end_year": forms.DateInput(attrs={"class":"end-date-input mutual-stats font-fam","type":"date"}),
            "total_examples_passed": forms.NumberInput(attrs={'class':'name-input mutual-stats font-fam'}),
            "GPA": forms.NumberInput(attrs={'class':'name-input mutual-stats font-fam'}),

        }

class EditProf(ModelForm):
    class Meta:
        model = CustomUser
        fields = {"first_name","last_name","city","country","profile","cover"}
        
       

        widgets = {
            "first_name": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            
            "last_name": forms.TextInput(attrs={'class':'surname-input mutual-stats font-fam'}), 
            "City": forms.Select(attrs={'class':'city-input font-fam','selected':1}),
            
            "Country": forms.Select(attrs={'class':'country-input font-fam'}),
            'profile':forms.FileInput(attrs={'id':'id_profile'}),
            'cover':forms.FileInput(attrs={'class':'upload_profile_pic'}),

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
        widgets ={
            "title": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            "company": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            "start_date": forms.DateInput(attrs={"class":"start-date-input mutual-stats font-fam","type":"date"}),
            "end_date": forms.DateInput(attrs={"class":"end-date-input mutual-stats font-fam","type":"date"}),

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
            "total_examples_passed",
            "GPA",
        }
        widgets ={
            "degree": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            "field_of_study": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            "start_year": forms.DateInput(attrs={"class":"start-date-input mutual-stats font-fam","type":"date"}),
            "end_year": forms.DateInput(attrs={"class":"end-date-input mutual-stats font-fam","type":"date"}),
            "total_examples_passed": forms.NumberInput(attrs={'class':'name-input mutual-stats font-fam'}),
            "GPA": forms.NumberInput(attrs={'class':'name-input mutual-stats font-fam'}),

        }
class EditUserLang(ModelForm):
    class Meta:
        model = UserLanguages
        fields = {
            "user_id",
            "language",
            "level",
        }

class RegisterForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name','last_name', 'password1')
   
       
    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        del self.fields['password2']
        self.fields['password1'].help_text = None
        

class LoginForm(AuthenticationForm):
    username = forms.CharField(label='Email / Username')
