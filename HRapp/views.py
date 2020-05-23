import csv, io
from django.shortcuts import render
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Employee
from .validators import csv_content_validator
from django.db import transaction

class BadData(Exception):
    pass
# Create your views here.

def employee_upload(request):

	template="upload.html"
	data = Employee.objects.all()

	prompt = {
		'order:': 'Order of CSV should be xxx, yyy, zzz',
		'employees': data
	}
	if request.method == "GET":
		return render(request, template, prompt)
	csv_file = request.FILES['lol']
	print(request.headers)
	print(request.FILES)
	print(csv_file)


class EmployeeDetailsUpload(APIView):
	'''assumption:
		employee_ids assigned smartly. HR collaborates to assign
	'''

	def post(self,request,format=None):
		print('--------------------------')
		print(request.headers)
		print(request.FILES)
		print('--------------------------')
		csv_file = request.FILES['file']
		if not csv_file.name.endswith(".csv"):
			print("HERE")
			return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
		#get all IDs and lock first
		data_set = csv_file.read().decode('utf-8-sig')
		io_string = io.StringIO(data_set)
		i = 0
		with transaction.atomic():
			for column in csv.reader(io_string, delimiter=","):
				if i == 0:
					if column != ['id', 'login', 'name', 'salary']:
						return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
					i = i+1
				else:
					if len(column[0]) <=0 or len(column[1]) <=0 or len(column[2]) <=0 or len(column[3]) <=0:
						raise BadData('Row not found!')
						#return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
					else:
						obj, created = Employee.objects.update_or_create(
							employee_id = column[0],
							login = column[1],
							name = column[2],
							salary = column[3]
						)
			return Response(status=status.HTTP_200_OK)

		#has_errors = csv_content_validator(data_set)
