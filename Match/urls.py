
from .views import *
from django.urls import path,include

urlpatterns = [
    path("match/jobId=<int:pk>", GetJobIdApplicant.as_view(), name="applicant"),
    path("match/qualified/jobID=<int:pk>", GetJobIdApplicantQualified.as_view(),
         name="qualified-applicant"),
    path("match/not-qualified/jobID=<int:pk>", GetJobIdApplicantNQualified.as_view(),
         name="nonqualified-applicant"),


    path("match/JobID=<int:jpk>/userid=<str:userid>",moveToQualify,name="qualify"),
    path("Administrator/Applicant/No/JobID=<int:jpk>/userid=<str:userid>",moveToNoQualify,name="noqualify"),


    path("Administrator/Applicant/JobId=<int:pk>/Phase=<str:phaseid>",getAppPhase.as_view(), name="subphaseA"),
    path("Administrator/Applicant/JobId=<int:pk>/Phase=<str:phaseid>/applicant=<str:userId>",moveToPhase,name="moveApplicant"),
    path("Administrator/Jobs",getTopJobs),


]

