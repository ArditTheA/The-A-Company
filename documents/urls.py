
from django.contrib import admin


from .views import *
from django.urls import path,include
from django.urls import path, re_path

urlpatterns = [
    path("upload_documents/", upload_documents, name="cc"),
    path("upload_documents_recruiter/", upload_documents_recruiter, name="c1"),
    path('download_document/<int:document_id>/<int:userid>', download_document, name='download_document'),
    path('download_documents_as_zip/<int:userid>', DownloadDocumentsAsZipView.as_view(), name='download_documents_as_zip'),
    path('download_user_folder/<int:userid>/', UserFolderZipView.as_view(), name='download_user_folder'),

]