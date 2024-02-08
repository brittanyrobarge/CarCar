from common.json import ModelEncoder

from .models import AutomobileVO, Technician, Appointment, Status



class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "import_href",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]
    encoders = {"automobiles": AutomobileVOEncoder()}

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        if isinstance(o.status, Status):
            return {"status": o.status.name}
        else:
            return{"status": None}
