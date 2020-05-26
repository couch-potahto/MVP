# MVP
This is the source code for the TechHunt2020 Assignment. There is a Django backend which serves the required APIs described in the assignment, to a React frontend. It will thus be ideal to have two terminals open to start both projects.

## Installation Guide
First, clone the repository into your local machine. 
Next, ensure you have Python3, pip3, Node.js and npm installed. 

```bash
sudo apt-get update 
sudo apt-get install python3.7
sudo apt install python3-pip
sudo apt install nodejs
pip3 install django
pip3 install djangorestframework

```

### Setting up the Backend
Change directory into ```hr-app-backend``` and install the requirements.

```bash
pip install -r requirements.txt
```

Then, set up the database with 
```bash
python3 manage.py migrate
```

When the migration is completed, the backend can be fired up with the following command:

```bash
python3 manage.py runserver
```

The backend can be accessed via ```http://localhost:8000```.

### Setting up the Frontend
Change directory into ```hr-app-front``` and install the requirements.

```bash
npm install
```

After the installation is done, the frontend can be fired up with the following command:

```bash
npm start
```

The frontend can be accessed via ```http://localhost:3000```.

## API References

This section serves to describe the API endpoints for the various actions implemented for the User Stories

### User Story 1
The upload function is exposed through ```http://localhost:8000/users/upload```. You can choose to use the upload button available on the frontend, or post to the API directly via a tool like Postman. The database does not support concurrency so if a 2nd csv file is uploaded while a 1st upload is taking place, an error will be returned.

### User Story 2
After the neccessary data has been uploaded to the server, do refresh the frontend to see the updated display. The API for this user story is exposed through ```http://localhost:8000/users?limit=<integer>&offset=<integer>&minSalary=<integer>&maxSalary=<integer>&sort=<name, -name, id, -id, login, -login, salary, -salary>``` and will display a paginated response depending on the value in the ```limit``` query paramater. On the frontend, the limit is initially fixed at 30, selects all employees, and sorts by name. Any parameter that is missing from the URL will result in a HTTP 400 response.

### User Story 3
CRUD operations are all exposed through ```http://localhost:8000/users/<employee_id>```. It is important to note that ```employee_id``` is not the same value as ```primary key```.


