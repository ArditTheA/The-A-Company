

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

    return render(request, "MainJobs/asd.html", {"sorted_x": sorted_x})


class UseFilter(View):
    def get(self, request):
        job = []
        post_id = request.headers.get("text")

        print(Jobs.objects.filter(approved=True).filter(postDate__month=datetime.now().month))
        #------------------Multiple  Seleceted ------------------------#
        if  len(request.GET.getlist("Program"))>1 or len(request.GET.getlist("Job Title"))>1 or   len(request.GET.getlist("Company"))>1 or len(request.GET.getlist("Location"))>1 or len(request.GET.getlist("Salary"))>1:
            if request.GET.getlist("Program") == []:
                filterProgram=[""]
            else:
                filterProgram = request.GET.getlist("Program")
            if request.GET.getlist("Job Title") ==[]:
                filterTitle=[""]
            else:
                filterTitle =request.GET.getlist("Job Title")
            if request.GET.getlist("Company") ==[]:
                filterCompany=[""]
            else:
                filterCompany=request.GET.getlist("Company")
            if request.GET.getlist("Location") ==[]:
                filterLocation=[""]
            else:
                filterLocation=request.GET.getlist("Location")
            if request.GET.getlist("Salary")==[]:
                filterSalary=[""]
            else:
                filterSalary =request.GET.getlist("Salary")
            filterDate =request.GET.get("dataPosted")
            print("datee:",filterDate)
            if filterDate == None:

                job  =Jobs.objects.filter(approved=True).filter(reduce(or_, [Q(job_title__icontains=t) for t in filterTitle])).filter(reduce(operator.or_, (Q(program__icontains=i) for i in filterProgram))).filter(reduce(operator.or_, (Q(city_j__name__icontains=l) for l in filterLocation))).filter(reduce(operator.or_, (Q(company__icontains=c) for c in filterCompany))).filter(reduce(operator.or_, (Q(salary_per_hour__icontains=s) for s in filterSalary))).filter(status="Open").order_by("-postDate")
                filterDate=""
            else:
                if filterDate == "Today":
                    job  =Jobs.objects.filter(approved=True).filter(reduce(or_, [Q(job_title__icontains=t) for t in filterTitle])).filter(reduce(operator.or_, (Q(program__icontains=i) for i in filterProgram))).filter(reduce(operator.or_, (Q(city_j__name__icontains=l) for l in filterLocation))).filter(reduce(operator.or_, (Q(company__icontains=c) for c in filterCompany))).filter(reduce(operator.or_, (Q(salary_per_hour__icontains=s) for s in filterSalary))).filter(postDate=datetime.now()).filter(status="Open").order_by("-postDate")
                elif filterDate == "Last Week":
                    job  =Jobs.objects.filter(approved=True).filter(reduce(or_, [Q(job_title__icontains=t) for t in filterTitle])).filter(reduce(operator.or_, (Q(program__icontains=i) for i in filterProgram))).filter(reduce(operator.or_, (Q(city_j__name__icontains=l) for l in filterLocation))).filter(reduce(operator.or_, (Q(company__icontains=c) for c in filterCompany))).filter(reduce(operator.or_, (Q(salary_per_hour__icontains=s) for s in filterSalary))).filter(postDate__week=date.today().isocalendar()[1]-1).filter(status="Open").order_by("-postDate")
                elif filterDate == "Last Month":
                    job  =Jobs.objects.filter(approved=True).filter(reduce(or_, [Q(job_title__icontains=t) for t in filterTitle])).filter(reduce(operator.or_, (Q(program__icontains=i) for i in filterProgram))).filter(reduce(operator.or_, (Q(city_j__name__icontains=l) for l in filterLocation))).filter(reduce(operator.or_, (Q(company__icontains=c) for c in filterCompany))).filter(reduce(operator.or_, (Q(salary_per_hour__icontains=s) for s in filterSalary))).filter(postDate__month=datetime.now().month-1).filter(status="Open").order_by("-postDate")

        #----------One Selected ------------
        else:

            if request.GET.get("Program") != None:
                filterProgram = request.GET.get("Program")
            else:
                filterProgram=""
            if request.GET.get("Job Title") != None:
                filterTitle =request.GET.get("Job Title")
            else:
                filterTitle=""
            if request.GET.get("Company") != None:
                filterCompany=request.GET.get("Company")
            else:
                filterCompany=""
            if request.GET.get("Location") != None:
                filterLocation=request.GET.get("Location")
            else:
                filterLocation=""
            if request.GET.get("Salary") != None:
                filterSalary =request.GET.get("Salary")
            else:
                filterSalary=""
            if  request.GET.get("dataPosted") != None:

                filterDate =request.GET.get("dataPosted")
            else:
                filterDate=""



            if filterDate ==  "":
                job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).order_by("-postDate")


            else:
                if filterDate=="today":
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).filter(postDate=datetime.now()).order_by("-postDate")
                elif filterDate=="Last Month":
                    lastmonth=datetime.now().month-1
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).filter(postDate__month=lastmonth).order_by("-postDate")
                elif filterDate=="Last Week":
                    lastweek=date.today().isocalendar()[1]-1
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).filter(postDate__week=lastweek).order_by("-postDate")


        stat = False


        program = Jobs.objects.filter(approved=True).filter(status="Open").values_list("program", flat=True)
        title = Jobs.objects.filter(approved=True).filter(status="Open").values_list("job_title", flat=True)
        comp = Jobs.objects.filter(approved=True).filter(status="Open").values_list("company", flat=True)
        city_j = Jobs.objects.filter(approved=True).filter(status="Open").values_list("city_j", flat=True)
        salary = Jobs.objects.filter(approved=True).filter(status="Open").values_list("salary_per_hour", flat=True)
        prog = []
        for i in program:
            if i not in prog:
                prog.append(i)
        Jtitle = []
        for i in title:
            if i not in Jtitle:
                Jtitle.append(i)
        company = []
        for i in comp:
            if i not in company:
                company.append(i)
        city_y = []
        for i in city_j:
            if i not in city_y:
                city_y.append(i)
        cityName = []
        for i in city_y:
            getC = City.objects.get(id=i)
            getCo = City.objects.filter(id=i).values_list("country", flat=True)
            cit = str(getC.name + " , " + getC.country.country)
            cityName.append(cit)
        sal = []
        for i in salary:
            if i not in sal:
                sal.append(i)
        # end of filters


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
            city_j = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("city_j")

            c = city_j.first()

            city: object = City.objects.filter(id=c[0]).values_list("name", flat=True).first()
            city_uid = City.objects.filter(id=c[0]).values_list("country", flat=True).first()

            country = Country.objects.filter(id=city_uid).values_list("country", flat=True).first()
            applicant = Jobs.objects.filter(approved=True).filter(id=post_id).first()

            app = str(applicant)

            return JsonResponse(
                dict(description=description, title=title, applicant=app, city_j=city, country=country,
                     start_date=start_date,
                     salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                     typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                     program=program, programCost=programCost,
                     posted=posted, post_id=post_id))
        result = len(job)
        programStr=""
        titlestr=""
        companystr=""
        locationStr=""
        salarystr=""
        if len(filterProgram)>1:
            programStr = ", ".join(str(x) for x in filterProgram)
        else:
            if request.GET.get("Program")  !=  None:
                programStr=request.GET.get("Program")
        if len(request.GET.getlist("Job Title"))>1:
            titlestr=", ".join(str(x) for x in filterTitle)
        else:
            if request.GET.get("Job Title")  !=  None:
                titlestr=request.GET.get("Job Title")
        if len(request.GET.getlist("Company"))>1:
            companystr=", ".join(str(x) for  x in filterCompany)
        else:
            if request.GET.get("Company")  !=  None:
                companystr=request.GET.get("Company")
        if len(request.GET.getlist("Location"))>1:
            locationStr=", ".join(str(x) for x in  filterLocation)
        else:
            if request.GET.get("Location")  !=  None:
                locationStr=request.GET.get("Location")
        if len(request.GET.getlist("Salary"))>1:

            salarystr = ", ".join(str(x)  for x in filterSalary)
        else:
            if request.GET.get("Salary")  !=  None:
                salarystr=request.GET.get("Salary")


        print(titlestr)
        if len(job) != 0:
            stat=True
            return render(request, "Filters/index.html",
                          dict(job=job, stat=stat, result=result, prog=prog, title=title, company=company,city=cityName, salary=sal,fprogram=programStr,ftitle=titlestr,fcompany=companystr,flocation=locationStr,fsalary=salarystr,fdate=filterDate))
        else:
            stat=False
            return render(request,"Filters/index.html",
                          dict(result=result, prog=prog, title=Jtitle, company=company, city=cityName, salary=sal,fprogram=filterProgram,ftitle=titlestr,fcompany=filterCompany,flocation=filterLocation,fsalary=filterSalary))


class OneSelFilter(View):
    def get(self,request):
        job=[]
        filterProgram=""
        filterTitle=""
        filterCompany=""
        filterLocation=""
        filterSalary=""
        filterDate=""
        dateF=""
        sortProgram =[]
        sortTitle = []
        sortCompany= []
        sortCity =[]
        cityName = []
        sortSalary = []
        post_id=request.headers.get("text")
        if request.GET.get("Program") != None:
            if request.GET.get("Program") != "Program":
                filterProgram = request.GET.get("Program")
            else:
                filterProgram=""

        if request.GET.get("Job Title") != None:
            if request.GET.get("Job Title") != "Job Title":
                filterTitle =request.GET.get("Job Title")
            else:
                filterTitle=""
        if request.GET.get("Company") != None:
            if request.GET.get("Company") != "Company":
                filterCompany=request.GET.get("Company")

            else:
                filterCompany=""
        if request.GET.get("Location") != None:
            if request.GET.get("Location") != "Location":
                filterLocation=request.GET.get("Location")

            else:
                filterLocation=""
        if request.GET.get("Salary") != None:
            if request.GET.get("Salary") != "Salary":
                filterSalary =int(request.GET.get("Salary"))
            else:
                filterSalary=""
        if  request.GET.get("dataPosted") != None:
            if  request.GET.get("dataPosted") != "Date Posted":
                filterDate =request.GET.get("dataPosted")
            else:
                filterDate=""
        location=filterLocation


        if filterLocation != "":
            getCityLoc=filterLocation.split()
            filterLocation=getCityLoc[0]
        print("filter  title",filterTitle)
        if filterProgram == "" and  filterTitle ==  "" and filterCompany == "" and filterLocation == "" and filterSalary == ""  and filterDate == "":
            job = Jobs.objects.filter(approved=True).filter(status="Open").order_by("-postDate")
        else:
            if filterDate ==  "":
                job = Jobs.objects.filter(approved=True).filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__contains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary)
            else:
                if filterDate=="Today":
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).filter(postDate=datetime.now()).order_by("-postDate")
                    dateF="Today"
                elif filterDate=="Last Month":
                    lastmonth=datetime.now().month-1
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).filter(postDate__month=lastmonth).order_by("-postDate")
                    dateF="Last Month"
                elif filterDate=="Last Week":
                    lastweek=date.today().isocalendar()[1]-1
                    job = Jobs.objects.filter(approved=True).filter(status="Open").filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).filter(postDate__week=lastweek).order_by("-postDate")
                    dateF="Last Week"

        #Filter Clean Up And  Sort
        print("filterTitle",filterTitle)
        if len(job)>=1:
            program = job.values_list("program", flat=True)
            title = job.values_list("job_title", flat=True)
            comp = job.values_list("company", flat=True)
            city_j = job.values_list("city_j", flat=True)
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
            for i in city_j:
                if i not in sortCity:
                    sortCity.append(i)
            for i in sortCity:
                getC = City.objects.get(id=i)
                getCo = City.objects.filter(id=i).values_list("country", flat=True)
                cit = str(getC.name + " , " + getC.country.country)
                cityName.append(cit)

            for i in salary:
                if i not in sortSalary:
                    sortSalary.append(i)
            sortProgram.sort()
            sortTitle.sort()
            sortCompany.sort()
            cityName.sort()
            sortSalary.sort()




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
            city_j = Jobs.objects.filter(approved=True).filter(id=post_id).values_list("city_j")

            c = city_j.first()

            city: object = City.objects.filter(id=c[0]).values_list("name", flat=True).first()
            city_uid = City.objects.filter(id=c[0]).values_list("country", flat=True).first()

            country = Country.objects.filter(id=city_uid).values_list("country", flat=True).first()
            applicant = Jobs.objects.filter(approved=True).filter(id=post_id).first()

            app = str(applicant)

            return JsonResponse(
                dict(description=description, title=title, applicant=app, city_j=city, country=country,
                     start_date=start_date,
                     salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                     typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                     program=program, programCost=programCost,
                     posted=posted, post_id=post_id))
        return render(request, "MainJobs/index.html",
            dict(job=job, prog=sortProgram, title=sortTitle, company=sortCompany,city=cityName,
                salary=sortSalary,filterProgram=filterProgram,filterTitle=filterTitle,filterCompany=filterCompany,
                filterLocation=location,filterSalary=filterSalary,filterDate=filterDate,dateF=dateF))


