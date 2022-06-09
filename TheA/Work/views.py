from django.shortcuts import render
from django.contrib.auth.models import User

# Create your views here.
def homepage(request):
    template = "home/home.html"
    return render(request,template) 

