from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment, Status
from django.http import JsonResponse, HttpResponse
# Create your views here.
from .encoders import (
    TechnicianEncoder,
    AppointmentEncoder,
    AutomobileVOEncoder,
)
from .models import Technician, Appointment, AutomobileVO


@require_http_methods(["GET"])
def api_list_automobile_vo(request):
    if request.method == "GET":
        automobile = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobile},
            encoder=AutomobileVOEncoder,
        )

@require_http_methods(["GET", "POST"])
def api_technician(request):
    if request.method == "GET":
        technician = Technician.objects.all()

        return JsonResponse(
            {"technicians": technician},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Could not add Technician"},
                status=400
            )

@require_http_methods(["DELETE"])
def api_delete_technician(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

@require_http_methods(["GET", "POST"])
def api_appointment(request):
    if request.method =="GET":
        appointment = Appointment.objects.all()

        return JsonResponse(
            {"appointments": appointment},
            encoder=AppointmentEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
            status = Status.objects.get(id=content["status"])
            content["status"] = status
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Can not create appointment"},
                status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def api_delete_appointment(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)

    try:
        content = json.loads(request.body)
        status = Status.objects.get(id=content["status"])
        content["status"] = status
        appointment.cancel(id=2)
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Unable to create appointment"},
            status=400
        )

    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    try:
        content = json.loads(request.body)
        status = Status.objects.get(id=content["status"])
        content["status"] = status
        appointment.finish(id=3)
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Unable to create appointment"},
            status=400
        )
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False
    )
