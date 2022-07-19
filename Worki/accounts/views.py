from inspect import Parameter
from django.contrib.auth import login
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
    


def registration(request):
    if request.POST:
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
                
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request,"accounts/register.html",{"form":form})

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
                        'domain': 'worki.global',
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



############################### Profile ##################################################

def update_profile(request):
    user_id = request.user.id
    usExp = UserExperiece.objects.filter(user_id = user_id)
    usEdu = UserEducation.objects.filter(user_id=user_id)
    usLang = UserLanguages.objects.filter(user_id=user_id)
    Cu = CustomUser.objects.get(id = user_id)
    form = EditProf(request.POST or None,request.FILES or None,instance= Cu)
    for_usExp = add_user_Exp(request.POST or None)
    form_usLang = add_user_language(request.POST or None)
    form_usEdu = add_user_edu(request.POST or None)

    if for_usExp.is_valid() or form.is_valid() or form_usLang.is_valid() or form_usEdu.is_valid():
        form.save()
        if for_usExp.is_valid():
            for_usExp.save()
        if form_usLang.is_valid():
            form_usLang.save()
        if form_usEdu.is_valid():
            form_usEdu.save()
        return redirect("profile")
    

    if (user_id != ''):
        
        for_usExp.initial['user_id'] = Cu.id
        form_usLang.initial['user_id'] = Cu.id
        form_usEdu.initial['user_id'] = Cu.id
  
    return render(request,'profile/profile.html',
        {"usExp":usExp,
        "usEdu":usEdu,
        "form":form,
        "for_usExp":for_usExp,
        "usLang":usLang,
        "form_usLang":form_usLang,
        "form_usEdu":form_usEdu,
        })


################Edit user Experience ####################333

def Edit_user_exp(request):
    user_id = request.user.id
    userExp = UserExperiece.objects.filter(user_id = request.user.id)
    
    for_usExp = add_user_Exp(request.POST or None)
    
    if for_usExp.is_valid():
        for_usExp.save()
        
        return redirect("editExprience")
    
    if (user_id != ''):
        
        for_usExp.initial["user_id"]=user_id

    return render(request,"profile/experiences.html",{"userExp":userExp,"for_usExp":for_usExp})
def Edit_user_expId(request,pk):
    user_id = request.user.id
    userExp = UserExperiece.objects.filter(user_id=user_id)
    usExp = UserExperiece.objects.get(id = pk)
    edit = EditExperience(request.POST or None, instance=usExp)
    
    if edit.is_valid():
        edit.save()
        return redirect("editExprience")
    
    return render(request,"profile/expreriencesId.html",{"userExp":userExp,"edit":edit})


 

################ Edit profile Education ##############3
def Edit_user_edu(request):
    user_id = request.user.id
    userEdu = UserEducation.objects.filter(user_id = user_id)
    edit = add_user_edu(request.POST or None)
    

    if edit.is_valid():
        edit.save()
        return redirect("editEdu")
    if(user_id != ''):
        edit.initial['user_id'] = user_id
    return render(request,"profile/education.html",{"edit":edit,"userEdu":userEdu})

def Edit_user_EduId(request,pk):
    user_id = request.user.id
    userEdu = UserEducation.objects.filter(user_id=user_id)
    usEdu = UserEducation.objects.get(id= pk)
    edit = EditUserEdu(request.POST or None,instance=usEdu)
    if edit.is_valid():
        edit.save()
        return redirect("editEdu")
    if(user_id != ''):
        edit.initial['user_id']=user_id
    return render(request,"profile/educationId.html",{"edit":edit,"userEdu":userEdu})




############# Edit Profile Language ##############
def Edit_user_language(request):
    user_id = request.user.id
    User_lang = UserLanguages.objects.filter(user_id=user_id)
    edit = add_user_language(request.POST or None)
    if edit.is_valid():
        edit.save()
        return redirect("editLanguage")
    if(user_id != ''):
        edit.initial['user_id']=user_id
    return render(request,"profile/language.html",{"User_lang":User_lang,"edit":edit})

def Edit_User_langId(request,pk):
    user_id = request.user.id
    User_lang = UserLanguages.objects.filter(user_id=user_id)
    usL = UserLanguages.objects.get(id=pk)
    edit = EditUserLang(request.POST or None,instance=usL)
    if edit.is_valid():
        edit.save()
        return redirect("editLanguage")
    if(user_id != ''):
        edit.initial['user_id'] = user_id

    return render(request,"profile/languageId.html",{"edit":edit,"User_lang":User_lang})





###########################################################################
#----------------------------JOBS-----------------------------------------#
###########################################################################


#------------------------Get Posted Jobs----------------------------------#

def getPostedJobs(request):
    uid = request.user.id
    order_l =["-postDate"]
    form = add_Jobs(request.POST or None, request.FILES or None)
    if request.method == "POST":
        if form.is_valid():
            form.save()
            return redirect("profile")
    if(uid != ''):
        form.initial["user_id"]=uid 
       
    job = Jobs.objects.filter(status="Open").order_by(*order_l)
    return render(request,"Jobs/Index.html",{"job":job,"form":form})

def getPostedJob(request):
    uid = request.user.id
    job = Jobs.objects.filter(user_id = uid)
    return render(request,"Jobs/Index.html",{"job":job})

def getApplyedJobs(request):
    user_id = request.user.id
    job = Application.objects.filter(user_id =user_id)
    return render(request,"Jobs/Index.html",{"job":job})



