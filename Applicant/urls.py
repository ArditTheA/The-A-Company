from Match.views import *
from .views import *
from django.urls import path,include

urlpatterns = [

    path("Administrator/Users/CV/<int:pk>",generate_cv,name='generate_pdf'),
    path("Administrator/Admin/Job/email",changeEmailForJobs),
    path("Administrator/Admin/Job/deadline",setDaysLeft),
    path('download-cv/<int:pk>', generate_cv, name='download_cv'),
    path("test/app/<int:jpk>/<str:appSub>/<str:userList>",moveApplicantToPhase),
    path("test/app/<str:appSub>/<int:jpk>",getApplicantOnPhase.as_view())
]

