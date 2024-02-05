from .models import *
import locale
from django.http import JsonResponse,HttpResponse
from django.views.generic import View
import requests
from django.shortcuts import redirect, render, get_object_or_404
from documents.views import *
from datetime import date, timedelta




# Main Jobs

class getJobDetails(View):
    def get(self,request):
        post_id = request.headers.get("text")
        hasApply=False
        hasApplyDate =""
        applyDateTime=""
        if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
            hasApply = True
            hasApplyDate = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list("apply_date", flat=True).first()
            applyDateTime = format(hasApplyDate, "%I:%M %p").lower() 
            hasApplyDate = format(hasApplyDate, "%d/%m/%Y")
            
        appNo = Jobs.objects.get(id=post_id).applicant.count()
        appNo = "{:,}".format(appNo)
        
        print(Jobs.objects.get(id=post_id).applicant.count())
        print(appNo)
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
        locale.setlocale(locale.LC_ALL, '')  # set the locale to the user's default
        programCost = locale.format("%d", programCost, grouping=True)
        return JsonResponse(
                    dict(description=description, title=title, applicant=app, city_j=city_j, country=country,
                         start_date=start_date,SDate=SDate,EDate=EDate,hasApply=hasApply,applyDate=hasApplyDate,applyDateTime=applyDateTime,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost,appNo=appNo,  
                         posted=posted, post_id=post_id), safe=True)
    



def getJobs(request):
    job = Jobs.objects.filter(approved=True).filter(status="Open").order_by("-postDate").order_by("-id")
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
            country_j = job.values_list("country_j", flat=True)
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
            cityName=list(dict.fromkeys(country_j))


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




    filterProgram = ""
    filterTitle = ""
    filterCompany = ""
    filterLocation = ""
    filterSalary = ""
    filterDate = ""
    checkMainJobs = True
    check = True
    post_id = ""
    if len(job) != 0:
        check = True
        post_id = job[0].id
    else:
        check = False
    
        
    
    return render(request, "MainJobs/index.html",dict(job=job,prog=sortProgram, title=sortTitle, company=sortCompany, city=cityName,
                           salary=sortSalary, filterProgram=filterProgram, filterTitle=filterTitle,
                           filterCompany=filterCompany,
                           filterLocation=filterLocation, filterSalary=filterSalary, filterDate=filterDate, tit=title,
                           check=check, post_id=post_id,
                           checkMainJobs=checkMainJobs))

def getJobsId(request,pk):
    FJob = Jobs.objects.filter(id=pk,status="Open")
    job = Jobs.objects.filter(approved=True, status="Open").exclude(id=pk).order_by("-postDate", "-id")
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
            country_j = job.values_list("country_j", flat=True)
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
            cityName=list(dict.fromkeys(country_j))


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




    filterProgram = ""
    filterTitle = ""
    filterCompany = ""
    filterLocation = ""
    filterSalary = ""
    filterDate = ""
    checkMainJobs = True
    check = True
    post_id = ""
    if len(job) != 0:
        check = True
        post_id = job[0].id
    else:
        check = False
    
        
    
    return render(request, "MainJobs/index.html",dict(FJob=FJob,job=job,prog=sortProgram, title=sortTitle, company=sortCompany, city=cityName,
                           salary=sortSalary, filterProgram=filterProgram, filterTitle=filterTitle,
                           filterCompany=filterCompany,
                           filterLocation=filterLocation, filterSalary=filterSalary, filterDate=filterDate, tit=title,
                           check=check, post_id=post_id,
                           checkMainJobs=checkMainJobs))


# Main Jobs End




# MyJobs

def myJobsQualified(request):
    job = Application.objects.filter(user_id=request.user,ApplicantStat="Qualified").order_by("-apply_date")
    filterSel = "Qualified"
    checkMainJobs = False
    check= True
    return render(request, "MyJobs/index.html", dict(job=job, check=check,filterSel=filterSel,checkMainJobs=checkMainJobs))

def myJobsAll(request):
    job = Application.objects.filter(user_id=request.user).order_by("-apply_date")
    filterSel = "All Jobs"
    checkMainJobs = False
    check= True
    return render(request, "MyJobs/index.html", dict(job=job, check=check,filterSel=filterSel,checkMainJobs=checkMainJobs))


def myJobsNotQualified(request):
    job = Application.objects.filter(user_id=request.user,ApplicantStat="Not qualified").order_by("-apply_date")
    filterSel = "Not Qualified"
    checkMainJobs = False
    check= True
    return render(request, "MyJobs/index.html", dict(job=job, check=check,filterSel=filterSel,checkMainJobs=checkMainJobs))

def MyJobsRedirect(request):
    jobid = Application.objects.filter(user_id=request.user,ApplicantStat="Qualified")
    if jobid:
        return redirect("my-jobs-qualified")
    else:
        return redirect("my-jobs-all")
    







class getMyJobsDetails(View):
    def get(self,request):
        post_id = request.headers.get('text')
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

        meetingTime = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("meetWithUs", flat=True).first()
        meetingLink = Application.objects.filter(job_id=post_id).filter(
                    user_id=request.user).values_list("meetWithUsLink", flat=True).first()
        StatusApp = Application.objects.filter(job_id=post_id,user_id=request.user).values_list("ApplicantStat",flat=True).first()

              
        city_j = Jobs.objects.filter(
                    id=post_id).values_list("city_j").first()
        country = Jobs.objects.filter(
                    id=post_id).values_list("country_j").first()
        appNo = Jobs.objects.get(id=post_id).applicant.count()
        appNo = "{:,}".format(appNo)
        salary = format(salary, '.2f')
        SDate = start_date
        EDate = end_date
        start_date = format(start_date, "%d/%m/%Y")
        end_date = format(end_date, "%d/%m/%Y")
        posted = format(posted, "%d/%m/%Y")
        checkMainJobs="False"
        print(checkMainJobs)
        passaportExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Passport").exists()
        studentStatusExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student Status").exists()
        certificateOfEnrolmentExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Certificate of Enrolment").exists()
        studentIdExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student ID").exists()
        photoExists = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Photo").exists()
        serviceContractExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Service contract").exists()
        jobOfferExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Job Offer").exists()
        workPermitExists  = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Work Permit").exists()
        passaportStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Passport").values_list("status",flat=True).first()
        studentStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student Status").values_list("status",flat=True).first()
        certificateStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Certificate of Enrolment").values_list("status",flat=True).first()
        studentIdStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Student ID").values_list("status",flat=True).first()
        photoStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Photo").values_list("status",flat=True).first()
        ResumeStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Resume").values_list("status",flat=True).first()
        serviceContractStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Service contract").values_list("status",flat=True).first()
        jobOfferStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Job Offer").values_list("status",flat=True).first()
        workPermitStatus = documents_users.objects.filter(user_id=request.user, id_document__name__icontains="Work Permit").values_list("status",flat=True).first()
        
        
        hasApply =  True    
        ApplicantStatDate = ""
        ApplicantStatDateTime = ""
        ApplicantStatDates = Application.objects.filter(user_id=request.user).filter(job_id=post_id).values_list("ApplicantStatDate",flat=True).first()
        if ApplicantStatDates:
            ApplicantStatDate=format(ApplicantStatDates, "%d/%m/%Y")
            ApplicantStatDateTime= format(ApplicantStatDates,"%H:%M")
        appdate = Application.objects.filter(user_id=request.user).filter(job_id=post_id).values_list("apply_date",flat=True).first()
        applyDate =format(appdate, "%d/%m/%Y")
        applyDateTime= format(appdate,"%H:%M")
        useremail ="'"+ request.user.email+"'"
        return JsonResponse(
                    dict(passaportStatus=passaportStatus,workPermitStatus=workPermitStatus,jobOfferStatus=jobOfferStatus,serviceContractStatus=serviceContractStatus,ResumeStatus=ResumeStatus,photoStatus=photoStatus,studentIdStatus=studentIdStatus,certificateStatus=certificateStatus,studentStatus=studentStatus,description=description,hasApply=hasApply,applyDate=applyDate,applyDateTime=applyDateTime, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,StatusApp=StatusApp,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,useremail=useremail,
                         program=program, programCost=programCost,SDate=SDate,EDate=EDate,checkMainJobs=checkMainJobs,
                         posted=posted, post_id=post_id, applied=applied, appNo=appNo,meetingTime=meetingTime,meetingLink=meetingLink,
                         passaportExists=passaportExists,studentStatusExists=studentStatusExists,certificateOfEnrolmentExists=certificateOfEnrolmentExists,
                         studentIdExists=studentIdExists,photoExists=photoExists,serviceContractExists=serviceContractExists,jobOfferExists=jobOfferExists,
                         workPermitExists=workPermitExists,userid=request.user.id,ApplicantStatDateTime=ApplicantStatDateTime,ApplicantStatDate=ApplicantStatDate
                         ), safe=True)
    


# end of my jobs



def RecruiterJobsRedirect(request):
    if request.user.is_staff:
        job = Jobs.objects.filter(status = "Open")
    else:
        job = Jobs.objects.filter(user_id = request.user,status = "Open")
    

    if job:
        return redirect("recruiter-open-jobs")

    else:
        return redirect("recuiter-all-jobs")




def recruiterOpenJobs(request):
    if request.user.is_staff:
        job = Jobs.objects.filter(status = "Open")
    else:
        job = Jobs.objects.filter(user_id = request.user,status = "Open")

    filterJobs="Open Jobs"
    checkMainJobs = False
    
    return render(request, "Recruiter/index.html", dict(job=job,checkMainJobs=checkMainJobs,filterJobs=filterJobs))


def recruiterCloseJobs(request):
    if request.user.is_staff:
        job = Jobs.objects.filter(status = "Close")
    else:
        job = Jobs.objects.filter(user_id = request.user,status = "Close")

    filterJobs="Closed Jobs"
    checkMainJobs = False
    
    return render(request, "Recruiter/index.html", dict(job=job,checkMainJobs=checkMainJobs,filterJobs=filterJobs))

def recruiterAllJobs(request):
    if request.user.is_staff:
        job = Jobs.objects.all()
    else:
        job = Jobs.objects.filter(user_id = request.user)

    filterJobs="All Jobs"
    checkMainJobs = False
    
    return render(request, "Recruiter/index.html", dict(job=job,checkMainJobs=checkMainJobs,filterJobs=filterJobs))


class recruiterJobDetails(View):
    def get(self,request):
        post_id = request.headers.get("text")
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
        appNo = "{:,}".format(appNo)
        locale.setlocale(locale.LC_ALL, '')  # set the locale to the user's default
        programCost = locale.format("%d", programCost, grouping=True)

        return JsonResponse(
                    dict(description=description, title=title, city_j=city_j, country=country, start_date=start_date,
                         salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                         typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                         program=program, programCost=programCost, SDate=SDate, EDate=EDate,
                         posted=posted, appNo=appNo, post_id=post_id, hasApply=False))
