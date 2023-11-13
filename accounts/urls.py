
from django.contrib import admin

from Match.views import *
from ScreeningQuestion.views import *
from filters.views import getList
from .views import *
from django.urls import path,include


urlpatterns = [
    path("companies",CompanyLandingPage,name="companyLandingPage"),
    path("employees",EmployeesLandingPage,name="employeesLandingPage"),
   

    path('jobs/', MainJobs.as_view(),name="jobs"),
    path('jobs/<int:pk>', MainJobsId.as_view(),name="visitJob"),
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

    path("post-job", add_JobScreeningQuestion, name="addJob"),
    path("edit-job/<int:pk>", editJob, name="editJob"),
    path("recruiter", AjaxHandler.as_view(), name="postedJob"),
    path("recruiter/open", RecruiterOpenJobs.as_view(), name="postedJobOpen"),
    path("recruiter/closed", RecruiterClosedJobs.as_view(), name="postedJobClosed"),
    path("my-jobs", AppliedJobs.as_view(), name="appliedJob"),

    # MainJobs
    path("apply/<int:pk>", applyForJobSQ, name="apply"),
    path("jobs/apply/<int:pk>", applyForJobSQ),
    path("profile/setup/1/<int:pk>", applyForJob2, name="setupPart2"),
    path("profile/setup/2/<int:pk>", applyForJob3, name="setupPart3"),

    path("Job/close/<int:pk>",CoseJob,name="closeJob"),
    path("Job/open/<int:pk>",OpenJob,name="openJob"),
    path("camera",testQR),





    path('testt/',sentNQualifiedEmail)
]

