from django.shortcuts import render

# Create your views here.
def homepage(request):
    template = "home/home.html"
    return render(request,template) 

