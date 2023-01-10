from Match.views import *
from .views import *
from django.urls import path,include

urlpatterns = [
    path("jobs/", OneSelFilter.as_view(), name="filter"),
    path("search/", getList, name="search"),
    path("Administrator/Applicant", GetJobApplicant, name="newApplication"),
    path("Administrator/Applicant/all", GetAllApplication, name="allApplication"),
    path("Administrator/Applicant/profile/<int:pk>", GetUserProfile, name="visitProfile"),
    path("Administrator/Applicant/Read", MarkApplicantAsRead, name="markAsRead"),
    path("Administrator/Applicant/Stats", GetStats, name="stats"),
]

