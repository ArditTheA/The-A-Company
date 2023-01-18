from django.db import models
from accounts.models import *
# Create your models here.
class Phase(models.Model):
    name = models.CharField(max_length=255)
    user_id = models.ForeignKey(CustomUser,models.CASCADE)
    job_id = models.ForeignKey(Jobs,models.CASCADE,null=True,blank=True)
    def __str__(self):
        return self.name

class subPhase(models.Model):
    name = models.CharField(max_length=255)
    phase = models.ForeignKey(Phase,on_delete=models.CASCADE)
    def __str__(self):
        return self.name+" - "+str(self.phase)

class ApplicantSubPhase(models.Model):
    subPhase = models.ForeignKey(subPhase,on_delete=models.CASCADE)
    user_id = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    job_id = models.ForeignKey(Jobs,on_delete=models.CASCADE,null=True,blank=True)
    def __str__(self):
        return str(self.subPhase)+" - "+str(self.user_id)