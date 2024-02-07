from django.db import models
from django.urls import reverse
# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=20, unique=True)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"VIN: {self.vin} - Sold: {self.sold}"

class Technician(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    employee_id = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_Technician", kwargs={"pk": self.employee_id})

    def __str__(self):
        return f"{self.first_name} {self.lost_name} - {self.employee_id}"


class Status(models.Model):
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=50)
    vin = models.CharField(max_length=20)
    customer = models.CharField(max_length=255)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )

    status = models.ForeignKey(
        Status,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def cancel(self, id):
        status = Status.objects.get(id=id)
        self.status = status
        self.save()

    def finish(self, id):
        status = Status.objects.get(id=id)
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.vin})

    def __str__(self):
        return f"Appointment for {self.customer} on {self.date_time} - {self.status}"


