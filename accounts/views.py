
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
from filters.models import Search

today = timezone.now



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
        first_name= request.POST.get("first_name")
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
                'first_name':first_name,

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
        profCountry = request.POST.get("country")
        cityProf = request.POST.get("city")
        USUniversity = request.POST.get("university")
        usCountry = Country()
        usCity = City()
        EduCountry = request.POST.get("country_e")
        EduCity = request.POST.get("city_e")
        if not Country.objects.filter(country=profCountry).exists():
            usCountry.country = profCountry
            usCountry.save()
        if not City.objects.filter(name=cityProf).exists():
            if not Country.objects.filter(country=profCountry).exists():
                usCountry.country = profCountry
                usCountry.save()

            usCity.name = (cityProf)
            usCity.country = (Country.objects.get(country=profCountry))
            usCity.save()

        form.save()
        if for_usExp.is_valid():
            for_usExp.save()
        if form_usLang.is_valid():
            form_usLang.save()
        if form_usEdu.is_valid():
            if not Country.objects.filter(country=EduCountry).exists():
                usCo = Country()
                usCo.country=EduCountry
                usCo.save() 
            if not City.objects.filter(name=EduCity).exists():
                usCity = City()
                usCo.name=EduCity
                usCo.country=EduCountry
                usCo.save()
            if not University.objects.filter(name=USUniversity).exists():
                usEDU = University()
                usEDU.name = USUniversity
                usEDU.save()
            
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
                   "lang":lang,
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

    return render(request, "profile/experiences.html", {"userExp": userExp, "for_usExp": for_usExp,"country":country,"city":city})

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

    return render(request, "profile/expreriencesId.html", {"userExp": userExp, "edit": edit,"countrys":countrys,"citys":citys})


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
        if not University.objects.filter(name=USUniversity).exists():
                usEDU = University()
                usEDU.name = USUniversity
                usEDU.save()
        edit.save()
        return redirect("editEdu")
    if (user_id != ''):
        edit.initial['user_id'] = user_id
    return render(request, "profile/education.html", {"edit": edit, "userEdu": userEdu,"country":country,"city":city})

@login_required
def Edit_user_EduId(request, pk):
    user_id = request.user.id
    userEdu = UserEducation.objects.filter(user_id=user_id)
    usEdu = UserEducation.objects.get(id=pk)
    edit = EditUserEdu(request.POST or None, instance=usEdu)
    country = Country.objects.all()
    city = City.objects.all()
    university=University.objects.all()
    if edit.is_valid():
        edit.save()
        return redirect("editEdu")
    if (user_id != ''):
        edit.initial['user_id'] = user_id
    return render(request, "profile/educationId.html", {"edit": edit, "userEdu": userEdu,"country":country,"city":city,"university":university})


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
    return render(request, "profile/language.html", {"User_lang": User_lang, "edit": edit,"lang":lang})

@login_required
def Edit_User_langId(request, pk):
    user_id = request.user.id
    User_lang = UserLanguages.objects.filter(user_id=user_id)
    usL = UserLanguages.objects.get(id=pk)
    lang=Languages.objects.all()
    uslang = usL.language
    asd1 = usL.level

    edit = EditUserLang(request.POST or None, instance=usL)
    if edit.is_valid():
        edit.save()
        return redirect("editLanguage")
    if (user_id != ''):
        edit.initial['user_id'] = user_id

    return render(request, "profile/languageId.html", {"edit": edit, "User_lang": User_lang,"lang":lang,"uslang":uslang,"asd1":asd1})


###########################################################################
# ----------------------------Profile JOBS---------------------------------#
###########################################################################


# ---------------------------------Add Job ---------------------------------------------#
@login_required
def addJob(request):
    uid = request.user.id
    form = add_Jobs(request.POST or None, request.FILES or None)
    getCountry = request.POST.get("country_j")
    getCity = request.POST.get("city_j")
    country_j = Country.objects.all()
    city_j = City.objects.all()
    jobTitle = request.POST.get("job_title")
    if request.method == "POST":
        if form.is_valid():
            form.save()
            if not Country.objects.filter(country=getCountry).exists():
                co = Country()
                co.country = getCountry
                co.save()
            if not City.objects.filter(name=getCity).exists():
                cit = City()
                cit.name=getCity
                cit.country=Country.objects.get(country=getCountry)
                cit.save()
            subject = "Your job posting for "+jobTitle+" is under review"
            email_template_applicant = "main/jobs/postJob.txt"
            
            
            c = {
                "email": request.user.email,
                'domain': 'worki.global',
                'site_name': 'Worki',
                'user': request.user,
                'jobTitle':jobTitle,

            }
            email = render_to_string(email_template_applicant, c)
            
            try:
                send_mail(subject, email, 'hello@worki.global',
                          [request.user.email], fail_silently=False)
                # send_mail(subject,oemail,'rinor@theacompany.xyz',[emailOwner],fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')

            return redirect('postedJob')
    if uid != "":
        form.initial["user_id"] = uid

    return render(request, "Jobs/add.html", {"form": form,"country_j":country_j,"city_j":city_j})

@login_required
def editJob(request, pk):
    job = Jobs.objects.get(id=pk)
    form = editjob(request.POST or None, request.FILES or None, instance=job)
    country = Country.objects.all()
    city = City.objects.all()
    des = job.description
    des=des.replace('<br />','\n')
    city = request.POST.get("city_j")
    country = request.POST.get("country_j")
    if form.is_valid():
        if not Country.objects.filter(country=country).exists():
            co = Country()
            co.country=country
            co.save()
        if not City.objects.filter(name=city).exists():
            cit = City()
            cit.name=city
            cit.country = Country.objects.get(country=country)
            cit.save()
        form.save()
        return redirect("postedJob")
    return render(request, "Jobs/edit.html", {"form": form,"country":country,"city":city,"des":des})


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

                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")
                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,
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
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")

                appNo = 0
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,
                         posted=posted,appNo=appNo))
        return render(request, "Jobs/Posted.html", dict(job=job)) 

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
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")
                applied = format(applied, "%d/%m/%Y")
                appNo = Jobs.objects.get(id=post_id).applicant.count()
                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,
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
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                posted = format(posted, "%d/%m/%Y")
                applied = format(applied, "%d/%m/%Y")
                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,
                         posted=posted, post_id=post_id, applied=applied, appNo=appNo))
        check = True
        if len(job) != 0:
            check = True
        else:
            check = False

        return render(request, "Jobs/applied.html", dict(job=job,check=check))


#########################################################################################
# ------------------------------Posted Jobs---------------------------------------------#
#########################################################################################

class MainJobs(View):
    def get(self, request):
        post_id = request.headers.get("text")
        job = Jobs.objects.filter(approved=True).filter(
            status="Open").order_by("-postDate")
        # search
        query = request.GET.get("q")

        jobi = []

        jobs = []
        hasApply=False
        hasApplyDate =""
        
        if request.user.is_authenticated:
            auth = str(request.user.profileSetup)
        else:
            auth = "False"
        if (query != None):
            searchRequest = query.split()
            for i in searchRequest:
                if i == "in" or i == "on" or i == "at" or i == "," or i == "-" or i == " ":

                    searchRequest.remove(i)

            # title and city
            if len(searchRequest) == 3:
                if Jobs.objects.filter(job_title__icontains=searchRequest[0]+" "+searchRequest[1]).exists():
                    searchRequest = [searchRequest[0]+" " +
                                     searchRequest[1], searchRequest[2]]
                else:
                    searchRequest = [searchRequest[0],
                                     searchRequest[1]+" "+searchRequest[2]]

               
                if Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(
                        city_j__icontains=searchRequest[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(city_j__icontains=searchRequest[1]).filter(status="Open")
                    jobi = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[1]).filter(
                        city_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[1]).filter(
                        city_j__icontains=searchRequest[0]).filter(status="Open")
                    jobi = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=searchRequest[1]).filter(status="Open")

                # country and city
                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[1]).filter(
                        city_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[1]).filter(
                        city_j__icontains=searchRequest[0]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[0]).filter(
                        city_j__icontains=searchRequest[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[0]).filter(
                        city_j__icontains=searchRequest[1]).filter(status="Open")

                    # title and country
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(
                        country_j__icontains=searchRequest[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(
                        country_j__icontains=searchRequest[1]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[1]).filter(
                        country_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[1]).filter(
                        country_j__icontains=searchRequest[0]).filter(status="Open")
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=searchRequest[0]).filter(status="Open")
                # title

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(
                        job_title__icontains=searchRequest[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(
                        job_title__icontains=searchRequest[1]).filter(status="Open").order_by("-postDate")
                # cityyy
                elif Jobs.objects.filter(approved=True).filter(city_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(city_j__icontains=searchRequest[0]).filter(status="Open").order_by(
                        "-postDate")

                # country
                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[0]).filter(
                        status="Open").order_by("-postDate")
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=searchRequest[0]).filter(status="Open")
            elif len(searchRequest) > 1:
                if Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(city_j__icontains=searchRequest[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(
                        city_j__icontains=searchRequest[1]).filter(status="Open")
                    jobi = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=searchRequest[0]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[1]).filter(city_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[1]).filter(
                        city_j__icontains=searchRequest[0]).filter(status="Open")
                    jobi = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=searchRequest[1]).filter(status="Open")

                # country and city
                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[1]).filter(city_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[1]).filter(
                        city_j__icontains=searchRequest[0]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[0]).filter(city_j__icontains=searchRequest[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[0]).filter(
                        city_j__icontains=searchRequest[1]).filter(status="Open")

                    # title and country
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(country_j__icontains=searchRequest[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(
                        country_j__icontains=searchRequest[1]).filter(status="Open")

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[1]).filter(country_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[1]).filter(
                        country_j__icontains=searchRequest[0]).filter(status="Open")
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=searchRequest[0]).filter(status="Open")
                # title

                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(job_title__icontains=searchRequest[1]).exists():
                    job = Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).filter(
                        job_title__icontains=searchRequest[1]).filter(status="Open").order_by("-postDate")
                # cityyy
                elif Jobs.objects.filter(approved=True).filter(city_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        city_j__icontains=searchRequest[0]).filter(status="Open").order_by("-postDate")

                # country
                elif Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        country_j__icontains=searchRequest[0]).filter(status="Open").order_by("-postDate")
                elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).exists():
                    job = Jobs.objects.filter(approved=True).filter(
                        job_title__icontains=searchRequest[0]).filter(status="Open")
            # title

            elif Jobs.objects.filter(approved=True).filter(job_title__icontains=searchRequest[0]).exists():
                job = Jobs.objects.filter(approved=True).filter(
                    job_title__icontains=searchRequest[0]).filter(status="Open").order_by("-postDate")
            # cityyy
            elif Jobs.objects.filter(approved=True).filter(city_j__icontains=searchRequest[0]).exists():
                job = Jobs.objects.filter(approved=True).filter(
                    city_j__icontains=searchRequest[0]).filter(status="Open").order_by("-postDate")

            # country
            elif Jobs.objects.filter(approved=True).filter(country_j__icontains=searchRequest[0]).exists():
                job = Jobs.objects.filter(approved=True).filter(
                    country_j__icontains=searchRequest[0]).filter(status="Open").order_by("-postDate")

            if len(job) != 0:
                post_id = job[0].id
            print("--------------------")
            print("--------------------")
            print("--------------------")
            for i in jobi:
                print(i,"ii")

                for j in job:
                    if i != j:
                        print(j)
                        jobs.append(i)
            
            print("--------------------")
            print(job,"   -  ",jobi)
            print("--------------------")
            print("--------------------")
            
            from filters.models import Search

            if request.user.is_authenticated:

                search = Search()
                search.user_id = request.user
                search.search = query
                search.save()

            else:
                search = Search()
                search.search = query
                search.save()

        # else:
        #     job = Jobs.objects.filter(approved=True).filter(status="Open").order_by("-postDate")
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
            for i in city_j:
                if i not in sortCity:
                    sortCity.append(i)

          
            for i in sortCity:
                cit = City.objects.get(name__icontains=i)
                cityName.append(str(cit))
            

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
                sal = "$"+str(i)
                sortSalary.append(sal)
            for i in sortSalaryEu:
                sal = "€"+str(i)
                sortSalary.append(sal)

            sortProgram.sort()
            sortTitle.sort()
            sortCompany.sort()
            cityName.sort()
        #  Take the  first post   !!! with  auto id  the first result

        if post_id == "":
            post_id = Jobs.objects.filter(approved=True).filter(status="Open").order_by(
                "-postDate").values_list('id', flat=True).first()
       
            if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                hasApply=True
                hasApplyDate=Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list("apply_date",flat=True).first()
                hasApplyDate=format(hasApplyDate, "%d/%m/%Y")  
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

                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")
                app = (str(applicant))
                return JsonResponse(
                    dict(description=description, title=title, applicant=app, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,
                         posted=posted, post_id=post_id, auth=auth, appNo=appNo,hasApply=hasApply,hasApplyDate=hasApplyDate))
        # take selected post byy id
        else:
            if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                hasApply=True
                hasApplyDate=Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list("apply_date",flat=True).first()
                hasApplyDate=format(hasApplyDate, "%d/%m/%Y")            
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

                salary = format(salary, '.2f')
                start_date = format(start_date, "%d/%m/%Y")
                end_date = format(end_date, "%d/%m/%Y")

                return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,
                         posted=posted, post_id=post_id, auth=auth, appNo=appNo,hasApply=hasApply,hasApplyDate=hasApplyDate))
        filterProgram = ""
        filterTitle = ""
        filterCompany = ""
        filterLocation = ""
        filterSalary = ""
        filterDate = ""

        return render(request, "MainJobs/index.html", dict(job=job, prog=sortProgram, title=sortTitle, company=sortCompany, city=cityName,
                                                           salary=sortSalary, filterProgram=filterProgram, filterTitle=filterTitle, filterCompany=filterCompany,
                                                           filterLocation=filterLocation, filterSalary=filterSalary, filterDate=filterDate))


@login_required
def applyForJob(request, pk):
    job = Jobs.objects.get(id=pk)
    userId = request.user
    dataa = datetime.now()
    birth=""
    if request.user.birthday != None:
        birth  = format(request.user.birthday, "%d/%m/%Y")
    if request.user.profileSetup:

        if Application.objects.filter(job_id=pk).filter(user_id=request.user.id).exists():
            app = Application.objects.filter(
                job_id=pk).filter(user_id=request.user.id)
            
            return render(request, "MainJobs/hasApply.html", {"app": app})
        else:
            post = get_object_or_404(Jobs, id=pk)
            app = Application()
            app.user_id = userId
            app.job_id = job
            app.apply_date = dataa
            app.status = "Pennding"
            app.save()
            post.applicant.add(userId)
            subject = "You applied for"+"  "+job.job_title
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
        form = setupProfile(request.POST or None, instance=userId)
        country = Country.objects.all()
        city = City.objects.all()
        profCountry = request.POST.get("country")
        Scity = request.POST.get("city")
        if request.method == "POST":
            if form.is_valid():
                if not Country.objects.filter(country=profCountry).exists():
                    us=Country()
                    us.country=profCountry
                    us.save()
                if not City.objects.filter(name=Scity).exists():
                    usC= City()
                    usC.name=Scity
                    usC.country=Country.objects.get(country=profCountry)
                    usC.save()
                form.save()
                
                #     if UserLanguages.objects.filter(user_id=request.user.id).exists():
                #         us = get_object_or_404(CustomUser, id=request.user.id)
                #         us.profileSetup = True
                #         us.save()
                #         return redirect('apply', pk)
                #     else:
                #         return redirect("setupPart3", pk)
                
                return redirect('setupPart2', pk)
            else:
                form = form()

        return render(request, "ProfileSetup/mainInfo.html", {"form": form,"country":country,"city":city,"birth":birth})
    return render(request, "MainJobs/apply.html")


@login_required
def applyForJob2(request, pk):
    country = Country.objects.all()
    city = City.objects.all()
    uni  = University.objects.all()
    compare = False
    edu=""
    a=pk
    if UserEducation.objects.filter(user_id=request.user.id).exists():
        compare=True

        edu = UserEducation.objects.filter(user_id=request.user.id).order_by('-id')[0]
        form = setupProfile2(request.POST or None, instance=edu)

        sdate  = format(edu.start_year, "%d/%m/%Y")
        edate=""
        if edu.end_year != None:
            edate =format(edu.end_year,"%d/%m/%Y")
        
        if request.method == "POST":
            if form.is_valid():
                form.save()
            
                return redirect('setupPart3', pk)
            
        form.initial["user_id"] = request.user.id
        return render(request, "ProfileSetup/secondInfo.html", {"form": form,"compare":compare,
        "country":country,"city":city,"uni":uni,"edu":edu,"sdate":sdate,"edate":edate,"a":a})
    else:
        form = setupProfile2(request.POST or None)
        if request.method == "POST":
            if form.is_valid():
                form.save()
                if UserLanguages.objects.filter(user_id=request.user.id).exists():
                    us = get_object_or_404(CustomUser, id=request.user.id)
                    us.profileSetup = True
                    us.save()
                    return redirect('apply', pk)
                else:
                    return redirect('setupPart3', pk)
            
        form.initial["user_id"] = request.user.id
    return render(request, "ProfileSetup/secondInfo.html", {"form": form,"compare":compare,
        "country":country,"city":city,"uni":uni,"a":a})


@login_required
def applyForJob3(request, pk):
    job = Jobs.objects.get(id=pk)
    dataa = datetime.now()
    lang = Languages.objects.all()
    userId = request.user.id
    checkL=False
    a = pk
    asd=""
    asd1=""
    if UserLanguages.objects.filter(user_id=userId).exists():
        checkL=True
        langu=UserLanguages.objects.filter(user_id=userId).order_by("-id")[0]
        form = setupProfile3(request.POST or None, instance=langu)
        asd  = langu.language
        asd1 = langu.level
        if request.method == "POST":
            if form.is_valid():
                form.save()
                us = get_object_or_404(CustomUser, id=userId)
                us.profileSetup = True
                us.save()
                return redirect("apply", pk)
            else:
                form = form()
        form.initial["user_id"] = request.user.id

        return render(request, "ProfileSetup/thirdInfo.html", {"form": form,"lang":lang,"checkL":checkL,"asd":asd,"asd1":asd1,"a":a})
    else:
        form = setupProfile3(request.POST or None)

        if request.method == "POST":
            if form.is_valid():
                form.save()
                us = get_object_or_404(CustomUser, id=userId)
                us.profileSetup = True
                us.save()
                return redirect("apply", pk)
            else:
                form = form()
        form.initial["user_id"] = request.user.id

    return render(request, "ProfileSetup/thirdInfo.html", {"form": form,"lang":lang,"checkL":checkL,"a":a})

def getAllJobs(request):
    job = Jobs.objects.all().filter(status="Open").order_by("-postDate")
    
    return render(request, "base.html", {"job": job})
