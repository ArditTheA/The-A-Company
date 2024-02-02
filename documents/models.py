import os
from datetime import datetime

from django.db import models
from accounts.models import CustomUser ,Jobs
from django.dispatch import receiver
from django.db.models.signals import pre_save
# Create your models here.

def user_directory_path(instance, filename):
    # get the user's email address
    email = instance.user.email
    current_date = datetime.now().strftime('%d-%m-%Y')
    if hasattr(instance, 'id_document') and hasattr(instance.id_document, 'name'):
        document = instance.id_document.name
    else:
        document =  str(instance.id_document)
    filename, ext = os.path.splitext(filename)
    new_filename = f"{instance.user.first_name}_{instance.user.last_name}_{document}{ext}"
    # create the directory path based on the user's email
    docPath = instance.user.first_name+"_"+instance.user.last_name+"_Documents_For_Work_Permit"
    workPath = instance.user.first_name+"_"+instance.user.last_name+"_Your_Work_Permit_is_Here"
    if (document =="Passaport" or document == "Student status" or document=="Certificate of Enrolment" or document=="Student ID" or document == "Photo" or document=="Resume" or document == "Service contract"):
        return os.path.join(email,docPath,new_filename)
    else:
        return os.path.join( email,workPath, new_filename)

def recruiter_directory_path(instance, filename):
    # get the user's email address
    email = instance.user.email
    current_date = datetime.now().strftime('%d-%m-%Y')
    if instance.signed == True:

        document =  str(instance.id_document)+"signed"
    else:
        document = str(instance.id_document)
    jobid = str(instance.jobId.id)+"-"+str(instance.jobId.job_title)
    filename, ext = os.path.splitext(filename)
    new_filename = f"{current_date}-{document}{ext}"
    # create the directory path based on the user's email
    return os.path.join( email,"documents",jobid,document, new_filename)

class documents_list(models.Model):
    name = models.CharField(max_length=500)
    def __str__(self):
        return str(self.id)+" "+str(self.name)

class documents_users(models.Model):
    doc_status = [
        ("P", "Pending"),
        ("A", "Approved"),
        ("R", "Refused")
    ]
    id_document = models.ForeignKey(documents_list,on_delete=models.CASCADE,null=True,blank=True)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    document = models.FileField(upload_to=user_directory_path, null=True, blank=True)
    status = models.CharField(choices=doc_status,max_length=100,default="P")
    def __str__(self):
        status_display = [status[1] for status in self.doc_status if status[0] == self.status]
        return str(self.id_document)+" - "+str(self.user.email)+" "+str(status_display[0])

@receiver(pre_save, sender=documents_users)
def replace_existing_document(sender, instance, **kwargs):
    # Check if the document field is being updated
    if instance.pk is not None:
        old_instance = documents_users.objects.get(pk=instance.pk)
        if old_instance.document and instance.document != old_instance.document:
            # Delete the old document before saving the new one
            old_instance.document.delete(save=False)

class RecruiterDocument(models.Model):
    recruiter_doc_list = [
        ("JobOffer", "Job Offer"),
        ("WorkPermit", "Work Permit"),
    ]
    id_document = models.CharField(choices=recruiter_doc_list,max_length=100)
    jobId = models.ForeignKey(Jobs,on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    document = models.FileField(upload_to=recruiter_directory_path)
    signed = models.BooleanField(default=False)

    def __str__(self):
        name_display = [status[1] for status in self.recruiter_doc_list if status[0] == self.id_document]
        return str(name_display[0]) + " - "+self.jobId.job_title+ " - "+ str(self.user.email) + " - " + str(self.signed)