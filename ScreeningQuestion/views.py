from django.core.mail import send_mail, EmailMultiAlternatives
from django.http import BadHeaderError, HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string, get_template

from ScreeningQuestion.models import *
# Create your views here.
from accounts.forms import *

from accounts.views import *

from .forms import *
import time



def GSheets(dataa,user,job,AnsList):
    import gspread
    from oauth2client.service_account import ServiceAccountCredentials
    from google.oauth2 import service_account

    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive"
    ]

    # Replace these with your actual credentials
    creds_info = {
        "type": "service_account",
        "project_id": "workileads",
        "private_key_id": "ce792832b16c169fff7c7bde0888d61d3c1d0b95",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCfVfrLZIrU809U\ngUv5BENvkvSuIJCM46pDbENkzinmJ6QSsDaQ4wSAAtI3hjNpGzoXl42anMfXZxle\n+s8pHOgC5k+ZFPpq7Sm91D0SMxg13QZh03z3L22cTQU8gwvOvN+Fxj2rQS1Zh6WQ\njcf4PfPYvTKdnBxAQotZ6kPKV0seoOQg0D/7VVI9Yu8ZBYNRZKraQGYXRFpoPXkS\nQ1scs9aTKMnpVu1F3pVVTn2YGS8zifD1TTjzHAujRPXxyQDllLswp9fzyT4XHS50\nuGCwmMO6ydN7Bto9kMt2SuRKKP14JNcOVUkqIpae1b0/nB3enbqd1MsvozAzjDVP\n48L83tO1AgMBAAECggEADBOzhR/wtkg0kAfBLIBSTzOWPa4vXqpxRkJ/ZOA2hKDR\nEBnl95CUJP1xwG542O43dpXQux0dOEUILdmOAwRTS/L31LcmbZ0zyn+62vVfT/0v\nMGeGuOKnU3nysWiPvXgLQNkVkAnfktdpU8isqp121+EBTuPIBWaLKEHNfm75ko+J\n6T6r70BjDyRyyoga7r1paDuhj/VcvzHVfCE5oxQeRAGdG5wfNA5+oqE4YltXRnFa\nDEHgykqovzTzvQ0pGEQxwpC4yjPd6HI0H7wMDpyQP+QKeaCUgI2/segSsNabLC5y\n4OEvUvWlZ0RoyB/3sIo4Hny3UU+Jje40/JGJH2MY6QKBgQDNp9QNyf7vkb5D0U9s\nANwAld7+KoXvoXsDZkbcqwqUSUS1hKT/iX8I7/Zh21f54NN3FAzcyQe1fJvxTCgw\nqeNFHUWdzXoXaSSYsWRfO313XgOr0YXZj9pDuqpnUly00HRSgV/EqydI3qNmzq2H\n5648f2VVDJ8rz7C6DWfuSuag6QKBgQDGV1qOurLAcD08WsNvuCv+/1m98SvTYNsw\nBvze+N6VyH2bjlh7C+eAwnFJhMZzFkoAkUagtPZp55zwqwcIEUOpqrlTbXWPoiRg\n1sCs6ug1KSZ04UIw40NTgZei2w0r0ZyqMHC7ynQA4Gukmzrk6JVL9sCxKCWNbgj7\nuokKOTN87QKBgCWQqWBXbFTQV2PF4O8GfSkyNwhQNiTeZzzourrmF0mc1IsfjpAK\nyoSUaHnZeglvstDGfc76fYj+GPILii/RaG0geq3ncYzDLOcjSAVJNZLPPnZtEDj8\nWM8UUroKxlpU1VqYvSiMZuGdoVVPHU182Uu9rYHKi2ySRGLHvhs93UC5AoGAXXq+\nS5biuKAtvExq4DTFR6HCAiuwpCd6JuCkPdK91Ypw6Ofl+9hYe+8oxaW2gnd22V2f\nFA82NCPda/Cvl7XLViQIxLFKPzAERT/x/42Xc7a5UUz5jWEPUkQ525+yTXy1geDi\nwR9iHSeolCQ1Vb3o36yklNp/GHFL+pioDhF3muECgYAlfm3YEap8Ck4WziaUVmm3\nWcTYI66wvl+4Pogh0dY+lPCkbYHimFc2C6O5umQrsYwTgPcLhdIEvYkDJ8n4AoW6\njO9Ky5ftXYvPFRVPpCSHyu/8OBY9PRnflsNSPr1PBtZcpmr31Re+99DXj4AteDsD\ncqB3c9ceSj+gVXHtnXyNhA==\n-----END PRIVATE KEY-----\n",
        "client_email": "workileads@workileads.iam.gserviceaccount.com",
        "client_id": "100567195679163321988",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/workileads%40workileads.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    }

    creds = service_account.Credentials.from_service_account_info(creds_info, scopes=scope)

    client = gspread.authorize(creds)
    sh = client.open("Worki_Leads_2024")  # Open the spreadsheet

    # Set the worksheet name where you want to add the data

    worksheet_name = "Leads"
    worksheet = sh.worksheet(worksheet_name)
    data_to_send = [
        ["",dataa,user.first_name, user.last_name,user.email,  user.phone_number,job.program,user.country,job.job_title,job.country_j,job.city_j]+AnsList,
    ]


    # Append the data to the worksheet
    worksheet.append_rows(data_to_send)



@login_required()
def add_JobScreeningQuestion(request):
    country_j = Country.objects.all()
    city_j = City.objects.all()
    uid = request.user
    if request.method == 'POST':
        getCountry = request.POST.get("country_j")
        getCity = request.POST.get("city_j")

        jobTitle = request.POST.get("job_title")
        job_form = JobForm(request.POST,request.FILES)
        job_question_formset = JobQuestionFormSet(request.POST, prefix='job_question')
        job_form.initial["user_id"] = uid



        if job_form.is_valid() and job_question_formset.is_valid():
            job = job_form.save(commit=False)
            job.user_id = request.user
            job.save()
            # for form in job_settings_formset:
            #     job_settings = form.save(commit=False)
            #     job_settings.job_id = job
            #     job_settings.save()
            job_settings = JobSettings()
            job_settings.job_id = job
            job_settings.jobSettings  = request.POST.get("job_settings")
            job_settings.email =""
            job_settings.save()

            for form in job_question_formset:
                if form.cleaned_data.get('promp') is not None:
                        job_question = form.save(commit=False)
                        job_question.job_id = job
                        job_question.save()

            CountryJob(getCountry)

            CityJob(getCity, getCountry)
            subject = "Your job posting for " + jobTitle + " is under review"
            email_template_applicant = "main/jobs/postJob.txt"




            c = {
                "email": request.user.email,
                'domain': 'worki.global',
                'site_name': 'Worki',
                'user': request.user,
                'jobTitle': jobTitle,

            }
            email = render_to_string(email_template_applicant, c)

            try:
                send_mail(subject, email, 'Worki hello@worki.global',
                          [request.user.email], fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')

            return redirect('postedJob')




    else:
        job_form = JobForm()
        job_question_formset = JobQuestionFormSet(prefix='job_question')

    return render(request,"Jobs/postJob.html", {'job_form': job_form, 'job_question_formset': job_question_formset})

def getQuestion(request,pk):
    question = JobQuestion.objects.filter(job_id=pk).order_by("-id")
    userId=request.user
    form = setupProfile(request.POST or None, instance=userId)
    jpk = pk
    return render(request,"ApplySQ/index.html",dict(question=question,jpk=jpk,form=form))

def getUserAnswer(request,pk):
    question = JobQuestion.objects.filter(job_id=pk).order_by("-id")
    ans = request.POST.get("answerList")
    jpk=pk
    answer_list = ans.split(",")
    userId = request.user
    form = setupProfile(request.POST or None, instance=userId)
    job = Jobs.objects.get(id=pk)
    dataa = datetime.now()
    userId = request.user
    profCountry = request.POST.get("country")
    if request.method == "POST":
        if form.is_valid():
            CountryUser(profCountry, request.user)
            form.save()
            post = get_object_or_404(Jobs, id=pk)
            app = Application()
            app.user_id = userId
            app.job_id = job
            app.apply_date = dataa
            app.status = "Pennding"
            app.save()
            for i in range(question.count()):
                QuestionRespond = ApplicantAnswer()
                QuestionRespond.applicant_id = userId
                QuestionRespond.question_id = question[i]
                QuestionRespond.user_answer = answer_list[i]
                QuestionRespond.save()
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
                send_mail(subject, email, 'Worki hello@worki.global',
                          [request.user.email], fail_silently=False)
                # send_mail(subject,oemail,'rinor@theacompany.xyz',[emailOwner],fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect('appSuc')






    return render(request,"ApplySQ/index.html",dict(question=question,jpk=jpk,form=form))



# Add Jobs Edit
#

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


            CountryJob(getCountry)

            CityJob(getCity, getCountry)
            subject = "Your job posting for " + jobTitle + " is under review"
            email_template_applicant = "main/jobs/postJob.txt"

            c = {
                "email": request.user.email,
                'domain': 'worki.global',
                'site_name': 'Worki',
                'user': request.user,
                'jobTitle': jobTitle,

            }
            email = render_to_string(email_template_applicant, c)

            try:
                send_mail(subject, email, 'Worki hello@worki.global',
                          [request.user.email], fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')

            return redirect('postedJob')
    if uid != "":
        form.initial["user_id"] = uid

    return render(request, "Jobs/add.html", {"form": form, "country_j": country_j, "city_j": city_j})

def AddQuestionnn(request):
    if request.method=="POST":
        list_props = []
        list_QuestionType = []
        list_ideal = []
        list_qualify = []
        for i in range(3):
            getQuestion = "question"+str(i+1)
            getAnstype = "answerType"+str(i+1)
            getIdeal = "idealAnsF"+str(i+1)
            getQualify = "qualify"+str(i+1)
            if request.POST.get(getQuestion) is not None and request.POST.get(getQuestion) != "":
                list_props.append(request.POST.get(getQuestion))
                list_QuestionType.append(request.POST.get(getAnstype))
                list_ideal.append(request.POST.get(getIdeal))
                if request.POST.get(getQualify) is None:
                    list_qualify.append(False)
                else:
                    list_qualify.append(True)
        print(list_props)
        print(list_QuestionType)
        print(list_ideal)
        print(list_qualify)

        jobid = Jobs.objects.filter(user_id=request.user).order_by("-id")[0]
        print(list_props)
        print(request.POST.get("rejected-email"))

        for i in range(len(list_props)):
            job_Question = JobQuestion()
            job_Question.job_id = jobid
            job_Question.promp = list_props[i]
            if list_QuestionType[i] == "YesNo":
                job_Question.question_type = "Yes/No"
            else:
                job_Question.question_type = "Numeric"

            job_Question.ideal_answer = list_ideal[i]
            print(list_qualify[i])
            job_Question.qualify = list_qualify[i]
            job_Question.save()
        emPost = request.POST.get("rejected-email")
        emSettings = request.POST.get("job-settings")
        jobS = JobSettings()
        jobS.job_id = jobid
        jobS.email = emPost
        jobS.jobSettings = emSettings
        jobS.save()

        return redirect('add-question')

    return render(request,"Screening-question/Add-job/add-question.html")



@login_required
def editScreeningQuestion(request,pk):
    if JobSettings.objects.filter(job_id=pk).exists():
        question = JobQuestion.objects.filter(job_id=pk).order_by("-id")
        jobSettings = JobSettings.objects.get(job_id=pk)
        job1promp = question[0].promp
        job1questionType = question[0].question_type
        job1ideal = question[0].ideal_answer
        job1qualify = question[0].qualify
        job2promp = ""
        job2questionType = ""
        job2ideal = ""
        job2qualify = ""
        job3promp = ""
        job3questionType = ""
        job3ideal = ""
        job3qualify = ""
        if len(question) == 1:
            job2promp = question[1].promp
            job2questionType = question[1].question_type
            job2ideal = question[1].ideal_answer
            job2qualify = question[1].qualify
        if len(question) == 2:
            job3promp = question[2].promp
            job3questionType = question[2].question_type
            job3ideal = question[2].ideal_answer
            job3qualify = question[2].qualify

        jobEmail = jobSettings.email
        jobFilter = jobSettings.jobSettings
        list_id = []
        list_props = []
        list_QuestionType = []
        list_ideal = []
        list_qualify = []

        if request.method=="POST":
            for i in range(3):
                getQuestion = "question"+str(i+1)
                getAnstype = "answerType"+str(i+1)
                getIdeal = "idealAnsF"+str(i+1)
                getQualify = "qualify"+str(i+1)
                if request.POST.get(getQuestion) is not None and request.POST.get(getQuestion) != "":
                    list_props.append(request.POST.get(getQuestion))
                    list_QuestionType.append(request.POST.get(getAnstype))
                    list_ideal.append(request.POST.get(getIdeal))
                    if request.POST.get(getQualify) is None:
                        list_qualify.append(False)
                    else:
                        list_qualify.append(True)
            for i in range(list_id):
                sc = get_object_or_404(JobQuestion, id=list_id[i])
                sc.promp = list_props[i]
                sc.question_type = list_QuestionType[i]
                sc.ideal_answer = list_ideal[i]
                sc.qualify = list_qualify[i]
                sc.save()

        return render(request,"Screening-question/Add-job/add-question.html",dict(jobEmail=jobEmail,jobFilter=jobFilter,
            job1promp=job1promp,job1questionType=job1questionType,job1ideal=job1ideal,job1qualify=job1qualify,
            job2promp=job2promp,job2questionType=job2questionType,job2ideal=job2ideal,job2qualify=job2qualify,
            job3promp=job3promp,job3questionType=job3questionType,job3ideal=job3ideal,job3qualify=job3qualify))

    return render(request, "Screening-question/Add-job/add-question.html")

def editJob(request,pk):
    job = Jobs.objects.get(id=pk)
    city_j= City.objects.all()
    country_j= Country.objects.all()
    if request.method=="POST":
        form = editjob(request.POST or None, request.FILES or None, instance=job)
        if form.is_valid():
            form.save()
            jobbQ = JobQuestion.objects.filter(job_id=pk).order_by("id")
            count = 1
            if JobQuestion.objects.filter(job_id=pk).exists():
                for i in jobbQ:


                    getQuestion = "question" + str(count)
                    getAnstype = "answerType" + str(count)
                    getIdeal = "idealAnsF" + str(count)
                    getQualify = "qualify" + str(count)
                    if request.POST.get(getQuestion) is not None and request.POST.get(getQuestion) != "":

                        job = JobQuestion.objects.get(id=i.id)
                        job.promp = request.POST.get(getQuestion)
                        job.job_id = Jobs.objects.get(id=pk)
                        if request.POST.get(getAnstype) == "YesNo":
                            job.question_type = "Yes/No"
                        else:
                            job.question_type = "Numeric"
                        job.ideal_answer = request.POST.get(getIdeal)
                        if request.POST.get(getQualify) is None:
                            job.qualify = False
                        else:
                            job.qualify = True
                        job.save()
                    count += 1
            else:
                for i in range(3):
                    getQuestion = "question" + str(count)
                    getAnstype = "answerType" + str(count)
                    getIdeal = "idealAnsF" + str(count)
                    getQualify = "qualify" + str(count)
                    if request.POST.get(getQuestion) is not None and request.POST.get(getQuestion) != "":
                        job = JobQuestion()
                        job.promp = request.POST.get(getQuestion)
                        job.job_id = Jobs.objects.get(id=pk)
                        if request.POST.get(getAnstype) == "YesNo":
                            job.question_type = "Yes/No"
                        else:
                            job.question_type = "Numeric"
                        job.ideal_answer = request.POST.get(getIdeal)
                        if request.POST.get(getQualify) is None:
                            job.qualify = False
                        else:
                            job.qualify = True
                        job.save()
                    count += 1

            if JobSettings.objects.filter(job_id=pk).exists():
                jobS = JobSettings.objects.get(job_id=pk)
                jobS.jobSettings = request.POST.get('job-settings')
                jobS.email = request.POST.get('rejected-email')
                jobS.save()
            else:
                jobS = JobSettings()
                jobS.jobSettings = request.POST.get('job-settings')
                jobS.email = request.POST.get('rejected-email')
                jobS.job_id=Jobs.objects.get(id=pk)
                jobS.save()
            return redirect('home')


    else:
        if JobSettings.objects.filter(job_id=pk).exists():
            print(JobSettings.objects.filter(job_id=pk))

            question = JobQuestion.objects.filter(job_id=pk).order_by("id")
            jobSettings = JobSettings.objects.get(job_id=pk)
            job1promp = question[0].promp
            job1questionType = question[0].question_type
            job1ideal = question[0].ideal_answer
            job1qualify = question[0].qualify
            job2promp=""
            job2questionType = ""
            job2ideal=""
            job2qualify=""
            job3promp=""
            job3questionType=""
            job3ideal=""
            job3qualify=""
            if len(question)==2:
                print(len(question))
                job2promp = question[1].promp
                job2questionType = question[1].question_type
                job2ideal = question[1].ideal_answer
                job2qualify = question[1].qualify
            if len(question) >= 3:
                job3promp = question[2].promp
                job3questionType = question[2].question_type
                job3ideal = question[2].ideal_answer
                job3qualify = question[2].qualify

            jobEmail = jobSettings.email
            jobFilter = jobSettings.jobSettings

            form = editjob(request.POST or None,request.FILES or None,  instance=job)

            des = job.description
            des = des.replace('<br />', '\n')
            return render(request, "Jobs/edit.html", dict(form=form,country_j=country_j,city_j=city_j,des=des,
                        jobEmail=jobEmail,jobFilter=jobFilter,pk=pk,
                        job1promp=job1promp,job1questionType=job1questionType,job1ideal=job1ideal,job1qualify=job1qualify,
                        job2promp=job2promp,job2questionType=job2questionType,job2ideal=job2ideal,job2qualify=job2qualify,
                        job3promp=job3promp,job3questionType=job3questionType,job3ideal=job3ideal,job3qualify=job3qualify))
        else:
            form = editjob(request.POST or None, request.FILES or None, instance=job)
            country = Country.objects.all()
            city = City.objects.all()
            des = job.description
            des = des.replace('<br />', '\n')
            return render(request, "Jobs/edit.html", dict(form=form, city_j=city_j,country_j=country_j, des=des,pk=pk))
    return render(request, "Jobs/404.html",dict(city_j=city_j,country_j=country_j))


@login_required
def editJobs(request, pk):
    if Jobs.objects.filter(id=pk).exists():
        job = Jobs.objects.get(id=pk)
        jobUs = job.user_id

        if jobUs == request.user:
            form = editjob(request.POST or None, request.FILES or None, instance=job)
            country = Country.objects.all()
            city = City.objects.all()
            des = job.description
            des = des.replace('<br />', '\n')

            if form.is_valid():
                CountryJob(request.POST.get("country_j"))
                CityJob(request.POST.get("city_j"),request.POST.get("country_j"))
                form.save()
                
                return redirect("postedJob")
            return render(request, "Jobs/edit.html", {"form": form, "country": country, "city": city, "des": des})
        else:
            return render(request, "Jobs/404.html")
    else:
        return render(request, "Jobs/404.html")

def makeApplication(userId,pk,job,dataa,Status,emailU):
    post = get_object_or_404(Jobs, id=pk)
    app = Application()
    app.user_id = userId
    app.job_id = job
    app.apply_date = dataa
    app.status = "Pennding"
    if Status != "":
        app.ApplicantStat = Status
    app.save()
    post.applicant.add(userId)
    subject = "You applied for" + " " + job.job_title+" at "+job.company
    email_template_applicant = "main/jobs/Jobapplication.txt"
    c = {
        "email": emailU,
        'domain': 'worki.global',
        'site_name': 'Worki',
        'user': userId,
        "job": job,
        "date": dataa,

    }
    email = render_to_string(email_template_applicant, c)

    try:
        send_mail(subject, email, 'Worki hello@worki.global',[emailU], fail_silently=False)
    except BadHeaderError:
        return HttpResponse('Invalid header found.')



def sentQualifiedEmail(request,job,user):
    # Render the template

    context = {'image_url': 'https://worki.global/static/img/12.jpeg',
               'link_url': 'https://worki.global',
               "user": user,
               "job":job}
    template = get_template('Emails/QualifiedEmail.html')
    html_content = template.render(context)
    subject = "Application update for "+job.job_title+" at "+job.company
    # Create and send the email
    msg = EmailMultiAlternatives(
        subject,
        '',
        'Worki hello@worki.global',
        [request.user.email]
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()

def sentNQualifiedEmail(request,job,user):
    # Render the template
    context = {'image_url': 'https://worki.global/static/img/12.jpeg',
               'link_url': 'https://worki.global',
               "user": user,
               "job":job}
    template = get_template('Emails/NQualifiedEmail.html')
    html_content = template.render(context)
    subject = "Application update for "+job.job_title +" at "+job.company
    # Create and send the email
    msg = EmailMultiAlternatives(
        subject,
        '',
        'Worki hello@worki.global',
        [request.user.email]
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
@login_required(login_url="register")
def applyForJobSQ(request, pk):
    job = Jobs.objects.get(id=pk)

    exeJobSetting = JobSettings.objects.filter(job_id = job).exists()


    userId = request.user
    dataa = datetime.now()

    form = setupProfile(request.POST or None, instance=userId)
    question = JobQuestion.objects.filter(job_id = job).order_by("id")
    profCountry = request.POST.get("country")
    answerUS = request.POST.get("answer")

    country = Country.objects.all()
    listQ = []
    for i in question:
        listQ.append(request.POST.get(str(i.id)))


    def ckeckList(lst):

        ele = True
        chk = True

        # Comparing each element with first item
        for item in lst:
            if ele != item:
                chk = False
                break

        if (chk == True):
            return True
        else:
            return False
    if exeJobSetting == True:
        job_settings = JobSettings.objects.get(job_id=job)

        if not Application.objects.filter(job_id=pk).filter(user_id=request.user).exists():


            if request.method == "POST" and form.is_valid():


                qualify = []
                #Store Answer
                for i in question:
                    if not ApplicantAnswer.objects.filter(question_id = i).filter(applicant_id = request.user).exists():

                        ApAns = ApplicantAnswer()
                        ApAns.question_id = i
                        ApAns.applicant_id= request.user
                        ApAns.user_answer = request.POST.get(str(i.id))

                        if i.qualify == True:
                            if i.ideal_answer == request.POST.get(str(i.id)) or (i.question_type == "Numeric" and request.POST.get(str(i.id)) >= i.ideal_answer):

                                qualify.append(True)
                            else:

                                qualify.append(False)
                        ApAns.save()
                us = request.user

                # Filtered Applicant Settings && make applicant qualify or notQualify
                if job_settings.jobSettings == "F":
                    # make applicant qualify

                    if ckeckList(qualify):
                        makeApplication(userId,pk,job,dataa,"Qualified",request.user.email)
                        form.save()
                        sentQualifiedEmail(request,job,us)
                        GSheets(str(dataa),request.user,job,listQ)

                        return redirect('appSuc')

                    # make applicant not qualified
                    else:

                        makeApplication(userId,pk,job,dataa,"Not qualified",request.user.email)
                        print("doesnt meet qualification")
                        form.save()
                        GSheets(str(dataa),request.user,job,listQ)
                        sentNQualifiedEmail(request,job,us)

                        return redirect('appSuc')
                else:
                    makeApplication(userId,pk,job,dataa,"Not qualified",request.user.email)
                    GSheets(str(dataa),request.user,job,listQ)
                    return redirect('appSuc')

            return render(request, "ApplySQ/reserve.html", dict(form=form, country=country,question=question))

    else:
        if request.method == "POST" and form.is_valid():
            makeApplication(userId,pk,job,dataa,"",request.user.email)
            GSheets(str(dataa),request.user,job,listQ)
            return redirect('appSuc')
        return render(request, "ApplySQ/reserve.html", dict(form=form, country=country,question=question))
    appdate = ""
    if Application.objects.filter(user_id=request.user,job_id=job).exists():
        appDate = Application.objects.get(user_id=request.user,job_id=job).apply_date

    return render(request, "MainJobs/apply.html",dict(appDate=appDate))
