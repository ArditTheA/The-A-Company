from django.shortcuts import render, redirect
from .forms import DocumentForm
from .models import *
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

            try:
                # Try to get the existing document by ID and user
                document = documents_users.objects.get(id_document=document_id, user=request.user)
                # Update the fields of the existing document with the new data
                document.document = form.cleaned_data['document']
                # Add other fields as needed
                document.save()
                return JsonResponse({'message': 'Document updated successfully'})
            except documents_users.DoesNotExist:
                # If the document doesn't exist, create a new one
                document = form.save(commit=False)
                document.user = request.user
                document.save()
                return JsonResponse({'message': 'Document uploaded successfully'})
        else:
            return JsonResponse({'error': 'Form is not valid'}, status=400)
    else:
        form = DocumentForm()

    return render(request, 'upload_document_user.html', {'form': form})


