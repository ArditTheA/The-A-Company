from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from datetime import datetime
from django.urls import reverse 
from django.utils import timezone
from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

today = timezone.now

from io import BytesIO
from PIL import Image

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.exceptions import ValidationError

class Country(models.Model):
    country = models.CharField(max_length=255)

    def __str__(self):
        return self.country



class City(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Country,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)+", "+str(self.country)

def user_directory_path_cover(instance, filename):
    return '{0}/Images/Cover/{1}'.format(instance.email, filename)
def user_directory_path_profile(instance, filename):
    return '{0}/Images/Profile/{1}'.format(instance.email, filename)




def validate_file_size(value):
    filesize= value.size
    if filesize > 20971520:
        raise ValidationError("The maximum file size that can be uploaded is 20MB")
    else:
        return value
class CustomUser(AbstractUser):
    sex_choice=[
        ("M","Male"),
        ("F","Female"),
    ]
    username=models.CharField(max_length=255,null=True,blank=True)
    email = models.EmailField(_('email'), unique=True,null=False,blank=False)
    
    profile = models.ImageField(upload_to=user_directory_path_profile,default="defaultProfile.jpg")
    cover = models.ImageField(upload_to=user_directory_path_cover,default="defaultCover.jpg")
    sex = models.CharField(choices=sex_choice,max_length=10,null=True,blank=True)
    profileSetup = models.BooleanField(default=False)
    city = models.CharField(max_length=255,null=True,blank=True)
    country = models.CharField(max_length=255,null=True,blank=True)
    phone_number= models.CharField(max_length=255,null=True,blank=True)
    birthday = models.DateField(null = True,blank=True)
    picture = models.TextField(null=True, blank=True)


    def __str__(self):
        return self.email+" "+ self.first_name+" "+ self.last_name

    def get_absolute_url(self):
        return reverse("profile", kwargs={"pk": self.pk})

    def save(self, *args, **kwargs):
        if self.profile:
            img = Image.open(self.profile)
            # Rotate the image based on its Exif Orientation data
            if hasattr(img, '_getexif'):
                exif = img._getexif()
                if exif is not None:
                    orientation = exif.get(0x0112)
                    if orientation == 3:
                        img = img.transpose(Image.ROTATE_180)
                    elif orientation == 6:
                        img = img.transpose(Image.ROTATE_270)
                    elif orientation == 8:
                        img = img.transpose(Image.ROTATE_90)

            img.thumbnail((1280, 980))

            # Compress the image
            output = BytesIO()
            img.save(output, format='JPEG', optimize=True, quality=60)
            output.seek(0)

            # Set the content type and filename of the compressed image
            self.profile.file = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.profile.name.split('.')[0], 'image/jpeg', output.getbuffer().nbytes, None)
        if self.cover:
            img = Image.open(self.cover)
            # Rotate the image based on its Exif Orientation data
            if hasattr(img, '_getexif'):
                exif = img._getexif()
                if exif is not None:
                    orientation = exif.get(0x0112)
                    if orientation == 3:
                        img = img.transpose(Image.ROTATE_180)
                    elif orientation == 6:
                        img = img.transpose(Image.ROTATE_270)
                    elif orientation == 8:
                        img = img.transpose(Image.ROTATE_90)

            img.thumbnail((1280, 980))
            # Compress the image
            output = BytesIO()
            img.save(output, format='JPEG', optimize=True, quality=60)
            output.seek(0)
            # Set the content type and filename of the compressed image
            self.cover.file = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.cover.name.split('.')[0],
                                                     'image/jpeg', output.getbuffer().nbytes, None)
        super(CustomUser, self).save(*args, **kwargs)


class Languages(models.Model):
    language = models.CharField(max_length=255)

    def __str__(self):
        return self.language


# Create your models here.

class University(models.Model):
    name = models.CharField(max_length=500)
    def __str__(self):
        return str(self.name)

class UserExperiece(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    company = models.CharField(max_length=255)
    Country = models.CharField(max_length=255,null=True,blank=True)
    city_usExp = models.CharField(max_length=255,null=True,blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True,blank=True)

    def __str__(self):
        return str(self.user_id)+" : "+str(self.title)


class UserEducation(models.Model):
    degree_choice={
        ("Bachelor","Bachelor’s Degree"),
        ("Master","Master’s Degree")
    }
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    university = models.CharField(max_length=255)
    degree = models.CharField(max_length=255,choices=degree_choice)
    country_e = models.CharField(max_length=255,null=True,blank=True)
    city_e = models.CharField(max_length=255,null=True,blank=True)
    field_of_study = models.CharField(max_length=255)
    start_year = models.DateField()
    end_year = models.DateField(null=True,blank=True)
    total_examples_passed = models.IntegerField(default=0)
    GPA = models.FloatField(default=0.0)
    def __str__(self):
        return str(self.user_id)+" | "+str(self.university)

class UserLanguages(models.Model):
    Level_Choice = {
        ("Advanced", "Advanced"),
        ("High-Intermediate","High-Intermediate"),
        ("Low-Intermediate","Low-Intermediate"),
        ("Basic","Basic"),
        ("N/A","N/A")

    }
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    language = models.ForeignKey(Languages, on_delete=models.CASCADE)
    level = models.CharField(max_length=255, choices=Level_Choice)

    def __str__(self):
        return str(self.user_id)+" | " + str(self.language)+" | "+str(self.level)

class Jobs(models.Model):
    TypeofWork = {
        ('Full Time','Full Time'),
        ('Part Time','Part Time')
    }
    Housing_type={
        ("Provided","Provided"),
        ("Not provided","Not provided")
    }
    Program_Type={
        ("Work and Travel","Work and Travel"),
        ("Internship","Internship"),
        ("Trainee","Trainee"),
        ("Ausbildung","Ausbildung")
        

    }
    Stat={
        ("Open","Open"),
        ("Close","Close"),
    }
    job_title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    city_j = models.CharField(max_length=255)
    country_j = models.CharField(max_length=255)
    salary_per_hour = models.FloatField()
    tips = models.BooleanField(default=False)
    type_of_work = models.CharField(max_length=50,choices=TypeofWork)
    hour_per_work = models.IntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    housing = models.CharField(max_length=50,choices=Housing_type)
    housing_cost_per_week = models.FloatField()
    program = models.CharField(max_length=50,choices=Program_Type)
    programCost = models.IntegerField()
    logo = models.ImageField(upload_to="JobLogo")
    description = models.TextField(null=True,blank=True)
    recommended = models.BooleanField(default=False)
    positionLeft = models.IntegerField(default=0,null=True,blank=True)
    deadline = models.DateField(default=datetime.now(),blank=True,null=True)
    status = models.CharField(max_length=20,choices=Stat,default="Open")
    postDate = models.DateField(default=datetime.now(),blank=True,null=True)
    user_id = models.ForeignKey(CustomUser,on_delete=models.CASCADE, null=True,blank=True)
    approved = models.BooleanField(default=False)
    shareWith = models.ManyToManyField(CustomUser,related_name="shared",blank=True)
    applicant = models.ManyToManyField(CustomUser, related_name="applicant", blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.save_author = True
        super(Jobs, self).save(*args, **kwargs)
        if hasattr(self, 'save_author'):
            self.shareWith.add(CustomUser.objects.get(pk=kwargs['request'].user.pk))

    @property
    def total_applicant(self):
        return self.applicant.count()
    def days_left(self):

        d1 = datetime.now().date()
        d2 = self.deadline
        delta = d2 - d1
        return delta.days
    def day_left_new(self):
        d1 = datetime.now().date()
        d2 = self.postDate
        delta = d1 - d2
        return delta.days

    def __str__(self):
        return str(self.id)+" - "+str(self.job_title)+ " - " +str(self.company)+" - "+str(self.city_j)+ " - "+str(format(self.postDate,"%d/%m/%Y"))+  " - "+ str(self.approved)+" - "+str(self.id)+" - "+str(self.total_applicant)


class ActiveStudent(models.Model):
    Answer_type={
        ("Yes","Yes"),
        ("No","No")
    }
    user_id = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    answer = models.CharField(max_length=10,choices=Answer_type)
    def __str__(self):
        return str(self.user_id)+" "+str(self.answer)

class Application(models.Model):
    Stat_type={
        ("Pennding","Pennding"),
        ("Read","Read")
    }
    Applicant_stat={
        ("Qualified","Qualified"),
        ("Not qualified","Not qualified")

    }
    job_id= models.ForeignKey(Jobs,on_delete=models.CASCADE)
    user_id = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    apply_date = models.DateField(default=today)
    status = models.CharField(max_length=50,choices=Stat_type,default="Pennding")
    ApplicantStat = models.CharField(max_length=50,choices=Applicant_stat,null=True,blank=True)

    def __str__(self):
        return str(self.job_id)+" | "+str(self.user_id)+" | "+str(self.apply_date)