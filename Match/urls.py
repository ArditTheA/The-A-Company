
from .views import *
from django.urls import path,include
from .Users_Views import *
urlpatterns = [
    path("match/redirect/jobId/<int:pk>", redirectApplicant, name="redirectApp"),
    path("match/jobId/<int:pk>", getApplicant, name="applicant"),
    path("match/getUserData",UsersReq.as_view()),
    path("match/jobId/DocumentsForWorkPermit/<int:pk>", getDocumentForWorkPermitUser,name="documentForWorkPermit"),
    path("match/jobId/Documents/WorkPermit/<int:pk>", getDocumentYourWorkPermitIsHere,name="workPermitHere"),

    path("match/qualified/jobID/<int:pk>", getApplicantQualified,
         name="qualified-applicant"),
    path("match/not-qualified/jobID/<int:pk>", getApplicantNoQualified,
         name="nonqualified-applicant"),


    path("match/JobID/<int:jpk>/userid/<str:userid>",moveToQualify,name="qualify"),
    path("Administrator/Applicant/No/JobID=<int:jpk>/userid=<str:userid>",moveToNoQualify,name="noqualify"),


    path("Administrator/Applicant/JobId=<int:pk>/Phase=<str:phaseid>",getAppPhase.as_view(), name="subphaseA"),
    path("Administrator/Applicant/JobId=<int:pk>/Phase=<str:phaseid>/applicant=<str:userId>",moveToPhase,name="moveApplicant"),
    path("Administrator/Jobs",getTopJobs),


]

