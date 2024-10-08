# Generated by Django 4.0.6 on 2022-12-01 14:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0062_alter_application_status_alter_jobs_housing_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activestudent',
            name='answer',
            field=models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=10),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='postDate',
            field=models.DateField(blank=True, default=datetime.datetime(2022, 12, 1, 14, 29, 19, 161304), null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='program',
            field=models.CharField(choices=[('Internship', 'Internship'), ('Ausbildung', 'Ausbildung'), ('Work and Travel', 'Work and Travel'), ('Trainee', 'Trainee')], max_length=50),
        ),
        migrations.AlterField(
            model_name='userlanguages',
            name='level',
            field=models.CharField(choices=[('Advanced', 'Advanced'), ('Low-Intermediate', 'Low-Intermediate'), ('N/A', 'N/A'), ('Basic', 'Basic'), ('High-Intermediate', 'High-Intermediate')], max_length=255),
        ),
    ]
