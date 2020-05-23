from django.db import models
from django.core.validators import MinLengthValidator
# Create your models here.
class Employee(models.Model):
	employee_id = models.CharField(max_length=200, unique=True, blank=False, validators=[MinLengthValidator(1)])
	login = models.CharField(max_length=200, unique=True, blank=False, validators=[MinLengthValidator(1)])
	name = models.CharField(max_length=200, blank=False, validators=[MinLengthValidator(1)])
	salary = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
