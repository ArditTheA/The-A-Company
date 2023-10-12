from django import forms
from django.forms import modelformset_factory
from .models import documents_users

# Create a form for individual document uploads
class DocumentForm(forms.ModelForm):
    class Meta:
        model = documents_users
        fields = '__all__'

# Create a formset for handling multiple document uploads (up to 7 documents)
DocumentFormSet = modelformset_factory(documents_users, form=DocumentForm, extra=7)

# Add custom validation to check if uploaded files are PDFs
class add_document_user(forms.ModelForm):
    class Meta:
        model = documents_users
        fields = '__all__'

    document = forms.FileField(label='Select a PDF file')

    def clean_document(self):
        document = self.cleaned_data['document']
        if document:
            if not document.name.lower().endswith('.pdf'):
                raise forms.ValidationError('Only PDF files are allowed.')
        return document
