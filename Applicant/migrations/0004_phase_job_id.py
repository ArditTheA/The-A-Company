# Generated by Django 4.1.5 on 2023-01-16 12:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0077_alter_activestudent_answer_and_more'),
        ('Applicant', '0003_applicantsubphase_job_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='phase',
            name='job_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.jobs'),
        ),
    ]
