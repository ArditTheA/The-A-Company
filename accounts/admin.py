from django.apps import apps
from django.contrib import admin
from .models import *
from django.contrib import admin
from django.contrib.auth.mixins import PermissionRequiredMixin
# app = apps.get_app_config('accounts')
#
# for model_name, model in app.models.items():
#     admin.site.register(model)

@admin.register(Country)
class CountryUser(admin.ModelAdmin):
    search_fields = ("country",)

@admin.register(City)
class CityUser(admin.ModelAdmin):
    list_filter=("country",)

@admin.register(CustomUser)
class CustomUser(admin.ModelAdmin):
    list_filter = ("profileSetup",)




@admin.register(Languages)
class Language(admin.ModelAdmin):
    search_fields = ("language",)

@admin.register(University)
class University(admin.ModelAdmin):
    search_fields = ("name",)


@admin.register(UserExperiece)
class Experience(admin.ModelAdmin):
    list_filter = ("Country",)


@admin.register(UserEducation)
class Education(admin.ModelAdmin):
    list_filter=("degree",)

@admin.register(UserLanguages)
class Languages(admin.ModelAdmin):
    list_filter=("level",)


@admin.register(Jobs)
class JobsUser(admin.ModelAdmin):
    search_fields = ("job_title","company")
    list_filter = ("program","approved")


@admin.register(ActiveStudent)
class ActiveStudentUser(admin.ModelAdmin):
    list_filter = ("answer",)

@admin.register(Application)
class Application(admin.ModelAdmin):
    list_filter=("status",)



