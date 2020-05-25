from rest_framework.response import Response
from rest_framework import status

def csv_invalid(csv_array):
    if len(csv_array) > 4:
        return True
    elif len(csv_array[0]) <= 0 or len(csv_array[1]) <= 0 or len(csv_array[2]) <= 0 or len(csv_array[3]) <= 0:
        return True
    elif float(csv_array[3]) < 0:
        return True
    return False

def query_request_invalid(query_d):
    valid_sort_by = ['name', '-name', 'id', '-id', 'salary', '-salary', 'login', '-login']
    try:
        if len(query_d) > 5 or len(query_d) < 5:
            return True
        if 'minSalary' not in query_d or 'maxSalary' not in query_d or 'offset' not in query_d or 'limit' not in query_d or 'sort' not in query_d:
            return True
        if float(query_d['maxSalary']) < float(query_d['minSalary']) or float(query_d['maxSalary']) < 0 or float(query_d['minSalary']) < 0:
            return True
        if query_d['sort'] not in valid_sort_by:
            return True
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return False
