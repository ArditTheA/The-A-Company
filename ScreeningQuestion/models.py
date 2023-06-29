from django.db import models
from accounts.models import *
# Create your models here.
class JobQuestion(models.Model):
    ansType={
        ("Numeric","Numeric"),
        ("Yes/No","Yes/No")
    }
    job_id = models.ForeignKey(Jobs,on_delete=models.CASCADE)
    promp = models.CharField(max_length=500,null=True,blank=True)
    question_type = models.CharField(choices=ansType,blank=True,null=True,max_length=100)
    ideal_answer = models.CharField(max_length=100,null=True,blank=True)
    qualify = models.BooleanField(default=False)

    def __str__(self):
        return str(self.job_id)+" - "+str(self.promp)+" "+str(self.question_type)+" ± "+str(self.ideal_answer)


class JobSettings(models.Model):
    JobSettings_list ={
        ("F","Filter out & send rejection letters to applicants who dont meet qualifications"),
        ("NF","Don’t filter out applicants. I will manually review each application sent to me")
    }
    job_id = models.ForeignKey(Jobs,on_delete=models.CASCADE)
    email  = models.TextField()
    jobSettings = models.CharField(max_length=500,choices=JobSettings_list)

    def __str__(self):
        return self.jobSettings+" - "+ str(self.job_id)

class ApplicantAnswer(models.Model):
    question_id = models.ForeignKey(JobQuestion,on_delete=models.CASCADE)
    applicant_id= models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    user_answer = models.CharField(null=True,blank=True,max_length=3)


    def __str__(self):
        return str(self.question_id.id)+" - "+str(self.applicant_id.email) + " - "+ self.user_answer