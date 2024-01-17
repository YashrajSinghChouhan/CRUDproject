from rest_framework.serializers import ModelSerializer
from .models import User, Department, Employee

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'