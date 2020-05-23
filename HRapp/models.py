from django.db import models
from decimal import *
from django.core.validators import MinValueValidator
# Create your models here.
class Employee(models.Model):
	employee_id = models.CharField(max_length=200, unique=True, blank=False)
	login = models.CharField(max_length=200, unique=True, blank=False)
	name = models.CharField(max_length=200, blank=False)
	salary = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
