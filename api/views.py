from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.response import Response
from . import models
from .serializer import UserSerializer, EmployeeSerializer, DepartmentSerializer
from rest_framework.permissions import AllowAny 
def index(request):
    return render(request,'index.html')

@api_view(['GET'])
def getUserList(request):
    user = models.User.objects.all()
    serializer = UserSerializer(user,many=True)
    return Response(serializer.data)

@api_view(['GET','POST'])
def login(request):
    data = request.data
    serializer = UserSerializer(data=data)
    print(data.get('usrname'),data.get('pwd'))
    if serializer.is_valid():
        if models.User.objects.filter(usrname=data.get('usrname')):
            if models.User.objects.filter(pwd=data.get('pwd')):
                return Response("Success",status=200)
    else:
        return Response(serializer.errors,status=400)

    return Response("Failed")

@api_view(['GET','POST'])
def addEmployee(request):
    data = request.data
    serializer = EmployeeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"Success":"Employee added successfully"},status=201)
    else:
        return Response(serializer.errors,status=400)
    
@api_view(['GET','POST'])
def addDepartment(request):
    data = request.data
    serializer = DepartmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"Success":"Department added successfully"},status=201)
    else:
        return Response(serializer.errors,status=400)


@api_view(['DELETE'])
def deleteEmployee(request,pk):
    empId = pk
    try:
        emp = models.Employee.objects.get(empId=empId)
        emp.delete()
        return Response({"Success":"Employee successfully deleted"},status=200)
    except models.Employee.DoesNotExist:
        return Response({"Error":"Employee does not exist"},status=400)




@api_view(['DELETE'])
def deleteDepartment(request,pk):
    deptId = pk
    try:
        dept = models.Department.objects.get(deptId = deptId)
        dept.delete()
        return Response({"Success":"Department successfully deleted"},status=200)
    except models.Department.DoesNotExist:
        return Response({"Error":"Department does not exist"},status=400)

@api_view(['GET'])
def getEmployee(request):
    emp = models.Employee.objects.all()
    serialize = EmployeeSerializer(emp,many=True)
    return Response(serialize.data)

@api_view(['GET'])
def getDepartment(request):
    emp = models.Department.objects.all()
    serialize = DepartmentSerializer(emp,many=True)
    return Response(serialize.data)

@api_view(['PUT'])
def editEmployee(request):
    empId = request.data.get('empId')
    try:
        getEmpName = request.data.get('fullName')
        getdept = request.data.get('dept')
        getPhoneNo = request.data.get('phoneNo')
        getGender = request.data.get('gender')
        getSalary = request.data.get('salary')
        emp = models.Employee.objects.get(empId = empId)
        if getEmpName:
            emp.fullName = getEmpName
        if getdept:
            emp.dept = getdept
        if getPhoneNo:
            emp.phoneNo = getPhoneNo
        if getGender:
            emp.gender = getGender
        if getSalary:
            emp.salary = getSalary
        emp.save()
        return Response({"Success":"Employee successfully updated"},status=200)
    except models.Employee.DoesNotExist:
        return Response({"Failed":"No Employee found"},status=400)

@api_view(['PUT'])
def editDepartment(request):
    deptId = request.data.get('deptId')
    try:
        getDeptName = request.data.get('deptName')
        getDeptHead = request.data.get('deptHead')
        getEmpCount = request.data.get('empCount')
        dept = models.Department.objects.get(deptId = deptId)
        if getDeptName:
            dept.deptName = getDeptName
        if getDeptHead:
            dept.deptHead = getDeptHead
        if getEmpCount:
            dept.empCount = getEmpCount
        dept.save()
        return Response({"Success":"Department successfully updated"},status=200)
    except models.Department.DoesNotExist:
        return Response({"Failed":"No Department found"},status=400)