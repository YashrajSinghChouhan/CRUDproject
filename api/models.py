from django.db import models

class User(models.Model):
    usrname = models.CharField(max_length=50)
    pwd = models.CharField(max_length=20)

class Department(models.Model):
    deptId = models.CharField(max_length=10, unique=True, primary_key=True)
    deptName = models.CharField(max_length=100)
    deptHead = models.CharField(max_length=50)
    empCount = models.CharField(max_length=10)

class Employee(models.Model):
    empId = models.CharField(max_length=10, unique=True, primary_key=True)
    fullName = models.CharField(max_length=50)
    dept = models.CharField(max_length=50)
    phoneNo = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    salary = models.CharField(max_length=20)