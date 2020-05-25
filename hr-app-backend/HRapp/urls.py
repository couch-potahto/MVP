from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('users/upload', EmployeeDetailsUpload.as_view()),
    path('users', PaginatedEmployeeRecordsView.as_view(), name="employee_list"),
    path('language', get_langauge)
]
