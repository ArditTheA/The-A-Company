# tasks.py

from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()
from accounts.views import CalendlyAPI
def my_task():
    CalendlyAPI()
    # Your task logic here
    print("Hey There im Runnning from Sam!")

scheduler.add_job(my_task, 'interval', hours=1)
scheduler.start()
