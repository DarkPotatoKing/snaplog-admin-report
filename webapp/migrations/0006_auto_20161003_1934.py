# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-03 11:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0005_auto_20161003_1824'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visitorlog',
            name='time_in',
            field=models.DateTimeField(),
        ),
    ]