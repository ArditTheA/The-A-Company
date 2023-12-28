
from django.contrib import admin

from Match.views import *
from ScreeningQuestion.views import *
from filters.views import getList
from .views import *
from django.urls import path,include
from .profile_ajax import *

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



    # profile ajax
    path('add_user_experience/', user_experience_ajax, name='add_user_experience'),
    path('add_user_education/', user_education_ajax, name='add_user_education'),
    path('add_user_languages/', user_language_ajax, name='add_user_languages'),
    # edits
    path('edit_user_cover/', edit_user_cover_ajax, name='edit_user_cover_ajax'),
    path('edit_user_profile/', edit_user_profile_ajax, name='edit_user_profile_ajax'),
    path('edit_user_details/', edit_user_details_ajax, name='edit_user_details_ajax'),


    #profile edit exp edu lang
    path('edit_user_experience/', edit_user_experience, name='edit_user_experience'),
    path('edit_user_education/', edit_user_education, name='edit_user_education'),
    path('edit_user_languages/', edit_user_language, name='edit_user_languages'),
    # profile ajax get data
    path('get_exp_details/', get_exp_details, name='get_exp_details'),
    path('get_edu_details/', get_edu_details, name='get_edu_details'),
    path('get_lang_details/', get_lang_details, name='get_lang_details'),

    # delete
    path("delete_user_experience/",deleteUserExp,name="delete_user_experience"),
    path("delete_user_education/",deleteUserEdu,name="delete_user_education"),
    path("delete_user_languages/",deleteUserLang,name="delete_user_languages"),

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

