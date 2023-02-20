import re
from html.entities import name2codepoint

from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponse
from django.shortcuts import render, redirect


from ScreeningQuestion.models import *
from Applicant.models import *

from django.template.loader import get_template, render_to_string
import openai

openai.api_key = "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"


def changeEmailForJobs(request):
    jobb = JobSettings.objects.all()
    for i in jobb:
        j= JobSettings.objects.get(id=i.id)
        j.email= "Hello,\nWorki has carefully reviewed your application." \
                 "\nYou don’t meet the following requirement for the Work and Travel program:" \
                 "\n\tYou are currently not an active university student\nIf you feel this is a mistake," \
                 " schedule an online meeting with us\n" \
                 "https://calendar.google.com/calendar/u/0/selfsched?sstoken=UU1pV2thNF9iS3RwfGRlZmF1bHR8MTE3MmEwNGMxN2VkYTAwYzkwNTExMzQwYmJjYTk1M2M" \
                 "\nKindly, Worki"
        j.save()
    return redirect("home")



def generate_summary(text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="generate cv general summary for" + text+"student",
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )

    message = response["choices"][0]["text"]
    return message
def generate_top4skills(text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="generate 5 general skills as student of " + text ,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )

    message = response["choices"][0]["text"]
    return message
def generate_top4interest(text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="generate 5 general interest as student of " + text,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )

    message = response["choices"][0]["text"]
    return message
def generate_responsibility(text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="generate 5 general responsibility as " + text,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )

    message = response["choices"][0]["text"]
    return message
@user_passes_test(lambda u: u.is_superuser)
def MakeAllJobs(request):
    job = Jobs.objects.all()
    for i in job:
        jo = Jobs.objects.get(id=i.id)
        jo.user_id = request.user
        jo.save()
    return redirect("postedJob")

@user_passes_test(lambda u: u.is_superuser)
def addPhase(request):
    job = Jobs.objects.all()
    for i in job:
        jp = Phase()
        jp.name="Aboard"
        jp.user_id=request.user
        jp.job_id=i
        jp.save()
    return redirect("postedJob")

@user_passes_test(lambda u: u.is_superuser)
def addSq(request):
    job = Jobs.objects.all()
    for i in  job:
        jq= JobQuestion()
        jq.job_id=i
        jq.promp ="Are you an active university student?"
        jq.question_type="Yes/No"
        jq.ideal_answer="Yes"
        jq.qualify=True
        jq.save()
        js = JobSettings()
        js.job_id=i
        js.email = "Hello,\nWorki has carefully reviewed your application.\nYou don’t meet the following requirement for the Work and Travel program:\n\tYou are currently not an active university student\nIf you feel this is a mistake, schedule an online meeting with us here.\nKindly, Worki"
        js.jobSettings="F"
        js.save()
    return redirect("postedJob")

def CreateCV(request,pk):
    user = CustomUser.objects.get(id=pk)
    userEdu = UserEducation.objects.filter(user_id = user)
    userExperience = UserExperiece.objects.filter(user_id=user)
    userLanguage = UserLanguages.objects.filter(user_id=user)
    CurrentUniField=""
    if UserEducation.objects.filter(user_id=pk).exists():
        getCurrentUni = UserEducation.objects.get(user_id=pk)
        # CurrentUniField = generate_summary(getCurrentUni.field_of_study)



    interest=[]
    res=""
    # string = generate_top4skills(getCurrentUni.field_of_study)
    # string = string.strip()
    # skills = [item.split(".")[-1].strip() for item in string.split("\n")]
    #
    #
    # inter= generate_top4interest(getCurrentUni.field_of_study)
    # inter = inter.strip()
    # interest = [i.split(".")[-1].strip() for i in inter.split("\n")]
    # print("----------------")
    # print(skills)
    # print(interest)
    # print("----------------")
    # res=""
    for i in userExperience:
        res = generate_responsibility(i.title)
    res= res.strip()
    # print(res)
    # res = [item.split(".")[-1].strip() for item in res.split("\n")]
    return render(request,"Cv/index.html",dict(user=user,userEdu=userEdu,userExperience=userExperience,userLanguage=userLanguage,res=res))

from django.http import HttpResponse
from reportlab.lib.pagesizes import letter, landscape, A4
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Spacer, Paragraph, KeepTogether, ListFlowable
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.pdfgen.canvas import Canvas
from io import BytesIO
from django.template.loader import get_template
from xhtml2pdf import pisa
from reportlab.lib.enums import TA_LEFT
def generate_pdf(request,pk):
    # Set up the response
    response = HttpResponse(content_type='application/pdf')
    user = CustomUser.objects.get(id=pk)
    userEdu = UserEducation.objects.filter(user_id=user)
    userExperience = UserExperiece.objects.filter(user_id=user)
    userLanguage = UserLanguages.objects.filter(user_id=user)
    filename = f"{user.first_name}_{user.last_name}.pdf"
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    # Create the PDF object, using the response object as its "file."
    doc = SimpleDocTemplate(response, pagesize=A4,rightMargin=72,leftMargin=72,
                        topMargin=20,bottomMargin=20)

    # Create a list of items
    items = []

    # Create a style for the list
    styles = getSampleStyleSheet()
    list_style = styles["Bullet"]
    list_style.leftIndent = 5

    # Create a list flowable
    list_flowable = ListFlowable(
        [Paragraph(item, list_style) for item in items],
        bulletType="bullet",
        start="     ·",
        value=0,  # Set value to zero
    )

    # Create the story for the PDF
    styles = getSampleStyleSheet()
    story = []
    story.append(Paragraph(f'{user.first_name} {user.last_name}', styles['Heading1']))
    story.append(Spacer(1, 0.25 * inch))
    story.append(Paragraph('Personal Information', styles['Heading2']))
    story.append(Paragraph(f'Email:{user.email} ', styles['Normal']))
    story.append(Paragraph(f'Phone: {user.phone_number}', styles['Normal']))
    story.append(Paragraph('Education', styles['Heading2']))
    for i in userEdu:
        story.append(Paragraph(f'{i.degree} {i.field_of_study}  \t \t {i.start_year}', styles['Normal']))
    story.append(Paragraph('Experience', styles['Heading2']))

    for i in userExperience:

        story.append(Paragraph(f'Company: {i.company}.', styles['Normal']))
        story.append(Paragraph(f'Position: {i.title}', styles['Normal']))

        res = generate_responsibility(i.title)

        my_list = [item.split(".")[-1].strip() for item in res.split("\n")]
        clean_list = [item for item in my_list if item.strip()]

        story.append(Spacer(0.25, 0.25 * inch))
        if res is not None:
            story.append(Paragraph("\nKey Qualifications & Responsibilities\n",styles["Normal"]))
        for item in clean_list:
            if item is not None and not item.isspace():
                p = Paragraph("\u2022 "+item, styles['Normal'])

                story.append(p)
                story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph('Skills', styles['Heading2']))
    for i in userExperience:
        skills= generate_top4skills(i.title)

        style = ParagraphStyle(name='Normal', fontSize=10, leading=12)
        para = Paragraph(skills, style)

        story.append(para)

    # Add the story to the PDF and build it
    doc.build(story)

    return response









