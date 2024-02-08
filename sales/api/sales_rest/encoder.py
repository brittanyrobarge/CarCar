from .models import AutomobileVO, SalesPerson, Customer, RecordOfSale
from common.json import ModelEncoder

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["first_name", "last_name", "employee_id", "id"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number", "id"]

class RecordOfSaleEncoder(ModelEncoder):
    model = RecordOfSale
    properties = ["price", "automobile", "salesperson", "customer", "id"]
    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin}

    encoders = {
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        }
