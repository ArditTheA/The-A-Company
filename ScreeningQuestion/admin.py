from django.contrib import admin
from ScreeningQuestion.models import *
# Register your models here.




@admin.register(JobSettings)
class JobSettignsAdmin(admin.ModelAdmin):
    list_filter = ("jobSettings","job_id")