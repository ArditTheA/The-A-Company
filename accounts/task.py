# tasks.py
import time

from apscheduler.schedulers.background import BackgroundScheduler
from django.core.mail import send_mail, EmailMultiAlternatives
from django.http import BadHeaderError, HttpResponse
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string, get_template

from accounts.models import Jobs, Application

scheduler = BackgroundScheduler()
from accounts.views import CalendlyAPI
def my_task():
    CalendlyAPI()
    # Your task logic here


scheduler.add_job(my_task, 'interval', hours=1)
scheduler.start()


