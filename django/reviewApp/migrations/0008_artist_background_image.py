# Generated by Django 4.0.2 on 2022-02-21 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviewApp', '0007_artist_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='background_image',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
