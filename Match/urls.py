
from .views import *
from django.urls import path,include

urlpatterns = [
    path("Administrator/Applicant/JobID=<int:pk>", GetJobIdApplicant.as_view(), name="applicant"),
    path("Administrator/Applicant/Qualified/JobID=<int:pk>", GetJobIdApplicantQualified.as_view(),
         name="qualified-applicant"),
    path("Administrator/Applicant/NQualified/JobID=<int:pk>", GetJobIdApplicantNQualified.as_view(),
         name="nonqualified-applicant"),


    path("Administrator/Applicant/JobID=<int:jpk>/userid=<str:userid>",moveToQualify,name="qualify"),
    path("Administrator/Applicant/No/JobID=<int:jpk>/userid=<str:userid>",moveToNoQualify,name="noqualify"),

]

