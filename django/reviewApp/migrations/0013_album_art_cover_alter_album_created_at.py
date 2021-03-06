# Generated by Django 4.0.2 on 2022-02-22 16:57

from django.db import migrations, models
import reviewApp.models


class Migration(migrations.Migration):

    dependencies = [
        ('reviewApp', '0012_alter_artist_background_image_alter_artist_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='art_cover',
            field=models.FileField(
                blank=True, null=True, upload_to=reviewApp.models.RenameImageToSlug('album/art_covers/')),
        ),
        migrations.AlterField(
            model_name='album',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
