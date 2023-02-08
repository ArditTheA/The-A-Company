from django.contrib import admin

from Match.views import *
from ScreeningQuestion.views import *
from filters.views import getList
from .views import *
from django.urls import path,include

urlpatterns = [

    path('accounts/', include('allauth.urls')),
    path('<int:pk>', MainJobsId.as_view(), name="visitJob"),
    path('jobs/<int:pk>', MainJobsId.as_view()),
    path("TermsAndCondition/", Terms, name="terms"),

    # profile
    path("profile/", update_profile, name="profile"),
    path("profile/Experience", Edit_user_exp, name="editExprience"),
    path("profile/Experience/<int:pk>", Edit_user_expId, name="editExprienceId"),
    path("profile/Education/", Edit_user_edu, name="editEdu"),
    path("profile/Education/<int:pk>/", Edit_user_EduId, name="editEduId"),
    path("profile/language/", Edit_user_language, name="editLanguage"),
    path("profile/language/<int:pk>/", Edit_User_langId, name="editLanguageId"),

    # JOBS

    path("Jobs/Add", add_JobScreeningQuestion, name="addJob"),
    path("Jobs/Edit/<int:pk>", editJob, name="editJob"),
    path("Jobs/Posted", AjaxHandler.as_view(), name="postedJob"),
    path("Jobs/Applied", AppliedJobs.as_view(), name="appliedJob"),

    # MainJobs
    path("apply/<int:pk>", applyForJob, name="apply"),
    path("jobs/apply/<int:pk>", applyForJob),
    path("jobs/apply/test/<int:pk>", applyForJobSQ),
    path("profile/setup/1/<int:pk>", applyForJob2, name="setupPart2"),
    path("profile/setup/2/<int:pk>", applyForJob3, name="setupPart3"),

    path("Job/close/<int:pk>",CoseJob,name="closeJob"),
    path("Job/open/<int:pk>",OpenJob,name="openJob"),

]

