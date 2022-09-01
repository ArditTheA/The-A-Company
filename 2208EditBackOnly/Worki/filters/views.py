

from django.http import JsonResponse
from django.shortcuts import render, redirect

from .models import Search
from .filters import *
from accounts.models import *
from django.views.generic import ListView
from django.views.generic import View


# Create your views here.


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
        post_id = request.headers.get("text")
        filterProg = request.GET.get("program")
        filterTit = request.GET.get("title")
        filterComp = request.GET.get("company")
        filterLoc = request.GET.get("location")
        filterSal = request.GET.get("salary")
        filterDate = request.GET.get("dataPosted")
        print(filterProg,filterTit,filterComp,filterLoc,filterSal,filterDate)
        stat = False
        if filterLoc != None:
            loc=filterLoc.split()

        filterProgram = ""
        filterTitle = ""
        filterCompany = ""
        filterLocation = ""
        filterSalary = ""
        filterPostDate = ""
        print("-----------")
        print(filterLoc)
        print("-----------")
        if filterProg != "Program":
            filterProgram=filterProg
        if filterTit != "Job Title":
            filterTitle=filterTit
        if filterComp != "Company":
            filterCompany = filterComp
        if len(loc) > 0:
            if filterLoc != "Location":
                filterLocation =loc[0]
        if filterSal != "Salary":
            filterSalary=filterSal
        if filterDate != "Date Posted":
            filterPostDate=filterDate
        print("------------------------")
        print(filterProgram)
        print(filterCompany)
        print(filterTitle)
        print(filterSalary)
        print("------------------------")

        print(datetime.now().month)
        print("Month:",Jobs.objects.filter(status="Open").values_list("start_date__month",flat=True).first())
        print("Week:",Jobs.objects.filter(status="Open").values_list("start_date__week",flat=True).first())
        print("Week:",Jobs.objects.filter(status="Open").values_list("start_date__day",flat=True).first())
        job = []

        if filterPostDate =="":

            job = Jobs.objects.filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter( city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        else:
            job = Jobs.objects.filter(program__icontains=filterProgram).filter(job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter( city_j__name__icontains=filterLocation).filter(salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")

        # if filterProgram != "":
        #     if filterTitle != "":
        #         if filterCompany != "":
        #             if filterLocation != "":
        #                 if filterSalary != "":
        #                     if filterPostDate != "":
        #                         job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                             job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(
        #                             city_j__name__icontains=filterLocation).filter(
        #                             salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                             status="Open").order_by("-postDate")
        #                     else:
        #                         job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                             job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(
        #                             city_j__name__icontains=filterLocation).filter(
        #                             salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #                 else:
        #                     job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                         job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(
        #                         city_j__name__icontains=filterLocation).filter(status="Open").order_by("-postDate")
        #             else:
        #                 job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                     job_title__icontains=filterTitle).filter(company__icontains=filterCompany).filter(
        #                     status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                 job_title__icontains=filterTitle).filter(status="Open").order_by("-postDate")
        #
        #     elif filterCompany != "":
        #         if filterLocation != "":
        #             if filterSalary != "":
        #                 if filterPostDate != "":
        #                     job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                         company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(
        #                         salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                         status="Open").order_by("-postDate")
        #                 else:
        #                     job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                         company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(
        #                         salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #             else:
        #                 job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                     company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(
        #                     status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                 company__icontains=filterCompany).filter(status="Open").order_by("-postDate")
        #     elif filterLocation != "":
        #         if filterSalary != "":
        #             if filterPostDate != "":
        #                 job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                     city_j__name__icontains=filterLocation).filter(
        #                     salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                     status="Open").order_by("-postDate")
        #             else:
        #                 job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                     city_j__name__icontains=filterLocation).filter(
        #                     salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                 city_j__name__icontains=filterLocation).filter(status="Open").order_by("-postDate")
        #     elif filterSalary != "":
        #         if filterPostDate != "":
        #             job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                 salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                 status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(program__icontains=filterProgram).filter(
        #                 salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #     elif filterPostDate != "":
        #         job = Jobs.objects.filter(program__icontains=filterProgram).filter(postDate=filterPostDate).filter(
        #             status="Open").order_by("-postDate")
        #     else:
        #         job = Jobs.objects.filter(program__icontains=filterProgram).filter(status="Open").order_by("-postDate")
        # # 1
        # elif filterTitle != "":
        #     if filterCompany != "":
        #         if filterLocation != "":
        #             if filterSalary != "":
        #                 if filterPostDate != "":
        #                     job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                         company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(
        #                         salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                         status="Open").order_by("-postDate")
        #
        #                 else:
        #                     job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                         company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(
        #                         salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #             else:
        #                 job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                     company__icontains=filterCompany).filter(city_j__name__icontains=filterLocation).filter(
        #                     status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                 company__icontains=filterCompany).filter(status="Open").order_by("-postDate")
        #     elif filterLocation != "":
        #         if filterSalary != "":
        #             if filterPostDate != "":
        #                 job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                     city_j__name__icontains=filterLocation).filter(
        #                     salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                     status="Open").order_by("-postDate")
        #             else:
        #                 job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                     city_j__name__icontains=filterLocation).filter(
        #                     salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                 city_j__name__icontains=filterLocation).filter(status="Open").order_by("-postDate")
        #     elif filterSalary != "":
        #         if filterPostDate != "":
        #             job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                 salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                 status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(
        #                 salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #     elif filterPostDate != "":
        #         job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(postDate=filterPostDate).filter(
        #             status="Open").order_by("-postDate")
        #
        #     else:
        #         job = Jobs.objects.filter(job_title__icontains=filterTitle).filter(status="Open").order_by("-postDate")
        # # 2 3 4 5
        # elif filterCompany != "":
        #     if filterLocation != "":
        #         if filterSalary != "":
        #             if filterPostDate != "":
        #                 job = Jobs.objects.filter(company__icontains=filterCompany).filter(
        #                     city_j__name__icontains=filterLocation).filter(
        #                     salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                     status="Open").order_by("-postDate")
        #             else:
        #                 job = Jobs.objects.filter(company__icontains=filterCompany).filter(
        #                     city_j__name__icontains=filterLocation).filter(
        #                     salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(company__icontains=filterCompany).filter(
        #                 city_j__name__icontains=filterLocation).filter(status="Open").order_by("-postDate")
        #     elif filterSalary != "":
        #         if filterPostDate != "":
        #             job = Jobs.objects.filter(company__icontains=filterCompany).filter(
        #                 salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                 status="Open").order_by("-postDate")
        #         else:
        #             job = Jobs.objects.filter(company__icontains=filterCompany).filter(
        #                 salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("-postDate")
        #     elif filterPostDate != "":
        #         job = Jobs.objects.filter(company__icontains=filterCompany).filter(postDate=filterPostDate).filter(
        #             status="Open").order_by("-postDate")
        #     else:
        #         job = Jobs.objects.filter(company__icontains=filterCompany).filter(status="Open").order_by("-postDate")
        # # 3
        # elif filterLocation != "":
        #     if filterSalary != "":
        #         if filterPostDate != "":
        #             job = Jobs.objects.filter(city_j__name__icontains=filterLocation).filter(
        #                 salary_per_hour__icontains=filterSalary).filter(postDate=filterPostDate).filter(
        #                 status="Open").order_by("postDate")
        #         else:
        #             job = Jobs.objects.filter(city_j__name__icontains=filterLocation).filter(
        #                 salary_per_hour__icontains=filterSalary).filter(status="Open").order_by("postDate")
        #     elif filterPostDate != "":
        #         job = Jobs.objects.filter(city_j__name__icontains=filterLocation).filter(
        #             postDate=filterPostDate).filter(status="Open").order_by("postDate")
        #     else:
        #         job = Jobs.objects.filter(city_j__name__icontains=filterLocation).filter(status="Open").order_by(
        #             "-postDate")
        # # 4
        # elif filterSalary != "":
        #     if filterPostDate != "":
        #         job = Jobs.objects.filter(salary_per_hour__icontains=filterSalary).filter(
        #             postDate=filterPostDate).filter(status="Open").order_by("-postDate")
        #     else:
        #         job = Jobs.objects.filter(salary_per_hour__icontains=filterSalary).filter(status="Open").order_by(
        #             "-postDate")
        # # 5
        # elif filterPostDate != "":
        #     job = Jobs.objects.filter(postDate=filterPostDate)
        # # 6
        # else:
        #     job = Jobs.objects.filter(status="Open").order_by("-postDate")

        program = Jobs.objects.filter(status="Open").values_list("program", flat=True)
        title = Jobs.objects.filter(status="Open").values_list("job_title", flat=True)
        comp = Jobs.objects.filter(status="Open").values_list("company", flat=True)
        city_j = Jobs.objects.filter(status="Open").values_list("city_j", flat=True)
        salary = Jobs.objects.filter(status="Open").values_list("salary_per_hour", flat=True)
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

        #  Take the  first post   !!! with  auto id  the first result

        if post_id == "":
            post_id=job[0].id

        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            description = Jobs.objects.filter(id=post_id).values_list('description', flat=True).first()
            title = Jobs.objects.filter(id=post_id).values_list('job_title', flat=True).first()
            start_date = Jobs.objects.filter(id=post_id).values_list('start_date', flat=True).first()
            end_date = Jobs.objects.filter(id=post_id).values_list('end_date', flat=True).first()
            salary = Jobs.objects.filter(id=post_id).values_list("salary_per_hour", flat=True).first()
            hourWeek = Jobs.objects.filter(id=post_id).values_list("hour_per_work", flat=True).first()
            company = Jobs.objects.filter(id=post_id).values_list("company", flat=True).first()
            typeOfWork = Jobs.objects.filter(id=post_id).values_list("type_of_work", flat=True).first()
            hourPerWork = Jobs.objects.filter(id=post_id).values_list("hour_per_work", flat=True).first()
            housing = Jobs.objects.filter(id=post_id).values_list("housing", flat=True).first()
            housingCost = Jobs.objects.filter(id=post_id).values_list("housing_cost_per_week", flat=True).first()
            program = Jobs.objects.filter(id=post_id).values_list("program", flat=True).first()
            programCost = Jobs.objects.filter(id=post_id).values_list("programCost", flat=True).first()
            posted = Application.objects.filter(job_id=post_id).filter(user_id=request.user.id).values_list(
                "apply_date", flat=True).first()
            city_j = Jobs.objects.filter(id=post_id).values_list("city_j")

            c = city_j.first()

            city: object = City.objects.filter(id=c[0]).values_list("name", flat=True).first()
            city_uid = City.objects.filter(id=c[0]).values_list("country", flat=True).first()

            country = Country.objects.filter(id=city_uid).values_list("country", flat=True).first()
            applicant = Jobs.objects.filter(id=post_id).first()

            app = str(applicant)
            return JsonResponse(
                dict(description=description, title=title, applicant=app, city_j=city, country=country,
                     start_date=start_date,
                     salary=salary, hourWeek=hourWeek, company=company, end_date=end_date,
                     typeOfWork=typeOfWork, hourPerWork=hourPerWork, housing=housing, housingCost=housingCost,
                     program=program, programCost=programCost,
                     posted=posted, post_id=post_id))
        result = len(job)

        if len(job) != 0:
            stat=True
            return render(request, "Filters/index.html",
                          dict(job=job, stat=stat, result=result, prog=prog, title=Jtitle, company=company,
                               city=cityName, salary=sal,fprogram=filterProgram,ftitle=filterTitle,fcompany=filterCompany,flocation=filterLoc,fsalary=filterSalary+"$"))
        else:
            stat=False
            return render(request,"Filters/index.html",
                          dict(result=result, prog=prog, title=Jtitle, company=company, city=cityName, salary=sal,fprogram=filterProgram,ftitle=filterTitle,fcompany=filterCompany,flocation=filterLoc,fsalary=filterSalary))
