# Generated by Django 4.0.2 on 2022-03-08 22:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reviewApp', '0038_alter_review_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reviewer',
            name='slug',
        ),
    ]
