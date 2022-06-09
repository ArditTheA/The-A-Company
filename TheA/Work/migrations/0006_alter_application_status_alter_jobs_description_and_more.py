# Generated by Django 4.0.4 on 2022-06-09 13:02

import datetime
from django.db import migrations, models
import markdownfield.models


class Migration(migrations.Migration):

    dependencies = [
        ('Work', '0005_university_location_alter_jobs_postdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='Status',
            field=models.CharField(choices=[('Pennding', 'Pennding'), ('Read', 'Read')], max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='Description',
            field=markdownfield.models.MarkdownField(rendered_field='text_rendered'),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='PostDate',
            field=models.DateField(default=datetime.datetime(2022, 6, 9, 15, 2, 57, 945939)),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='Status',
            field=models.CharField(choices=[('Close', 'Close'), ('Open', 'Open')], default='Open', max_length=20),
        ),
    ]
