# import datetime
from django.db import models
# from __future__ import unicode_literals
from django.contrib import admin
from PIL import Image
from django.utils import timezone
from django.conf import settings
from django.utils.html import format_html
visitor_dir = settings.BASE_DIR + "\photos\\visitor\\"
student_dir = settings.BASE_DIR + "\photos\\student\\"
# Create your models here.
class Student(models.Model):
	# """docstring for UserProfile"""
	# def __init__(self, arg):
	# 	super(UserProfile, self).__init__()
	# 	self.arg = arg

	first_name = models.CharField(max_length=30)
	middle_name = models.CharField(max_length=30,)
	last_name = models.CharField(max_length=30)
	student_number = models.CharField(max_length=9,unique=True)
	email = models.EmailField(max_length=50,unique=True)
	active = models.BooleanField(default=True)
	created_on = models.DateTimeField(default=timezone.now)

	class Meta:
		unique_together = (('first_name','last_name'))

	def __str__(self):
		 # return '{} {} {}'.format(self.first_name, self.last_name, self.student_number)
		 return self.student_number

class VisitorLog(models.Model):

	first_name = models.CharField(max_length=30)
	middle_name = models.CharField(max_length=30)
	last_name = models.CharField(max_length=30)
	email = models.EmailField(max_length=50)
	designation = models.CharField(max_length=50)
	office = models.CharField(max_length=50)
	purpose = models.CharField(max_length=50)
	organization = models.CharField(max_length=50)
	time_in = models.DateTimeField(default=timezone.now)
	photo = models.ImageField(upload_to='visitor_dir', null=True)
	# def image_tag(self):
	# 	return format_html('<img src="%s" width="150" height="150" />' % (self.photo.url))
	# image_tag.short_description = 'Image'
	def __str__(self):
		 # return '{} {} {}'.format(self.first_name, self.last_name, self.student_number)
		return '%s %s' % (self.first_name, self.last_name)

class StudentLog(models.Model):
	first_name = models.CharField(max_length=30,null=True)
	last_name = models.CharField(max_length=30,null=True)
	student_number = models.CharField(max_length=9,null=True)
	time_in = models.DateTimeField(default=timezone.now)
	photo = models.ImageField(upload_to='student_dir',null=True)

	# def image_tag(self):
	# 	return format_html('<img src="%s" width="150" height="150" />' % (self.photo.url))
	# image_tag.short_description = 'Image'
		# image_tag.allow_tags = True

	def __str__(self):
		 # return '{} {} {}'.format(self.first_name, self.last_name, self.student_number)
		return '%s %s' % (self.first_name, self.last_name)

# class Photo(models.Model):
# 	image = models.ImageField(upload_to=visitor_photos, null=True, blank=True, default=None)
# 	filename = models.CharField(max_length=60, blank=True, null=True)