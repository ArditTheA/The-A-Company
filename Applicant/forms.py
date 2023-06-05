from django import forms

from documents.models import documents_users


class DocumentForm(forms.ModelForm):
    class Meta:
        model = documents_users
        fields = ("id_document","user","document")
        widgets = {
            'id_document': forms.HiddenInput(),  # Set widget to HiddenInput
            'user': forms.HiddenInput(),  # Set widget to HiddenInput
        }
        required = {
            'id_document': False,
            'user': False,
        }