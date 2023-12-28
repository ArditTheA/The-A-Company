from django.shortcuts import render, redirect
from .forms import DocumentForm
from .models import *
from django.http import FileResponse
from django.shortcuts import get_object_or_404

import os
import zipfile
from django.http import HttpResponse
from django.views.generic import View
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.utils.text import slugify
from Applicant.views import generate_cv
import tempfile


import os
import shutil
import zipfile
from django.http import HttpResponse
from django.conf import settings
from django.views import View



def approve_document_user(request):
    try:
        document_id = request.POST.get("document_id")
        user_id = request.POST.get("user_id")
        doc = documents_users.objects.get(
            id_document=document_id,
            user_id=user_id
        )
        doc.status = "A"
        print(doc.status)
        doc.save()
        return JsonResponse({'message': 'Education information updated successfully'})
    except documents_users.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Education not found.'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid year format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})


def refused_document_user(request):
    try:
        document_id = request.POST.get("document_id")
        user_id = request.POST.get("user_id")
        doc = documents_users.objects.get(
            id_document=document_id,
            user_id=user_id
        )
        doc.status = "R"
        print(doc.status)
        doc.save()
        return JsonResponse({'message': 'Education information updated successfully'})
    except documents_users.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Education not found.'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid year format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})









class UserFolderZipView(View):
    def get(self, request, userid):
        # Define the path to the user's folder based on their email.
        user = CustomUser.objects.get(id=userid)
        email = user.email
        user_folder_path = os.path.join(settings.MEDIA_ROOT, email)

        if os.path.exists(user_folder_path):
            # Create a temporary directory to store the zip file.
            temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp_zip')
            os.makedirs(temp_dir, exist_ok=True)

            # Define the path for the zip file.
            zip_file_path = os.path.join(temp_dir, f'{email}.zip')

            try:
                # Create a zip file from the user's folder.
                with zipfile.ZipFile(zip_file_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
                    for root, _, files in os.walk(user_folder_path):
                        for file in files:
                            file_path = os.path.join(root, file)
                            arcname = os.path.relpath(file_path, user_folder_path)
                            zipf.write(file_path, arcname=arcname)

                # Open the zip file for reading.
                with open(zip_file_path, 'rb') as zip_file:
                    response = HttpResponse(zip_file.read(), content_type='application/zip')
                    response['Content-Disposition'] = f'attachment; filename={user.first_name}_{user.last_name}.zip'
                return response
            finally:
                # Clean up by removing the temporary directory and zip file.
                shutil.rmtree(temp_dir)
        else:
            # Handle the case where the user folder does not exist.
            return HttpResponse("User folder not found", status=404)



class DownloadDocumentsAsZipView(View):
    def get(self, request,userid):
        user = CustomUser.objects.get(id=userid)
        documents = documents_users.objects.filter(user=user)

        temp_dir = tempfile.mkdtemp()
        zip_filename = f"{user.first_name}_{user.last_name}_documents.zip"

        with zipfile.ZipFile(os.path.join(temp_dir, zip_filename), 'w', zipfile.ZIP_DEFLATED) as zipf:
            for document in documents:
                document_path = document.document.path
                zipf.write(document_path, os.path.basename(document_path))

            # Add the generated CV PDF to the zip
            cv_response = generate_cv(request, user.id)
            with open(os.path.join(temp_dir, f"{user.first_name}_{user.last_name}.pdf"), 'wb') as cv_file:
                cv_file.write(cv_response.content)
                zipf.write(cv_file.name, os.path.basename(cv_file.name))

        with open(os.path.join(temp_dir, zip_filename), 'rb') as zip_file:
            response = HttpResponse(zip_file.read(), content_type='application/zip')
            response['Content-Disposition'] = f'attachment; filename="{zip_filename}"'
            return response


def download_document(request, document_id, userid):
    print("-------------------")
    print("-------------------")
    print(documents_list.objects.get(id=document_id))
    print(CustomUser.objects.get(id=userid))
    print(documents_users.objects.get(id_document=document_id,user_id=userid))
    print("-------------------")
    print("-------------------")
    user = get_object_or_404(CustomUser, pk=userid)  # Replace CustomUser with your user model
    doc =documents_users.objects.get(id_document=document_id,user_id=userid)
    
    response = FileResponse(doc.document, as_attachment=True)
    return response




def upload_documents_tt(request):
    # Initialize the form with the queryset (empty in this case)
    form = DocumentForm()
    user = request.user
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()  # This will save the uploaded documents to the database
            return redirect('cc')  # Replace with your success page URL
    else:
        form = DocumentForm()

    return render(request, 'upload_document_user.html', {'form': form})


from django.http import JsonResponse
from django.contrib.auth.decorators import login_required  # Import the login_required decorator


@login_required
def upload_documents(request):
    if request.method == 'POST' and request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            document_id = request.POST.get('document_id')
            print("--------------")
            print("--------------")
            print(document_id)
            print("---------TESTTT-----")
            print("--------------")
            try:
                print("-----------ASD--------")
                print(documents_list.objects.get(id=document_id))
                print("---------Non EXISTS")
                # Try to get the existing document by ID and user
                document = documents_users.objects.get(id_document=document_id, user=request.user)
                # Update the fields of the existing document with the new data
                document.document = form.cleaned_data['document']
                document.id_document= documents_list.objects.get(id=document_id)
                # Add other fields as needed
                document.save()
                print(document)
                return JsonResponse({'message': 'Document updated successfully'})
            except documents_users.DoesNotExist:
                print("-----------qweD--------")
                print(documents_list.objects.get(id=document_id))
                print("---------EXISTS")
                # If the document doesn't exist, create a new one
                document = form.save(commit=False)
                document.user = request.user
                document.id_document=documents_list.objects.get(id=document_id)
                document.save()
                print("-----")
                print(document)
                print("-----")

                return JsonResponse({'message': 'Document uploaded successfully'})
        else:
            return JsonResponse({'error': 'Form is not valid'}, status=400)
    else:
        form = DocumentForm()

    return render(request, 'upload_document_user.html', {'form': form})




@login_required
def upload_documents_recruiter(request):
    print("hereeeeee")
    if request.method == 'POST' and request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        print("hrereererere")
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            document_id = request.POST.get('document_id')
            user_id = request.POST.get("user_id")
            print("---------------")
            print("---------------")
            print(user_id)
            print("---------------")
            print("---------------")
            try:
                # Try to get the existing document by ID and user
                document = documents_users.objects.get(id_document=document_id, user=user_id)
                # Update the fields of the existing document with the new data
                document.document = form.cleaned_data['document']
                document.id_document= documents_list.objects.get(id=document_id)
                # Add other fields as needed
                document.status = "P"
                document.save()
                print(document)
                return JsonResponse({'message': 'Document updated successfully'})
            except documents_users.DoesNotExist:
                # If the document doesn't exist, create a new one
                document = form.save(commit=False)
                document.user = CustomUser.objects.get(id=user_id)
                document.id_document=documents_list.objects.get(id=document_id)
                document.save()


                return JsonResponse({'message': 'Document uploaded successfully'})
        else:
            print("-------------------")
            print("-------------------")
            print(form.errors)
            print("-------------------")
            print("-------------------")
            return JsonResponse({'error': 'Form is not valid'}, status=400)
    else:
        print("-------------------")
        print("-------------------")
        print(form.errors)
        print("-------------------")
        print("-------------------")
        form = DocumentForm()

    return render(request, 'upload_document_user.html', {'form': form})




from django.shortcuts import render
from django.http import JsonResponse

@login_required
def upload_documents_myjobs(request):
    if request.method == 'POST' and request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        try:
            document_id = request.POST.get("mydocument_id")
            print("--------------")
            print("--------------")
            print("--------------")
            print(document_id)
            print("--------------")
            print("--------------")
            user_id = request.user
            id_myjob_document = request.FILES.get("myjob_document")

            # Additional file validation can be added here

            # Check if the document already exists for the user
            document = documents_users.objects.get(id_document=document_id, user=user_id)
            document.document = id_myjob_document
            document.save()

            return JsonResponse({'message': 'Document updated old successfully'})
        except documents_users.DoesNotExist:
            # Document does not exist, create a new one
            document_id = request.POST.get("mydocument_id")
            print("--------------")
            print("--------------")
            print("--------------")
            print(document_id)
            print("--------------")
            print("--------------")

            user_id = request.user
            id_myjob_document = request.FILES.get("myjob_document")

            # Additional file validation can be added here

            doc = documents_users()
            doc.user = user_id
            doc.id_document = documents_list.objects.get(id=document_id)
            doc.document = id_myjob_document
            doc.save()

            return JsonResponse({'message': 'Document uploaded new successfully'})
        except Exception as e:
            # Handle other exceptions (e.g., file validation errors)
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)

    return render(request, 'upload_document_user.html')