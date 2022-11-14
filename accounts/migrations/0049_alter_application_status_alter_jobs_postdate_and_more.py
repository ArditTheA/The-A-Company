# Generated by Django 4.0.6 on 2022-11-02 14:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0048_alter_application_status_alter_jobs_postdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('Pennding', 'Pennding'), ('Read', 'Read')], default='Pennding', max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='postDate',
            field=models.DateField(blank=True, default=datetime.datetime(2022, 11, 2, 14, 27, 41, 651414), null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='program',
            field=models.CharField(choices=[('Trainee', 'Trainee'), ('Ausbildung', 'Ausbildung'), ('Work and Travel', 'Work and Travel'), ('Internship', 'Internship')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='status',
            field=models.CharField(choices=[('Open', 'Open'), ('Close', 'Close')], default='Open', max_length=20),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='type_of_work',
            field=models.CharField(choices=[('Part Time', 'Part Time'), ('Full Time', 'Full Time')], max_length=50),
        ),
        migrations.AlterField(
            model_name='userlanguages',
            name='level',
            field=models.CharField(choices=[('N/A', 'N/A'), ('Advanced', 'Advanced'), ('Low-Intermediate', 'Low-Intermediate'), ('High-Intermediate', 'High-Intermediate'), ('Basic', 'Basic')], max_length=255),
        ),
    ]
