from Match.views import *
from .views import *
from django.urls import path,include

urlpatterns = [
    path("Administrator/Applicant/JobId=<int:pk>/Phase=<str:phaseid>",getAppPhase.as_view(), name="subphaseA")
]

