from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):
    username=models.CharField(max_length=255,null=True,blank=True)
    email = models.EmailField(_('email'), unique=True,null=False,blank=False)
