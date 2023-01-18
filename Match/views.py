from datetime import date

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.views import View
from datetime import date
from accounts.models import *
from Applicant.models import *
import json
from accounts.views import *


def CoseJob(request,pk):
    us = request.user
    job = Jobs.objects.get(id=pk)

    if us == job.user_id:
        job.status="Close"
        job.save()
    return redirect("postedJob")
def OpenJob(request,pk):
    us = request.user
    job = Jobs.objects.get(id=pk)
    if us == job.user_id:
        job.status = "Open"
        job.save()
    return redirect("postedJob")
def moveToQualify(request,jpk,userid):
    usersid = userid
    useridList = usersid.split(",")
    for i in useridList:
        aps = Application.objects.filter(user_id=i).filter(job_id=jpk).values_list("id",flat=True).first()
        app = Application.objects.get(id=aps)
        app.ApplicantStat= "Qualified"
        app.save()

    return redirect("applicant",jpk)
def moveToNoQualify(request,jpk,userid):
    usersid = userid
    useridList = usersid.split(",")
    for i in useridList:
        aps = Application.objects.filter(user_id=i).filter(job_id=jpk).values_list("id",flat=True).first()
        app = Application.objects.get(id=aps)
        app.ApplicantStat= "Not qualified"
        app.save()

    return redirect("applicant",jpk)
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
@login_required()
def GetStats(request):
    allUser = CustomUser.objects.all().count()
    allJobs = Jobs.objects.all().count()
    allApp = Application.objects.all().count()
    moApp = Application.objects.filter(apply_date__month=datetime.now().month).filter(apply_date__year=datetime.now().year).count()
    dayApp = Application.objects.filter(apply_date__day=datetime.now().day).filter(apply_date__year=datetime.now().year).filter(apply_date__month=datetime.now().month).count()
    weekApp = Application.objects.filter(apply_date__week=datetime.now().isocalendar()[1]).filter(apply_date__year=datetime.now().year).count()
    return render(request,"Administrator/Applicants/stat.html",dict(allUser=allUser,allJobs=allJobs,allApp=allApp,moApp=moApp,dayApp=dayApp,weekApp=weekApp))
#  Matcch
class GetJobIdApplicant(View):
    def get(self,request,pk):
        CurrentUser = request.user
        usID = request.POST.get("user_id")


        jpk = pk
        JobOwner = Jobs.objects.get(id=jpk)
        phase = Phase.objects.filter(user_id=request.user).filter(job_id=jpk)
        subphase = subPhase.objects.all()
        if CurrentUser==JobOwner.user_id:
            if Application.objects.filter(job_id=jpk).exists():
                users = Application.objects.filter(job_id=jpk)

                uid =Application.objects.filter(job_id=jpk).values_list("user_id", flat=True).first()
                detailUser = CustomUser.objects.get(id=uid)
                ExpUser = UserExperiece.objects.filter(user_id=uid)
                EduUser = UserEducation.objects.filter(user_id=uid)
                LangUser = UserLanguages.objects.filter(user_id=uid)
                usLocation =""
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    userid = request.headers.get("userid")
                    newDic = {}

                    user = CustomUser.objects.get(id = userid)
                    newDic["fname"] = user.first_name
                    newDic["lname"] = user.last_name
                    newDic["email"]= user.email
                    newDic["phone"] = user.phone_number

                    Status = Application.objects.filter(job_id=jpk).filter(user_id=userid).values_list("ApplicantStat",flat=True).first()
                    newDic["Status"]=str(Status)
                    if user.city == None:
                        newDic["city"] = user.country
                    else:
                        newDic["city"] = user.city+", "+user.country
                    appdate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("apply_date",flat=True).first()
                    newDic["applyDate"]=format(appdate,"%d/%m/%Y")

                    ########### User Experience ##########
                    count =0
                    uExp = UserExperiece.objects.filter(user_id=userid)
                    uExpCount = UserExperiece.objects.filter(user_id=userid).count()
                    newDic["userExpCount"]=uExpCount
                    for i in uExp:
                        title = "title"+str(count)
                        newDic[title]=i.title
                        company = "company"+str(count)
                        newDic[company]=i.company
                        country = "country"+str(count)
                        newDic[country]=i.Country
                        city = "cityexp"+str(count)
                        newDic[city]=i.city_usExp
                        date = "date"+str(count)
                        dateQuery = ""
                        if i.end_date is None:
                            dateQuery=format(i.start_date,"%d/%m/%Y")+" - Present"
                        else:
                            dateQuery=format(i.start_date,"%d/%m/%Y")+" - "+format(i.end_date,"%d/%m/%Y")
                        newDic[date]=dateQuery
                        count+=1
                    

                    ############# User Education ########
                    userEdu = UserEducation.objects.filter(user_id=userid)
                    userEduCount = UserEducation.objects.filter(user_id=userid).count()
                    newDic["userEduCount"]=userEduCount
                    countEdu=0
                    for i in userEdu:
                        university = "university"+str(countEdu)
                        newDic[university]=i.university
                        field = "field"+str(countEdu)
                        newDic[field]=i.field_of_study
                        location = "uniloc"+str(countEdu)

                        if i.city_e is None:
                            newDic[location]=i.country_e
                        else:
                            newDic[location]=i.city_e+" - "+i.country_e

                        date = "unidate"+str(countEdu)
                        if i.end_year is None:
                            newDic[date]=format(i.start_year,"%d/%m/%Y")+" - Present"
                        else:
                            newDic[date]=format(i.start_year,"%d/%m/%Y")+" - "+format(i.end_year,"%d/%m/%Y")
                        countEdu+=1

                    # ########## User Languages ##########
                    #
                    userLang = UserLanguages.objects.filter(user_id=userid)
                    userLangCount = UserLanguages.objects.filter(user_id=userid).count()
                    newDic["countLang"]=userLangCount
                    countLang =0
                    for i in userLang:
                        lang = "language"+str(countLang)
                        newDic[lang]=str(i.language)
                        langlev = "languageLevel"+str(countLang)
                        newDic[langlev]=str(i.level)
                        countLang+=1

                    return HttpResponse(json.dumps(newDic),content_type='application/json; charset=utf8')

                app=True
                q="All"
                return render(request, "Match/Applicant/index.html", dict(users=users,q=q,app=app,phase=phase,subphase=subphase,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid))
            else:
                q = "All"
                app=False
                return render(request,"Match/Applicant/index.html",dict(q=q,app=app,jpk=jpk))
        else:
            pass
        return render(request,"Match/Applicant/index.html")
class GetJobIdApplicantQualified(View):
    def get(self,request,pk):
        CurrentUser = request.user
        usID = request.POST.get("user_id")
        jpk = pk
        JobOwner = Jobs.objects.get(id=jpk)
        phase = Phase.objects.filter(user_id=request.user).filter(job_id=jpk)
        subphase = subPhase.objects.all()
        if CurrentUser==JobOwner.user_id:
            if Application.objects.filter(job_id=jpk).filter(ApplicantStat="Qualified").exists():
                users = Application.objects.filter(job_id=jpk).filter(ApplicantStat="Qualified")

                uid =Application.objects.filter(job_id=jpk).filter(ApplicantStat="Qualified").values_list("user_id", flat=True).first()
                
                detailUser = CustomUser.objects.get(id=uid)
                ExpUser = UserExperiece.objects.filter(user_id=uid)
                EduUser = UserEducation.objects.filter(user_id=uid)
                LangUser = UserLanguages.objects.filter(user_id=uid)
                usLocation =""
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    userid = request.headers.get("userid")
                    newDic = {}

                    user = CustomUser.objects.get(id = userid)
                    newDic["fname"] = user.first_name
                    newDic["lname"] = user.last_name
                    newDic["email"]= user.email
                    newDic["phone"] = user.phone_number

                    Status = Application.objects.filter(job_id=jpk).filter(user_id=userid).values_list("ApplicantStat", flat=True).first()
                    newDic["Status"] = str(Status)

                    if user.city == None:
                        newDic["city"] = user.country
                    else:
                        newDic["city"] = user.city+", "+user.country
                    appdate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("apply_date",flat=True).first()
                    newDic["applyDate"]=format(appdate,"%d/%m/%Y")

                    ########### User Experience ##########
                    count =0
                    uExp = UserExperiece.objects.filter(user_id=userid)
                    uExpCount = UserExperiece.objects.filter(user_id=userid).count()
                    newDic["userExpCount"]=uExpCount
                    
                    for i in uExp:
                        title = "title"+str(count)
                        newDic[title]=i.title
                        company = "company"+str(count)
                        newDic[company]=i.company
                        country = "country"+str(count)
                        newDic[country]=i.Country
                        city = "cityexp"+str(count)
                        newDic[city]=i.city_usExp
                        date = "date"+str(count)
                        dateQuery = ""
                        if i.end_date is None:
                            dateQuery=format(i.start_date,"%d/%m/%Y")+" - Present"
                        else:
                            dateQuery=format(i.start_date,"%d/%m/%Y")+" - "+format(i.end_date,"%d/%m/%Y")
                        newDic[date]=dateQuery
                        count+=1
                   

                    ############# User Education ########
                    userEdu = UserEducation.objects.filter(user_id=userid)
                    userEduCount = UserEducation.objects.filter(user_id=userid).count()
                    newDic["userEduCount"]=userEduCount
                    countEdu=0
                    for i in userEdu:
                        university = "university"+str(countEdu)
                        newDic[university]=i.university
                        field = "field"+str(countEdu)
                        newDic[field]=i.field_of_study
                        location = "uniloc"+str(countEdu)

                        if i.city_e is None:
                            newDic[location]=i.country_e
                        else:
                            newDic[location]=i.city_e+" - "+i.country_e

                        date = "unidate"+str(countEdu)
                        if i.end_year is None:
                            newDic[date]=format(i.start_year,"%d/%m/%Y")+" - Present"
                        else:
                            newDic[date]=format(i.start_year,"%d/%m/%Y")+" - "+format(i.end_year,"%d/%m/%Y")
                        countEdu+=1

                    # ########## User Languages ##########
                    #
                    userLang = UserLanguages.objects.filter(user_id=userid)
                    
                    userLangCount = UserLanguages.objects.filter(user_id=userid).count()
                    newDic["countLang"]=userLangCount
                    countLang =0
                    for i in userLang:
                        
                        lang = "language"+str(countLang)
                        newDic[lang]=str(i.language)
                        langlev = "languageLevel"+str(countLang)
                        newDic[langlev]=str(i.level)
                        countLang+=1

                    return HttpResponse(json.dumps(newDic),content_type='application/json; charset=utf8')

                app=True
                q="Q"
                return render(request, "Match/Applicant/index.html", dict(users=users,q=q,app=app,phase=phase,subphase=subphase,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid))

            else:
                q = "Q"
                app = False
                return render(request,"Match/Applicant/index.html",dict(q=q,app=app,jpk=jpk))
        else:
            pass
        return render(request,"Match/Applicant/index.html")
class GetJobIdApplicantNQualified(View):
    def get(self,request,pk):
        CurrentUser = request.user
        usID = request.POST.get("user_id")
        jpk = pk
        JobOwner = Jobs.objects.get(id=jpk)
        phase = Phase.objects.filter(user_id=request.user).filter(job_id=jpk)
        subphase = subPhase.objects.all()
        if CurrentUser==JobOwner.user_id:
            if Application.objects.filter(job_id=jpk).filter(ApplicantStat="Not qualified").exists():
                users = Application.objects.filter(job_id=jpk).filter(ApplicantStat="Not qualified")

                uid =Application.objects.filter(job_id=jpk).filter(ApplicantStat="Not qualified").values_list("user_id", flat=True).first()
                
                detailUser = CustomUser.objects.get(id=uid)
                ExpUser = UserExperiece.objects.filter(user_id=uid)
                EduUser = UserEducation.objects.filter(user_id=uid)
                LangUser = UserLanguages.objects.filter(user_id=uid)
                usLocation =""
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    userid = request.headers.get("userid")
                    newDic = {}

                    user = CustomUser.objects.get(id = userid)
                    newDic["fname"] = user.first_name
                    newDic["lname"] = user.last_name
                    newDic["email"]= user.email
                    newDic["phone"] = user.phone_number

                    Status = Application.objects.filter(job_id=jpk).filter(user_id=userid).values_list("ApplicantStat", flat=True).first()
                    newDic["Status"] = str(Status)

                    if user.city == None:
                        newDic["city"] = user.country
                    else:
                        newDic["city"] = user.city+", "+user.country
                    appdate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("apply_date",flat=True).first()
                    newDic["applyDate"]=format(appdate,"%d/%m/%Y")

                    ########### User Experience ##########
                    count =0
                    uExp = UserExperiece.objects.filter(user_id=userid)
                    uExpCount = UserExperiece.objects.filter(user_id=userid).count()
                    newDic["userExpCount"]=uExpCount
                    
                    for i in uExp:
                        title = "title"+str(count)
                        newDic[title]=i.title
                        company = "company"+str(count)
                        newDic[company]=i.company
                        country = "country"+str(count)
                        newDic[country]=i.Country
                        city = "cityexp"+str(count)
                        newDic[city]=i.city_usExp
                        date = "date"+str(count)
                        dateQuery = ""
                        if i.end_date is None:
                            dateQuery=format(i.start_date,"%d/%m/%Y")+" - Present"
                        else:
                            dateQuery=format(i.start_date,"%d/%m/%Y")+" - "+format(i.end_date,"%d/%m/%Y")
                        newDic[date]=dateQuery
                        count+=1
                    

                    ############# User Education ########
                    userEdu = UserEducation.objects.filter(user_id=userid)
                    userEduCount = UserEducation.objects.filter(user_id=userid).count()
                    newDic["userEduCount"]=userEduCount
                    countEdu=0
                    for i in userEdu:
                        university = "university"+str(countEdu)
                        newDic[university]=i.university
                        field = "field"+str(countEdu)
                        newDic[field]=i.field_of_study
                        location = "uniloc"+str(countEdu)

                        if i.city_e is None:
                            newDic[location]=i.country_e
                        else:
                            newDic[location]=i.city_e+" - "+i.country_e

                        date = "unidate"+str(countEdu)
                        if i.end_year is None:
                            newDic[date]=format(i.start_year,"%d/%m/%Y")+" - Present"
                        else:
                            newDic[date]=format(i.start_year,"%d/%m/%Y")+" - "+format(i.end_year,"%d/%m/%Y")
                        countEdu+=1

                    # ########## User Languages ##########
                    #
                    userLang = UserLanguages.objects.filter(user_id=userid)
                 
                    userLangCount = UserLanguages.objects.filter(user_id=userid).count()
                    newDic["countLang"]=userLangCount
                    countLang =0
                    for i in userLang:
                       
                        lang = "language"+str(countLang)
                        newDic[lang]=str(i.language)
                        langlev = "languageLevel"+str(countLang)
                        newDic[langlev]=str(i.level)
                        countLang+=1

                    return HttpResponse(json.dumps(newDic),content_type='application/json; charset=utf8')

                app=True
                q="notQ"

                return render(request, "Match/Applicant/index.html", dict(users=users,q=q,app=app,phase=phase,subphase=subphase,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid))
            else:
                q="notQ"
                app=False
                return render(request,"Match/Applicant/index.html",dict(q=q,app=app,jpk=jpk))
        else:
            pass
        return render(request,"Match/Applicant/index.html")



def getApplicantPhase(request,phaseid):
    getSub = subPhase.objects.filter(name__contains=phaseid)
    users = ApplicantSubPhase.objects.filter(subPhase=getSub[0])

    if len(users)>0:
        app=True
    else:
        app=False
    jpk=0
    return render(request,"Match/Applicant/indexP.html",dict(users=users,app=app,jpk=jpk))

class getAppPhase(View):
     def get(self,request,pk,phaseid):
        getSub = subPhase.objects.get(name__contains=phaseid)
        
       
        CurrentUser = request.user
        usID = request.POST.get("user_id")


        jpk = pk
        JobOwner = Jobs.objects.get(id=jpk)
        phase = Phase.objects.filter(user_id=request.user).filter(job_id=jpk)
        subphase = subPhase.objects.all()
        
        if CurrentUser==JobOwner.user_id:
            if Application.objects.filter(job_id=jpk).exists():
                users = ApplicantSubPhase.objects.filter(subPhase=getSub)
                uid =users.values_list("user_id", flat=True).first()
                
                detailUser = CustomUser.objects.get(id=uid)
                ExpUser = UserExperiece.objects.filter(user_id=uid)
                EduUser = UserEducation.objects.filter(user_id=uid)
                LangUser = UserLanguages.objects.filter(user_id=uid)
                usLocation =""
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    userid = request.headers.get("userid")
                    newDic = {}

                    user = CustomUser.objects.get(id = userid)
                    newDic["fname"] = user.first_name
                    newDic["lname"] = user.last_name
                    newDic["email"]= user.email
                    newDic["phone"] = user.phone_number

                    Status = Application.objects.filter(job_id=jpk).filter(user_id=userid).values_list("ApplicantStat",flat=True).first()
                    newDic["Status"]=str(Status)
                    if user.city == None:
                        newDic["city"] = user.country
                    else:
                        newDic["city"] = user.city+", "+user.country
                    appdate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("apply_date",flat=True).first()
                    
                    newDic["applyDate"]=format(appdate,"%d/%m/%Y")

                    ########### User Experience ##########
                    count =0
                    uExp = UserExperiece.objects.filter(user_id=userid)
                    uExpCount = UserExperiece.objects.filter(user_id=userid).count()
                    newDic["userExpCount"]=uExpCount
                    
                    for i in uExp:
                        title = "title"+str(count)
                        newDic[title]=i.title
                        company = "company"+str(count)
                        newDic[company]=i.company
                        country = "country"+str(count)
                        newDic[country]=i.Country
                        city = "cityexp"+str(count)
                        newDic[city]=i.city_usExp
                        date = "date"+str(count)
                        dateQuery = ""
                        if i.end_date is None:
                            dateQuery=format(i.start_date,"%d/%m/%Y")+" - Present"
                        else:
                            dateQuery=format(i.start_date,"%d/%m/%Y")+" - "+format(i.end_date,"%d/%m/%Y")
                        newDic[date]=dateQuery
                        count+=1
                    

                    ############# User Education ########
                    userEdu = UserEducation.objects.filter(user_id=userid)
                    userEduCount = UserEducation.objects.filter(user_id=userid).count()
                    newDic["userEduCount"]=userEduCount
                    countEdu=0
                    for i in userEdu:
                        university = "university"+str(countEdu)
                        newDic[university]=i.university
                        field = "field"+str(countEdu)
                        newDic[field]=i.field_of_study
                        location = "uniloc"+str(countEdu)

                        if i.city_e is None:
                            newDic[location]=i.country_e
                        else:
                            newDic[location]=i.city_e+" - "+i.country_e

                        date = "unidate"+str(countEdu)
                        if i.end_year is None:
                            newDic[date]=format(i.start_year,"%d/%m/%Y")+" - Present"
                        else:
                            newDic[date]=format(i.start_year,"%d/%m/%Y")+" - "+format(i.end_year,"%d/%m/%Y")
                        countEdu+=1

                    # ########## User Languages ##########
                    #
                    userLang = UserLanguages.objects.filter(user_id=userid)
                    
                    userLangCount = UserLanguages.objects.filter(user_id=userid).count()
                    newDic["countLang"]=userLangCount
                    countLang =0
                    for i in userLang:
                        lang = "language"+str(countLang)
                        newDic[lang]=str(i.language)
                        langlev = "languageLevel"+str(countLang)
                        newDic[langlev]=str(i.level)
                        countLang+=1

                    return HttpResponse(json.dumps(newDic),content_type='application/json; charset=utf8')

                app=True
                q="All"
                return render(request, "Match/Applicant/index.html", dict(users=users,q=q,app=app,phase=phase,subphase=subphase,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid,getSub=getSub))
            else:
                q = "All"
                app=False
                return render(request,"Match/Applicant/index.html",dict(q=q,app=app,jpk=jpk))
        else:
            pass
        return render(request,"Match/Applicant/index.html")

# def moveToPhase(request,jpk,subp,user):
#     job_id = Jobs.objects.get(id=jpk)
#     subphase = subPhase.objects.get(name=subp)
#     app_list = []
#     for i in app_list:
#         aps = ApplicantSubPhase()
#         aps.subPhase=subPhase
#         aps.job_id=job_id
#         aps.applicant=CustomUser.objects.get(id=i)
#         aps.save()
#     retrun redirect(GetJobApplicant)
    


