import csv, io
from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse
from rest_framework.settings import api_settings
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework import status, generics, filters
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.core.exceptions import SuspiciousOperation
from .models import *
from .validators import *
from .serializers import *
from .custom_mixins import *
from django.db import transaction, OperationalError, IntegrityError
import json
import time

class EmployeeDetailsUpload(APIView):
	'''
	assumption:
	employee_ids assigned with no error and never changes.
	'''

	def post(self,request,format=None):
		csv_file = request.FILES['file']

		if not csv_file.name.endswith(".csv"):
			return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

		data_set = csv_file.read().decode('utf-8-sig')
		io_string = io.StringIO(data_set)

		i = 0
		try:
			with transaction.atomic():
				for column in csv.reader(io_string, delimiter=","):
					if i == 0:
						if column != ['id', 'login', 'name', 'salary']:
							raise SuspiciousOperation('Header Incorrect!')
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

		except OperationalError:
			return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)
		except IntegrityError:
			return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

		return Response(status=status.HTTP_200_OK)


class PaginatedEmployeeRecordsView(APIView, MyPaginationMixin):
	serializer_class = EmployeeSerializer
	pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

	def post(self, request, format=None):
		salary_is_valid = salary_validator(request)
		if salary_is_valid == True:
			serializer = EmployeeSerializer(data = request.data['data'])

			if serializer.is_valid():
				serializer.save()
				return Response(data=serializer.data, status=status.HTTP_200_OK)
			return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		else:
			return salary_is_valid

	def get(self, request):
		resolve_id = {'id': 'employee_id', '-id': '-employee_id'}
		params = request.query_params
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

class EmployeeDetailView(APIView):

	def get_object(self, id):
		return Employee.objects.get(employee_id=id)

	def patch(self, request, id):
		employee = self.get_object(id)
		salary_is_valid = salary_validator(request)
		if salary_is_valid != True:
			return salary_is_valid

		serializer = EmployeeSerializer(employee, data=request.data['data'], partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_200_OK, data=serializer.data)
		else:
			return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def get(self, request, id):
		try:
			employee = self.get_object(id)
		except Employee.DoesNotExist:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		serializer = EmployeeSerializer(employee)
		return Response(serializer.data)

	def delete(self, request, id):
		try:
			employee = self.get_object(id)
		except Employee.DoesNotExist:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		employee.delete()
		return Response(status=status.HTTP_200_OK)


def get_langauge(request):
	return HttpResponse(request.LANGUAGE_CODE)
