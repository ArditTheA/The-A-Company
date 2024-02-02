import os
import shutil
import zipfile
import tempfile
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.conf import settings
from accounts.models import CustomUser


@method_decorator(login_required, name='dispatch')
class DownloadDocForWorkPermitFolderView(View):
    def get(self, request, email):
        user = CustomUser.objects.get(email=email)
        path = f'{user.first_name}_{user.last_name}_Documents_For_Work_Permit'
        user_folder_path = os.path.join(settings.MEDIA_ROOT, email, path)
        if not os.path.exists(user_folder_path):
            return HttpResponse("Folder not found", status=404)

        temp_dir = tempfile.mkdtemp()
        zip_file_path = os.path.join(temp_dir, 'downloaded_folder.zip')

        try:
            with zipfile.ZipFile(zip_file_path, 'w') as zip_file:
                for root, dirs, files in os.walk(user_folder_path):
                    for file in files:
                        file_path = os.path.join(root, file)
                        arcname = os.path.relpath(file_path, user_folder_path)
                        zip_file.write(file_path, arcname=arcname)

            with open(zip_file_path, 'rb') as zip_file:
                response = HttpResponse(zip_file.read(), content_type='application/zip')
                response['Content-Disposition'] = f'attachment; filename={path}.zip'

            return response

        finally:
            shutil.rmtree(temp_dir)



@method_decorator(login_required, name='dispatch')
class DownloadWorkPermitFolderView(View):
    def get(self, request, email):
        user = CustomUser.objects.get(email=email)
        path = f'{user.first_name}_{user.last_name}_Your_Work_Permit_is_Here'
        user_folder_path = os.path.join(settings.MEDIA_ROOT, email, path)
        if not os.path.exists(user_folder_path):
            return HttpResponse("Folder not found", status=404)

        temp_dir = tempfile.mkdtemp()
        zip_file_path = os.path.join(temp_dir, 'downloaded_folder.zip')

        try:
            with zipfile.ZipFile(zip_file_path, 'w') as zip_file:
                for root, dirs, files in os.walk(user_folder_path):
                    for file in files:
                        file_path = os.path.join(root, file)
                        arcname = os.path.relpath(file_path, user_folder_path)
                        zip_file.write(file_path, arcname=arcname)

            with open(zip_file_path, 'rb') as zip_file:
                response = HttpResponse(zip_file.read(), content_type='application/zip')
                response['Content-Disposition'] = f'attachment; filename={path}.zip'

            return response

        finally:
            shutil.rmtree(temp_dir)
