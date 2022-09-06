from django.db import models
from accounts.models import CustomUser,Jobs
# Create your models here.

class Search(models.Model):
    user_id=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    search = models.CharField(max_length=255)

    def  __str__(self):
        return str(self.user_id)+" -- "+str(self.search)
