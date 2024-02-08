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
    employee_id = models.IntegerField()

    def get_api_url(self):
        return reverse("api_Technician", kwargs={"pk": self.employee_id})

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.employee_id}"


class Status(models.Model):
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)
        verbose_name_plural = "statuses"

class Appointment(models.Model):
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="CREATED")
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    date_time = models.DateTimeField()
    vip = models.BooleanField(default=False)
    reason = models.TextField()
    status = models.CharField(max_length=50, default='new')
    vin = models.CharField(max_length=20, unique=True)
    customer = models.CharField(max_length=255)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )


    def cancel(self, id):
        status='cancel'
        self.status = status
        self.save()

    def finish(self, id):
        status='finish'
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.vin})

    def __str__(self):
        return f"Appointment for {self.customer} on {self.date_time} - {self.status}"

    class Meta:
        ordering = ("customer", 'date_time')
