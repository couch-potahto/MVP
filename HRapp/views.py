import csv, io
from django.shortcuts import render
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Employee

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

	def post(self,request,format=None):
		print('--------------------------')
		print(request.headers)
		print(request.FILES)
		print('--------------------------')
		csv_file = request.FILES['file']
		if not csv_file.name.endswith(".csv"):
			return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)