from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render, redirect

# Create your views here.
from ScreeningQuestion.models import *
from accounts.models import Jobs
from Applicant.models import *
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

