from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from .models import VisitorLog, Student, StudentLog
from datetime import datetime, timedelta
from django.core.files.images import ImageFile
from PIL import Image
from django.conf import settings
import os
import base64
import re
import sys
visitor_dir = settings.BASE_DIR + "\photos\\visitor\\"
student_dir = settings.BASE_DIR + "\photos\\student\\"
def index(request):

		return render(request, 'index.html')

def student(request):
		context = {}
		if request.method == "POST":
			# try:
				first_name = request.POST['first_name']
				last_name = request.POST['last_name']
				student_number = request.POST['student_number']
				time_in = request.POST['myTimeIn']
				imgString = request.POST['myPic']
				filename = request.POST['myPicName']

				try:
					student = Student.objects.get(student_number=student_number)
				except:
					# return HttpResponseRedirect('/student')
					return render(request,'student.html',{'error_message': "You are not registered. Student number not found.",})
				print (student.student_number)
				if (first_name == student.first_name) and (last_name == student.last_name) and (student_number == student.student_number):
						if(student.active == True):
							newfilename = filename.replace(":","") + '.png'
							newfilename = newfilename[newfilename.index(" ")+1 : ]
							print (newfilename)
							imgPath = os.path.join(student_dir,newfilename)
							imgString = re.sub('^data:image/.+;base64,','',imgString)
							imgData = base64.b64decode(imgString)
							f = open(imgPath,'wb')
							f.write(imgData)
							f.close()
							StudentLog(first_name=first_name,last_name=last_name,student_number=student_number,time_in=time_in,photo=imgPath).save()
							return HttpResponseRedirect('/')
						else:
							return render(request,'student.html',{'error_message': "Your account has been deactivated.",})
				else:
					return render(request,'student.html',{'error_message': "Name and student number do not match.",})
			# except:
			# 	return HttpResponse('Your credentials do not match any record in the database.')
		else:
			return render(request, 'student.html', context)

def visitor(request):
		context = {}
		print(request.method)
		if request.method == "POST":
			first_name = request.POST['first_name']
			last_name = request.POST['last_name']
			middle_name = request.POST['middle_name']
			email=  request.POST['email']
			designation = request.POST['designation']
			office = request.POST['my_office']
			purpose = request.POST['purpose']
			organization = request.POST['organization']
			time_in = request.POST['myTimeIn']
			imgString = request.POST['myPic']
			filename = request.POST['myPicName']
			newfilename = filename.replace(":","") + '.png'
			newfilename = newfilename[newfilename.index(" ")+1 : ]
			imgPath = os.path.join(visitor_dir,newfilename)
			imgString = re.sub('^data:image/.+;base64,','',imgString)
			imgData = base64.b64decode(imgString)
			f = open(imgPath, 'wb')
			f.write(imgData)
			f.close()
			VisitorLog(first_name=first_name,last_name=last_name,middle_name=middle_name,email=email,designation=designation,office=office,purpose=purpose,organization=organization,time_in=time_in,photo=imgPath).save();
			return HttpResponseRedirect('/')
		else:
			return render(request, 'visitor.html', context)

def report(request):
	context = {}
	today = datetime.now()
	start_of_day = datetime(today.year, today.month, today.day)
	start_of_week = start_of_day - timedelta(days=start_of_day.isoweekday())
	start_of_classes = datetime(2016, 11, 1) # change to whenever is the start
	end_of_week = start_of_week + timedelta(days=6)
	# log(today)
	# log(start_of_day)
	# log(start_of_day- timedelta(days=1))
	# log(start_of_day - today <= timedelta(days=1))
	# log (start_of_day - VisitorLog.objects.all()[0].time_in)
	# log(start_of_week)
	# log(end_of_week)
	students = filter(lambda x: start_of_day - x.time_in <= timedelta(days=start_of_day.isoweekday()), StudentLog.objects.all())
	visitors = filter(lambda x: start_of_day - x.time_in <= timedelta(days=start_of_day.isoweekday()), VisitorLog.objects.all())
	student_log_count = list()
	visitor_log_count = list()
	log(students)

	d = start_of_week
	while d <= end_of_week:
		student_daily_log = filter(lambda x: d <= x.time_in < d + timedelta(days=1), students)
		visitor_daily_log = filter(lambda x: d <= x.time_in < d + timedelta(days=1), visitors)
		student_daily_log = [(i.time_in.year, i.time_in.month, i.time_in.day) for i in student_daily_log]
		visitor_daily_log = [(i.time_in.year, i.time_in.month, i.time_in.day) for i in visitor_daily_log]
		student_daily_log = set(student_daily_log)
		student_log_count.append(len(student_daily_log))
		visitor_log_count.append(len(visitor_daily_log))
		d += timedelta(days = 1)

	# log(visitors)
	# log(visitor_log_count)
	# log(StudentLog.objects.all()[0].student_number)
	# log(student_log_count)
	# log(visitors[0].time_in)

	absences = [[x.student_number, x.first_name, x.middle_name, x.last_name] for x in Student.objects.order_by('student_number')]
	num_class_days = (start_of_day - start_of_classes).days
	for x, val in enumerate(absences):
		presents = [datetime(i.time_in.year, i.time_in.month, i.time_in.day) for i in StudentLog.objects.filter(student_number=val[0])]
		presents = filter(lambda x: x < start_of_day, presents)
		# log(presents)
		presents = len(set(presents))
		# log(presents)
		absences[x].append(num_class_days - presents)
	# log(absences)
	# log(num_class_days)
	# log(start_of_day)
	# log(start_of_classes)
	# log(start_of_day - start_of_classes)
	# log(datetime.now())

	context['max_students'] = len(Student.objects.all())
	context['student_log_count'] = str(student_log_count)
	context['visitor_log_count'] = str(visitor_log_count)
	context['absences'] = absences
	return render(request, 'reports.html', context)

def log(s):
	print >>sys.stderr, str(s)

# def visitorLogin(request):
# 	first_name = request.POST['first_name']
#     last_name = request.POST['last_name']
#     email=  request.POST['email']
#     designation = request.POST['designation']
#     office = request.POST['my_office']
#     purpose = request.POST['purpose']
#     organization = request.POST['organization']
#     time_in = request.POST['time_i']
