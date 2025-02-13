from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoder import AutomobileVOEncoder, SalesPersonEncoder, CustomerEncoder, RecordOfSaleEncoder
from .models import AutomobileVO, SalesPerson, Customer, RecordOfSale
import json


@require_http_methods(["GET"])
def api_list_automobile_vo(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse({'automobiles': automobiles}, encoder=AutomobileVOEncoder, sold=False)


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse({'salespeople': salespeople}, encoder=SalesPersonEncoder)
    else:
        content = json.loads(request.body)
        try:
            salespeople = SalesPerson.objects.create(**content)
            return JsonResponse(salespeople, encoder=SalesPersonEncoder, safe=False)
        except:
            response = JsonResponse(
                {"message": "Unable to create salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(salesperson, encoder=SalesPersonEncoder, safe=False)
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(employee_id=id).delete()
            return JsonResponse({"confirmation": "Salesperson deleted"})
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Salesperson does not exist"}, status=404)
    else:
        try:
            content = json.loads(request.body)
            SalesPerson.objects.filter(id=id).update(**content)
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(salesperson, encoder=SalesPersonEncoder,safe=False)
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({'customers': customers}, encoder=CustomerEncoder)
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        except:
            response = JsonResponse(
                {"message": "Unable to create customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.filter(id=id).delete()
            return JsonResponse({"confirmation": "customer deleted"})
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"}, status=404)

    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
        
@require_http_methods(["GET", "POST"])
def api_record_of_sales(request):
    if request.method == "GET":
        sales = RecordOfSale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=RecordOfSaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile"},
                status=400,
            )
        try:
            salesperson_id = content["salesperson"]
            salesperson = SalesPerson.objects.get(id=salesperson_id)
            content["salesperson"] = salesperson
        except salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson"},
                status=400,
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"},
                status=400,
            )
        sale = RecordOfSale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=RecordOfSaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_record_of_sale(request, id):
    if request.method == "GET":
        sale = RecordOfSale.objects.get(id=id)
        return JsonResponse(
            {"sale": sale},
            encoder=RecordOfSaleEncoder,
        )
    elif request.method == "DELETE":
        try:
            sale = RecordOfSale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=RecordOfSaleEncoder,
                safe=False,
            )
        except RecordOfSale.DoesNotExist:
            return JsonResponse({"message": "Sale does not exist"})
