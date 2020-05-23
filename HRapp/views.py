import csv, io
from django.shortcuts import render
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Employee
from .validators import csv_invalid
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
		csv_file = request.FILES['file']
		if not csv_file.name.endswith(".csv"):
			print("HERE")
			return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

		data_set = csv_file.read().decode('utf-8-sig')
		io_string = io.StringIO(data_set)

		i = 0

		with transaction.atomic():
			for column in csv.reader(io_string, delimiter=","):
				print(column)
				if i == 0:
					if column != ['id', 'login', 'name', 'salary']:
						raise BadData('Header Not Found!')
					i = i+1
				else:
					if column[0][0] == "#":
						continue
					elif csv_invalid(column):
						raise BadData('Row Not Found!')
					else:
						obj, created = Employee.objects.update_or_create(
							employee_id = column[0],
							defaults={
							'login': column[1],
							'name': column[2],
							'salary': column[3]
						})
			return Response(status=status.HTTP_200_OK)
