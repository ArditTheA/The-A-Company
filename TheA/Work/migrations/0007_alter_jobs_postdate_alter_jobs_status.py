# Generated by Django 4.0.4 on 2022-06-09 13:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Work', '0006_alter_application_status_alter_jobs_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobs',
            name='PostDate',
            field=models.DateField(default=datetime.datetime(2022, 6, 9, 15, 5, 31, 821271)),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='Status',
            field=models.CharField(choices=[('Open', 'Open'), ('Close', 'Close')], default='Open', max_length=20),
        ),
    ]
