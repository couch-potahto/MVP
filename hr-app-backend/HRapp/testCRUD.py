from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Employee
from rest_framework import status
import os

class CRUDTests(TestCase):

    def set_up(self):
        self.client = django.test.client.Client()

    def get_employee_detail_exist(self):
        response = self.client.get('/users/e0046')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def get_employee_detail_fail(self):
        response = self.client.get('/users/no_exist')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
