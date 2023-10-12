from django.shortcuts import render, redirect
from .forms import DocumentForm, DocumentFormSet
from .models import *
def upload_documents(request):
    # Initialize the formset with the queryset (empty in this case)
    formset = DocumentFormSet(queryset=documents_users.objects.none())
    user = request.user
    if request.method == 'POST':
        formset = DocumentFormSet(request.POST, request.FILES, queryset=documents_users.objects.none())
        if formset.is_valid():
            formset.save()  # This will save the uploaded documents to the database
            return redirect('success_page')  # Replace with your success page URL
    else:
        formset = DocumentFormSet()

    return render(request, 'upload_document_user.html', {'formset': formset})
