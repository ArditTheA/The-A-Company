# Generated by Django 4.0.6 on 2022-11-14 10:21

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0053_alter_jobs_housing_alter_jobs_postdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('Read', 'Read'), ('Pennding', 'Pennding')], default='Pennding', max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='housing',
            field=models.CharField(choices=[('Not provided', 'Not provided'), ('Provided', 'Provided')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='postDate',
            field=models.DateField(blank=True, default=datetime.datetime(2022, 11, 14, 10, 21, 50, 938302), null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='program',
            field=models.CharField(choices=[('Work and Travel', 'Work and Travel'), ('Trainee', 'Trainee'), ('Internship', 'Internship'), ('Ausbildung', 'Ausbildung')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='status',
            field=models.CharField(choices=[('Close', 'Close'), ('Open', 'Open')], default='Open', max_length=20),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='type_of_work',
            field=models.CharField(choices=[('Full Time', 'Full Time'), ('Part Time', 'Part Time')], max_length=50),
        ),
        migrations.AlterField(
            model_name='usereducation',
            name='degree',
            field=models.CharField(choices=[('Bachelor', 'Bachelor’s Degree'), ('Master', 'Master’s Degree')], max_length=255),
        ),
        migrations.AlterField(
            model_name='userlanguages',
            name='level',
            field=models.CharField(choices=[('High-Intermediate', 'High-Intermediate'), ('N/A', 'N/A'), ('Basic', 'Basic'), ('Low-Intermediate', 'Low-Intermediate'), ('Advanced', 'Advanced')], max_length=255),
        ),
        migrations.CreateModel(
            name='ActiveStudent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(choices=[('Y', 'Yes'), ('N', 'No')], max_length=10)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
