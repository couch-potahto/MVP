from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('users/upload', EmployeeDetailsUpload.as_view()),
    path('users/upload_test', employee_upload, name="upload_details")
]