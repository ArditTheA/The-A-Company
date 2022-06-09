
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Country(models.Model):
    Country = models.CharField(max_length=255)

    def __str__(self):
        return self.Country


class Languages(models.Model):
    Language = models.CharField(max_length=255)

    def __str__(self):
        return self.Language

class City(models.Model):
    Country = models.ForeignKey(Country, on_delete=models.CASCADE)
    Name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.Name)+" | "+str(self.Country)
# Create your models here.

class University(models.Model):
    Name = models.CharField(max_length=500)
    Location = models.ForeignKey(City,on_delete=models.CASCADE,default=1)
    def __str__(self):
        return str(self.Name)+" | "+str(self.Location)

class UserExperiece(models.Model):
    UserId = models.ForeignKey(User, on_delete=models.CASCADE)
    Title = models.CharField(max_length=500)
    Company = models.CharField(max_length=255)
    # Country = models.ForeignKey(country_names)
    City = models.ForeignKey(City, on_delete=models.CASCADE)
    StartDate = models.DateField()
    EndDate = models.DateField(null=True)

    def __str__(self):
        return str(self.UserId)+" : "+str(self.Title)


class UserEducation(models.Model):
    UserId = models.ForeignKey(User, on_delete=models.CASCADE)
    University = models.ForeignKey(University, on_delete=models.CASCADE)
    Degree = models.CharField(max_length=255)
    FieldOfStudy = models.CharField(max_length=255)
    StartYear = models.DateField()
    EndYear = models.DateField()
    TotalExamplesPassed = models.IntegerField(default=0)
    GPA = models.FloatField(default=0.0)
    def __str__(self):
        return str(self.UserId)+" | "+str(self.University)

class UserLanguages(models.Model):
    Level_Choice = {
        ("Advanced", "Advanced")
    }
    UserId = models.ForeignKey(User, on_delete=models.CASCADE)
    Language = models.ForeignKey(Languages, on_delete=models.CASCADE)
    level = models.CharField(max_length=255, choices=Level_Choice)

    def __str__(self):
        return str(self.UserId)+" | " + str(self.Language)+" | "+str(self.level)

# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
class Jobs(models.Model):
    TypeofWork = {
        ('Full Time','Full Time')
    }
    Housing_type={
        ("Provided","Provided")
    }
    Program_Type={
        ("Work And Travel","Work And Travel")
    }
    Stat={
        ("Open","Open"),
        ("Close","Close"),
    }
    JobTitle = models.CharField(max_length=255)
    Company = models.CharField(max_length=255)
    City = models.ForeignKey(City,on_delete=models.CASCADE)
    SalaryPerHour = models.IntegerField()
    TypeOfWork = models.CharField(max_length=50,choices=TypeofWork)
    HourPerWork = models.IntegerField(default=0)
    StartDate = models.DateField()
    EndDate = models.DateField()
    Housing = models.CharField(max_length=50,choices=Housing_type)
    HousingCostPWeek = models.IntegerField()
    Program = models.CharField(max_length=50,choices=Program_Type)
    ProgramCost = models.IntegerField()
    Logo = models.ImageField()
    Description = models.TextField()

    Status = models.CharField(max_length=20,choices=Stat,default="Open")
    PostDate = models.DateField(default=datetime.now())
    UserId = models.ForeignKey(User,on_delete=models.CASCADE)
    Approved = models.BooleanField(default=False)

    def __str__(self):
        return str(self.JobTitle)+" | "+str(self.Company)

class Application(models.Model):
    Stat_type={
        ("Pennding","Pennding"),
        ("Read","Read")
    }
    JobsId= models.ForeignKey(Jobs,on_delete=models.CASCADE)
    UserId = models.ForeignKey(User,on_delete=models.CASCADE)
    ApplyDate = models.DateField()
    Status = models.CharField(max_length=50,choices=Stat_type)

    def __str__(self):
        return str(self.JobsId)+" | "+str(self.UserId)+" | "+str(self.ApplyDate)