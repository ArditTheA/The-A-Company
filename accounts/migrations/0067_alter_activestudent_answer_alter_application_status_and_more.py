# Generated by Django 4.0.6 on 2022-12-07 09:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0066_alter_activestudent_answer_alter_jobs_postdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activestudent',
            name='answer',
            field=models.CharField(choices=[('No', 'No'), ('Yes', 'Yes')], max_length=10),
        ),
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('Read', 'Read'), ('Pennding', 'Pennding')], default='Pennding', max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='postDate',
            field=models.DateField(blank=True, default=datetime.datetime(2022, 12, 7, 9, 46, 13, 683540), null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='program',
            field=models.CharField(choices=[('Ausbildung', 'Ausbildung'), ('Trainee', 'Trainee'), ('Work and Travel', 'Work and Travel'), ('Internship', 'Internship')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='status',
            field=models.CharField(choices=[('Close', 'Close'), ('Open', 'Open')], default='Open', max_length=20),
        ),
        migrations.AlterField(
            model_name='userlanguages',
            name='level',
            field=models.CharField(choices=[('Low-Intermediate', 'Low-Intermediate'), ('High-Intermediate', 'High-Intermediate'), ('Basic', 'Basic'), ('N/A', 'N/A'), ('Advanced', 'Advanced')], max_length=255),
        ),
    ]
