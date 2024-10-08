# Generated by Django 4.0.6 on 2022-12-07 09:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0066_alter_activestudent_answer_alter_jobs_postdate_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('promp', models.CharField(max_length=500)),
                ('Ans1', models.CharField(blank=True, choices=[('Numeric', 'Numeric'), ('Yes/No', 'Yes/No')], max_length=100, null=True)),
                ('Qualify', models.BooleanField(default=False)),
                ('jobid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.jobs')),
            ],
        ),
    ]
