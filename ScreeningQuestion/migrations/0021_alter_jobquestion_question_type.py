# Generated by Django 4.1.1 on 2023-03-01 08:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ScreeningQuestion', '0020_alter_jobsettings_jobsettings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobquestion',
            name='question_type',
            field=models.CharField(blank=True, choices=[('Numeric', 'Numeric'), ('Yes/No', 'Yes/No')], max_length=100, null=True),
        ),
    ]
