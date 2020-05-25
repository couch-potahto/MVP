import csv, io
from django.shortcuts import render
from django.contrib import messages
from rest_framework.settings import api_settings
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status, generics, filters
from django.core.exceptions import SuspiciousOperation
from .models import *
from .validators import *
from .serializers import *
from .custom_mixins import *
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
			return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

		data_set = csv_file.read().decode('utf-8-sig')
		io_string = io.StringIO(data_set)

		i = 0
		with transaction.atomic():
			for column in csv.reader(io_string, delimiter=","):
				if i == 0:
					if column != ['id', 'login', 'name', 'salary']:
						raise SuspiciousOperation('Header Not Found!')
					i = i+1
				else:
					if column[0][0] == "#":
						continue
					elif csv_invalid(column):
						raise SuspiciousOperation('One or more of your rows may have been formatted wrongly!')
					else:
						obj, created = Employee.objects.update_or_create(
							employee_id = column[0],
							defaults={
							'login': column[1],
							'name': column[2],
							'salary': column[3]
						})
			return Response(status=status.HTTP_200_OK)

class PaginatedEmployeeRecordsView(APIView, MyPaginationMixin):
	serializer_class = EmployeeSerializer
	pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

	def get(self, request):
		resolve_id = {'id': 'employee_id', '-id': '-employee_id'}
		params = request.query_params
		print(params)
		if query_request_invalid(params):
			raise ValidationError()
		try:
			if params['sort'] == 'id':
				p = resolve_id[params['sort']]
			else:
				p = params['sort']

			queryset = Employee.objects.all().filter(salary__gte=params['minSalary'], salary__lte=params['maxSalary']).order_by(p)
		except:
			raise ValidationError()
		page = self.paginate_queryset(queryset)

		if page is not None:
			serializer = self.serializer_class(page, many=True)
			return self.get_paginated_response(serializer.data)
