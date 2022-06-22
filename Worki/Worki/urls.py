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
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', userViews.LogoutView.as_view(template_name='home/home.html'), name='logout'),
    path('accounts/', include('allauth.urls')),
    path('',HomeTemp,name='home'),
    # forget password

    path('reset_password/',password_reset_request, name="reset_password"),

    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(template_name="accounts/password_reset_sent.html"), name="password_reset_done"),

    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="accounts/password_reset_form.html"),name="password_reset_confirm"),

    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(template_name="accounts/password_reset_done.html"), name="password_reset_complete"),
    
    path("password/change/",passChange.as_view(template_name="accounts/change_password.html"),name="password_change"),

    #profile

    path("profile/",profile,name="profile"),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

