from inspect import Parameter
import re
from django.contrib.auth import views as auth_views
from django.shortcuts import redirect, render
from django.views import generic
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordChangeView
from django.contrib.auth.forms import PasswordChangeForm
from requests import request
from django.core.mail import send_mail,BadHeaderError
from django.http import HttpResponse
from accounts.models import *
from .forms import LoginForm, RegisterForm
from django.contrib.auth.forms import PasswordResetForm
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.views.generic.edit import UpdateView
from accounts.forms import *
def profile(request):
    
    return render(request,"profile/profile.html")

def Terms(request):
    return render(request,"accounts/Terms.html")
class passChange(PasswordChangeView):
    from_class=PasswordChangeForm
    success_url = reverse_lazy('home')

def HomeTemp(request):
    
    template_name = "home/home.html"
    return render(request, "home/home.html")


class LoginView(auth_views.LoginView):
    form_class = LoginForm
    template_name = 'accounts/login.html'

class LogoutView(auth_views.LogoutView):
    template_name="accouts/login.html"

class RegisterView(generic.CreateView):
    form_class = RegisterForm
    template_name = 'accounts/register.html'
    success_url = reverse_lazy('login')




def password_reset_request(request):
    if request.method == "POST":
        password_form = PasswordResetForm(request.POST)
        if password_form.is_valid():
            data = password_form.cleaned_data['email']
            user_email = CustomUser.objects.filter(Q(email=data))
            if user_email.exists():
                for user in user_email:
                    subject = "Password Request"
                    email_template_name='accounts/password_reset_email.txt'
                    parameter ={
                        'email':user.email,
                        'domain': '192.168.0.180',
                        'site_name': 'Worki',
                        'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                        'token':default_token_generator.make_token(user),
                        'protocol':"http",

                    }
                    email = render_to_string(email_template_name,parameter)
                    try:
                        send_mail(subject,email,'',[user.email],fail_silently=False)
                    except:
                        return HttpResponse("Invalid Header")
                    return redirect('password_reset_done')
    else:
        password_form = PasswordResetForm()
    context ={
        'password_form':password_form
    }
    return render(request,'accounts/password_reset.html',context)






#Edit
class EditMainInfo(UpdateView):
    model= CustomUser
    form_class= EditProf
    template_name="profile/profile.html"

