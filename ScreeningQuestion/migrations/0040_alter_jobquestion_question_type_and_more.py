# Generated by Django 4.0.6 on 2023-06-23 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ScreeningQuestion', '0039_alter_jobsettings_jobsettings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobquestion',
            name='question_type',
            field=models.CharField(blank=True, choices=[('Yes/No', 'Yes/No'), ('Numeric', 'Numeric')], max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='jobsettings',
            name='jobSettings',
            field=models.CharField(choices=[('NF', 'Don’t filter out applicants. I will manually review each application sent to me'), ('F', 'Filter out & send rejection letters to applicants who dont meet qualifications')], max_length=500),
        ),
    ]
