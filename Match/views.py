
from datetime import date

from allauth import socialaccount
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.views import View
from django.core import serializers
from datetime import date, timedelta
from accounts.models import *
from Applicant.models import *
import json
from accounts.views import *
from allauth import *
from ScreeningQuestion.models import ApplicantAnswer
from Applicant.views import OnBoardPhase

class UsersReq(View):
    def get(self,request):
        newDic = {}
        jpk = request.headers.get("jpk")
        userid = request.headers.get("userid")
        user = CustomUser.objects.get(id=userid)
        newDic["fname"] = user.first_name
        newDic["lname"] = user.last_name
        newDic["email"] = user.email
        newDic["phone"] = user.phone_number
        Status = Application.objects.filter(job_id=jpk).filter(user_id=userid).values_list("ApplicantStat",flat=True).first()
        newDic["Status"] = str(Status)

        user_document = documents_users.objects.filter(
                user_id=userid,
                status="A"
            ).exclude(
                id_document__name__icontains="Photo"
            ).exclude(
                id_document__name__icontains="Service contract"
            ).exclude(
                id_document__name__icontains="Resume"
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).count()

        job_offer_count = documents_users.objects.filter(
                user_id=userid,
                status="A",
                id_document__name__icontains="Job Offer"
            ).count()
        work_permit_count = documents_users.objects.filter(
                user_id=userid,
                status="A",
                id_document__name__icontains="Work Permit"
            ).count()

        two_last_documents = job_offer_count + work_permit_count

        exists = Application.objects.filter(job_id=jpk, user_id=userid, ApplicantStat="Qualified").exists()
        existsN = Application.objects.filter(job_id=jpk, user_id=userid, ApplicantStat="Not qualified").exists()
        newDic["phaseOneCompleted"] = (user_document == 4)
        newDic["phaseTwoCompleted"] = (two_last_documents == 2)
        newDic["isQualified"] = exists
        newDic["isNotQualified"] = existsN
        meetingTime = Application.objects.filter(job_id=jpk).filter(
                        user_id=request.user).values_list("meetWithUs", flat=True).first()
        meetingLink = Application.objects.filter(job_id=jpk).filter(
                        user_id=request.user).values_list("meetWithUsLink", flat=True).first()
        newDic["meetingTime"] = meetingTime
        newDic["meetingLink"] = meetingLink
        # newDic["meetWithUsDiv"] = meetWithUsDiv
        # newDic["calendlyDiv"] = calendlyDiv
        if user.city == None:
            newDic["city"] = user.country
        else:
            newDic["city"] = user.city + ", " + user.country
        appdate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("apply_date",
                                                                                                        flat=True).first()
        newDic["applyDate"] =format(appdate, "%d/%m/%Y")
        newDic["applyDateTime"]= format(appdate,"%H:%M")
        ApplicantStatDate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("ApplicantStatDate",flat=True).first()
        if ApplicantStatDate:
            newDic["ApplicantStatDate"] =format(ApplicantStatDate, "%d/%m/%Y")
            newDic["ApplicantStatDateTime"]= format(ApplicantStatDate,"%H:%M")
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

                    # ########## User Languages ##########
                    #
        userLang = UserLanguages.objects.filter(user_id=userid)
        userLangCount = UserLanguages.objects.filter(user_id=userid).count()
        newDic["countLang"] = userLangCount
        countLang = 0
        for i in userLang:
            lang = "language" + str(countLang)
            newDic[lang] = str(i.language)
            langlev = "languageLevel" + str(countLang)
            newDic[langlev] = str(i.level)
            countLang += 1
        passaportExists = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Passport").exists()
        studentStatusExists = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Student Status").exists()
        certificateOfEnrolmentExists = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Certificate of Enrolment").exists()
        studentIdExists = documents_users.objects.filter(user_id=userid, id_document__name__icontains="Student ID").exists()
        photoExists = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Photo").exists()
        serviceContractExists = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Service contract").exists()
        jobOfferExists = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Job Offer").exists()
        workPermitExists = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Work Permit").exists()
        DS2019Exists = documents_users.objects.filter(user_id=userid,id_document__name__icontains="DS 2019").exists()
        DS160ConfirmationExists = documents_users.objects.filter(user_id = userid, id_document__name__icontains="DS-160 Confirmation").exists()
        SevisFeePaymentReceiptExists = documents_users.objects.filter(user_id = userid, id_document__name__icontains="Sevis Fee Payment Receipt").exists()

        if(passaportExists):
            passaportStatus = documents_users.objects.filter(user_id=userid, id_document__name__icontains="Passport").values_list('status', flat=True).first()
            newDic["passaportStatus"] = passaportStatus
        if(studentStatusExists):
            studentStatus = documents_users.objects.filter(user_id=userid, id_document__name__icontains="Student Status").values_list('status', flat=True).first()
            newDic["studentStatus"] = studentStatus
        if(certificateOfEnrolmentExists):
            certificateStatus = documents_users.objects.filter(user_id=userid, id_document__name__icontains="Certificate of Enrolment").values_list('status', flat=True).first()
            newDic["certificateStatus"] = certificateStatus
        if(studentIdExists):
            studentIdStatus = documents_users.objects.filter(user_id=userid, id_document__name__icontains="Student ID").values_list('status', flat=True).first()
            newDic["studentIdStatus"] = studentIdStatus
        if(photoExists):
            photoStatus = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Photo").values_list("status",flat=True).first()
            newDic["photoStatus"]=photoStatus
        if (serviceContractExists):
            serviceContractStatus = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Service contract").values_list("status",flat=True).first()
            newDic["serviceContractStatus"]=serviceContractStatus
        if(jobOfferExists):
            jobOfferStatus = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Job Offer").values_list("status",flat=True).first()
            newDic["jobOfferStatus"]=jobOfferStatus
        if(workPermitExists):
            workPermitStatus = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Work Permit").values_list("status",flat=True).first()
            newDic["workPermitStatus"]=workPermitStatus
        if(DS2019Exists):
            DS2019Status = documents_users.objects.filter(user_id=userid,id_document__name__icontains="DS 2019").values_list("status",flat=True).first()
            newDic["DS2019Status"]=DS2019Status
            print("PassportExists")
        if(DS160ConfirmationExists):
            DS160ConfirmationStatus = documents_users.objects.filter(user_id=userid,id_document__name__icontains="DS-160 Confirmation").values_list("status",flat=True).first()
            newDic["DS160ConfirmationStatus"] = DS160ConfirmationStatus
        if (SevisFeePaymentReceiptExists):
            SevisFeePaymentReceiptStatus = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Sevis Fee Payment Receipt").values_list("status",flat=True).first()
            newDic["SevisFeePaymentReceiptStatus"] = SevisFeePaymentReceiptStatus
        resume_exists = documents_users.objects.filter(user_id=userid, id_document__name__icontains="Resume").exists()
                    # If no resume document exists, create a new one
                    
        if Application.objects.filter(job_id=jpk, user_id=userid, ApplicantStat="Qualified").exists():
            if not resume_exists:
                resume_document = documents_list.objects.get(name="Resume")

                            # Create a new documents_users instance with the 'Resume' document
                doc_with_resume = documents_users()
                doc_with_resume.user = CustomUser.objects.get(id=userid)
                doc_with_resume.id_document = resume_document  # Associate with the 'Resume' document
                doc_with_resume.save()
            if user.changes_made:
                doc = documents_users.objects.get(user_id=userid,id_document__name__icontains="Resume")
                doc.status = "P"
                doc.save()
                us=CustomUser.objects.get(id=userid)
                us.changes_made = False
                us.save()
                            
                            
            
        else:
            pass
    
        ResumeStatus = documents_users.objects.filter(user_id=userid,id_document__name__icontains="Resume").values_list("status",flat=True).first()
        newDic["ResumeStatus"]=ResumeStatus
        newDic["passaportExists"] = passaportExists
        newDic["studentStatusExists"] = studentStatusExists
        newDic["certificateOfEnrolmentExists"] = certificateOfEnrolmentExists
        newDic["studentIdExists"] = studentIdExists
        newDic["photoExists"] = photoExists
        newDic["serviceContractExists"] = serviceContractExists
        newDic["jobOfferExists"] = jobOfferExists
        newDic["workPermitExists"] = workPermitExists
        newDic["DS2019Exists"] = DS2019Exists
        newDic["DS160ConfirmationExists"] = DS160ConfirmationExists
        newDic["SevisFeePaymentReceiptExists"] = SevisFeePaymentReceiptExists
        print(jpk, userid)
        usersWithAppointmentsList = list(UserJobAppointments.objects.filter(job_id=jpk, user_id=userid).values())
        usersWithAppointments = usersWithAppointmentsList[0] if len(usersWithAppointmentsList) > 0 else {}
        newDic["usersWithAppointments"] = usersWithAppointments
        
        usersJobInterviewDetailsList = list(UserJobInterview.objects.filter(job_id=jpk, user_id=userid).values())
        usersJobInterviewDetails = usersJobInterviewDetailsList[0] if len(usersJobInterviewDetailsList) > 0 else {}
        newDic["usersJobInterviewDetails"] = usersJobInterviewDetails

        UsersJobsPaymentsDetailsList = list(UserJobPayment.objects.filter(job_id=jpk, user_id=userid).values())
        usersJobsPaymentsDetails = UsersJobsPaymentsDetailsList[0] if len(UsersJobsPaymentsDetailsList) > 0 else {}
        newDic["usersJobsPaymentsDetails"] = usersJobsPaymentsDetails
        return HttpResponse(json.dumps(newDic), content_type='application/json; charset=utf8')


def getApplicant(request,pk):
    jpk=pk
    CurrentUser = request.user
    JobOwner = Jobs.objects.get(id=jpk)
    NoApplicant=Application.objects.filter(job_id=pk).count()
    NoApplicantQualified = Application.objects.filter(job_id=pk,ApplicantStat="Qualified").count()
    NoApplicantNQualified = Application.objects.filter(job_id=pk,ApplicantStat="Not qualified").count()
    applications = Application.objects.filter(job_id=pk).exclude(ApplicantStat="Not qualified")
    user_ids = applications.values_list('user_id', flat=True).distinct()
    userWorkPermit = 0
    ready_users_count = 0
    usersOnDocForWorkPermit = 0
    display_statuses = {}
    print(user_ids)

    if CurrentUser==JobOwner.user_id or request.user.is_staff:
        users = Application.objects.filter(job_id=jpk)
        user_document_list = {}
        for user_id in user_ids:
            user_documents_count = documents_users.objects.filter(
                    id_document__in=documents_list.objects.all(),
                    user_id=user_id
                ).count()
            user_document = documents_users.objects.filter(
                user_id=user_id,
                status="A"
            ).exclude(
                id_document__name__icontains="Photo"
            ).exclude(
                id_document__name__icontains="Service contract"
            ).exclude(
                id_document__name__icontains="Resume"
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).count()
            user_documents = documents_users.objects.filter(
                user_id=user_id,
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).order_by('id_document_id')
            documents = serializers.serialize('json', user_documents)
            job_offer_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).count()
            work_permit_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Work Permit"
            ).count()
            job_offer_and_work_permit_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).filter(
                id_document__name__icontains="Work Permit"
            )

            two_last_documents = job_offer_count + work_permit_count
            second_documents = serializers.serialize('json', job_offer_and_work_permit_count)
            display_completed_phase = "none"
            display_completed_second_phase = "none"
            work_permit_is_here = "none"
            if user_document == 4:
                display_completed_phase = "block"
                work_permit_is_here = "auto"
                userWorkPermit += 1

            else:
                display_completed_second_phase = "none"
                usersOnDocForWorkPermit += 1
            
            if two_last_documents == 2:
                if user_document == 4:
                    display_completed_second_phase = "block"
                else:
                    display_completed_second_phase = "none"


        q = "All"
        app = False

        return render(request,"Applicant-Doc/index.html",dict(users=users,display_statuses=display_statuses,q=q,app=app,jpk=jpk,NoApplicant=NoApplicant,ready_users_count=ready_users_count,usersOnDocForWorkPermit=usersOnDocForWorkPermit,userWorkPermit=userWorkPermit,NoApplicantQualified=NoApplicantQualified,display_completed_phase=display_completed_phase,NoApplicantNQualified=NoApplicantNQualified, display_completed_second_phase=display_completed_second_phase,work_permit_is_here=work_permit_is_here, documents=documents, second_documents=second_documents, user_document_list=user_document_list))
    
    return render(request,"Applicant-Doc/index.html",dict(NoApplicant=NoApplicant,ready_users_count=ready_users_count,usersOnDocForWorkPermit=usersOnDocForWorkPermit,userWorkPermit=userWorkPermit,NoApplicantQualified=NoApplicantQualified,NoApplicantNQualified=NoApplicantNQualified,))


def getApplicantQualified(request,pk):
    jpk=pk
    CurrentUser = request.user
    JobOwner = Jobs.objects.get(id=jpk)
    NoApplicant=Application.objects.filter(job_id=pk).count()
    NoApplicantQualified = Application.objects.filter(job_id=pk,ApplicantStat="Qualified").count()
    NoApplicantNQualified = Application.objects.filter(job_id=pk,ApplicantStat="Not qualified").count()
    applications = Application.objects.filter(job_id=pk)
    user_ids = applications.values_list('user_id', flat=True).distinct()
    userWorkPermit = 0
    ready_users_count = 0
    usersOnDocForWorkPermit = 0
    if CurrentUser==JobOwner.user_id or request.user.is_staff:
        users = Application.objects.filter(job_id=jpk).filter(ApplicantStat="Qualified")
        for user_id in user_ids:
            user_documents_count = documents_users.objects.filter(
                    id_document__in=documents_list.objects.all(),
                    user_id=user_id
                ).count()

            user_document = documents_users.objects.filter(
                user_id=user_id,
                status="A"
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).count()
            user_documents = documents_users.objects.filter(
                user_id=user_id,
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).order_by('id_document_id')
            documents = serializers.serialize('json', user_documents)
            job_offer_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).count()
            work_permit_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Work Permit"
            ).count()
            job_offer_and_work_permit_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).filter(
                id_document__name__icontains="Work Permit"
            )

            two_last_documents = job_offer_count + work_permit_count
            second_documents = serializers.serialize('json', job_offer_and_work_permit_count)
            display_completed_phase = "none"
            display_completed_second_phase = "none"
            work_permit_is_here = "none"
            if user_documents_count > 1 and user_documents_count <= 9:
                if user_document == 4:
                    display_completed_phase = "block"
                    work_permit_is_here = "auto"
                    if (job_offer_count <= 0 or work_permit_count <= 0):
                        userWorkPermit += 1
                else:
                    display_completed_second_phase = "none"
                    usersOnDocForWorkPermit += 1
                    job_offer_count <= 0 and work_permit_count <= 0

                if two_last_documents == 2:
                    if user_document == 4:
                         display_completed_second_phase = "block"
                    else:
                        display_completed_second_phase = "none"
       
        q = "Q"
        app = False
        return render(request,"Applicant-Doc/index.html",dict(users=users,q=q,app=app,jpk=jpk,NoApplicant=NoApplicant,ready_users_count=ready_users_count,usersOnDocForWorkPermit=usersOnDocForWorkPermit,userWorkPermit=userWorkPermit,NoApplicantQualified=NoApplicantQualified,NoApplicantNQualified=NoApplicantNQualified,display_completed_phase=display_completed_phase,display_completed_second_phase=display_completed_second_phase,work_permit_is_here=work_permit_is_here, documents = documents, second_documents = second_documents))
    
    return render(request,"Applicant-Doc/index.html",dict(NoApplicant=NoApplicant,ready_users_count=ready_users_count,usersOnDocForWorkPermit=usersOnDocForWorkPermit,userWorkPermit=userWorkPermit,NoApplicantQualified=NoApplicantQualified,NoApplicantNQualified=NoApplicantNQualified,))

def getApplicantNoQualified(request,pk):
    jpk=pk
    CurrentUser = request.user
    JobOwner = Jobs.objects.get(id=jpk)
    NoApplicant=Application.objects.filter(job_id=pk).count()
    NoApplicantQualified = Application.objects.filter(job_id=pk,ApplicantStat="Qualified").count()
    NoApplicantNQualified = Application.objects.filter(job_id=pk,ApplicantStat="Not qualified").count()
    applications = Application.objects.filter(job_id=pk)
    user_ids = applications.values_list('user_id', flat=True).distinct()
    userWorkPermit = 0
    ready_users_count = 0
    usersOnDocForWorkPermit = 0
    if CurrentUser==JobOwner.user_id or request.user.is_staff:
        users = Application.objects.filter(job_id=jpk).filter(ApplicantStat="Not qualified")
        for user_id in user_ids:
            user_documents_count = documents_users.objects.filter(
                    id_document__in=documents_list.objects.all(),
                    user_id=user_id,status="A"
                ).count()
            if user_documents_count > 1 and user_documents_count < 7:
                usersOnDocForWorkPermit +=1
            elif user_documents_count >= 7 and user_documents_count <= 9:
                userWorkPermit += 1 
        q = "notQ"
        app = False
        return render(request,"Applicant-Doc/index.html",dict(users=users,q=q,app=app,jpk=jpk,NoApplicant=NoApplicant,ready_users_count=ready_users_count,usersOnDocForWorkPermit=usersOnDocForWorkPermit,userWorkPermit=userWorkPermit,NoApplicantQualified=NoApplicantQualified,NoApplicantNQualified=NoApplicantNQualified,))
    
    return render(request,"Applicant-Doc/index.html",dict(NoApplicant=NoApplicant,ready_users_count=ready_users_count,usersOnDocForWorkPermit=usersOnDocForWorkPermit,userWorkPermit=userWorkPermit,NoApplicantQualified=NoApplicantQualified,NoApplicantNQualified=NoApplicantNQualified,))
    




def redirectApplicant(request,pk):
    users = Application.objects.filter(job_id=pk).filter(ApplicantStat="Qualified")
    if users:
        return redirect("qualified-applicant",pk=pk)
    else:
        return redirect("applicant",pk=pk)













def CoseJob(request,pk):
    us = request.user
    job = Jobs.objects.get(id=pk)

    if us == job.user_id or request.user.is_staff:
        job.status="Close"
        job.save()
    return redirect("postedJob")
def OpenJob(request,pk):
    us = request.user
    job = Jobs.objects.get(id=pk)
    if us == job.user_id or request.user.is_staff:
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
    ApplicantANS = ApplicantAnswer.objects.all()
    allApp=False
    return render(request, "Administrator/Applicants/index.html",dict(app=Applicant,co=co,ci=ci,appNo=appCount,Ustat=StudentStat,allApp=allApp,ApplicantANS=ApplicantANS))

from datetime import datetime

from django.shortcuts import render
from django.utils.datetime_safe import datetime

def GetJobApplicant1(request):
    start_date = datetime(2023, 10, 1)
    
    applicants = Application.objects.filter(apply_date__gte=start_date).order_by("-id")
    student_stats = ActiveStudent.objects.all()
    countries = Country.objects.all()
    cities = City.objects.all()
    app_count = applicants.count()
    applicant_answers = ApplicantAnswer.objects.all()

    # Pre-process the data to associate answers with each applicant
    processed_applicants = []
    for applicant in applicants:
        answers = []
        for answer in applicant_answers:
            if applicant.id == answer.applicant_id.id and applicant.job_id == answer.question_id.job_id:
                answers.append(answer.user_answer)
        processed_applicants.append({'applicant': applicant, 'answers': answers})

    all_app = False
    
    return render(
        request,
        "Administrator/Applicants/index.html",
        {
            'applicants': processed_applicants,
            'countries': countries,
            'cities': cities,
            'app_count': app_count,
            'student_stats': student_stats,
            'all_app': all_app,
        }
    )


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
    ApplicantANS = ApplicantAnswer.objects.all()
    return render(request, "Administrator/Applicants/index.html",dict(app=Applicant,appNo=appCount,Ustat=StudentStat,allApp=allApp,ApplicantANS=ApplicantANS))

from allauth.socialaccount.models import SocialAccount
from datetime import datetime, timezone
@login_required()
def GetStats(request):
    allUser = CustomUser.objects.all().count()
    allJobs = Jobs.objects.all().count()
    allApp = Application.objects.all().count()
    # Query the database using the current year and month
    current_year = datetime.now().year
    current_month = datetime.now().month
    current_day = datetime.now().day
    current_weekday = datetime.now().weekday()  # 0 is Monday, 6 is Sunday
    start_of_month = datetime(current_year, current_month, 1, tzinfo=timezone.utc)
    end_of_month = datetime(current_year, current_month + 1, 1, tzinfo=timezone.utc) - timedelta(days=1)
    # Calculate the start and end of the current day
    start_of_day = datetime(current_year, current_month, current_day, 0, 0, 0, tzinfo=timezone.utc)
    end_of_day = start_of_day + timedelta(days=1) - timedelta(microseconds=1)

    weekApp = Application.objects.filter(ApplicantStatDate__week=datetime.now().isocalendar()[1]).filter(apply_date__year=datetime.now().year).count()





    # Calculate the start and end of the current month


    # Query the database for Application objects with apply_date in the current month
    moApp = Application.objects.filter(apply_date__gte=start_of_month, apply_date__lte=end_of_month).count()


    # Query the database for Application objects with apply_date in the current day
    print(start_of_day,end_of_day)
    dayApp = Application.objects.filter(apply_date__gte=start_of_day, apply_date__lte=end_of_day).count()
    start_of_week = datetime(current_year, current_month, current_day, 0, 0, 0, tzinfo=timezone.utc) - timedelta(
        days=current_weekday)
    end_of_week = start_of_week + timedelta(days=7) - timedelta(microseconds=1)

    # Query the database for Application objects with apply_date in the current week
    weekApp = Application.objects.filter(apply_date__gte=start_of_week,apply_date__lte=end_of_week).count()

    user =  CustomUser.objects.all()
    count = SocialAccount.objects.all().count()

    return render(request,"Administrator/Applicants/stat.html",dict(count=count,allUser=allUser,allJobs=allJobs,allApp=allApp,moApp=moApp,dayApp=dayApp,weekApp=weekApp))



#  Matcch


def getApplicantPhase(request,phaseid):
    getSub = subPhase.objects.filter(name__contains=phaseid)
    users = ApplicantSubPhase.objects.filter(subPhase=getSub[0])

    if len(users)>0:
        app=True
    else:
        app=False
    jpk=0
    return render(request,"Applicant-Doc/indexP.html",dict(users=users,app=app,jpk=jpk))

class getAppPhase(View):
     def get(self,request,pk,phaseid):
        getSub = subPhase.objects.get(id=phaseid)
        
       
        CurrentUser = request.user
        usID = request.POST.get("user_id")


        jpk = pk
        JobOwner = Jobs.objects.get(id=jpk)
        phase = Phase.objects.filter(user_id=request.user).filter(job_id=jpk)
        subphase = subPhase.objects.all()
        
        if CurrentUser==JobOwner.user_id:
            if Application.objects.filter(job_id=jpk).exists():
                users = ApplicantSubPhase.objects.filter(subPhase=getSub)
                if len(users)>0:
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
                        newDic["country"] = user.country
                        Status = Application.objects.filter(job_id=jpk).filter(user_id=userid).values_list("ApplicantStat",flat=True).first()
                        newDic["Status"]=str(Status)

                        if user.city == None:
                            newDic["city"] = user.country
                        else:
                            newDic["city"] = user.city+", "+user.country
                        appdate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("apply_date",flat=True).first()

                        newDic["applyDate"] =format(appdate, "%d/%m/%Y")
                        newDic["applyDateTime"]= format(appdate,"%H:%M")
                        ApplicantStatDate = Application.objects.filter(user_id=userid).filter(job_id=jpk).values_list("ApplicantStatDate",flat=True).first()
                        if ApplicantStatDate:
                            newDic["ApplicantStatDate"] =format(ApplicantStatDate, "%d/%m/%Y")
                            newDic["ApplicantStatDateTime"]= format(ApplicantStatDate,"%H:%M")
                        ########### User Experience ##########d
                        count = 0
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
                    return render(request, "Applicant-Doc/index.html", dict(users=users, q=q,app=app,phase=phase,subphase=subphase,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid,getSub=getSub))
                else:
                    q = "All"

                    return render(request,"Applicant-Doc/index.html",dict(app=False,phase=phase,subphase=subphase,jpk=jpk,getSub=getSub,q=q))
            else:
                q = "All"
                app=False
                return render(request,"Applicant-Doc/index.html",dict(q=q,app=app,jpk=jpk))
        else:
            q = "All"
            app = False
            return render(request,"Applicant-Doc/index.html",dict(q=q,app=app,jpk=jpk))
        return render(request,"Applicant-Doc/index.html")

def moveToPhase(request,pk,phaseid,userId):
    user_id = userId.split(",")
    if phaseid == "Qualified":
        for i in user_id:
            aps = Application.objects.filter(user_id=i).filter(job_id=pk).values_list("id", flat=True).first()
            app = Application.objects.get(id=aps)
            app.ApplicantStat = "Qualified"
            app.save()
        return redirect("qualified-applicant", pk=pk)
    elif phaseid == "NQualified":
        for i in user_id:
            aps = Application.objects.filter(user_id=i).filter(job_id=pk).values_list("id", flat=True).first()
            app = Application.objects.get(id=aps)
            app.ApplicantStat = "Not qualified"
            app.save()
        return redirect("nonqualified-applicant", pk=pk)
    else:
        sub = subPhase.objects.get(id=phaseid)

        for i in user_id:
            if ApplicantSubPhase.objects.filter(job_id=pk).filter(user_id=i).exists():
                sup = ApplicantSubPhase.objects.filter(job_id=pk).get(user_id=CustomUser.objects.get(id=i))
                sup.subPhase = sub
                sup.save()
            else:
                sup = ApplicantSubPhase()
                sup.subPhase=sub
                sup.user_id=CustomUser.objects.get(id=i)
                sup.job_id=Jobs.objects.get(id=pk)
                sup.save()
        return redirect("subphaseA", pk=pk, phaseid=sub.id)



        return redirect("applicant",pk=pk)





def getTopJobs(request):
    job = Jobs.objects.filter(approved=True)

    return render(request,"JobsList.html",{"job":job})


