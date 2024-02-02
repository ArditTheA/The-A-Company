
from django.contrib import admin


from .views import *
from django.urls import path,include
from django.urls import path, re_path
from .download_documents import *
urlpatterns = [
    path("upload_documents/", upload_documents, name="cc"),
    path("upload_documents_recruiter/", upload_documents_recruiter, name="c1"),
    path("upload_documents_myjobs/", upload_documents_myjobs, name="c2"),
    path('download_document/<int:document_id>/<int:userid>', download_document, name='download_document'),
    path('download_documents_as_zip/<int:userid>', DownloadDocumentsAsZipView.as_view(), name='download_documents_as_zip'),
    path('download_user_folder/<int:userid>/', UserFolderZipView.as_view(), name='download_user_folder'),
    path('download/work-permit-folder/<str:email>/', DownloadWorkPermitFolderView.as_view(), name='download_folder'),
    path('download/doc-for-work-permit-folder/<str:email>/', DownloadDocForWorkPermitFolderView.as_view(), name='download_folder'),





    path("approve_document_user/",approve_document_user),
    path("return_pennding_document/",return_pennding_document),
    path("refused_document_user/",refused_document_user),

]