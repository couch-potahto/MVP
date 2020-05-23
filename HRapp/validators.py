import csv, io

VALIDATION_ERROR_MSG = {
    "WRONG HEADER": "WRONG HEADER",
    "MISSING FIELD": "MISSING FIELD AT ROW ",
    "ID REPEATED": "ID REPEATED AT ROW ",
    "LOGIN REPEATED": "LOGIN REPEATED AT ROW "
}


def csv_invalid(csv_array):
    if len(csv_array) > 4:
        return True
    elif len(csv_array[0]) <= 0 or len(csv_array[1]) <= 0 or len(csv_array[2]) <= 0 or len(csv_array[3]) <= 0:
        return True
    elif float(csv_array[3]) < 0:
        return True
    return False
