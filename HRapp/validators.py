import csv, io

VALIDATION_ERROR_MSG = {
    "WRONG HEADER": "WRONG HEADER",
    "MISSING FIELD": "MISSING FIELD AT ROW ",
    "ID REPEATED": "ID REPEATED AT ROW ",
    "LOGIN REPEATED": "LOGIN REPEATED AT ROW "
}




def csv_content_validator(csv_file):
    io_string = io.StringIO(csv_file)
    i = 0
    errors = []
    unique_id = {}
    unique_login = {}
    for column in csv.reader(io_string, delimiter=","):
        print(column)
        if i == 0:
            if column != ["id", "login", "name", "salary"]:
                errors.append(VALIDATION_ERROR_MSG["WRONG HEADER"])
        else:
            if len(column) < 4:
                errors.append(VALIDATION_ERROR_MSG["MISSING_FIELD"] + string(i))
            if column[0] in unique_id:
                errors.append(VALIDATION_ERROR_MSG["ID REPEATED"] + string(i))
            else:
                unique_id[column[0]] = 1
            if column[1] in unique_login:
                errors.append(VALIDATION_ERROR_MSG["LOGIN REPEATED"] + string(i))
            else:
                unique_login[column[0]] = 1
        i = i+1
    return errors
