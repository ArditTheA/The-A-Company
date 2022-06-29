from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from django import forms
from accounts.models import *


class EditProf(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = {"first_name","last_name","City","Country","profile"}
        
       

        widgets = {
            "first_name": forms.TextInput(attrs={'class':'name-input mutual-stats font-fam'}),
            
            "last_name": forms.TextInput(attrs={'class':'surname-input mutual-stats font-fam'}), 
        #     # "City": forms.ForeignKeyWidget(attrs={'class':'city-input font-fam','selected':1}),
            
        #     # "Country": forms.Select(attrs={'class':'country-input font-fam'}),
            'profile':forms.FileInput(attrs={'class':'upload_profile_pic'}),

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
