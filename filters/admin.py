from django.contrib import admin
from .models import *
from django.contrib import admin
from django.contrib.auth.mixins import PermissionRequiredMixin
admin.site.register(UserCountry)
admin.site.register(UserCity)
admin.site.register(UserUni)


@admin.register(Search)
class SearchAdmin(admin.ModelAdmin):
    search_fields = ('search',)
    list_filter = ("search","user_id")
    # list_max_show_all = ("search")
    # date_hierarchy="search"
    # list_display = ["user_id","search"]

# Register your models here.
