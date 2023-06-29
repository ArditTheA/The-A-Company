from django import forms
from django.forms import formset_factory
from.models import *
from accounts.models import Jobs
class JobForm(forms.ModelForm):
    class Meta:
        model = Jobs
        fields = "__all__"
        widgets = {

            "job_title": forms.TextInput(
                attrs={'class': 'name-input mutual-stats font-fam next-none', "onchange": "checkForm()"}),
            "company": forms.TextInput(
                attrs={'class': 'name-input mutual-stats font-fam next-none', "onchange": "checkForm()"}),
            "start_date": forms.DateInput(
                attrs={"class": "start-date-input mutual-stats font-fam next-none", "type": "date",
                       "onchange": "checkForm()"}),
            "end_date": forms.DateInput(
                attrs={"class": "end-date-input mutual-stats font-fam next-none", "type": "date",
                       "onchange": "checkForm()"}),
            "housing_cost_per_week": forms.NumberInput(
                attrs={'class': 'name-input mutual-stats font-fam  next-none', "onchange": "checkForm()"}),
            "programCost": forms.NumberInput(
                attrs={'class': 'name-input mutual-stats font-fam next-none', "onchange": "checkForm()"}),
            "hour_per_work": forms.NumberInput(
                attrs={'class': 'name-input mutual-stats font-fam next-none', "onchange": "checkForm()"}),
            "salary_per_hour": forms.NumberInput(
                attrs={'class': 'name-input mutual-stats font-fam next-none', "onchange": "checkForm()"}),
            "approved": forms.CheckboxInput(attrs={"disabled": "disabled"}),
            "city_j": forms.TextInput(attrs={"class": "next-none", "list": "city_jlist", "onchange": "checkForm()"}),
            "type_of_work": forms.Select(attrs={"class": "next-none", "onchange": "checkForm()"}),
            "housing": forms.Select(attrs={"class": "next-none", "onchange": "checkForm()"}),
            "program": forms.Select(attrs={"class": "next-none", "onchange": "checkForm()"}),
            "country_j": forms.TextInput(
                attrs={'class': 'next-none name-input mutual-stats font-fam', "list": "country_jList",
                       "onchange": "checkForm()"}),
            "description": forms.Textarea(
                attrs={"class": "scroll inner-text second-next-none", "id": "myTextArea",})

        }

class JobSettingsForm(forms.ModelForm):
    class Meta:
        model = JobSettings
        fields = ["email","jobSettings"]

class JobQuestionForm(forms.ModelForm):
    class Meta:
        model = JobQuestion
        fields = ['promp', 'question_type','ideal_answer','qualify']


JobQuestionFormSet = formset_factory(JobQuestionForm, extra=3, min_num=0)
JobSettingsFormSet = formset_factory(JobSettingsForm, extra=1)

