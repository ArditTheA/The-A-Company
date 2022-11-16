from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views import View

from accounts.models import *


# Create your views here.
@login_required
def GetJobApplicant(request):
    Applicant = Application.objects.filter(status="Pennding").order_by("-id")
    StudentStat = ActiveStudent.objects.all()
    co = Country.objects.all()
    ci = City.objects.all()
    appCount = Applicant.count()

    allApp=False
    return render(request, "Administrator/Applicants/index.html",dict(app=Applicant,co=co,ci=ci,appNo=appCount,Ustat=StudentStat,allApp=allApp))

@login_required()
def GetUserProfile(request,pk):
    us = CustomUser.objects.get(id=pk)
    usUni=""
    if ActiveStudent.objects.filter(user_id=pk).exists():
        usUni = ActiveStudent.objects.get(user_id=pk)
    usEdu = UserEducation.objects.filter(user_id=pk)
    usExp = UserExperiece.objects.filter(user_id=pk)
    usLang = UserLanguages.objects.filter(user_id=pk)

    return render(request,"Administrator/Applicants/profile.html",dict(us=us,usUni=usUni,usEdu=usEdu,usExp=usExp,usLang=usLang))
@login_required()
def MarkApplicantAsRead(request):
    Applicant = Application.objects.filter(status="Pennding").order_by("-id")
    for i in Applicant:
        App=Application.objects.get(id=i.id)
        App.status="Read"
        App.save()

    return redirect(GetJobApplicant)
@login_required()
def GetAllApplication(request):
    Applicant = Application.objects.all().order_by("-id")
    StudentStat = ActiveStudent.objects.all()
    appCount = Applicant.count()
    allApp = True
    return render(request, "Administrator/Applicants/index.html",dict(app=Applicant,appNo=appCount,Ustat=StudentStat,allApp=allApp))
