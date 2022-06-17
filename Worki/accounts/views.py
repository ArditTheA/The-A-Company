from django.contrib.auth import views as auth_views
from django.shortcuts import render
from django.views import generic
from django.urls import reverse_lazy

from .forms import LoginForm, RegisterForm


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
