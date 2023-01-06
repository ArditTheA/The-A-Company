from django.apps import apps
from django.contrib import admin, messages
from .models import *
from django.contrib import admin
from django.contrib.auth.mixins import PermissionRequiredMixin
from rangefilter.filters import DateRangeFilter, DateTimeRangeFilter, NumericRangeFilter

# app = apps.get_app_config('accounts')
#
# for model_name, model in app.models.items():
#     admin.site.register(model)
from django.utils.translation import ngettext
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


@admin.action(description='Mark selected job unapproved')
def makeN_published(self, request, queryset):
        updated = queryset.update(approved=False)
        self.message_user(request, ngettext(
            '%d job was successfully marked as unnaproved.',
            '%d jobs were successfully marked as unapproved.',
            updated,
        ) % updated, messages.SUCCESS)

@admin.action(description="Mark as recommended")
def make_recommended(modeladmin,request,queryset):
    queryset.update(recommended=True)\

@admin.action(description="Mark as not recommended")
def make_Nrecommended(modeladmin,request,queryset):
    queryset.update(recommended=False)





@admin.action(description='Mark selected job approved')
def make_published(modeladmin, request, queryset):
    queryset.update(approved=False)


@admin.register(Jobs)
class JobsUser(admin.ModelAdmin):
    search_fields = ("job_title","company")
    list_filter = ("program","approved","recommended",("positionLeft", NumericRangeFilter),("postDate",DateRangeFilter))

    actions = [makeN_published,make_published,make_recommended,make_Nrecommended]




@admin.register(ActiveStudent)
class ActiveStudentUser(admin.ModelAdmin):
    list_filter = ("answer",)

@admin.register(Application)
class Application(admin.ModelAdmin):
    list_filter=("status","ApplicantStat")



