from django.test import TestCase, Client
from rest_framework.test import APITestCase, RequestsClient
from rest_framework.test import APIClient
from HRapp.models import Employee
from HRapp.serializers import EmployeeSerializer
from rest_framework import status
from django.urls import reverse
import os

class CRUDTest(TestCase):

    def setUp(self):
           # creating instance of a client.
        self.alpha = Employee.objects.create(
            employee_id="e00001", login= 'alpha_1', name='Alpha', salary=800000)
        self.bravo = Employee.objects.create(
            employee_id="e00002", login= 'bravo_2', name="Bravo", salary=19891.19)
        self.charlie = Employee.objects.create(
            employee_id="e00003", login="charlie_3", name="Charlie", salary=58123.11)
        self.delta = Employee.objects.create(
            employee_id="e00004", login="delta_4", name="Delta", salary=736129)
        self.client = Client()

    def test_get_employee_detail_exist(self):
        response = self.client.get(
            reverse('employee_detail_view', args=[self.alpha.employee_id]))
        e = Employee.objects.get(employee_id = self.alpha.employee_id)
        serializer = EmployeeSerializer(e)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_employee_detail_fail(self):
        response = self.client.get(
            reverse('employee_detail_view', args=["fake_employee"]))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
