from distutils.command.upload import upload
from email.policy import default
from hashlib import blake2b
from tkinter.tix import Tree
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from datetime import datetime
from django.urls import reverse 
from django.utils import timezone
today = timezone.now

class Country(models.Model):
    country = models.CharField(max_length=255)

    def __str__(self):
        return self.country



class City(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Country,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

class CustomUser(AbstractUser):
    sex_choice=[
        ("M","Male"),
        ("F","Female"),
    ]
    username=models.CharField(max_length=255,null=True,blank=True)
    email = models.EmailField(_('email'), unique=True,null=False,blank=False)
    profile = models.ImageField(upload_to="profile",default="default.jpeg")
    cover = models.ImageField(upload_to="cover",default="default.png")
    sex = models.CharField(choices=sex_choice,max_length=10,null=True)
    profileSetup = models.BooleanField(default=False)
    city = models.ForeignKey(City,on_delete=models.CASCADE,null=True,blank=True)
    country = models.ForeignKey(Country,on_delete=models.CASCADE,null=True, blank=True)
    phone_number= models.CharField(max_length=255,null=True,blank=True)
    birthday = models.DateField(null = True,blank=True)
    def __str__(self):
        return self.email+" "+ self.first_name+" "+ self.last_name
    
    def get_absolute_url(self):
        return reverse("profile", kwargs={"pk": self.pk})

class Languages(models.Model):
    language = models.CharField(max_length=255)

    def __str__(self):
        return self.language


# Create your models here.

class University(models.Model):
    name = models.CharField(max_length=500)
    location = models.ForeignKey(City,on_delete=models.CASCADE,default=1)
    def __str__(self):
        return str(self.name)+" | "+str(self.location)

class UserExperiece(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    company = models.CharField(max_length=255)
    Country = models.ForeignKey(Country,on_delete=models.CASCADE)
    city_usExp = models.ForeignKey(City, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True,blank=True)

    def __str__(self):
        return str(self.user_id)+" : "+str(self.title)


class UserEducation(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    degree = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    start_year = models.DateField()
    end_year = models.DateField(null=True,blank=True)
    total_examples_passed = models.IntegerField(default=0)
    GPA = models.FloatField(default=0.0)
    def __str__(self):
        return str(self.user_id)+" | "+str(self.university)

class UserLanguages(models.Model):
    Level_Choice = {
        ("Elementary proficiency", "Elementary proficiency"),
        ("Limited working proficiency","Limited working proficiency"),
        ("Professional working proficiency","Professional working proficiency"),
        ("Full professional proficiency","Full professional proficiency"),
        ("Native or bilingual proficiency","Native or bilingual proficiency")

    }
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    language = models.ForeignKey(Languages, on_delete=models.CASCADE)
    level = models.CharField(max_length=255, choices=Level_Choice)

    def __str__(self):
        return str(self.user_id)+" | " + str(self.language)+" | "+str(self.level)

class Jobs(models.Model):
    TypeofWork = {
        ('Full Time','Full Time')
    }
    Housing_type={
        ("Provided","Provided")
    }
    Program_Type={
        ("Ausbildung","Ausbildung"),
        ("Internship","Internship"),
        ("Work And Travel","Work And Travel"),
        

    }
    Stat={
        ("Open","Open"),
        ("Close","Close"),
    }
    job_title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    city_j = models.ForeignKey(City,on_delete=models.CASCADE)
    country_j = models.ForeignKey(Country,on_delete=models.CASCADE)
    salary_per_hour = models.IntegerField()
    type_of_work = models.CharField(max_length=50,choices=TypeofWork)
    hour_per_work = models.IntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    housing = models.CharField(max_length=50,choices=Housing_type)
    housing_cost_per_week = models.IntegerField()
    program = models.CharField(max_length=50,choices=Program_Type)
    programCost = models.IntegerField()
    logo = models.ImageField(upload_to="JobLogo")
    description = models.TextField(null=True,blank=True)

    status = models.CharField(max_length=20,choices=Stat,default="Open")
    postDate = models.DateField(default=today)
    user_id = models.ForeignKey(CustomUser,on_delete=models.CASCADE, null=True,blank=True)
    approved = models.BooleanField(default=False)

    applicant = models.ManyToManyField(CustomUser, related_name="applicant", blank=True)
    apply_date = models.DateField(null=True,blank=True)

    @property
    def total_applicant(self):
        return self.applicant.count()


    def __str__(self):
        return str(self.applicant.count())

class Application(models.Model):
    Stat_type={
        ("Pennding","Pennding"),
        ("Read","Read")
    }
    job_id= models.ForeignKey(Jobs,on_delete=models.CASCADE)
    user_id = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    apply_date = models.DateField(default=today)
    status = models.CharField(max_length=50,choices=Stat_type,default="Pennding")

    def __str__(self):
        return str(self.job_id)+" | "+str(self.user_id)+" | "+str(self.apply_date)