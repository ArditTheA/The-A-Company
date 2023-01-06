# Generated by Django 4.0.6 on 2022-11-28 10:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0059_alter_application_status_alter_jobs_postdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activestudent',
            name='answer',
            field=models.CharField(choices=[('No', 'No'), ('Yes', 'Yes')], max_length=10),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='housing',
            field=models.CharField(choices=[('Provided', 'Provided'), ('Not provided', 'Not provided')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='postDate',
            field=models.DateField(blank=True, default=datetime.datetime(2022, 11, 28, 10, 43, 28, 467297), null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='program',
            field=models.CharField(choices=[('Ausbildung', 'Ausbildung'), ('Internship', 'Internship'), ('Trainee', 'Trainee'), ('Work and Travel', 'Work and Travel')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='status',
            field=models.CharField(choices=[('Close', 'Close'), ('Open', 'Open')], default='Open', max_length=20),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='type_of_work',
            field=models.CharField(choices=[('Part Time', 'Part Time'), ('Full Time', 'Full Time')], max_length=50),
        ),
        migrations.AlterField(
            model_name='userlanguages',
            name='level',
            field=models.CharField(choices=[('N/A', 'N/A'), ('Low-Intermediate', 'Low-Intermediate'), ('Basic', 'Basic'), ('High-Intermediate', 'High-Intermediate'), ('Advanced', 'Advanced')], max_length=255),
        ),
    ]
