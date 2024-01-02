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

from accounts.task import scheduler

assert isinstance(settings.STATIC_ROOT, object)
from django.contrib.auth import views as auth_views
from django.contrib.auth import views as userViews
from accounts.views import *
from  filters.views import *
from resetpassword.views import *
from Match.views import *
from ScreeningQuestion.views import *
from django.contrib.auth import views as auth_views
from accounts.views import *



urlpatterns = [

    path('accounts/', include('allauth.urls')),
    path('accounts/', include('allauth.socialaccount.urls')),
    # path('accounts/', include(default_urlpatterns)),

    path('admin/', admin.site.urls),
    path('sign-in/', LoginView.as_view(), name='login'),
    path('login/', login_redirect),
    path('create-account/', newregister, name='register'),
    path('logout/', userViews.LogoutView.as_view(template_name='home/home.html'), name='logout'),
    path('', landingPage, name='home'),
    # path('', MainJobs.as_view(), name='home'),

    #Jobs  / Profile / Posted / Aplied
    path("",include('accounts.urls')),
    path("",include('landingpage.urls')),


    # Filters
    path("", include('filters.urls')),
    # Match
    path("", include('Match.urls')),
    #reset password
    path("", include('resetpassword.urls')),
    path("", include('documents.urls')),
    #Screening Question
    path("", include('ScreeningQuestion.urls')),
    path("",include("Applicant.urls")),
    path("",include("stripe.urls")),
    path('sitemap.xml', TemplateView.as_view(template_name='Worki_Sitemap.xml', content_type='text/xml'),name='sitemap'),
    path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type='text/plain'), name='robots.txt'),

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

# Start the APScheduler when the Django app is ready
def start_scheduler(sender, **kwargs):
    scheduler.start()

# Signal to start the scheduler when the Django app is ready
from django.apps import AppConfig

class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'account'

    def ready(self):
        start_scheduler(self)

# Assign the AppConfig to your app
default_app_config = 'account.AccountConfig'

