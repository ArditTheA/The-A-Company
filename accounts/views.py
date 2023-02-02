import re
from django.http import JsonResponse
from django.views.generic import View
from django.shortcuts import HttpResponse
from urllib import request
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
from accounts.forms import *
from django.contrib.auth.decorators import login_required
from django.utils import timezone
import itertools
from filters.models import Search, UserCountry, UserCity, UserUni

today = timezone.now


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


def profile(request):
    return render(request, "profile/profile.html")


def Terms(request):
    return render(request, "accounts/Terms.html")


class passChange(PasswordChangeView):
    from_class = PasswordChangeForm
    success_url = reverse_lazy('home')


def HomeTemp(request):
    template_name = "home/home.html"
    return render(request, "home/home.html")


class LoginView(auth_views.LoginView):
    form_class = LoginForm
    template_name = 'accounts/login.html'


class LogoutView(auth_views.LogoutView):
    template_name = "accouts/login.html"


class RegisterView(generic.CreateView):
    form_class = RegisterForm
    template_name = 'accounts/register.html'


def registration(request):
    if request.POST:
        NewClinetemail = request.POST.get("email")
        first_name = request.POST.get("first_name")
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
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
                send_mail(subject, email, 'hello@worki.global',
                          [NewClinetemail], fail_silently=False)
                # send_mail(subject,oemail,'rinor@theacompany.xyz',[emailOwner],fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            login(request, user)

            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, "accounts/register.html", {"form": form})


############################### Profile ##################################################
@login_required
def update_profile(request):
    user_id = request.user.id
    usExp = UserExperiece.objects.filter(user_id=user_id)
    usEdu = UserEducation.objects.filter(user_id=user_id)
    usLang = UserLanguages.objects.filter(user_id=user_id)
    Cu = CustomUser.objects.get(id=user_id)
    form = EditProf(request.POST or None, request.FILES or None, instance=Cu)
    for_usExp = add_user_Exp(request.POST or None)
    form_usLang = add_user_language(request.POST or None)
    form_usEdu = add_user_edu(request.POST or None)
    countrys = Country.objects.all()
    cityes = City.objects.all()
    uniList = University.objects.all()
    lang = Languages.objects.all()

    if for_usExp.is_valid() or form.is_valid() or form_usLang.is_valid() or form_usEdu.is_valid():

        if form.is_valid():
            CountryUser(request.POST.get("country"), request.user)
            CityUser(request.POST.get("country"), request.POST.get("city"), request.user)

            form.save()

        if for_usExp.is_valid():
            for_usExp.save()
        if form_usLang.is_valid():
            form_usLang.save()
        if form_usEdu.is_valid():
            UniUser(request.POST.get("university"), request.user)
            form_usEdu.save()
        return redirect("profile")

    if (user_id != ''):
        for_usExp.initial['user_id'] = Cu.id
        form_usLang.initial['user_id'] = Cu.id
        form_usEdu.initial['user_id'] = Cu.id
    coun = []
    for i in countrys:
        coun.append(i.country)
    return render(request, 'profile/profile.html',
                  {"usExp": usExp,
                   "usEdu": usEdu,
                   "form": form,
                   "for_usExp": for_usExp,
                   "usLang": usLang,
                   "form_usLang": form_usLang,
                   "form_usEdu": form_usEdu,
                   "countrys": coun,
                   "cityes": cityes,
                   "uniList": uniList,
                   "lang": lang,
                   })


# Edit user Experience ####################333

@login_required
def Edit_user_exp(request):
    user_id = request.user.id
    userExp = UserExperiece.objects.filter(user_id=request.user.id)

    for_usExp = add_user_Exp(request.POST or None)
    country = Country.objects.all()
    city = City.objects.all()
    if for_usExp.is_valid():
        for_usExp.save()

        return redirect("editExprience")

    if (user_id != ''):
        for_usExp.initial["user_id"] = user_id

    return render(request, "profile/experiences.html",
                  {"userExp": userExp, "for_usExp": for_usExp, "country": country, "city": city})


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

    return render(request, "profile/expreriencesId.html",
                  {"userExp": userExp, "edit": edit, "countrys": countrys, "citys": citys})


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
    return render(request, "profile/education.html",
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
    return render(request, "profile/educationId.html",
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
    return render(request, "profile/language.html", {"User_lang": User_lang, "edit": edit, "lang": lang})


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

    return render(request, "profile/languageId.html",
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

        job = Jobs.objects.filter(
            user_id=request.user.id).order_by("-postDate")
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
                         posted=posted, post_id=post_id, appNo=appNo))
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


                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,
                         posted=posted, appNo=appNo,post_id=post_id))
        check = True
        if len(job) != 0:
            check = True
        else:
            check = False




        return render(request, "Jobs/Posted.html", dict(job=job, check=check))


@method_decorator(login_required(login_url='/login/'), name='dispatch')
class AppliedJobs(View):
    def get(self, request):
        job = Application.objects.filter(
            user_id=request.user).order_by("-apply_date")
        post_id = request.headers.get('text')
        if post_id == "":
            jobid = Application.objects.filter(user_id=request.user).order_by(
                "-apply_date").values_list("job_id_id", flat=True).first()
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
                applied = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("apply_date", flat=True).first()

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

                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,
                         posted=posted, post_id=post_id, applied=applied, appNo=appNo))
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

                city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
                country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                salary = format(salary, '.2f')
                SDate = start_date
                EDate = end_date
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")
                applied = format(applied, "%d/%m/%Y")

                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,
                         posted=posted, post_id=post_id, applied=applied, appNo=appNo), safe=True)
        check = True
        if len(job) != 0:
            check = True
            post_id=job[0].id
            return render(request, "Jobs/applied.html", dict(job=job, check=check,post_id=post_id))
        else:
            check = False

        return render(request, "Jobs/applied.html", dict(job=job, check=check))


#########################################################################################
# ------------------------------Posted Jobs---------------------------------------------#
#########################################################################################
def remove_null(list_):
    return [value for value in list_ if value]
class MainJobs(View):
    def get(self, request):
        post_id = request.headers.get("text")
        test = request.headers.get("text")
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
            city_j = job.values_list("city_j", flat=True)
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
            cityName=list(dict.fromkeys(city_j))


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
            appNo = Jobs.objects.get(id=post_id).applicant.count()

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
                return JsonResponse(
                    dict(description=description, title=title, applicant=app, city_j=city_j, country=country,
                         start_date=start_date,SDate=SDate,EDate=EDate,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,
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

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                SDate = start_date
                EDate=end_date
                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")


                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,
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


        return render(request, "MainJobs/index.html",
                      dict(job=job, prog=sortProgram, title=sortTitle, company=sortCompany, city=cityName,
                           salary=sortSalary, filterProgram=filterProgram, filterTitle=filterTitle,
                           filterCompany=filterCompany,
                           filterLocation=filterLocation, filterSalary=filterSalary, filterDate=filterDate, tit=title,
                           check=check, post_id=post_id,hasApply=hasApply))


class MainJobsId(View):
    def get(self, request,pk):
        post_id = request.headers.get("text")
        FJob = Jobs.objects.get(id=pk)
        job = Jobs.objects.filter(approved=True).filter(status="Open").order_by("-postDate").order_by("-id")
        # search
        Jobb =[]
        for i in job:
            if i != FJob:
                Jobb.append(i)


        se = request.GET.get("q")
        query = []
        if se != None:
            seInput = se.split(" ")
            for i in seInput:
                if i != "in" or i != "on" or i != "at" or i != "," or i != "-" or i != " ":

                    if i[len(i) - 1] == ",":
                        i = i.replace(',', '')
                        query.append(i)
                    elif i[len(i) - 1] == ".":
                        i = i.replace(',', '')
                        query.append(i)
                    else:
                        query.append(i)

        jobi = []
        jobs = []
        hasApply = False
        hasApplyDate = ""
        getMonth = datetime.now().month
        getYear = datetime.now().year

        if se != None:
            if len(query) == 0:
                job = Jobs.objects.filter(approved=True)

        if (len(query) >= 1):

            # title and city
            if len(query) == 3:
                if Jobs.objects.filter(job_title__icontains=query[0] + " " + query[1]).exists():
                    query = [query[0] + " " +
                             query[1], query[2]]
                else:
                    query = [query[0],
                             query[1] + " " + query[2]]

                if Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        city_j__icontains=query[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        city_j__icontains=query[1]).filter(status="Open")
                    jobi = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        status="Open")

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[1]).filter(
                        city_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[1]).filter(
                        city_j__icontains=query[0]).filter(status="Open")
                    jobi = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=query[1]).filter(status="Open")

                # country and city
                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=query[1]).filter(
                        city_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=query[1]).filter(
                        city_j__icontains=query[0]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=query[0]).filter(
                        city_j__icontains=query[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=query[0]).filter(
                        city_j__icontains=query[1]).filter(status="Open")

                    # title and country
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        country_j__icontains=query[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        country_j__icontains=query[1]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[1]).filter(
                        country_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[1]).filter(
                        country_j__icontains=query[0]).filter(status="Open")
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=query[0]).filter(status="Open")
                # title

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        job_title__icontains=query[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        job_title__icontains=query[1]).filter(status="Open").order_by("-postDate")
                # cityyy
                elif Jobs.objects.filter(approved=True).filter(city_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(city_j__icontains=query[0]).filter(
                        status="Open").order_by(
                        "-postDate")

                # country
                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=query[0]).filter(
                        status="Open").order_by("-postDate")
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=query[0]).filter(status="Open")
            elif len(query) > 1:
                if Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        city_j__icontains=query[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        city_j__icontains=query[1]).filter(status="Open")
                    jobi = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=query[0]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[1]).filter(
                        city_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[1]).filter(
                        city_j__icontains=query[0]).filter(status="Open")
                    jobi = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=query[1]).filter(status="Open")

                # country and city
                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=query[1]).filter(
                        city_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=query[1]).filter(
                        city_j__icontains=query[0]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=query[0]).filter(
                        city_j__icontains=query[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=query[0]).filter(
                        city_j__icontains=query[1]).filter(status="Open")

                    # title and country
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        country_j__icontains=query[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        country_j__icontains=query[1]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[1]).filter(
                        country_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[1]).filter(
                        country_j__icontains=query[0]).filter(status="Open")
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=query[0]).filter(status="Open")
                # title

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        job_title__icontains=query[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).filter(
                        job_title__icontains=query[1]).filter(status="Open").order_by("-postDate")
                # cityyy
                elif Jobs.objects.filter(approved=True).filter(city_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        city_j__icontains=query[0]).filter(status="Open").order_by("-postDate")

                # country
                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        country_j__icontains=query[0]).filter(status="Open").order_by("-postDate")
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=query[0]).filter(status="Open")
            # title

            elif Jobs.objects.filter(approved=True).filter(job_title__icontains=query[0]).exists():
                job = Jobs.objects.filter(approved=True).filter(
                    job_title__icontains=query[0]).filter(status="Open").order_by("-postDate")
            # cityyy
            elif Jobs.objects.filter(approved=True).filter(city_j__icontains=query[0]).exists():
                job = Jobs.objects.filter(approved=True).filter(
                    city_j__icontains=query[0]).filter(status="Open").order_by("-postDate")

            # country
            elif Jobs.objects.filter(approved=True).filter(country_j__icontains=query[0]).exists():
                job = Jobs.objects.filter(approved=True).filter(
                    country_j__icontains=query[0]).filter(status="Open").order_by("-postDate")

            if len(job) > 0:
                post_id = str(job[0].id)


            for i in jobi:
                for j in job:
                    if i != j:
                        jobs.append(i)

            if request.user.is_authenticated:

                search = Search()
                search.user_id = request.user
                search.search = query
                search.save()

            else:
                search = Search()
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
            city_j = job.values_list("city_j", flat=True)
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
            cityName = list(dict.fromkeys(city_j))

            # for i in salary:
            #      if i not in sortSalary:
            #         sortSalary.append(format(i,'.2f'))
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


        if post_id == "":
            post_id = Jobs.objects.filter(approved=True).filter(status="Open").order_by(
                "-postDate").values_list('id', flat=True).first()

            if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                hasApply = True
                hasApplyDate = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list(
                    "apply_date", flat=True).first()
                hasApplyDate = format(hasApplyDate, "%d/%m/%Y")
            appNo = Jobs.objects.get(id=post_id).applicant.count()

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
                return JsonResponse(
                    dict(description=description, title=title, applicant=app, city_j=city_j, country=country,
                         start_date=start_date,SDate=SDate,EDate=EDate,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,
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

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                SDate = start_date
                EDate = end_date

                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")


                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,SDate=SDate,EDate=EDate,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,posted=posted, post_id=post_id, appNo=appNo, hasApply=hasApply,
                         safe=True,applyDate=hasApplyDate))
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
        post_id=pk
        if job.count() > 0:
                if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                    hasApply = True


        return render(request, "MainJobs/JobIndex.html",
                      dict(FJob=FJob,job=Jobb, prog=sortProgram, title=sortTitle, company=sortCompany, city=cityName,
                           salary=sortSalary, filterProgram=filterProgram, filterTitle=filterTitle,
                           filterCompany=filterCompany,getMonth=getMonth,getYear=getYear,
                           filterLocation=filterLocation, filterSalary=filterSalary, filterDate=filterDate, tit=title,
                           check=check, post_id=post_id,hasApply=hasApply))



def ApplySuc(request):
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

