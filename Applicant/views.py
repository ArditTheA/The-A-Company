from datetime import timedelta

from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import redirect

from Applicant.models import *
from ScreeningQuestion.models import *



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








