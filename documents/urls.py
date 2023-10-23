
from django.contrib import admin


from .views import *
from django.urls import path,include

urlpatterns = [
    path("upload_documents/", upload_documents, name="cc"),

]