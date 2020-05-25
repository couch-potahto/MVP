from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('users/upload', EmployeeDetailsUpload.as_view()),
    path('users', PaginatedEmployeeRecordsView.as_view(), name="employee_list"),
    path('users/<slug:id>', EmployeeDetailView.as_view(), name="employee_detail_view"),
    path('language', get_langauge)
]
