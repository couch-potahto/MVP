from django.test import TestCase
from rest_framework.test import APITestCase
from HRapp.models import Employee
from rest_framework import status
import os
# Create your tests here.
BASE_PATH = os.path.dirname(os.path.realpath(__file__))
'''
class FileUploadTests(TestCase):
    def set_up(self):
        self.client = django.test.client.Client()
    # - Can upload correct CSV file
    def test_upload(self):
        myfile = open(BASE_PATH+'/testfiles/good_test_data/5_correct.csv', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # - Reject File with Wrong Extension
    def test_wrong_ext_upload(self):
        myfile = open(BASE_PATH+'/testfiles/wrong_extension/pdf_file.pdf', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    # - Reject File with No Header
    def test_missing_header(self):
        myfile = open(BASE_PATH+'/testfiles/invalid_columns/no_header.csv', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # - Reject File with Too few columns
    def test_missing_data(self):
        myfile = open(BASE_PATH+'/testfiles/invalid_columns/too_few_columns.csv', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # - Reject File with too many columns
    def test_additional_data(self):
        myfile = open(BASE_PATH+'/testfiles/invalid_columns/too_many_columns.csv', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # - Reject File with too many columns
    def test_commented_data(self):
        myfile = open(BASE_PATH+'/testfiles/invalid_columns/commented_file.csv', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # - Reject empty File
    def test_empty_file(self):
        myfile = open(BASE_PATH+'/testfiles/empty_file/empty.csv', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # - Reject negative salary
    def test_invalid_salary(self):
        myfile = open(BASE_PATH+'/testfiles/negative_salary/5_incorrect_format_salary.csv', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_salary(self):
        myfile = open(BASE_PATH+'/testfiles/negative_salary/negative_salary.csv', 'rb')
        response = self.client.post('/users/upload', {'file': myfile})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    '''

# - Reject File with Missing Values

# - Reject File with Wrong Data Format

# - Reject Concurrent Upload of Files
