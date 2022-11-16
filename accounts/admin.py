from django.apps import apps
from django.contrib import admin
from .models import *
from django.contrib import admin
from django.contrib.auth.mixins import PermissionRequiredMixin
# app = apps.get_app_config('accounts')
#
# for model_name, model in app.models.items():
#     admin.site.register(model)

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ["job_id","user_id"]
    list_filter = ("user_id","job_id")

@admin.register(CustomUser)
class CustomUser(admin.ModelAdmin):
    list_filter = ("sex","profileSetup")

@admin.register(Jobs)
class JobsUser(admin.ModelAdmin):
    search_fields = ("job_title","company")
    list_filter = ("program","approved")

@admin.register(Country)
class CountryUser(admin.ModelAdmin):
    search_fields = ("country",)

@admin.register(UserEducation)
class UserEducationUser(admin.ModelAdmin):
    list_filter = ("user_id","university")


@admin.register(ActiveStudent)
class ActiveStudentUser(admin.ModelAdmin):
    list_filter = ("user_id","answer")