from django.db import models

# Create your models here.
class Employee(models.Model):
	employee_id = models.CharField(max_length=200, unique=True)
	login = models.CharField(max_length=200, unique=True)
	name = models.CharField(max_length=200)
	salary = models.DecimalField(max_digits=10, decimal_places=2)
