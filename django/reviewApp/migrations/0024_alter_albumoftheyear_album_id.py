# Generated by Django 4.0.2 on 2022-02-22 23:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reviewApp', '0023_albumoftheyear'),
    ]

    operations = [
        migrations.AlterField(
            model_name='albumoftheyear',
            name='album_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='aoty', to='reviewApp.album'),
        ),
    ]
