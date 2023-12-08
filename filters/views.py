

from django.http import JsonResponse
from django.shortcuts import render, redirect

from .models import Search
from .filters import *
from accounts.models import *
from django.views.generic import ListView
from django.views.generic import View

from datetime import date
# Create your views here.
from django.db.models import Q
from operator import or_, and_ 
from functools import reduce
import operator

def getList(request):
    search = Search.objects.all().values_list("search", flat=True)
    secList = {}
    count = 1
    for i in search:
        if i not in secList:
            for j in search:
                if i in j:
                    count = count + 1
            secList[i] = count
            count = 0



    def Sort(sub_li):
        return (sorted(sub_li, key=lambda x: x[1]))

    sorted_x = sorted(secList.items(), key=lambda kv: kv[1], reverse=True)

    return render(request, "MainJobs/UserSearch.html", {"sorted_x": sorted_x})



class OneSelFilter(View):
    def get(self,request):
        job=[]
        filterProgram=""
        filterTitle=""
        filterCompany=""
        filterLocation=""
        filterSalary="-id"
        filterDate=""
        dateF=""
        sortProgram =[]
        sortTitle = []
        sortCompany= []
        sortCity =[]
        cityName = []
        sortSalary = []
        hasApply=False
        auth=False
        if request.user.is_authenticated:
            auth=bool(request.user.profileSetup)
        post_id=request.headers.get("text")
        if request.GET.get("All Jobs") != None:
            if request.GET.get("All Jobs") != "All Jobs":
                filterProgram = request.GET.get("All Jobs")
            else:
                filterProgram=""

        if request.GET.get("Job Position") != None:
            if request.GET.get("Job Position") != "Job Position":
                filterTitle =request.GET.get("Job Position")
            else:
                filterTitle=""
        if request.GET.get("Company") != None:
            if request.GET.get("Company") != "Company":
                filterCompany=request.GET.get("Company")

            else:
                filterCompany=""
        if request.GET.get("Location") != None:
            if request.GET.get("Location") != "Country":
                filterLocation=request.GET.get("Location")
                loc=request.GET.get("Location")

            else:
                filterLocation=""



        if request.GET.get("Salary") != None:
            if request.GET.get("Salary") != "Salary":
                filterSalary =request.GET.get("Salary")


                if filterSalary == "Low to High":
                    filterSalary = "salary_per_hour"
                elif filterSalary == "High to Low":
                    filterSalary="-salary_per_hour"
                else:
                    filterSalary="-id";
            else:
                filterSalary="-id"
        if  request.GET.get("dataPosted") != None:
            if  request.GET.get("dataPosted") != "Date Posted":
                filterDate =request.GET.get("dataPosted")
            else:
                filterDate=""
        location=filterLocation

        print("-------------")
        print("-------------")
        print(filterLocation)
        print("-------------")
        print("-------------")

        if filterProgram == "" and  filterTitle ==  "" and filterCompany == "" and filterLocation == "" and filterSalary == ""  and filterDate == "":
            print("inn")
            job = Jobs.objects.filter(approved=True).filter(status="Open").order_by("-id")

        elif filterProgram == "Recommended":
            job = Jobs.objects.filter(approved=True).filter(status="Open").filter(recommended=True).filter(job_title__icontains=filterTitle).filter(company__contains=filterCompany).filter(country_j__icontains=filterLocation).order_by(filterSalary).order_by(filterSalary)
        else:
            print("inn1")

            if filterDate ==  "":
                print("inn2")

                job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__contains=filterCompany).filter(country_j__icontains=filterLocation).order_by(filterSalary)
            else:
                if filterDate=="Newest to Oldest":
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(country_j__icontains=filterLocation).order_by(filterSalary).order_by("-postDate").order_by("-id")
                    dateF="Newest to oldest"
                elif filterDate=="Oldest to Newest":

                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(country_j__icontains=filterLocation).order_by(filterSalary).order_by("postDate").order_by("id")
                    dateF="Oldest to newest"


        #Filter Clean Up And  Sort
        if len(job)>=1:
            program = job.values_list("program", flat=True)
            title = job.values_list("job_title", flat=True)
            comp = job.values_list("company", flat=True)
            country_j = job.values_list("country_j", flat=True)
            salary = job.values_list("salary_per_hour", flat=True)


            for i  in program:
                if i  not in sortProgram:
                    sortProgram.append(i)
            for i in title:
                if i not in sortTitle:
                    sortTitle.append(i)
            for i in comp:
                if i not in sortCompany:
                    sortCompany.append(i)

            cityName = list(dict.fromkeys(country_j))

            salUSA =[]
            salEu =[]
            
            for i in job:
                if i.country_j =="USA":
                    sal =format( i.salary_per_hour,'.2f')
                    salUSA.append(sal)
                else:
                    sal =format(i.salary_per_hour,'.2f')
                    salEu.append(sal)

            sortSalaryUSA=[]
            sortSalaryEu=[]
            for i in salUSA:
                if i not in sortSalaryUSA:
                    
                    sortSalaryUSA.append(i)
            for i in salEu:
                if i not in sortSalaryEu:
                    
                    sortSalaryEu.append(i)
            for i in sortSalaryUSA:
                sal = "$"+str(i)
                sortSalary.append(sal)
            for i in sortSalaryEu:
                sal = "€"+str(i)
                sortSalary.append(sal)
            sortProgram.sort()
            sortTitle.sort()
            sortCompany.sort()
            cityName.sort()




        if post_id == "":
            post_id=job[0].id
        
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            description = Jobs.objects.filter(approved=True).filter(id=post_id).values_list('description', flat=True).first()
            title = Jobs.objects.filter(approved=True).filter(id=post_id).values_list('job_title', flat=True).first()
            start_date = Jobs.objects.filter(approved=True).filter(id=post_id).values_list('start_date', flat=True).first()
            end_date = Jobs.objects.filter(approved=True).filter(id=post_id).values_list('end_date', flat=True).first()
            salary = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("salary_per_hour", flat=True).first()
            hourWeek = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("hour_per_work", flat=True).first()
            company = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("company", flat=True).first()
            typeOfWork = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("type_of_work", flat=True).first()
            hourPerWork = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("hour_per_work", flat=True).first()
            housing = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("housing", flat=True).first()
            housingCost = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("housing_cost_per_week", flat=True).first()
            program = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("program", flat=True).first()
            programCost = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("programCost", flat=True).first()
            posted = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list(
                "apply_date", flat=True).first()
            city_j = Jobs.objects.filter(id=post_id).values_list("city_j").first()
            country= Jobs.objects.filter(id=post_id).values_list("country_j").first()
            applicant = Jobs.objects.filter(approved=True).filter(id=post_id).first()
            SDate = start_date
            EDate = end_date
            salary=format(salary,'.2f')
            start_date = format(start_date, "%d/%m/%Y")
            end_date = format(end_date, "%d/%m/%Y")
            appNo = 0
            appNo = Jobs.objects.get(id=post_id).applicant.count()
            
            if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                hasApply=True
                hasApplyDate=Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list("apply_date",flat=True).first()
              
                

                
            data =dict(description=description, title=title, appNo=appNo, city_j=city_j, country=country,
                     start_date=start_date,SDate=SDate,EDate=EDate,
                     salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                     typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                     program=program, programCost=programCost,
                     posted=posted, post_id=post_id,hasApply=hasApply,auth=auth)
            auth1 = request.user.is_authenticated

            if auth1:
                applied = Application.objects.filter(job_id=post_id).filter(
                        user_id=request.user).values_list("apply_date", flat=True).first()
                applyDate = format(applied, "%d/%m/%Y")
                data["applyDate"]=applyDate
              
            return JsonResponse(data,safe=True)
        if request.GET.get("Salary") != None:
            if request.GET.get("Salary") != "Salary":
                filterSalary =request.GET.get("Salary")
        else:
            filterSalary=""
        check = True
        if len(job) != 0:
            check = True
        else:
            check = False
        if job.count() > 0:
            if post_id is None:
                post_id = job[0].id
                if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                    hasApply = True
        if filterSalary == "-id":
            filterSalary=""

        getMonth = datetime.now().month
        getYear = datetime.now().year
        return render(request, "MainJobs/index.html",
            dict(job=job, prog=sortProgram, title=sortTitle, company=sortCompany,city=cityName,
                salary=sortSalary,filterProgram=filterProgram,filterTitle=filterTitle,filterCompany=filterCompany,getMonth=getMonth,getYear=getYear,
                filterLocation=location,filterSalary=filterSalary,filterDate=filterDate,dateF=dateF,check=check,post_id=post_id))


class OneSelFilterId(View):
    def get(self, request,pk):
        job = []
        filterProgram = ""
        filterTitle = ""
        filterCompany = ""
        filterLocation = ""
        filterSalary = ""
        filterDate = ""
        dateF = ""
        sortProgram = []
        sortTitle = []
        sortCompany = []
        sortCity = []
        cityName = []
        sortSalary = []
        hasApply = False
        auth = False
        FJob = Jobs.objects.get(id=pk)
        if request.user.is_authenticated:
            auth = bool(request.user.profileSetup)
        post_id = request.headers.get("text")
        if request.GET.get("All Jobs") != None:
            if request.GET.get("All Jobs") != "All Jobs":
                filterProgram = request.GET.get("All Jobs")
            else:
                filterProgram = ""

        if request.GET.get("Job Position") != None:
            if request.GET.get("Job Position") != "Job Position":
                filterTitle = request.GET.get("Job Position")
            else:
                filterTitle = ""
        if request.GET.get("Company") != None:
            if request.GET.get("Company") != "Company":
                filterCompany = request.GET.get("Company")

            else:
                filterCompany = ""
        if request.GET.get("Location") != None:
            if request.GET.get("Location") != "Location":
                filterLocation = request.GET.get("Location")
                loc = request.GET.get("Location")

            else:
                filterLocation = ""
        if request.GET.get("Salary") != None:
            if request.GET.get("Salary") != "Salary":
                filterSalary = request.GET.get("Salary")
                filterSalary = filterSalary.replace("$", "")
                filterSalary = filterSalary.replace("€", "")
                filterSalary = float(filterSalary)
            else:
                filterSalary = ""
        if request.GET.get("dataPosted") != None:
            if request.GET.get("dataPosted") != "Date Posted":
                filterDate = request.GET.get("dataPosted")
            else:
                filterDate = ""
        location = filterLocation

        if filterLocation != "":
            getCityLoc = filterLocation.split()
            filterLocation = getCityLoc[0]
            filterLocation = filterLocation.rstrip(filterLocation[-1])
        if filterProgram == "" and filterTitle == "" and filterCompany == "" and filterLocation == "" and filterSalary == "" and filterDate == "":
            job = Jobs.objects.filter(approved=True).filter(status="Open").order_by("-postDate")
        else:
            if filterDate == "":
                job = Jobs.objects.filter(approved=True).filter(program__icontains=filterProgram).filter(
                    job_title__icontains=filterTitle).filter(company__contains=filterCompany).filter(
                    city_j__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary)
            else:
                if filterDate == "Today":
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(
                        program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(
                        company__icontains=filterCompany).filter(city_j__icontains=filterLocation).filter(
                        salary_per_hour__icontains=filterSalary).filter(postDate=datetime.now()).order_by("-postDate")
                    dateF = "Today"
                elif filterDate == "Last Month":
                    lastmonth = datetime.now().month - 1
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(
                        program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(
                        company__icontains=filterCompany).filter(city_j__icontains=filterLocation).filter(
                        salary_per_hour__icontains=filterSalary).filter(postDate__month=lastmonth).order_by("-postDate")
                    dateF = "Last Month"
                elif filterDate == "Last Week":
                    lastweek = date.today().isocalendar()[1] - 1
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(
                        program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(
                        company__icontains=filterCompany).filter(city_j__icontains=filterLocation).filter(
                        salary_per_hour__icontains=filterSalary).filter(postDate__week=lastweek).order_by("-postDate")
                    dateF = "Last Week"

        # Filter Clean Up And  Sort
        if len(job) >= 1:
            program = job.values_list("program", flat=True)
            title = job.values_list("job_title", flat=True)
            comp = job.values_list("company", flat=True)
            city_j = job.values_list("city_j", flat=True)
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
            for i in city_j:
                if i not in sortCity:
                    sortCity.append(i)
            for i in sortCity:
                if City.objects.filter(name=i).exists():
                    cit = City.objects.get(name=i)
                    cityName.append(str(cit))

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

        if post_id == "":
            post_id = job[0].id

        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            description = Jobs.objects.filter(approved=True).filter(id=post_id).values_list('description',
                                                                                            flat=True).first()
            title = Jobs.objects.filter(approved=True).filter(id=post_id).values_list('job_title', flat=True).first()
            start_date = Jobs.objects.filter(approved=True).filter(id=post_id).values_list('start_date',
                                                                                           flat=True).first()
            end_date = Jobs.objects.filter(approved=True).filter(id=post_id).values_list('end_date', flat=True).first()
            salary = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("salary_per_hour",
                                                                                       flat=True).first()
            hourWeek = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("hour_per_work",
                                                                                         flat=True).first()
            company = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("company", flat=True).first()
            typeOfWork = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("type_of_work",
                                                                                           flat=True).first()
            hourPerWork = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("hour_per_work",
                                                                                            flat=True).first()
            housing = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("housing", flat=True).first()
            housingCost = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("housing_cost_per_week",
                                                                                            flat=True).first()
            program = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("program", flat=True).first()
            programCost = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("programCost",
                                                                                            flat=True).first()
            posted = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list(
                "apply_date", flat=True).first()
            city_j = Jobs.objects.filter(id=post_id).values_list("city_j").first()
            country = Jobs.objects.filter(id=post_id).values_list("country_j").first()
            applicant = Jobs.objects.filter(approved=True).filter(id=post_id).first()
            salary = format(salary, '.2f')
            start_date = format(start_date, "%d/%m/%Y")
            end_date = format(end_date, "%d/%m/%Y")
            appNo = 0
            appNo = Jobs.objects.get(id=post_id).applicant.count()
            if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                hasApply = True
                hasApplyDate = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list(
                    "apply_date", flat=True).first()
                hasApplyDate = format(hasApplyDate, "%d/%m/%Y")

            return JsonResponse(
                dict(description=description, title=title, appNo=appNo, city_j=city_j, country=country,
                     start_date=start_date,
                     salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                     typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                     program=program, programCost=programCost,
                     posted=posted, post_id=post_id, hasApply=hasApply, auth=auth), safe=True)
        if request.GET.get("Salary") != None:
            if request.GET.get("Salary") != "Salary":
                filterSalary = request.GET.get("Salary")
        else:
            filterSalary = ""
        check = True
        if len(job) != 0:
            check = True
        else:
            check = False
        if job.count() > 0:
            if post_id is None:
                post_id = job[0].id
                if Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).exists():
                    hasApply = True

        return render(request, "MainJobs/index.html",
                      dict(FJob=FJob,job=job, prog=sortProgram, title=sortTitle, company=sortCompany, city=cityName,
                           salary=sortSalary, filterProgram=filterProgram, filterTitle=filterTitle,
                           filterCompany=filterCompany,getMonth=getMonth,getYear=getYear,
                           filterLocation=location, filterSalary=filterSalary, filterDate=filterDate, dateF=dateF,
                           check=check, post_id=post_id))


