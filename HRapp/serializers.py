from rest_framework import pagination, serializers
from django.core.paginator import Paginator
from .models import *

class EmployeeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Employee
		fields = "__all__"


class StandardPagesPagination(pagination.PageNumberPagination):  
    page_size = 30