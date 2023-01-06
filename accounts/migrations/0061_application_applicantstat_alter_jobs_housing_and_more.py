# Generated by Django 4.0.6 on 2022-11-28 12:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0060_alter_activestudent_answer_alter_jobs_housing_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='ApplicantStat',
            field=models.CharField(blank=True, choices=[('Qualified', 'Qualified'), ('Not qualified', 'Not qualified')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='housing',
            field=models.CharField(choices=[('Not provided', 'Not provided'), ('Provided', 'Provided')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='postDate',
            field=models.DateField(blank=True, default=datetime.datetime(2022, 11, 28, 12, 18, 59, 184174), null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='program',
            field=models.CharField(choices=[('Work and Travel', 'Work and Travel'), ('Trainee', 'Trainee'), ('Ausbildung', 'Ausbildung'), ('Internship', 'Internship')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='status',
            field=models.CharField(choices=[('Open', 'Open'), ('Close', 'Close')], default='Open', max_length=20),
        ),
        migrations.AlterField(
            model_name='usereducation',
            name='degree',
            field=models.CharField(choices=[('Bachelor', 'Bachelor’s Degree'), ('Master', 'Master’s Degree')], max_length=255),
        ),
        migrations.AlterField(
            model_name='userlanguages',
            name='level',
            field=models.CharField(choices=[('N/A', 'N/A'), ('High-Intermediate', 'High-Intermediate'), ('Basic', 'Basic'), ('Advanced', 'Advanced'), ('Low-Intermediate', 'Low-Intermediate')], max_length=255),
        ),
    ]
