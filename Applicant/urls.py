from Match.views import *
from .views import *
from django.urls import path,include

urlpatterns = [
    path("Make/Jobs/Mine/all",MakeAllJobs),
    path("Make/Jobs/Add/Phase",addPhase),
    path("Add/Default/SQ",addSq),
    path("Administrator/User/CV/<int:pk>",CreateCV),
    path("Administrator/Users/CV/<int:pk>",generate_pdf,name='generate_pdf'),
    path("Administrator/Admin/Job/email",changeEmailForJobs),
    path("Administrator/Admin/Job/deadline",setDaysLeft)
]

