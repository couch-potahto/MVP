from django.test import TestCase, Client
from rest_framework.test import APITestCase, RequestsClient
from rest_framework.test import APIClient
from HRapp.models import Employee
from HRapp.serializers import EmployeeSerializer
from rest_framework import status
from django.urls import reverse
import json
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

    def test_patch_employee_detail_salary(self):
        response = self.client.patch(
            reverse('employee_detail_view', args=["e00001"]), {"data":{"salary":"1000"}},content_type='application/json')
        e = Employee.objects.get(employee_id = self.alpha.employee_id)
        self.assertEqual(e.salary, 1000)

    def test_patch_employee_detail_salary_additional_decimal(self):
        response = self.client.patch(
            reverse('employee_detail_view', args=["e00001"]), {"data":{"salary":"1000.123"}},content_type='application/json')
        e = Employee.objects.get(employee_id = self.alpha.employee_id)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_patch_employee_detail_salary_negative(self):
        response = self.client.patch(
            reverse('employee_detail_view', args=["e00001"]), {"data":{"salary":"-1000"}},content_type='application/json')
        e = Employee.objects.get(employee_id = self.alpha.employee_id)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_patch_employee_detail_name(self):
        response = self.client.patch(reverse('employee_detail_view', args=["e00001"]), {"data":{"name":"Not Alpha"}},content_type='application/json')
        e = Employee.objects.get(employee_id = self.alpha.employee_id)
        self.assertEqual(e.name, "Not Alpha")

    def test_patch_employee_detail_login(self):
        response = self.client.patch(reverse('employee_detail_view', args=["e00001"]), {"data":{"login":"alpha_12345"}},content_type='application/json')
        e = Employee.objects.get(employee_id = self.alpha.employee_id)
        self.assertEqual(e.login, "alpha_12345")

    def test_patch_employee_detail_login_duplicate(self):
        response = self.client.patch(reverse('employee_detail_view', args=["e00001"]), {"data":{"login":"bravo_2"}},content_type='application/json')
        e = Employee.objects.get(employee_id = self.alpha.employee_id)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_patch_employee_detail_salary_invalid_field(self):
        response = self.client.patch(
            reverse('employee_detail_view', args=["e00001"]), {"data":{"invalid_field":"1000.123"}},content_type='application/json')
        e = Employee.objects.get(employee_id = self.alpha.employee_id)
        self.assertEqual(hasattr(e, 'invalid_field'), False)

    def test_delete_employee(self):
        response = self.client.delete(reverse('employee_detail_view', args=["e00001"]))
        e = Employee.objects.get(employee_id = "e00001")
        self.assertEqual(response.status_code, e.DoesNotExist)

    def test_post_employee(self):
        response = self.client.post(reverse('employee_list'), {"data":{"employee_id":"e00005", "login": "Echo 5", "name": "Echo", "salary": "12345"}}, content_type='application/json')
        e = Employee.objects.get(employee_id = "e00005")
        self.assertEqual(e.name, "Echo")

    def test_post_employee_duplicate_login(self):
        response = self.client.post(reverse('employee_list'), {"data":{"employee_id":"e00005", "login": "alpha_1", "name": "Echo", "salary": "12345"}}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_employee_duplicate_id(self):
        response = self.client.post(reverse('employee_list'), {"data":{"employee_id":"e00001", "login": "echo_5", "name": "Echo", "salary": "12345"}}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_employee_negative_salary(self):
        response = self.client.post(reverse('employee_list'), {"data":{"employee_id":"e00001", "login": "echo_5", "name": "Echo", "salary": "-12345"}}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_employee_invalid_salary(self):
        response = self.client.post(reverse('employee_list'), {"data":{"employee_id":"e00001", "login": "echo_5", "name": "Echo", "salary": "1235.1234"}}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
