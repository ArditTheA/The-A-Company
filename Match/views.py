from django.shortcuts import render
from django.views import View

from accounts.models import *


# Create your views here.

def GetJobApplicant(request, JobID):
    Applicant = Application.objects.filter(job_id=JobID).filter("applyDate")

    return render(request, "Applicants/")
