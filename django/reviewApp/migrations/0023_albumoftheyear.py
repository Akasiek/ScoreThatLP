# Generated by Django 4.0.2 on 2022-02-22 22:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reviewApp', '0022_albumlink'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlbumOfTheYear',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.IntegerField()),
                ('album_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='aoty', to='reviewApp.album')),
            ],
        ),
    ]
