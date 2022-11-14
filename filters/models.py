from pyexpat import model
from django.db import models
from accounts.models import CustomUser,Jobs
# Create your models here.

class Search(models.Model):
    user_id=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    search = models.CharField(max_length=255)

    def  __str__(self):
        return str(self.user_id)+" -- "+str(self.search)


class UserCountry(models.Model):
    Country = models.CharField(max_length=255)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    def __str__(self):
        return self.Country
    
class UserCity(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    def __str__(self):
        return self.name+" "+str(self.user)

class UserUni(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return self.name

