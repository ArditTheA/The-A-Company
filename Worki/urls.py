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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include

assert isinstance(settings.STATIC_ROOT, object)
from django.contrib.auth import views as auth_views
from django.contrib.auth import views as userViews
from accounts.views import *
from  filters.views import *
from resetpassword.views import *
from Match.views import *
from ScreeningQuestion.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('create-account/', registration, name='register'),
    path('logout/', userViews.LogoutView.as_view(template_name='home/home.html'), name='logout'),
    path('', landingPage, name='home'),
    # path('', MainJobs.as_view(), name='home'),

    #Jobs  / Profile / Posted / Aplied
    path("",include('accounts.urls')),

    # Filters
    path("", include('filters.urls')),
    # Match
    path("", include('Match.urls')),
    #reset password
    path("", include('resetpassword.urls')),
    #Screening Question
    path("", include('ScreeningQuestion.urls')),
    path("",include("Applicant.urls")),
    path("",include("stripe.urls")),

                  path("password_reset", password_reset_request, name="password_reset"),

                  # path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='main/password/password_reset_done.html'), name='password_reset_done'),
                  # path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="main/password/password_reset_confirm.html"), name='password_reset_confirm'),
                  # path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='main/password/password_reset_complete.html'), name='password_reset_complete'),

                  path('password_reset/done/',
                       auth_views.PasswordResetDoneView.as_view(template_name='main/password/password_reset_done.html'),
                       name='password_reset_done'),
                  path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
                      template_name="main/password/password_reset_confirm.html"), name='password_reset_confirm'),
                  path('reset/done/', auth_views.PasswordResetCompleteView.as_view(
                      template_name='main/password/password_reset_complete.html'), name='password_reset_complete'),

              ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

