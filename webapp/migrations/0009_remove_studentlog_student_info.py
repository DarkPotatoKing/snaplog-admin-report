# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-04 08:03
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0008_auto_20161004_1521'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentlog',
            name='student_info',
        ),
    ]
