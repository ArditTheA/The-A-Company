import json
from datetime import timedelta

from django.contrib.auth.decorators import user_passes_test, login_required
from django.shortcuts import redirect, render
from django.views import View

from Applicant.forms import DocumentForm
from Applicant.models import *
from ScreeningQuestion.models import *
from documents.models import  *
OnBoardPhase = ["Payment","Meet With Us","Documents for work permit","Your work permit is here"]
onboardPhaseName = ["Payment","Meet-With-Us","Documents-for-work-permit","Your-work-permit-is-here"]


def moveApplicantToPhase(request,jpk,appSub,userList):
    job_id = Jobs.objects.get(id=jpk)
    appPhase = appSub
    print(appSub)
    useridList = userList.split(",")
    for i in useridList:
        if(ApplicantSubPhase.objects.filter(user_id=i).filter(job_id=jpk).exists()):
            getAPP = ApplicantSubPhase.objects.filter(user_id=i).filter(job_id=jpk)
            print(getAPP[0].id)
            aps = ApplicantSubPhase.objects.get(id=getAPP[0].id)
            aps.subPhase = appSub
            aps.save()
        else:
            aps = ApplicantSubPhase()
            aps.user_id = CustomUser.objects.get(id=i)
            aps.subPhase=appSub
            aps.job_id=job_id
            aps.save()
    print("done")
    return redirect("applicant", jpk)

@login_required
def UploadDocumentRecruiter(request,doc,jpk,userid):
    print("--------------------------")
    print("--------------------------")
    print(doc)
    print("--------------------------")
    print("--------------------------")
    if request.method == "POST":
        document = request.FILES.get("document")
        if RecruiterDocument.objects.filter(id_document=doc, user__id=userid, jobId__id=jpk).exists():
            document_recruiter = RecruiterDocument.objects.get(id_document=doc,user__id=userid,jobId__id=jpk)
            document_recruiter.id_document = doc
            document_recruiter.document=document
            document_recruiter.save()
            return redirect("home")
        else:
            document_recruiter = RecruiterDocument()
            document_recruiter.id_document = doc
            document_recruiter.user = CustomUser.objects.get(id=userid)
            document_recruiter.jobId=Jobs.objects.get(id=jpk)
            document_recruiter.document=document
            document_recruiter.save()
            return redirect("home")
    else:
        return render(request, 'upload_document_user.html')
    return render(request, 'upload_document_user.html')


def UploadUserRecruiterDoc(request,doc,jpk,userid):
    if request.method == "POST":
        document = request.FILES.get("document")
        document_recruiter = RecruiterDocument.objects.get(id_document=doc,user__id=userid,jobId__id=jpk)
        document_recruiter.document=document
        document_recruiter.signed=True
        document_recruiter.save()
        return redirect("home")
    return render(request,"upload_document_user.html")
@login_required
def UploadDocument(request,doc,userId):
    if request.method == 'POST':
        document = request.FILES.get('document')
        if documents_users.objects.filter(id_document__id=doc).filter(user__id=userId).exists():
            document_user = documents_users.objects.get(id_document__id=doc,user__id=userId)
            document_user.document = document
            document_user.save()
        else:

            document_user = documents_users()
            document_user.id_document = documents_list.objects.get(id=doc)
            document_user.user = CustomUser.objects.get(id=userId)
            document_user.document = document
            document_user.save()
        return redirect("home")

    else:


        return render(request, 'upload_document_user.html')
    return render(request, 'upload_document_user.html')
class getApplicantOnPhase(View):
    def get(self,request,appSub,jpk):
        JobOwner = Jobs.objects.get(id=jpk)
        CurrentUser = request.user
        usID = request.POST.get("user_id")
        print("------------------------------")
        print("------------------------------")
        print(appSub)
        print("------------------------------")
        print("------------------------------")
        jpk = int(jpk)
        users = ApplicantSubPhase.objects.filter(subPhase=appSub).filter(job_id=jpk)
    
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            userid = request.headers.get("userid")
            newDic = {}

            user = CustomUser.objects.get(id=userid)
            newDic["fname"] = user.first_name
            newDic["lname"] = user.last_name
            newDic["email"] = user.email
            newDic["phone"] = user.phone_number

            Status = Application.objects.filter(job_id=jpk).filter(user_id=userid).values_list("ApplicantStat",
                                                                                               flat=True).first()
            newDic["Status"] = str(Status)

            if user.city == None:
                newDic["city"] = user.country
            else:
                newDic["city"] = user.city + ", " + user.country
            appdate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("apply_date",
                                                                                                flat=True).first()
            print("-----------------------")
            print(appdate)
            print("-----------------------")
            if appdate != None:
                newDic["applyDate"] = format(appdate, "%d/%m/%Y")
            else:
                newDic["applyDate"]=""
            ########### User Experience ##########
            count = 0
            uExp = UserExperiece.objects.filter(user_id=userid)
            uExpCount = UserExperiece.objects.filter(user_id=userid).count()
            newDic["userExpCount"] = uExpCount

            for i in uExp:
                title = "title" + str(count)
                newDic[title] = i.title
                company = "company" + str(count)
                newDic[company] = i.company
                country = "country" + str(count)
                newDic[country] = i.Country
                city = "cityexp" + str(count)
                newDic[city] = i.city_usExp
                date = "date" + str(count)
                dateQuery = ""
                if i.end_date is None:
                    dateQuery = format(i.start_date, "%d/%m/%Y") + " - Present"
                else:
                    dateQuery = format(i.start_date, "%d/%m/%Y") + " - " + format(i.end_date, "%d/%m/%Y")
                newDic[date] = dateQuery
                count += 1

            ############# User Education ########
            userEdu = UserEducation.objects.filter(user_id=userid)
            userEduCount = UserEducation.objects.filter(user_id=userid).count()
            newDic["userEduCount"] = userEduCount
            countEdu = 0
            for i in userEdu:
                university = "university" + str(countEdu)
                newDic[university] = i.university
                field = "field" + str(countEdu)
                newDic[field] = i.field_of_study
                location = "uniloc" + str(countEdu)

                if i.city_e is None:
                    newDic[location] = i.country_e
                else:
                    newDic[location] = i.city_e + " - " + i.country_e

                date = "unidate" + str(countEdu)
                if i.end_year is None:
                    newDic[date] = format(i.start_year, "%d/%m/%Y") + " - Present"
                else:
                    newDic[date] = format(i.start_year, "%d/%m/%Y") + " - " + format(i.end_year, "%d/%m/%Y")
                countEdu += 1
                print(newDic)
            return HttpResponse(json.dumps(newDic), content_type='application/json; charset=utf8')
        app = True
        
        return render(request, "Match/Applicant/index.html",
                      dict( jpk=jpk, users=users,app=app,appSub=appSub,OnBoardPhase=OnBoardPhase))


@user_passes_test(lambda u: u.is_superuser)
def setDaysLeft(request):
    job = Jobs.objects.all()
    for i in job:
        j = Jobs.objects.get(id=i.id)
        j.deadline = datetime.now() + timedelta(days=365)
        j.save()
    return redirect("home")
@user_passes_test(lambda u: u.is_superuser)
def changeEmailForJobs(request):
    jobb = JobSettings.objects.all()
    for i in jobb:
        j= JobSettings.objects.get(id=i.id)
        j.email= "Hello,\n\nWorki has carefully reviewed your application." \
                 "\n\nYou don’t meet the following requirement for the Work and Travel program:" \
                 "\n-You are currently not an active university student\n\nIf you feel this is a mistake," \
                 " schedule an online meeting with us\n\n" \
                 "https://calendar.google.com/calendar/u/0/selfsched?sstoken=UU1pV2thNF9iS3RwfGRlZmF1bHR8MTE3MmEwNGMxN2VkYTAwYzkwNTExMzQwYmJjYTk1M2M" \
                 "\n\nKindly,\nWorki"
        j.save()
    return redirect("home")







from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4


def generate_cv(request,pk):
    # Create a new PDF file and a canvas to draw on
    response = HttpResponse(content_type='application/pdf')
    user = CustomUser.objects.get(id=pk)
    userEdu = UserEducation.objects.filter(user_id=user)
    userExperience = UserExperiece.objects.filter(user_id=user)
    userLanguage = UserLanguages.objects.filter(user_id=user)
    filename = f"{user.first_name}_{user.last_name}.pdf"
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    PAGE_WIDTH, PAGE_HEIGHT = A4
    pdf_canvas = canvas.Canvas(response, pagesize=(PAGE_WIDTH, PAGE_HEIGHT))
    y = 800
    # Add text to the PDF
    pdf_canvas.setFont('Helvetica-Bold', 16)
    pdf_canvas.drawCentredString(300, y, f'{user.first_name} {user.last_name}')
    y -= 20
    pdf_canvas.setFont('Helvetica', 12)
    pdf_canvas.drawCentredString(300, y, f'{user.email}')
    y -= 20
    pdf_canvas.drawCentredString(300, y, f'{user.phone_number}')
    y -= 30
    pdf_canvas.setFont('Helvetica-Bold', 14)
    pdf_canvas.drawString(20, y, 'Education')
    pdf_canvas.setFont('Helvetica', 12)
    y -= 10
    for i in userEdu:
        # Add the education information with the start and end years on the same line
        education_line1 = f'{i.degree} of {i.field_of_study} - {i.university}'
        if i.end_year is not None:
            education_line2 = f'{format(i.start_year,"%d/%m/%Y")} - {format(i.end_year,"%d/%m/%Y")}'
        else:
            education_line2 = f'{format(i.start_year,"%d/%m/%Y")} - Present'

        education_width1 = pdf_canvas.stringWidth(education_line1, 'Helvetica', 12)
        education_width2 = pdf_canvas.stringWidth(education_line2, 'Helvetica', 12)
        education_start_x = 550 - education_width2
        y -= 20
        pdf_canvas.drawString(80, y, education_line1)
        pdf_canvas.drawString(education_start_x, y, education_line2)

    y -= 40

    pdf_canvas.setFont('Helvetica-Bold', 14)
    pdf_canvas.drawString(20, y, 'Experience')
    pdf_canvas.setFont('Helvetica', 12)
    y -= 20


    for i in userExperience:
        # Add the education information with the start and end years on the same line
        education_line1 = f'{i.title} - {i.company}'
        if i.end_date is not None:
            education_line2 = f'{format(i.start_date, "%d/%m/%Y")} - {format(i.end_date, "%d/%m/%Y")}'
        else:
            education_line2 = f'{format(i.start_date, "%d/%m/%Y")} - Present'



        # Add a section for languages at the bottom of the CV
    y -= 20
    pdf_canvas.setFont('Helvetica-Bold', 14)
    pdf_canvas.drawString(20, y, 'Languages')
    pdf_canvas.setFont('Helvetica', 12)
    y -= 20

    for i in userLanguage:
        pdf_canvas.drawString(80, y, f'{i.language}')
        pdf_canvas.drawRightString(550, y, f'{i.level}')
        y -= 20

    # Close the PDF
    pdf_canvas.showPage()
    pdf_canvas.save()
    return response








