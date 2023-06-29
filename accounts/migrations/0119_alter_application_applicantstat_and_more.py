# Generated by Django 4.0.6 on 2023-06-19 07:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0118_application_meetwithus_application_meetwithuslink_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='ApplicantStat',
            field=models.CharField(blank=True, choices=[('Qualified', 'Qualified'), ('Not qualified', 'Not qualified')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('Read', 'Read'), ('Pennding', 'Pennding')], default='Pennding', max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='deadline',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 6, 19, 7, 15, 53, 593595), null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='housing',
            field=models.CharField(choices=[('Not provided', 'Not provided'), ('Provided', 'Provided')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='postDate',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 6, 19, 7, 15, 53, 593633), null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='program',
            field=models.CharField(choices=[('Internship', 'Internship'), ('Work and Travel', 'Work and Travel'), ('Trainee', 'Trainee'), ('Ausbildung', 'Ausbildung')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='type_of_work',
            field=models.CharField(choices=[('Part Time', 'Part Time'), ('Full Time', 'Full Time')], max_length=50),
        ),
        migrations.AlterField(
            model_name='userlanguages',
            name='level',
            field=models.CharField(choices=[('Low-Intermediate', 'Low-Intermediate'), ('N/A', 'N/A'), ('Basic', 'Basic'), ('High-Intermediate', 'High-Intermediate'), ('Advanced', 'Advanced')], max_length=255),
        ),
    ]
