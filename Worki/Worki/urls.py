"""django_email_login URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django import views
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include
from django_countries import settings

assert isinstance(settings.STATIC_ROOT, object)
from accounts.views import LoginView, RegisterView,HomeTemp
from django.contrib.auth import views as auth_views
from django.contrib.auth import views as userViews
from accounts.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', registration, name='register'),
    path('logout/', userViews.LogoutView.as_view(template_name='home/home.html'), name='logout'),
    path('accounts/', include('allauth.urls')),
    path('',MainJobs.as_view(),name='home'),
    path("TermsAndCondition/",Terms,name="terms"),

     
    # forget password

    path('reset_password/',password_reset_request, name="reset_password"),

    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(template_name="accounts/password_reset_sent.html"), name="password_reset_done"),

    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="accounts/password_reset_form.html"),name="password_reset_confirm"),

    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(template_name="accounts/password_reset_done.html"), name="password_reset_complete"),
    
    path("password/change/",passChange.as_view(template_name="accounts/change_password.html"),name="password_change"),



    #profile
    path("profile/",update_profile,name="profile"),
    path("profile/Experience",Edit_user_exp,name="editExprience"),    
    path("profile/Experience/<int:pk>",Edit_user_expId,name="editExprienceId"),    
    path("profile/Education/",Edit_user_edu,name="editEdu"),
    path("profile/Education/<int:pk>/",Edit_user_EduId,name="editEduId"),
    path("profile/language/",Edit_user_language,name="editLanguage"),
    path("profile/language/<int:pk>/",Edit_User_langId,name="editLanguageId"),

    #JOBS
    # path("Jobs/Posted",getPostedJobs,name="postedJob"),
    # path("My/Jobs/<int:pk>",getPostedJobsId,name="postedJobId"),
    path("Jobs/Add",addJob,name="addJob"),
    path("Jobs/Edit/<int:pk>",editJob,name="editJob"),
    path("Jobs/Posted",AjaxHandler.as_view(),name="postedJob"),
    path("Jobs/Applied",AppliedJobs.as_view(),name="appliedJob"),


    # MainJobs
    path("apply/<int:pk>",applyForJob,name="apply"),
    path("profile/setup/1/<int:pk>",applyForJob2,name="setupPart2"),
    path("profile/setup/2/<int:pk>",applyForJob3,name="setupPart3"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

