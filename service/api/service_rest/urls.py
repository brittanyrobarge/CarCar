from django.urls import path
from .views import api_technician, api_appointment, api_delete_technician, api_delete_appointment, api_cancel_appointment, api_finish_appointment

urlpatterns = [
    path("technicians/", api_technician, name="api_technician"),
    path("technicians/<int:pk>/", api_delete_technician, name="api_delete_technician"),
    path("appointments/", api_appointment, name="api_appointment"),
    path("appointments/<int:pk>/", api_delete_appointment, name="api_delete_appointment"),
    path("appointments/<int:pk>/cancel/", api_cancel_appointment, name="api_cancel_appointment"),
    path("appointments/<int:pk>/finish/", api_finish_appointment, name="api_finish_appointment"),

]
