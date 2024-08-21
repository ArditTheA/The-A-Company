import requests
import stripe
from django.http import JsonResponse,HttpResponse, HttpResponseRedirect
import os
from django.views.generic import View
from django.shortcuts import HttpResponse
from urllib import request
from flask import Flask, jsonify, redirect, request
from django.contrib.auth import login
from django.contrib.auth import views as auth_views
from django.shortcuts import redirect, render, get_object_or_404
from django.views import generic
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordChangeView
from django.contrib.auth.forms import PasswordChangeForm
from django.core.mail import send_mail, BadHeaderError
from django.contrib.auth.forms import PasswordResetForm
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from google.oauth2.gdch_credentials import ServiceAccountCredentials
from oauthlib.oauth2 import OAuth2Error
from django.conf import settings

from accounts.forms import *
from django.contrib.auth.decorators import login_required
from django.utils import timezone
import itertools
from filters.models import Search, UserCountry, UserCity, UserUni

import json

import locale





today = timezone.now


def CompanyLandingPage(request):
    return render(request,"LandingPage/company.html")

def EmployeesLandingPage(request):
    return render(request,"LandingPage/employees.html")











def testQR(request):
    return render(request,"testcamera.html")

def CalendlyData(em,date,meet):
    if CustomUser.objects.filter(email=em).exists():
        user = CustomUser.objects.get(email=em)
        start_time = date
        googleMeetU = meet
        applicant = Application.objects.filter(user_id = user)
        for i in applicant:
            app = Application.objects.get(id=i.id)
            app.meetWithUs = start_time
            app.meetWithUsLink = googleMeetU
            app.save()
        print("Done")



def CalendlyAPI():
    access_token = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjg2NzUzNzY2LCJqdGkiOiJmYTY2ZmY0Zi05ZTE2LTRjYzgtODU4My0xZTE0MDMzODlkODMiLCJ1c2VyX3V1aWQiOiJhNDZlMjk4Ni0wMGI3LTRkMGYtOTNkOS0yZGNhZGFhM2FmYTQifQ.BsBybdStVNGLNvKIroTfVcEhjImmQCvNMxvnzLBltS52NTE6YdbtjVSQmLYwkfPKIqO0MO52Y7GuWSgWFif7NA'
    organization_id = "https://api.calendly.com/organizations/d380dd99-d4bf-448c-95d7-230f5c0d8ab3"
    start_time = datetime.now().isoformat()

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    params = {
        "min_start_time": start_time,
        "organization": organization_id
    }

    url = "https://api.calendly.com/scheduled_events"

    response = requests.get(url, headers=headers, params=params)
    def get_invitees(api_token, event_id):
        headers = {
            'Authorization': f'Bearer {api_token}',
            'Content-Type': 'application/json'
        }

        url = f'https://api.calendly.com/scheduled_events/{event_id}/invitees'

        response = requests.get(url, headers=headers)

        if response.status_code == 200:  # Successful response
            data = response.json()

            if 'collection' in data:
                invitees = data['collection']
                return invitees
            else:
                print("No invitees found in the response.")
        else:
            print("Failed to retrieve invitees. Status code:", response.status_code)



    if response.status_code == 200:
        upcoming_events = response.json()
        for event in upcoming_events["collection"]:
            event_uri = event.get("uri")
            join_url = event.get("location", {}).get("join_url")
            event_start_time = event["start_time"]


            last_part = event_uri.split("/")[-1]
            print(last_part)
            parsed_date = datetime.strptime(event_start_time, "%Y-%m-%dT%H:%M:%S.%fZ")
            formatted_date = parsed_date.strftime("%d-%m-%Y %H:%M")
            invitees_list = get_invitees(access_token, last_part)
            if invitees_list:
                for invitee in invitees_list:
                    print("----------")
                    print("----------")
                    name = invitee['name']
                    email = invitee['email']
                    print("Name:", name)
                    print("Email:", email)
                    print(f"Google meet url: {join_url}")
                    print(f"Start Time: {formatted_date}")
                    if join_url != None:
                        CalendlyData(email,formatted_date,join_url)


    else:
        ardit
        print("Error occurred while fetching events.")
        print(response.text)




def login_redirect(request):
    return redirect('login')

def landingPage(request):
    return redirect("jobs")
def landingPage1(request):
    userNo =  CustomUser.objects.all().count()
    userNo = userNo+2300
    appNo  = Application.objects.all().count()
    appNo = appNo+2300
    appNo = "{:,}".format(appNo)
    visitorNo = 32083+2023
    jobs = Jobs.objects.all().count()
    return render(request,"landing-page.html",{"userNo":userNo,"appNo":appNo,"visitorNo":visitorNo,"jobs":jobs})







#################### product before Suggestions ######################
def UniUser(university, user):
    uni = university
    us = user

    if not University.objects.filter(name=uni).exists():
        if not UserUni.objects.filter(name=uni).filter(user=us).exists():
            usUni = UserUni()
            usUni.name = uni
            usUni.user = us
            usUni.save()
            if UserUni.objects.filter(name=uni).count() + 1 > 10:
                unives = University()
                unives.name = uni
                unives.save()


def CityUser(city, country, user):
    cit = city
    coun = country
    us = user
    if not City.objects.filter(name=cit).exists():
        if not UserCity.objects.filter(name=cit).filter(user=us).exists():
            coU = UserCity()
            coU.name = cit
            coU.user = us
            coU.save()
            if UserCity.objects.filter(name=cit).count() + 1 > 10:
                CityC = City()
                CityC.name = cit
                CityC.country = coun
                CityC.save()


def CountryUser(country, user):
    coun = country
    us = user
    if not Country.objects.filter(country=coun).exists():
        if not UserCountry.objects.filter(Country=coun).filter(user=us).exists():
            coU = UserCountry()
            coU.Country = coun
            coU.user = us
            coU.save()
            if UserCountry.objects.filter(Country=coun).count() + 1 > 10:
                countryC = Country()
                countryC.country = coun
                countryC.save()

def CountryJob(country):
    co = country
    if not Country.objects.filter(country=co).exists():
        coJ = Country()
        coJ.country=co
        coJ.save()
def CityJob(city,country):
    ci = city
    co = country
    if not City.objects.filter(name=ci).exists():
        ciJ = City()
        ciJ.name=ci
        ciJ.country=Country.objects.get(country=co)
        ciJ.save()
############################################################################


from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView



def Terms(request):
    return render(request, "Terms/index.html")


class passChange(PasswordChangeView):
    from_class = PasswordChangeForm
    success_url = reverse_lazy('home')




class LoginView(auth_views.LoginView):
    form_class = LoginForm
    template_name = 'accounts/login.html'
class GLoginView(auth_views.LoginView):
    form_class = LoginForm
    template_name = 'accounts/Glogin.html'

class LogoutView(auth_views.LogoutView):
    template_name = "accouts/login.html"


class RegisterView(generic.CreateView):
    form_class = RegisterForm
    template_name = 'accounts/Newregister.html'







def newregister(request):
    if request.method == 'POST':
        NewClinetemail = request.POST.get("email")
        form = NewRegisterForm(request.POST)
        if form.is_valid():
            # Check if the email already exists
            email = form.cleaned_data['email']
            if CustomUser.objects.filter(email=email).exists():
                form.add_error('email', 'An account with this email already exists.')
            else:
                first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']

            # Create the user object and save it
            user = form.save()

            # Set "first_name" and "last_name" on the user object
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            subject = "Welcome to Worki"
            email_template_applicant = "main/register/Welcome.txt"
            c = {
                "email": user.email,
                'domain': 'worki.global',
                'site_name': 'Worki',
                'user': request.user,
                'first_name': first_name,
            }
            email = render_to_string(email_template_applicant, c)
            try:
                send_mail(subject, email, 'Worki hello@worki.global',
                          [NewClinetemail], fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')

            login(request, user)
            next_url = request.GET.get('next')
            if next_url:
                return redirect(next_url)  # Redirect to the URL specified in 'next'
            return redirect('home')
            
    else:
        form = NewRegisterForm()

    return render(request, 'accounts/Newregister.html', {'form': form})
def registration(request):
    if request.POST:
        NewClinetemail = request.POST.get("email")
        form = RegisterForm(request.POST)
        if form.is_valid():
            # Extract "first_name" and "last_name" from the form
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']

            # Create the user object and save it
            user = form.save()

            # Set "first_name" and "last_name" on the user object
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            subject = "Welcome to Worki"
            email_template_applicant = "main/register/Welcome.txt"
            c = {
                "email": user.email,
                'domain': 'worki.global',
                'site_name': 'Worki',
                'user': request.user,
                'first_name': first_name,
            }
            email = render_to_string(email_template_applicant, c)
            try:
                send_mail(subject, email, 'Worki hello@worki.global',
                          [NewClinetemail], fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')

            login(request, user)
            
            next_url = request.GET.get('next')
            if next_url:
                return redirect(next_url)  # Redirect to the URL specified in 'next'
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, "accounts/Newregister.html", {"form": form})


############################### Profile ##################################################
@login_required
def update_profile(request):
    user_id = request.user.id
    usExp = UserExperiece.objects.filter(user_id=user_id)
    usEdu = UserEducation.objects.filter(user_id=user_id)
    usLang = UserLanguages.objects.filter(user_id=user_id)
    return render(request, 'UserProfile/index.html',
                  {"usExp": usExp,
                   "usEdu": usEdu,
                   "usLang": usLang,
                   })


# Edit user Experience ####################333

@login_required
def Edit_user_exp(request):
    user_id = request.user.id
    usExp = UserExperiece.objects.filter(user_id=request.user.id)

    for_usExp = add_user_Exp(request.POST or None)
    country = Country.objects.all()
    city = City.objects.all()
    if for_usExp.is_valid():
        for_usExp.save()

        return redirect("editExprience")

    if (user_id != ''):
        for_usExp.initial["user_id"] = user_id

    return render(request, "UserProfile/EditAdd/experiences.html",
                  {"usExp": usExp, "for_usExp": for_usExp, "country": country, "city": city})


@login_required
def Edit_user_expId(request, pk):
    user_id = request.user.id
    userExp = UserExperiece.objects.filter(user_id=user_id)
    usExp = UserExperiece.objects.get(id=pk)
    edit = EditExperience(request.POST or None, instance=usExp)
    citys = City.objects.all()
    countrys = Country.objects.all()
    if edit.is_valid():
        edit.save()
        return redirect("editExprience")

    return render(request, "UserProfile/EditAdd/expreriencesId.html",
                  {"usExp": userExp, "edit": edit, "countrys": countrys, "citys": citys})


# Edit profile Education ##############3
@login_required
def Edit_user_edu(request):
    user_id = request.user.id
    userEdu = UserEducation.objects.filter(user_id=user_id)
    edit = add_user_edu(request.POST or None)
    country = Country.objects.all()
    city = City.objects.all()
    USUniversity = request.POST.get("university")
    if edit.is_valid():
        UniUser(USUniversity, request.user)
        edit.save()
        return redirect("editEdu")
    if (user_id != ''):
        edit.initial['user_id'] = user_id
    return render(request, "UserProfile/EditAdd/education.html",
                  {"edit": edit, "userEdu": userEdu, "country": country, "city": city})


@login_required
def Edit_user_EduId(request, pk):
    user_id = request.user.id
    userEdu = UserEducation.objects.filter(user_id=user_id)
    usEdu = UserEducation.objects.get(id=pk)
    edit = EditUserEdu(request.POST or None, instance=usEdu)
    country = Country.objects.all()
    city = City.objects.all()
    university = University.objects.all()
    if edit.is_valid():
        edit.save()
        return redirect("editEdu")
    if (user_id != ''):
        edit.initial['user_id'] = user_id
    return render(request, "UserProfile/EditAdd/educationId.html",
                  {"edit": edit, "userEdu": userEdu, "country": country, "city": city, "university": university})


############# Edit Profile Language ##############
@login_required
def Edit_user_language(request):
    user_id = request.user.id
    User_lang = UserLanguages.objects.filter(user_id=user_id)
    edit = add_user_language(request.POST or None)
    lang = Languages.objects.all()
    if edit.is_valid():
        edit.save()
        return redirect("editLanguage")
    if (user_id != ''):
        edit.initial['user_id'] = user_id
    return render(request, "UserProfile/EditAdd/language.html", {"User_lang": User_lang, "edit": edit, "lang": lang})


@login_required
def Edit_User_langId(request, pk):
    user_id = request.user.id
    User_lang = UserLanguages.objects.filter(user_id=user_id)
    usL = UserLanguages.objects.get(id=pk)
    lang = Languages.objects.all()
    uslang = usL.language
    asd1 = usL.level

    edit = EditUserLang(request.POST or None, instance=usL)
    if edit.is_valid():
        edit.save()
        return redirect("editLanguage")
    if (user_id != ''):
        edit.initial['user_id'] = user_id

    return render(request, "UserProfile/EditAdd/languageId.html",
                  {"edit": edit, "User_lang": User_lang, "lang": lang, "uslang": uslang, "asd1": asd1})


###########################################################################
# ----------------------------Profile JOBS---------------------------------#
###########################################################################


#########################################################################################
# ------------------------------Posted Jobs---------------------------------------------#
#########################################################################################
@method_decorator(login_required(login_url='/login/'), name='dispatch')
class AjaxHandler(View):

    def get(self, request):
        hasApply = False
        if request.user.is_staff:
            job = Jobs.objects.all().order_by("-postDate")
        else:
            job = Jobs.objects.filter(user_id=request.user.id).order_by("-postDate")
        post_id = request.headers.get('text')

        if post_id == "":
            jobid = Jobs.objects.filter(user_id=request.user.id).order_by(
                "-postDate").values_list("id", flat=True).first()
            post_id = jobid
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                SDate = start_date
                EDate = end_date
                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")
                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,
                         posted=posted, post_id=post_id, appNo=appNo,hasApply=False))
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()
                salary = format(salary, '.2f')
                SDate = start_date
                EDate = end_date
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                locale.setlocale(locale.LC_ALL, '')  # set the locale to the user's default
                programCost = locale.format("%d", programCost, grouping=True)

                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,
                         posted=posted, appNo=appNo,post_id=post_id,hasApply=False))
        check = True
        if len(job) != 0:
            check = True
        else:
            check = False
        if len(job) != 0:
            check = True
            post_id=job[0].id
            return render(request, "Recruiter/index.html", dict(job=job, check=check, jpk=1,post_id=post_id))
        checkMainJobs = False
        return render(request, "Recruiter/index.html", dict(job=job, check=check,jpk=1,checkMainJobs=checkMainJobs))

class RecruiterOpenJobs2(View):
    def get(self,request):
        hasApply = False
        if request.user.is_staff:
            job = Jobs.objects.filter(status="Open").order_by("-postDate")
        else:
            job = Jobs.objects.filter(user_id=request.user.id).filter(status="Open").order_by('-postDate')
        post_id = request.headers.get("text")
        if post_id == "":
            jobid = Jobs.objects.filter(user_id=request.user.id).order_by(
                "-postDate").values_list("id", flat=True).first()
            post_id = jobid
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                SDate = start_date
                EDate = end_date
                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")
                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost, SDate=SDate, EDate=EDate,
                         posted=posted, post_id=post_id, appNo=appNo, hasApply=False))
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()
                salary = format(salary, '.2f')
                SDate = start_date
                EDate = end_date
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                locale.setlocale(locale.LC_ALL, '')  # set the locale to the user's default
                programCost = locale.format("%d", programCost, grouping=True)

                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost, SDate=SDate, EDate=EDate,
                         posted=posted, appNo=appNo, post_id=post_id, hasApply=False))
        if len(job) != 0:
            check = True
        else:
            check = False
        if len(job) != 0:
            check = True
            post_id=job[0].id
            return render(request, "Recruiter/index.html", dict(job=job, check=check, jpk=1,post_id=post_id, filterJobs="Open Jobs"))
        checkMainJobs = False
        filterJobs = "Open Jobs"
        return render(request, "Recruiter/index.html", dict(job=job, check=check,jpk=1,checkMainJobs=checkMainJobs))
class RecruiterClosedJobs(View):
    def get(self,request):
        hasApply = False
        if request.user.is_staff:
            job = Jobs.objects.filter(status = "Close").order_by("-postDate")
        else:
            job = Jobs.objects.filter(user_id=request.user.id).filter(status="Close").order_by('-postDate')
        post_id = request.headers.get("text")
        if post_id == "":
            jobid = Jobs.objects.filter(user_id=request.user.id).order_by(
                "-postDate").values_list("id", flat=True).first()
            post_id = jobid
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                SDate = start_date
                EDate = end_date
                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")

                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost, SDate=SDate, EDate=EDate,
                         posted=posted, post_id=post_id, appNo=appNo, hasApply=False))
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()
                salary = format(salary, '.2f')
                SDate = start_date
                EDate = end_date
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                locale.setlocale(locale.LC_ALL, '')  # set the locale to the user's default
                programCost = locale.format("%d", programCost, grouping=True)

                return JsonResponse(
                    dict(description=description,title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost, SDate=SDate, EDate=EDate,
                         posted=posted, appNo=appNo, post_id=post_id, hasApply=False))
        if len(job) != 0:
            check = True
        else:
            check = False
        if len(job) != 0:
            check = True
            post_id=job[0].id
            return render(request, "Recruiter/index.html", dict(job=job, check=check, jpk=1,post_id=post_id,filterJobs="Closed Jobs"))
        checkMainJobs = False

        return render(request, "Recruiter/index.html", dict(job=job, check=check,jpk=1,checkMainJobs=checkMainJobs))

# def mySum(x):
#     total = 0
#     for i in range(x + 1):
#         total += i
#     return total
# print(mySum(3))
# x = [2, 3, 4]
# def TwoElementsEqual(x, y):
#     for firstElement in x:
#         if firstElement == y:
#             return True
#     return False

# print(TwoElementsEqual(x, 2))

from documents.forms import DocumentForm
from documents.views import *

@method_decorator(login_required(login_url='/login/'), name='dispatch')
class AppliedJobs(View):
    def get(self, request):
        
        job = ""
        if request.GET.get("searchApplied") is not None:
            query = request.GET.get("searchApplied")

            t = query.split(" ")
            t = remove_null(t)
            if query.isspace() != True:
                query = Q()
                for s in t:
                    query |= Q(job_id__job_title__contains=s) | Q(job_id__company__contains=s) | Q(job_id__country_j__contains=s)

                job = Application.objects.filter(user_id=request.user).filter(query).order_by("-apply_date")

        elif request.GET.get("filterApply") is not None:
            filterJ = request.GET.get("filterApply")
            if filterJ == "Active Jobs":
                job = Application.objects.filter(user_id=request.user).filter(job_id__status="Open").order_by("-apply_date")
            elif filterJ == "Inactive Jobs":
                job = Application.objects.filter(user_id=request.user).filter(job_id__status="Close").order_by("-apply_date")
            elif filterJ == "Progress Jobs":
                job = Application.objects.filter(user_id=request.user).order_by("-apply_date")


        else:
            job = Application.objects.filter(
                user_id=request.user).order_by("-apply_date")
        post_id = request.headers.get('text')
        hasApply =  True
        if post_id == "":
            jobid = Application.objects.filter(user_id=request.user).order_by(
                "-apply_date").values_list("job_id_id", flat=True).first()
            post_id = jobid

            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                checkMainJobs = False
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()
                applied = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("apply_date", flat=True).first()
                StatusApp = Application.objects.filter(job_id=post_id,user_id=request.user).values_list("ApplicantStat",flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()
                salary = format(salary, '.2f')
                SDate = start_date
                EDate = end_date
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")
                applied = format(applied, "%d/%m/%Y")
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                locale.setlocale(locale.LC_ALL, '')  # set the locale to the user's default
                programCost = locale.format("%d", programCost, grouping=True)

                meetingTime = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("meetWithUs", flat=True).first()
                meetingLink = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("meetWithUsLink", flat=True).first()
                print("---------------")
                print(f"meetingTime: {meetingTime}")
                print(f"meetingLink: {meetingLink}")
                print("---------------")
                print("test")
                print(checkMainJobs)
                print("test")

                passaportExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Passport").exists()
                studentStatusExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student Status").exists()
                certificateOfEnrolmentExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Certificate of Enrolment").exists()
                studentIdExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student ID").exists()
                photoExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Photo").exists()
                serviceContractExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Service contract").exists()
                jobOfferExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Job Offer").exists()
                workPermitExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Work Permit").exists()

                print(passaportExists)
                print(studentStatusExists)
                print(certificateOfEnrolmentExists)
                print(studentIdExists)
                print(photoExists)
                print(serviceContractExists)
                print(jobOfferExists)
                print(workPermitExists)

                return JsonResponse(
                    dict(description=description,hasApply=hasApply, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,checkMainJobs=checkMainJobs,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,StatusApp=StatusApp,
                         posted=posted, post_id=post_id, applied=applied, appNo=appNo,meetingLink=meetingLink,meetingTime=meetingTime,

                         passaportExists=passaportExists,studentStatusExists=studentStatusExists,certificateOfEnrolmentExists=certificateOfEnrolmentExists,
                         studentIdExists=studentIdExists,photoExists=photoExists,serviceContractExists=serviceContractExists,jobOfferExists=jobOfferExists,
                         workPermitExists=workPermitExists,userid=request.user.id
                         
                         
                         ))
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()
                applied = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("apply_date", flat=True).first()

                meetingTime = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("meetWithUs", flat=True).first()
                meetingLink = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("meetWithUsLink", flat=True).first()
                StatusApp = Application.objects.filter(job_id=post_id,user_id=request.user).values_list("ApplicantStat",flat=True).first()

                print("---------------")
                print(f"meetingTime: {meetingTime}")
                print(f"meetingLink: {meetingLink}")
                print("---------------")
                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                salary = format(salary, '.2f')
                SDate = start_date
                EDate = end_date
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")
                applyDate = format(applied, "%d/%m/%Y")
                checkMainJobs="False"
                print(checkMainJobs)
                passaportExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Passport").exists()
                studentStatusExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student Status").exists()
                certificateOfEnrolmentExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Certificate of Enrolment").exists()
                studentIdExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student ID").exists()
                photoExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Photo").exists()
                serviceContractExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Service contract").exists()
                jobOfferExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Job Offer").exists()
                workPermitExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Work Permit").exists()
                
                print(passaportExists)
                print(studentStatusExists)
                print(certificateOfEnrolmentExists)
                print(studentIdExists)
                print(photoExists)
                print(serviceContractExists)
                print(jobOfferExists)
                print(workPermitExists)
                return JsonResponse(
                    dict(description=description,hasApply=hasApply,applyDate=applyDate, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,StatusApp=StatusApp,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,checkMainJobs=checkMainJobs,
                         posted=posted, post_id=post_id, applied=applied, appNo=appNo,meetingTime=meetingTime,meetingLink=meetingLink,
                         passaportExists=passaportExists,studentStatusExists=studentStatusExists,certificateOfEnrolmentExists=certificateOfEnrolmentExists,
                         studentIdExists=studentIdExists,photoExists=photoExists,serviceContractExists=serviceContractExists,jobOfferExists=jobOfferExists,
                         workPermitExists=workPermitExists,userid=request.user.id
                         ), safe=True)
        check = True
        filterSel = request.GET.get("filterApply")
        passaportExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Passport").exists()
        studentStatusExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student Status").exists()
        certificateOfEnrolmentExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Certificate of Enrolment").exists()
        
        print("--------------")
        print("--------------")
        print(studentStatusExists)
        print("--------------")
        print("--------------")
        if len(job) != 0:
            check = True
            post_id=job[0].job_id.id
            print("----------------------")
            print("----------------------")
            print(post_id)
            print("----------------------")
            print("----------------------")
            return render(request, "MyJobs/index.html", dict(job=job, check=check,post_id=post_id,filterSel=filterSel,
                                                        passaportExists=passaportExists,studentStatusExists=studentStatusExists,
                                                        certificateOfEnrolmentExists=certificateOfEnrolmentExists))
        else:
            check = False
        checkMainJobs = False


        

        return render(request, "MyJobs/index.html", dict(job=job, check=check,filterSel=filterSel,checkMainJobs=checkMainJobs))
    

#########################################################################################
# ------------------------------Posted Jobs---------------------------------------------#
#########################################################################################
def remove_null(list_):
    return [value for value in list_ if value]
class MainJobs(View):
    def get(self, request):
        post_id = request.headers.get("text")
        test = request.headers.get("text")
        checkMainJobs = True
        job = Jobs.objects.filter(approved=True).filter(status="Open").order_by("-postDate").order_by("-id")
        # job = Jobs.objects.filter(approved=True).filter(status="Open").order_by("-postDate").order_by("-id")

        hasApply = False
        hasApplyDate = ""
        title=""
        # search
        query = request.GET.get("q")
        title_j = [""]
        city_j = [""]
        country_j = [""]


        if query != None:
            t = query.split(" ")
            t = remove_null(t)
            if query.isspace() != True:
                searchWord = []
                if len(t)>1:
                    for i in t:
                        if i != "in" or i != "on" or i != "at" or i != "," or i != "-" or i != " ":
                            if i[len(i) - 1] == ",":
                                i = i.replace(',', '')
                                searchWord.append(i)
                            elif i[len(i) - 1] == ".":
                                i = i.replace(',', '')
                                searchWord.append(i)
                            else:
                                searchWord.append(i)
                    if len(searchWord) > 0:
                        for i in range(len(searchWord)):
                            if Jobs.objects.filter(job_title__icontains=searchWord[i]).exists():

                                title_j.insert(0, t[i])
                            elif Jobs.objects.filter(city_j__icontains=searchWord[i]).exists():
                                city_j.insert(0, searchWord[i])
                            elif Jobs.objects.filter(country_j__icontains=searchWord[i]).exists():
                                country_j.insert(0, searchWord[i])
                        job=Jobs.objects.filter(job_title__icontains=title_j[0]).filter(city_j__icontains=city_j[0]).filter(
                        country_j__icontains=country_j[0]).filter(approved=True).filter(status="Open").order_by("-id")
                elif len(t)==1:
                    job = Jobs.objects.filter(Q(job_title__contains=query) | Q(city_j__icontains=query) | Q(country_j__icontains=query)).filter(approved=True).filter(status="Open").order_by("-id")
            if request.user.is_authenticated:
                search = Search()
                search.user_id = request.user
                search.search = query
                search.save()

        # end of search

        # filters options
        sortProgram = []
        sortTitle = []
        sortCompany = []
        sortCity = []
        cityName = []
        sortSalary = []

        if len(job) >= 1:
            program = job.values_list("program", flat=True)
            title = job.values_list("job_title", flat=True)
            comp = job.values_list("company", flat=True)
            country_j = job.values_list("country_j", flat=True)
            salary = job.values_list("salary_per_hour", flat=True)

            for i in program:
                if i not in sortProgram:
                    sortProgram.append(i)
            for i in title:
                if i not in sortTitle:
                    sortTitle.append(i)
            for i in comp:
                if i not in sortCompany:
                    sortCompany.append(i)
            cityName=list(dict.fromkeys(country_j))


            salUSA = []
            salEu = []

            for i in job:
                if i.country_j == "USA":
                    sal = format(i.salary_per_hour, '.2f')
                    salUSA.append(sal)
                else:
                    sal = format(i.salary_per_hour, '.2f')
                    salEu.append(sal)

            sortSalaryUSA = []
            sortSalaryEu = []
            for i in salUSA:
                if i not in sortSalaryUSA:
                    sortSalaryUSA.append(i)
            for i in salEu:
                if i not in sortSalaryEu:
                    sortSalaryEu.append(i)
            for i in sortSalaryUSA:
                sal = "$" + str(i)
                sortSalary.append(sal)
            for i in sortSalaryEu:
                sal = "€" + str(i)
                sortSalary.append(sal)

            sortProgram.sort(reverse=True)
            sortTitle.sort()
            sortCompany.sort()
            cityName.sort()
        #  Take the  first post   !!! with  auto id  the first result
        getMonth = datetime.now().month
        getYear = datetime.now().year




        if post_id == "":
            post_id = Jobs.objects.filter(approved=True).filter(status="Open").order_by(
                "-postDate").values_list('id', flat=True).first()

            if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                hasApply = True
                hasApplyDate = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list(
                    "apply_date", flat=True).first()
                hasApplyDate = format(hasApplyDate, "%d/%m/%Y")
                print(hasApplyDate)
            appNo = Jobs.objects.get(id=post_id).applicant.count()
            appNo = "{:,}".format(appNo)

            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Jobs.objects.filter(id=post_id).values_list(
                    "postDate", flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()

                applicant = Jobs.objects.filter(id=post_id).first()
                SDate = start_date
                EDate = end_date
                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                app = (str(applicant))
                locale.setlocale(locale.LC_ALL, '')  # set the locale to the user's default
                programCost = locale.format("%d", programCost, grouping=True)
                return JsonResponse(
                    dict(description=description, title=title, applicant=app, city_j=city_j, country=country,
                         start_date=start_date,SDate=SDate,EDate=EDate,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,checkMainJobs=checkMainJobs,
                         posted=posted, post_id=post_id, appNo=appNo, hasApply=hasApply,
                         hasApplyDate=hasApplyDate), safe=True)
        # take selected post byy id
        else:
            if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                hasApply = True
                hasApplyDate = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list(
                    "apply_date", flat=True).first()
                hasApplyDate = format(hasApplyDate, "%d/%m/%Y")
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                description = Jobs.objects.filter(id=post_id).values_list(
                    'description', flat=True).first()
                title = Jobs.objects.filter(id=post_id).values_list(
                    'job_title', flat=True).first()
                start_date = Jobs.objects.filter(id=post_id).values_list(
                    'start_date', flat=True).first()
                end_date = Jobs.objects.filter(id=post_id).values_list(
                    'end_date', flat=True).first()
                salary = Jobs.objects.filter(id=post_id).values_list(
                    "salary_per_hour", flat=True).first()
                tips = Jobs.objects.filter(id=post_id).values_list(
                    "tips",flat=True).first()
                hourWeek = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                company = Jobs.objects.filter(id=post_id).values_list(
                    "company", flat=True).first()
                typeOfWork = Jobs.objects.filter(id=post_id).values_list(
                    "type_of_work", flat=True).first()
                hourPerWork = Jobs.objects.filter(id=post_id).values_list(
                    "hour_per_work", flat=True).first()
                housing = Jobs.objects.filter(id=post_id).values_list(
                    "housing", flat=True).first()
                housingCost = Jobs.objects.filter(id=post_id).values_list(
                    "housing_cost_per_week", flat=True).first()
                program = Jobs.objects.filter(id=post_id).values_list(
                    "program", flat=True).first()
                programCost = Jobs.objects.filter(id=post_id).values_list(
                    "programCost", flat=True).first()
                posted = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user.id).values_list("apply_date", flat=True).first()

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()
                locale.setlocale(locale.LC_ALL, '')  # set the locale to the user's default
                programCost = locale.format("%d", programCost, grouping=True)
                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                appNo = "{:,}".format(appNo)
                SDate = start_date
                EDate=end_date
                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")


                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary,tips=tips, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,checkMainJob=checkMainJobs,
                         posted=posted, post_id=post_id, appNo=appNo, hasApply=hasApply, safe=True,applyDate=hasApplyDate))
        filterProgram = ""
        filterTitle = ""
        filterCompany = ""
        filterLocation = ""
        filterSalary = ""
        filterDate = ""
        check = True
        if len(job) != 0:
            check = True
        else:
            check = False

        hasApply=False
        if job.count() > 0:
            if post_id is None:
                post_id = job[0].id
                if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                    hasApply = True

        checkMainJobs = True
        return render(request, "MainJobs/index.html",
                      dict(job=job, prog=sortProgram, title=sortTitle, company=sortCompany, city=cityName,
                           salary=sortSalary, filterProgram=filterProgram, filterTitle=filterTitle,
                           filterCompany=filterCompany,
                           filterLocation=filterLocation, filterSalary=filterSalary, filterDate=filterDate, tit=title,
                           check=check, post_id=post_id,hasApply=hasApply,
                           checkMainJobs=checkMainJobs))




def ApplySuc(request):
    user= request.user
    app = Application.objects.filter(user_id=user)
    return render(request,"MainJobs/apply.html")



@login_required
def applyForJob2(request, pk):
    country = Country.objects.all()
    city = City.objects.all()
    uni = University.objects.all()
    compare = False
    edu = ""
    a = pk
    if UserEducation.objects.filter(user_id=request.user.id).exists():
        compare = True

        edu = UserEducation.objects.filter(user_id=request.user.id).order_by('-id')[0]
        form = setupProfile2(request.POST or None, instance=edu)

        sdate = format(edu.start_year, "%d/%m/%Y")
        edate = ""
        if edu.end_year != None:
            edate = format(edu.end_year, "%d/%m/%Y")

        if request.method == "POST":
            if form.is_valid():
                form.save()

                return redirect('setupPart3', pk)

        form.initial["user_id"] = request.user.id
        return render(request, "ProfileSetup/secondInfo.html", {"form": form, "compare": compare,
                                                                "country": country, "city": city, "uni": uni,
                                                                "edu": edu, "sdate": sdate, "edate": edate, "a": a})
    else:
        form = setupProfile2(request.POST or None)
        if request.method == "POST":
            if form.is_valid():
                form.save()

                return redirect('apply', pk)


        form.initial["user_id"] = request.user.id
    return render(request, "ProfileSetup/secondInfo.html", {"form": form, "compare": compare,
                                                            "country": country, "city": city, "uni": uni, "a": a})


@login_required
def applyForJob3(request, pk):
    job = Jobs.objects.get(id=pk)
    dataa = datetime.now()
    lang = Languages.objects.all()
    userId = request.user.id
    checkL = False
    a = pk
    asd = ""
    asd1 = ""
    if UserLanguages.objects.filter(user_id=userId).exists():
        checkL = True
        langu = UserLanguages.objects.filter(user_id=userId).order_by("-id")[0]
        form = setupProfile3(request.POST or None, instance=langu)
        asd = langu.language
        asd1 = langu.level
        if request.method == "POST":
            if form.is_valid():
                form.save()
                us = get_object_or_404(CustomUser, id=userId)
                us.profileSetup = True
                us.save()
                if not Application.objects.filter(job_id=pk).filter(user_id=request.user.id).exists():

                    post = get_object_or_404(Jobs, id=pk)
                    app = Application()
                    app.user_id = request.user
                    app.job_id = job
                    app.apply_date = dataa
                    app.status = "Pennding"
                    app.save()
                    post.applicant.add(userId)
                    subject = "You applied for" + "  " + job.job_title
                    email_template_applicant = "main/jobs/Jobapplication.txt"

                    c = {
                        "email": request.user.email,
                        'domain': 'worki.global',
                        'site_name': 'Worki',
                        'user': request.user,
                        "job": job,
                        "date": dataa,
                    }
                    email = render_to_string(email_template_applicant, c)

                    try:
                        send_mail(subject, email, 'hello@worki.global',
                                  [request.user.email], fail_silently=False)
                        # send_mail(subject,oemail,'rinor@theacompany.xyz',[emailOwner],fail_silently=False)
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')

                    return render(request, "MainJobs/apply.html")
            else:
                form = form()
        form.initial["user_id"] = request.user.id

        return render(request, "ProfileSetup/thirdInfo.html",
                      {"form": form, "lang": lang, "checkL": checkL, "asd": asd, "asd1": asd1, "a": a})
    else:
        form = setupProfile3(request.POST or None)

        if request.method == "POST":
            if form.is_valid():
                form.save()
                us = get_object_or_404(CustomUser, id=userId)
                us.profileSetup = True
                us.save()
                if not Application.objects.filter(job_id=pk).filter(user_id=request.user.id).exists():

                    post = get_object_or_404(Jobs, id=pk)
                    app = Application()
                    app.user_id = userId
                    app.job_id = job
                    app.apply_date = dataa
                    app.status = "Pennding"
                    app.save()
                    post.applicant.add(userId)
                    subject = "You applied for" + "  " + job.job_title
                    email_template_applicant = "main/jobs/Jobapplication.txt"

                    c = {
                        "email": request.user.email,
                        'domain': 'worki.global',
                        'site_name': 'Worki',
                        'user': request.user,
                        "job": job,
                        "date": dataa,

                    }
                    email = render_to_string(email_template_applicant, c)

                    try:
                        send_mail(subject, email, 'hello@worki.global',
                                  [request.user.email], fail_silently=False)
                        # send_mail(subject,oemail,'rinor@theacompany.xyz',[emailOwner],fail_silently=False)
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')

                    return render(request, "MainJobs/apply.html")
            else:
                form = form()
        form.initial["user_id"] = request.user.id

    return render(request, "ProfileSetup/thirdInfo.html", {"form": form, "lang": lang, "checkL": checkL, "a": a})


def getAllJobs(request):
    job = Jobs.objects.all().filter(status="Open").order_by("-postDate")

    return render(request, "base.html", {"job": job})


@login_required
def applyForJob(request, pk):
    job = Jobs.objects.get(id=pk)
    jobType = Jobs.objects.filter(id=pk).values_list("program", flat=True).first()

    userId = request.user
    dataa = datetime.now()
    birth = ""
    if request.user.birthday != None:
        birth = format(request.user.birthday, "%d/%m/%Y")
    if jobType == "Work and Travel":
        if ActiveStudent.objects.filter(user_id=request.user).exists():
            AnswerUs = ActiveStudent.objects.get(user_id=request.user)

            AnS = AnswerUS(request.POST or None, instance=AnswerUs)
        else:
            AnS = AnswerUS(request.POST or None)

        form = setupProfile(request.POST or None, instance=userId)
        profCountry = request.POST.get("country")
        answerUS = request.POST.get("answer")
        country = Country.objects.all()
        ACaws = ""
        if ActiveStudent.objects.filter(user_id=request.user).exists():
            ACaws = ActiveStudent.objects.filter(user_id=request.user).values_list("answer", flat=True).first()
        if not Application.objects.filter(job_id=pk).filter(user_id=request.user).exists():
            if request.method == "POST":
                if form.is_valid():
                    if not ActiveStudent.objects.filter(user_id=request.user).exists():
                        ACS = ActiveStudent()
                        ACS.user_id = request.user
                        ACS.answer = answerUS
                        ACS.save()
                    else:
                        ACS = ActiveStudent.objects.get(user_id=request.user)
                        ACS.answer = answerUS
                        ACS.save()

                    CountryUser(profCountry, request.user)
                    form.save()
                    post = get_object_or_404(Jobs, id=pk)
                    app = Application()
                    app.user_id = userId
                    app.job_id = job
                    app.apply_date = dataa
                    app.status = "Pennding"
                    app.save()
                    post.applicant.add(userId)
                    subject = "You applied for" + " " + job.job_title
                    email_template_applicant = "main/jobs/Jobapplication.txt"

                    c = {
                        "email": request.user.email,
                        'domain': 'worki.global',
                        'site_name': 'Worki',
                        'user': request.user,
                        "job": job,
                        "date": dataa,

                    }
                    email = render_to_string(email_template_applicant, c)

                    try:
                        send_mail(subject, email, 'hello@worki.global',
                                  [request.user.email], fail_silently=False)
                        # send_mail(subject,oemail,'rinor@theacompany.xyz',[emailOwner],fail_silently=False)
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')
                    return redirect('appSuc')
        else:
            return redirect("home")
        return render(request, "ProfileSetup/WATinfo.html", dict(form=form, country=country, AnS=AnS))

    else:
        form = setupProfile(request.POST or None, instance=userId)
        country = Country.objects.all()
        city = City.objects.all()
        profCountry = request.POST.get("country")
        Scity = request.POST.get("city")
        if request.method == "POST":
            if form.is_valid():
                CountryUser(profCountry, request.user)
                CityUser(Scity, profCountry, request.user)
                form.save()
                return redirect('setupPart2', pk)
            else:
                form = form()
        return render(request, "ProfileSetup/mainInfo.html",{"form": form, "country": country, "city": city, "birth": birth})
    return render(request, "MainJobs/apply.html")

def userJobPayment(request):
    if request.method == 'POST':
        userr_id = request.POST.get('user_id')
        jobb_id = request.POST.get('job_id')
        paymentAmount = request.POST.get('paymentAmount')
        paymentLink = request.POST.get('paymentLink')

        # Try to fetch the existing UserJobPayment entry
        try:
            user_job_payment = UserJobPayment.objects.get(job_id=jobb_id, user_id=userr_id)
            user_job_payment = UserJobPayment.objects.get(job_id=jobb_id, user_id=userr_id)
            # Update the existing entry
            user_job_payment.paymentAmount = paymentAmount
            user_job_payment.paymentLink = paymentLink
            user_job_payment.save()
            return JsonResponse({'status': 'updated'}, status=200)
        except UserJobPayment.DoesNotExist:
            # Create a new entry if not found
            new_user_job_payment = UserJobPayment(job_id=jobb_id, user_id=userr_id, paymentAmount=paymentAmount, paymentLink=paymentLink)
            new_user_job_payment.save()
            return JsonResponse({'status': 'created'}, status=201)


    return JsonResponse({'error': 'Invalid request'}, status=400)

def userJobAppointments(request):
    if request.method == 'POST':
        userr_id = request.POST.get('user_id')
        jobb_id = request.POST.get('job_id')
        meetingDate = request.POST.get('meetingDate')
        meetingTime = request.POST.get('meetingTime')
        meetingLink = request.POST.get('meetingLink')

        object = UserJobAppointments(job_id=jobb_id, user_id=userr_id, meetingDate=meetingDate, meetingTime=meetingTime, meetingLink=meetingLink)
        object.save()
        return HttpResponse(status=201)

def user_job_appointments_finished(request):
    if request.method == 'POST':
        userr_id = request.POST.get('user_id')
        jobb_id = request.POST.get('job_id')

        object = UserJobAppointments.objects.get(job_id=jobb_id, user_id=userr_id)
        object.meetingDone = True
        object.save()
        return HttpResponse(status=201)

def user_job_appointments_pending(request):
    if request.method == 'POST':
        userr_id = request.POST.get('user_id')
        jobb_id = request.POST.get('job_id')

        object = UserJobAppointments.objects.get(job_id=jobb_id, user_id=userr_id)
        object.meetingDone = False
        object.save()
        return HttpResponse(status=201)

def userJobInterview(request):
    if request.method == 'POST':
        userr_id = request.POST.get('user_id')
        jobb_id = request.POST.get('job_id')
        interviewDate = request.POST.get('interviewDate')
        interviewTime = request.POST.get('interviewTime')
        interviewLink = request.POST.get('interviewLink')

        object = UserJobInterview(job_id=jobb_id, user_id=userr_id, interviewDate=interviewDate, interviewTime=interviewTime, interviewLink=interviewLink)
        object.save()
        return HttpResponse(status=201)

def userJobInterviewUpdate(request):
    if request.method == 'POST':
        userr_id = request.POST.get('user_id')
        jobb_id = request.POST.get('job_id')
        interviewDate = request.POST.get('interviewDate')
        interviewTime = request.POST.get('interviewTime')
        interviewLink = request.POST.get('interviewLink')
        
        object = UserJobInterview.objects.get(job_id=jobb_id, user_id=userr_id)
        object.interviewDate = interviewDate
        object.interviewTime = interviewTime
        object.interviewLink = interviewLink
        object.save()
        return HttpResponse(status=201)

def job_interview_finished(request):
    if request.method == 'POST':
        userr_id = request.POST.get('user_id')
        jobb_id = request.POST.get('job_id')

        object = UserJobInterview.objects.get(job_id=jobb_id, user_id=userr_id)
        object.interviewDone = True
        object.save()
        return HttpResponse(status=201)

def job_interview_pending(request):
    if request.method == 'POST':
        userr_id = request.POST.get('user_id')
        jobb_id = request.POST.get('job_id')

        object = UserJobInterview.objects.get(job_id=jobb_id, user_id=userr_id)
        object.interviewDone = False
        object.save()
        return HttpResponse(status=201)
def CreateCheckoutSession(request):
    stripe.api_key = "sk_test_51MfP4FAWWrYDd3Ex3UdXVUsgjFblWSAiI8yvsEPm83iAlH1LaWGnS9fquylP0AknVsr7HfKs6m3wsArtQgVFaliw00QqQKsitp"
    # print(settings.STRIPE_SECRET_KEY)
    YOUR_DOMAIN = 'http://localhost:8000'
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        user_id = body_data['user_id']
        job_id = body_data['job_id']
        amount = "40000"
        allPaymentsDone = False
        firstPaymentDoneandSecondFalse = False
        application = Application.objects.get(job_id_id=job_id, user_id_id=user_id)
        if application.firstPaymentDone and application.secondPaymentDone and application.thirdPaymentDone:
            allPaymentsDone = True
        elif application.firstPaymentDone and application.secondPaymentDone:
            amount = "80000"
        elif application.firstPaymentDone:
            firstPaymentDoneandSecondFalse = True
            amount = "80000"
            print(amount + amount + amount)
        application.save()

        session = stripe.checkout.Session.create(
            ui_mode = 'embedded',
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': int(amount),
                        'product_data': {
                            'name': "Ardit",
                        },
                        'tax_behavior': 'exclusive',
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            return_url=YOUR_DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}',
            automatic_tax={'enabled': True},
            payment_intent_data={
                'metadata': {
                    'user_id': user_id,  # Custom user ID from your application
                    'job_id': job_id,
                    'amount': amount,  # Custom order ID or any other information
                }
            }


        )

        return JsonResponse({'clientSecret': session.client_secret} )
        print("Ardit")

def session_status(request):
    if request.method == "GET":
        session = stripe.checkout.Session.retrieve(request.GET.get('session_id'))

        return JsonResponse({'status': session.status, 'customer_email': session.customer_details.email})

def return_page(request):
    return render(request, "return.html")

endpoint_secret = 'whsec_0fe9662db59ca2915993f14a612674c696a16c72d3043cd45162494602246744'
def stripe_webhook(request):
    print("stripe_webhook")
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
        payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    if event['type'] == 'payment_intent.succeeded':
        print("Ardit")
        payment_intent = event['data']['object']  # The payment intent data
        print(payment_intent)
        user_id = payment_intent.get('metadata', {}).get('user_id')
        job_id = payment_intent.get('metadata', {}).get('job_id')
        amount = payment_intent.get('metadata', {}).get('amount')
        print(Application)

        # print('payment_intent.succeeded')
        # print(user_id)
        # print(job_id)

        if user_id:
            # Insert or update your database here with the user_id
            print(f'Payment was successful for user ID {user_id}.')
            application = Application.objects.get(job_id_id=job_id, user_id_id=user_id)
            if amount == '40000':
                application.firstPaymentDone = True
            elif amount == '80000':
                application.secondPaymentDone = True
            elif amount == '80000':
                application.thirdPaymentDone = True
            else:
                print("20000" + "account")
            application.save()
            # Example: insert_payment_to_db(user_id, payment_intent)
        else:
            print('User ID not found in payment intent metadata.')

    # Passed signature verification
    return HttpResponse(status=200)

if __name__ == '__main__':
    app.run(port=4242)


    # return redirect(checkout_session.url, code=303)