# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-05 07:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0010_auto_20161004_1616'),
    ]

    operations = [
        migrations.AddField(
            model_name='visitorlog',
            name='photo',
            field=models.ImageField(default='visitor_log/None/no-img.jpg', upload_to='visitor_log'),
        ),
    ]
