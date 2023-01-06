from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Phase)
class PhaseAdmin(admin.ModelAdmin):
    search_fields = ("name",)

@admin.register(subPhase)
class SubPahaseAdmin(admin.ModelAdmin):
    list_filter = ("name","phase")

@admin.register(ApplicantSubPhase)
class ApplicantSubPhaseAdmin(admin.ModelAdmin):
    list_filter = ("subPhase",)