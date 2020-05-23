from django.db import models
from django.core.validators import

# Create your models here.
class Employee(models.Model):
	employee_id = models.CharField(max_length=200, required=True)
	login = models.CharField(max_length=200, required=True)
	name = models.CharField(max_length=200, required=True)
	salary = models.DecimalField(max_digits=10, decimal_places=2)
