# Generated by Django 4.0.6 on 2022-09-19 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0020_remove_jobs_apply_date_alter_application_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('Pennding', 'Pennding'), ('Read', 'Read')], default='Pennding', max_length=50),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='program',
            field=models.CharField(choices=[('Work And Travel', 'Work And Travel'), ('Ausbildung', 'Ausbildung'), ('Internship', 'Internship')], max_length=50),
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
            field=models.CharField(choices=[('Professional working proficiency', 'Professional working proficiency'), ('Full professional proficiency', 'Full professional proficiency'), ('Native or bilingual proficiency', 'Native or bilingual proficiency'), ('Elementary proficiency', 'Elementary proficiency'), ('Limited working proficiency', 'Limited working proficiency')], max_length=255),
        ),
    ]
