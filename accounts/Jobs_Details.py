from .models import *
import locale
from django.http import JsonResponse,HttpResponse
from django.views.generic import View
import requests
from django.shortcuts import redirect, render, get_object_or_404

class getJobDetails(View):
    def get(self,request):
        post_id = request.headers.get("text")
        hasApply=False
        hasApplyDate =""
        if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
            hasApply = True
            hasApplyDate = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list("apply_date", flat=True).first()
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
                         start_date=start_date,SDate=SDate,EDate=EDate,hasApply=hasApply,applyDate=hasApplyDate,
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
    FJob = Jobs.objects.get(id=pk)
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





