from django.urls import path
from . import views

urlpatterns = [
    path('', views.index,name="index"),
    path('getUserList/', views.getUserList),
    path('login/',views.login),
    path('addingEmployee/',views.addEmployee),
    path('addingDepartment/',views.addDepartment),
    path('deleteEmployee/<int:pk>',views.deleteEmployee),
    path('deleteDepartment/<int:pk>',views.deleteDepartment),
    path('getEmployee/',views.getEmployee),
    path('getDepartment/',views.getDepartment),
    path('editEmployee/',views.editEmployee),
    path('editDepartment/',views.editDepartment),
]
