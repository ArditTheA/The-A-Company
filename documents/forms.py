from django import forms
from django.forms import modelformset_factory
from .models import documents_users
from django.core.exceptions import ValidationError

# Create a form for individual document uploads
def validate_file_extension(value):
    allowed_extensions = ['.pdf', '.jpg', '.jpeg', '.png', '.svg']
    ext = value.name.lower()[-4:]  # Get the file extension (e.g., '.pdf')
    if ext not in allowed_extensions:
        raise ValidationError(_('File type not supported. Please upload a PDF, JPG, JPEG, PNG, or SVG file.'))

class DocumentForm(forms.ModelForm):
    class Meta:
        model = documents_users
        fields = ['document']
        widgets = {
            'document': forms.FileInput(attrs={'accept': '.pdf, .jpg, .jpeg, .png, .svg'})
        }
    def clean_document(self):
        document = self.cleaned_data.get('document')
        if document:
            validate_file_extension(document)
        return document

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
