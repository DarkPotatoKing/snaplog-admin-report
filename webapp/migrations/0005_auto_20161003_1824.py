# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-03 10:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0004_auto_20161003_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visitorlog',
            name='time_in',
            field=models.DateTimeField(verbose_name=['%Y-%m-%d %H:%M:%S']),
        ),
    ]
