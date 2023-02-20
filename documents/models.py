import os

from django.db import models
from accounts.models import CustomUser
# Create your models here.

def user_directory_path(instance, filename):
    # get the user's email address
    email = instance.user.email
    document = instance.id_document.name
    # create the directory path based on the user's email
    return os.path.join( email,"documents",document, filename)


class documents_list(models.Model):
    name = models.CharField(max_length=500)
    def __str__(self):
        return str(self.name)

class documents_users(models.Model):
    id_document = models.ForeignKey(documents_list,on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    document = models.FileField(upload_to=user_directory_path)
    def __str__(self):
        return str(self.id_document)+" - "+str(self.user.email)


