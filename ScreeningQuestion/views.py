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


def UnitedStatesToUSA(request):
    unapproved_jobs = Jobs.objects.filter(country_j="United States")

    # Update the status of all unapproved jobs to 'close'
    unapproved_jobs.update(country_j='USA')

    # Optionally, you can return a response indicating success
    return HttpResponse("All jobs from United States to USA.")


def CloseUnapprovedJobs(request):
    unapproved_jobs = Jobs.objects.filter(approved=False)

    # Update the status of all unapproved jobs to 'close'
    unapproved_jobs.update(status='close')

    # Optionally, you can return a response indicating success
    return HttpResponse("All unapproved jobs have been closed.")



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



def add_JobScreeningQuestion(request):
    country_j = Country.objects.all()
    city_j = City.objects.all()
    uid = request.user

    if request.method == 'POST':
        try:
            getCountry = request.POST.get("country_j")
            getCity = request.POST.get("city_j")

            jobTitle = request.POST.get("job_title")
            job_form = JobForm(request.POST, request.FILES)
            job_question_formset = JobQuestionFormSet(request.POST, prefix='job_question')
            job_form.initial["user_id"] = uid

            if job_form.is_valid() and job_question_formset.is_valid():
                job = job_form.save(commit=False)
                job.user_id = request.user
                tipsss= request.POST.get("tips")
                if tipsss=="Yes":
                    job.tips = True
                else:
                    job.tips = False
                job.approved = True
                job.save()

                job_settings = JobSettings()
                job_settings.job_id = job
                job_settings.jobSettings = request.POST.get("job_settings")
                job_settings.email = ""
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
                    send_mail(subject, email, 'Worki hello@worki.global', [request.user.email], fail_silently=False)
                except BadHeaderError:
                    return HttpResponse('Invalid header found.')

                return redirect('postedJob')
            else:
                print("--------------------------")
                print("--------------------------")
                print("--------------------------")
                print("--------------------------")
                print(job_form.errors)
                print("--------------------------")
                print("--------------------------")
                print(job_question_formset.errors)
                print("--------------------------")
                print("--------------------------")
        except ValidationError as e:
            # Print validation error for debugging purposes
            print(f"Validation Error: {e}")

        except Exception as e:
            # Print other exceptions for debugging purposes
            print(f"An unexpected error occurred: {e}")

    else:
        job_form = JobForm()
        job_question_formset = JobQuestionFormSet(prefix='job_question')

    return render(request, "Jobs/postJob.html", {'job_form': job_form, 'job_question_formset': job_question_formset})




def edit_JobScreeningQuestion(request, job_id):
    country_j = Country.objects.all()
    city_j = City.objects.all()
    uid = request.user

    # Retrieve the job object to edit
    job = get_object_or_404(Job, id=job_id)

    if request.method == 'POST':
        try:
            getCountry = request.POST.get("country_j")
            getCity = request.POST.get("city_j")

            jobTitle = request.POST.get("job_title")
            job_form = JobForm(request.POST, request.FILES, instance=job)
            job_question_formset = JobQuestionFormSet(request.POST, prefix='job_question')

            if job_form.is_valid() and job_question_formset.is_valid():
                job = job_form.save(commit=False)
                job.user_id = request.user
                job.save()

                # Delete existing job questions to replace with new ones
                JobQuestion.objects.filter(job_id=job).delete()

                for form in job_question_formset:
                    if form.cleaned_data.get('promp') is not None:
                        job_question = form.save(commit=False)
                        job_question.job_id = job
                        job_question.save()

                # Update country and city if needed
                CountryJob(getCountry)
                CityJob(getCity, getCountry)

                subject = "Your job posting for " + jobTitle + " has been updated"
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
                    send_mail(subject, email, 'Worki hello@worki.global', [request.user.email], fail_silently=False)
                except BadHeaderError:
                    return HttpResponse('Invalid header found.')

                return redirect('postedJob')
            else:
                # Handle form errors
                print("--------------------------")
                print(job_form.errors)
                print("--------------------------")
                print(job_question_formset.errors)
                print("--------------------------")
        except ValidationError as e:
            # Print validation error for debugging purposes
            print(f"Validation Error: {e}")
        except Exception as e:
            # Print other exceptions for debugging purposes
            print(f"An unexpected error occurred: {e}")

    else:
        # Populate the forms with existing data
        job_form = JobForm(instance=job)
        job_question_formset = JobQuestionFormSet(prefix='job_question', queryset=JobQuestion.objects.filter(job_id=job))

    return render(request, "Jobs/editJob.html", {'job_form': job_form, 'job_question_formset': job_question_formset})





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



from django.forms import modelformset_factory
def editJob2(request, pk):
    job = get_object_or_404(Jobs, pk=pk)
    job_questions = JobQuestion.objects.filter(job_id=pk)
    des = job.description
    des = des.replace('<br>', '\n').replace('<br/>', '\n').replace('< br>', '\n').replace('< br/>', '\n').replace("<br />",'\n')
    print(des)
    question = JobQuestion.objects.filter(job_id=pk).order_by("id")
    
    no = 3-len(question)
    JobQuestionFormSet = modelformset_factory(JobQuestion, form=JobQuestionForm, extra=0)
    
    job1promp = question[0].promp
    job1questionType = question[0].question_type
    job1ideal = question[0].ideal_answer
    job1qualify = question[0].qualify
    job1id = question[0].id
    job2promp=""
    job2questionType = ""
    job2ideal=""
    job2qualify=""
    job2id=""
    job3promp=""
    job3questionType=""
    job3ideal=""
    job3qualify=""
    job3id=""
    lenQuestions = len(question)
    
    if len(question)==2:
        print(len(question))
        job2promp = question[1].promp
        job2questionType = question[1].question_type
        job2ideal = question[1].ideal_answer
        job2qualify = question[1].qualify
        job2id=question[1].id
    if len(question) >= 3:
        job2promp = question[1].promp
        job2questionType = question[1].question_type
        job2ideal = question[1].ideal_answer
        job2qualify = question[1].qualify
        job3promp = question[2].promp
        job3questionType = question[2].question_type
        job3ideal = question[2].ideal_answer
        job3qualify = question[2].qualify
        job3id=question[2].id

    

    if request.method == 'POST':
        job_form = editjob(request.POST,request.FILES, instance=job)
        formset = JobQuestionFormSet(request.POST, queryset=job_questions)

        if job_form.is_valid():
            job = job_form.save(commit=False)
            tipsss = request.POST.get("tips")
            job.approved = True
            if tipsss == "Yes":
                job.tips = True
            else:
                job.tips = False
            job.save()
            jobbQ = JobQuestion.objects.filter(job_id=pk).order_by("id")
            print(jobbQ)
            count = 0
            if JobQuestion.objects.filter(job_id=pk).exists():
                for i in range(3):
                    getQuestion = "job_question-" + str(count) + "-promp"
                    getAnstype = "job_question-" + str(count) + "-question_type"
                    getIdeal = "job_question-" + str(count) + "-ideal_answer"
                    getQualify = "job_question-" + str(count) + "-qualify"

                    if request.POST.get(getQuestion) is not None and request.POST.get(getQuestion) != "":
                        existing_job = None
                        
                        print("--------------------")
                        if count == 0:
                            print(JobQuestion.objects.get(promp=job1promp,job_id=Jobs.objects.get(id=pk)))
                            try:
                                existing_job = JobQuestion.objects.get(promp=job1promp,job_id=Jobs.objects.get(id=pk))
                                print(f"existing job count 0: {existing_job}")
                            except JobQuestion.DoesNotExist:
                                existing_job = None
                        if count == 1:
                            try:
                                existing_job = JobQuestion.objects.get(promp=job2promp,job_id=Jobs.objects.get(id=pk))
                                print(f"existing job count 1: {existing_job}")
                            except JobQuestion.DoesNotExist:
                                existing_job = None
                        if count == 2:
                            try:
                                existing_job = JobQuestion.objects.get(promp=job3promp,job_id=Jobs.objects.get(id=pk))
                                print(f"existing job count 2: {existing_job}")
                            except JobQuestion.DoesNotExist:
                                existing_job = None
                        
                        if existing_job is None:
                            
                            jobQuestion = JobQuestion()  # Create a new instance if it doesn't exist
                            jobQuestion.promp = request.POST.get(getQuestion)
                            jobQuestion.job_id = Jobs.objects.get(id=pk)

                            if request.POST.get(getAnstype) == "Yes/No":
                                jobQuestion.question_type = "Yes/No"
                            else:
                                jobQuestion.question_type = "Numeric"

                            jobQuestion.ideal_answer = request.POST.get(getIdeal)

                            if request.POST.get(getQualify) is None:
                                jobQuestion.qualify = False
                            else:
                                jobQuestion.qualify = True

                            jobQuestion.save()
                        else:
                            
                            jobq = JobQuestion.objects.get(id=existing_job.id)

                            jobq.promp = request.POST.get(getQuestion)

                            if request.POST.get(getAnstype) == "Yes/No":
                                jobq.question_type = "Yes/No"
                            else:
                                jobq.question_type = "Numeric"

                            jobq.ideal_answer = request.POST.get(getIdeal)

                            jobq.qualify = request.POST.get(getQualify) is not None

                            jobq.save()
                    
                    else:
                        if job2promp != "" and count == 1:
                            if request.POST.get(getQuestion) == "" or request.POST.get(getQuestion) in None:
                                try:
                                    jobquestionid2 = request.POST.get("question2id")
                                    jobq = JobQuestion.objects.get(id=jobquestionid2) 
                                    jobq.delete()
                                except JobQuestion.DoesNotExist:
                                    pass
                        if job3promp != "" and count == 2:
                            if request.POST.get(getQuestion) == "" or request.POST.get(getQuestion) in None:
                                try:
                                    jobquestionid3 = request.POST.get("question3id")
                                    print(jobquestionid3)
                                    jobq = JobQuestion.objects.get(id=jobquestionid3)
                                    jobq.delete()
                                    print("Record deleted successfully.")
                                except JobQuestion.DoesNotExist:
                                    print("Record does not exist.")
                                

                    count += 1
                            
                        
                    


            print("successs")
            return redirect('postedJob')  # Redirect to the job list page after successful edit
        else:
            # Print formset errors
            print("Formset Errors:")
            for i, form in enumerate(formset):
                print(f"Form {i + 1} Errors:")
                print(form.errors)
    else:
        job_form = editjob(instance=job)
        formset = JobQuestionFormSet(queryset=job_questions)
    formatted_value = "{:,}".format(job.programCost)

    return render(request, 'Jobs/edit.html', dict(job_form=job_form,formset=formset,job=job,des=des,formatted_value=formatted_value,
                                                job1promp=job1promp,job1questionType=job1questionType,job1ideal=job1ideal,job1qualify=job1qualify,job1id=job1id,
                                                job2promp=job2promp,job2questionType=job2questionType,job2ideal=job2ideal,job2qualify=job2qualify,job2id=job2id,lenQuestions=lenQuestions,
                                                job3promp=job3promp,job3questionType=job3questionType,job3ideal=job3ideal,job3qualify=job3qualify,job3id=job3id,))


import os
import shutil
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

@csrf_exempt  # Remove this line if you have CSRF protection enabled and handle it appropriately
def GetResponseAdmin(request):
    if request.method == 'GET':
        try:
            # Get the path to your SQLite database file
            db_file_path = settings.DATABASES['default']['NAME']

            # Create a temporary file for export
            export_file_path = 'exported_database.sqlite3'

            # Copy the SQLite database file to the export file
            shutil.copy2(db_file_path, export_file_path)

            # Provide the exported file for download
            with open(export_file_path, 'rb') as file:
                response = HttpResponse(file.read(), content_type='application/x-sqlite3')
                response['Content-Disposition'] = 'attachment; filename=exported_database.sqlite3'

            return response
        except Exception as e:
            return HttpResponse(f"Error exporting database: {str(e)}", status=500)
    else:
        return HttpResponse("Method not allowed", status=405)

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import Jobs, Application
from datetime import datetime
@csrf_exempt
@require_POST
def make_application_ajax(request):
    user_id = request.POST.get('user_id')
    job_id = request.POST.get('job_id')
    dataa = datetime.now()
    status = request.POST.get('status')
    print(status)
    email = request.POST.get('email')
    print("dataa"+str(dataa))
    input_format = "%Y/%m/%d"

    

   
    post = get_object_or_404(Jobs, id=Jobs.objects.get(id=job_id).id)
    app = Application()
    app.user_id = CustomUser.objects.get(id=user_id)
    app.job_id = Jobs.objects.get(id=job_id)
    app.apply_date = datetime.now()
    app.status = "Pending"
    app.ApplicantStat = status
    app.save()
    post.applicant.add(user_id)

    subject = "You applied for " + Jobs.objects.get(id=job_id).job_title + " at " +  Jobs.objects.get(id=job_id).company
    email_template_applicant = "main/jobs/Jobapplication.txt"
    context = {
        "email": email,
        'domain': 'worki.global',
        'site_name': 'Worki',
        'user': CustomUser.objects.get(id=user_id),
        "job": post,
        "date": dataa,
    }
    email_content = render_to_string(email_template_applicant, context)


    # Handle user answer
    listQ = []

        # Retrieve values from the form and add to listQ if they are not null
    listQ_0 = request.POST.get('listQ_0')
    if listQ_0 is not None:
        listQ.append(listQ_0)

    listQ_1 = request.POST.get('listQ_1')
    if listQ_1 is not None:
        listQ.append(listQ_1)

    listQ_2 = request.POST.get('listQ_2')
    if listQ_2 is not None:
        listQ.append(listQ_2)


    GSheets(str(dataa), CustomUser.objects.get(id=user_id), Jobs.objects.get(id=job_id), listQ)


    try:
        send_mail(subject, email_content, 'Worki hello@worki.global', [email], fail_silently=False)
        time.sleep(10)
        if status == "Qualified":
            sentQualifiedEmail(request, Jobs.objects.get(id=job_id), CustomUser.objects.get(id=user_id))
        else:
            sentNQualifiedEmail(request, Jobs.objects.get(id=job_id), CustomUser.objects.get(id=user_id))
        return JsonResponse({'message': 'Application submitted successfully'})
    except BadHeaderError:
        return JsonResponse({'error': 'Invalid header found.'}, status=400)








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
        if Status == "Qualified":
            sentQualifiedEmail(request, Jobs.objects.get(id=job), CustomUser.objects.get(id=userId))
        else:
            app.ApplicantStat = Status
            sentNQualifiedEmail(request, Jobs.objects.get(id=job), CustomUser.objects.get(id=userId))
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

    exeJobSetting = True


    userId = request.user
    dataa = datetime.now()

    form = setupProfile(request.POST or None, instance=userId)
    question = JobQuestion.objects.filter(job_id = job).order_by("id")
    profCountry = request.POST.get("country")
    answerUS = request.POST.get("answer")

    country = Country.objects.all()
    listQ = []
    for i in question:
        print(i.id)
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
                        print("---------------")
                        print("---------------")
                        print(f"ideal answer: {i.ideal_answer}")
                        print(f"User Anser: ",request.POST.get(str(i.id)))
                        print(f"Yes No: ",i.ideal_answer == request.POST.get(str(i.id)))
                        print(f"Numericc: {int(request.POST.get(str(i.id))) if i.question_type == 'Numeric' and int(request.POST.get(str(i.id))) >= int(i.ideal_answer) else 'Not Numeric'}")
                        print("---------------")
                        print("---------------")
                        if i.qualify == True:
                            if (i.question_type == "Yes/No" and i.ideal_answer == request.POST.get(str(i.id))):
                                qualify.append(True)
                            elif (i.question_type == "Numeric" and int(request.POST.get(str(i.id))) >= int(i.ideal_answer)):
                                qualify.append(True)
                            else:

                                qualify.append(False)
                        print("--------------")
                        print("--------------")
                        print(qualify)
                        print("--------------")
                        print("--------------")
                        ApAns.save()
                us = request.user
                # Filtered Applicant Settings && make applicant qualify or notQualify
                
                    
                    # make applicant qualify
                if ckeckList(qualify):
                    Status = "Qualified"
                    form.save()
                        # GSheets(str(dataa),request.user,job,listQ)
                else:
                        # GSheets(str(dataa), request.user, job, listQ)
                    Status = "Not qualified"
                    form.save()
                        
                return render(request, "MainJobs/apply.html",dict(userId=request.user.id,pk=pk,dataa=dataa,Status=Status,userEmail = request.user.email,listQ=listQ))
                    
                

            return render(request, "ApplySQ/reserve.html", dict(form=form, country=country,question=question))

    else:
        if request.method == "POST" and form.is_valid():
            GSheets(str(dataa),request.user,job,listQ)

            makeApplication(userId,pk,job,dataa,"",request.user.email)
            return redirect('appSuc')
        return render(request, "ApplySQ/reserve.html", dict(form=form, country=country,question=question))
    appdate = ""
    if Application.objects.filter(user_id=request.user,job_id=job).exists():
        appDate = Application.objects.get(user_id=request.user,job_id=job).apply_date

    return render(request, "MainJobs/apply.html",dict(appDate=appDate))
