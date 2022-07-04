from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from django import forms
from accounts.models import *
from django.forms import ModelForm


class EditProf(ModelForm):
    class Meta:
        model = CustomUser
        fields = {"first_name","last_name","city","country","profile"}
        
       

        widgets = {
            "first_name": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            
            "last_name": forms.TextInput(attrs={'class':'surname-input mutual-stats font-fam'}), 
            "City": forms.Select(attrs={'class':'city-input font-fam','selected':1}),
            
            "Country": forms.Select(attrs={'class':'country-input font-fam'}),
            'profile':forms.FileInput(attrs={'class':'upload_profile_pic'}),

         }
        # fields = '__all__'

# class EditExperience(ModelForm):
#     class Meta:
#         model = UserExperiece
#         fields = {
#             "title",
#             "company",
#             "country",
#             "city",
#             "start_date",
#             "end_date"
#         }
#         widgets ={
#             "title": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
#             "company": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
#             "start_date": forms.DateInput(attrs={'class':'name-input mutual-stats font-fam'}),
#             "end_date": forms.DateInput(attrs={'class':'name-input mutual-stats font-fam'}),

#         }

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
