# CarCar
CarCar is an application for managing the aspects of an automobile dealership. It manages the inventory, automobile sales, and automobile services.

Team:

* Brittany Welborn - Automobile Service
* Brittany Robarge - Automobile Sales

## Getting Started
**Make sure you have Docker, Git, Insomnia, Django and Node.js 18.2 or above**
1. Fork and Clone the repository- https://gitlab.com/brittanyrobarge26/project-beta.git
2. Build and Run the project:

    the commands:

	docker volume create beta-data

	docker-compose build

	docker-compose up


-See Docker containers are running in the application
-Go to http://localhost:3000/ to view

## Design
CarCar is an application that can help businesses manage an automotive dealership. The application is built with three microservices which are inventory, sales, and services. These microservices work together to build the bones of the application by providing all of the required and necessary elements to allow the application to run smoothly. The inventory api has Manufacturer, Vehicle Model, and Automobile API endpoints.


- **Inventory**
- **Services**
- **Sales**

## How to Run this App
1. Open the terminal
2. type command cd to go to the directory where you will clone the project.
3. Clone the projects repo by typing "git clone" with this url: https://gitlab.com/brittanyrobarge26/project-beta.git
4. Type "ls" to see the list of directories, then change the directory to "project-beta".
5. Open Docker desktop and run these commands:

    docker volume create beta-data
    docker-compose build
    docker-compose up

6. It may take a couple minutes for Docker to build, but while you are waiting you can go to localhost:3000 to see when the webpage loads.
**It is good practice to also watch your Docker containers to make sure each one runs, so after Docker is running make sure to check the containers**


## Integration
Inventory holds records of automobiles that are available for sale.
Service and Sales microservices use a poller to update the information from the inventory domain.


# Diagram

![Alt text](image-2.png)

How this all starts is at our inventory domain. We keep a record of automobiles on our lot that are available to buy. Our sales and service microservices obtain information from the inventory domain, using a **poller**, which talks to the inventory domain to keep track of which vehicles we have in our inventory so that the service and sales team always has up-to-date information.

## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

## Services

![Alt text](image.png)
![Alt text](image-1.png)

The models in this microservice are:
* AutomobileVO - This model will retieve data within the inventory API with the information of VIN and import_href.
* Technician - This model shows the first name, last name, andn employee id of all the technicians.
* Appointment - This model shows an appointment with a date, time, vip, reason, status, vin, customer, technician, finished status and cancelled status.

With this microservice, you can:
* View lists of appointments and check the VIN and VIP status of a vehicle.
* View the service appointment history of a vehicle by searching the VIN.
* Create an appointment by providing a Vin number, date and time of apppointment, technician, and a reason for the appointment.
* Create a techncian by putting in the name and employee number.

### Technicians - The heart of what we do here at CarCar


| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/


* LIST TECHNICIANS: Following this endpoint will give you a list of all technicians that are currently employed.
* Since this is a GET request, you do not need to provide any data.
```
Example:
{
	"technicians": [
		{
			"name": "Donald",
			"employee_number": 1,
			"id": 1
		}],
```
}

*   TECHNICIAN DETAIL: This is a GET request as well, so no data needs to be provided here either. When you list technicians, you will
*   see that they are assigned a value of "id". This is the value that will replace "<int:pk>. For example, if you wanted to see the technician
*   details related to our technician "Donald", you would input the following address: http://localhost:8080/api/technicians/1/
*   This would then lead to this:

```
{
	"name": "Donald",
	"employee_number": 1,
	"id": 1
}
```
* This how our technician detail is displayed. If you want to change the technician, just change the value at the end to match the "id" of the technician you want to display.

* CREATE TECHNICIAN - What if we hired a new technician (In this economy even)? To create a technician, you would use the following format to input the data and you would just submit this as a POST request.
```
{
	"name": "Liz",
	"employee_number": 2
}
```
* As you can see, the data has the same format. In this example, we just changed the "name" field from "Donald" to "Liz". We also assigned her the "employee_number" value of "2" instead of "1".
* Once we have the data into your request, we just hit "Send" and it will create the technician "Liz". To verify that it worked, just select follow the "LIST TECHNICIAN" step from above to show all technicians.
* With any luck, both Donald and Liz will be there.
* Here is what you should see if you select "LIST TECHNICIAN" after you "CREATE TECHNICIAN" with Liz added in:
```
{
	"technicians": [
		{
			"name": "Donald",
			"employee_number": 1,
			"id": 1
		},
		{
			"name": "Liz",
			"employee_number": 1,
			"id": 2
		}],
}
```

* DELETE TECHNICIAN - If we decide to "go another direction" as my first boss told me, then we need to remove the technician from the system. To do this, you just need to change the request type to "DELETE" instead of "POST". You also need to pull the "id" value just like you did in "TECHNICIAN DETAIL" to make sure you delete the correct one. Once they are "promoted to customer" they will no longer be in our page that lists
* all technicians.


* And that's it! You can view all technicians, look at the details of each technician, and create technicians.
* Remember, the "id" field is AUTOMATICALLY generated by the program. So you don't have to input that information. Just follow the steps in CREATE TECHNICIAN and the "id" field will be populated for you.
* If you get an error, make sure your server is running and that you are feeding it in the data that it is requesting.
* If you feed in the following:
```
{
	"name": "Liz",
	"employee_number": 3,
	"favorite_food": "Tacos"
}

You will get an error because the system doesn't know what what to do with "Tacos" because we aren't ever asking for that data. We can only send in data that Json is expecting or else it will get angry at us.

```


### Service Appointments: We'll keep you on the road and out of our waiting room

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List service appointments | GET | http://localhost:8080/api/appointments/
| Service appointment detail | GET | http://localhost:8080/api/appointments/<int:id>
| Service appointment history | GET | http://localhost:8080/api/appointments/history/<int:vin (OPTIONAL)>
| Create service appointment | POST | http://localhost:8080/api/appointments/create/
| Delete service appointment | DELETE | http://localhost:8080/api/appointments/delete/<int:id>


* LIST SERVICE APPOINTMENT: This will return a list of all current service appointment.
* This is the format that will be displayed.
* Spoiler alert! Remember, the way that it is returned to you is the way that the data needs to be accepted. Remember, the "id" is automatically generated, so you don't need to input that.
* Also, the "date" and "time" fields HAVE TO BE IN THIS FORMAT
```
{
	"service_appointment": [
		{
			"id": 1,
			"vin": "1222",
			"customer_name": "Barry",
			"time": "12:30:00",
			"date": "2021-07-14",
			"reason": "mah tires",
			"vip_status": false,
			"technician": "Liz"
		}],
}
```
SERVICE APPOINTMENT DETAIL: This will return the detail of each specific service appointment.
```
{
	"id": 1,
	"vin": "1222",
	"customer_name": "Barry",
	"time": "12:30:00",
	"date": "2021-07-14",
	"reason": "mah tires",
	"vip_status": false,
	"technician": "Liz"
}
```
* SERVICE APPOINTMENT HISTORY: This will show the detail based on the "VIN" that is input. You will see ALL service appointments for the vehicle associated with the "vin" that you input.
* At the end of the URL, tack on the vin associated with the vehicle that you wish to view. If you leave this field blank, it will show all service history for all vehicles.
```
{
	"service_history": [
		{
			"id": 1,
			"vin": "1222",
			"customer_name": "Barry",
			"time": "12:30:00",
			"date": "2021-07-14",
			"reason": "mah tires",
			"vip_status": false,
			"technician": "Liz"
		},
		{
			"id": 6,
			"vin": "1222",
			"customer_name": "Gary",
			"time": "12:30:00",
			"date": "2021-07-11",
			"reason": "new car",
			"vip_status": false,
			"technician": "Caleb"
		}
	]
}
```
If we add "1222" to the request (eg. http://localhost:8080/api/servicehistory/1222), then it will show the above. If you put a vin that does not exist in the system, it will return a blank list.


* CREATE SERVICE APPOINTMENT - This will create a service appointment with the data input. It must follow the format. Remember, the "id" is automatically generated, so don't fill that in. To verify
* that it was added, just look at your service appointment list after creating a service appointment and it should be there.
```
		{
			"id": 6,
			"vin": "1222",
			"customer_name": "Gary",
			"time": "12:30:00",
			"date": "2021-07-11",
			"reason": "new car",
			"vip_status": false,
			"technician": "Caleb"
		}

```
* DELETE SERVICE APPOINTMENT - Just input the "id" of the service appointment that you want to delete at the end of the url. For example, if we wanted to delete the above service history appointment for Barry
* because we accidently input his name as "Gary", we would just enter 'http://localhost:8080/api/serviceappointment/6' into the field and send the request. We will receive a confirmation message saying that
* the service appointment was deleted.




## Sales microservice

Explain your models and integration with the inventory
microservice, here.
## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Manufacturers:
From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/


JSON body to send data:
Creating and updating a manufacturer requires only the manufacturer's name.
```
{
  "name": "Chrysler"
}
```

The return value of creating, getting, and updating a single manufacturer is its name, href, and id.
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```
### Vehicle models:
From Insomnia and your browser, you can access the vehicle model endpoints at the following URLs.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/

Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```
Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
Getting a list of vehicle models returns a list of the detail information with the key "models".
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_		20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```
### Automobile information:
From Insomnia and your browser, you can access the automobile endpoints at the following URLs.
Note: The identifiers for automobiles in this API are not integer ids. They are the Vehicle Identification Number (VIN) for the specific automobile.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/

You can create an automobile with its color, year, VIN, and the id of the vehicle model.
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
As noted, you query an automobile by its VIN. For example, you would use the URL

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```
You can update the color, year, and sold status of an automobile.
```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```
Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```
# Sales Microservice:
Models=
	AutomobileVO Model: vin and sold fields
	SalesPerson Model: first_name, last_name, and employee_id fields
	Customer Model: first_name, last_name, address and phone_number fields
	RecordOfSale Model: price, automobile, salesperson, and customer fields

The poller updates the AutomobileVO every minute- updates the VINs and if the automobile is sold. (pulls info from inventory service)

The reason for integration between these two microservices is that when recording a new sale, you'll need to choose which car is being sold and that information lives inside of the inventory microservice.

## Accessing Endpoints to Send and View Data - Access through Insomnia:

### SalesPerson:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/:id/

List salespeople:
Will return a list of salespeople. The ID will be assigned.
```
"salespeople": [
		{
			"first_name": "Will"
			"last_name": "Smith"
			"employee_id": "WillSmith"
			"id": 1
		}
]
```
Create a Salesperson:
Will create a salesperson. The ID will be assigned. (look at your salespeople list to verify it was created).
```
		{
			"first_name": "Will"
			"last_name": "Smith"
			"employee_id": "WillSmith"
		}
```
Delete a Salesperson:
Will delete a salesperson. Use the Url of the salesperson you want to delete. (the ID is the specific person) http://localhost:8090/api/salespeople/:id/ For Will Smith we would put 1 for ID. remove the : also.

### Customer:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Show a specific customer | GET | http://localhost:8090/api/customers/:id/


List a Customer:
Will return a list of Customers. ID will be assigned.
```
"Customers": [
		{
			"first_name": "Bob",
			"last_name": "Marley",
			"address": "123 Street, Brooklyn, NY 24253",
			"phone_number": "123-456-7890",
			"id": 2
		}
]
```
Create a Customer:
Will create a customer. The ID will be assigned. (look at your customer list to verify it was created).
```
		{
			"first_name": "Bob",
			"last_name": "Marley",
			"address": "123 Street, Brooklyn, NY 24253",
			"phone_number": "123-456-7890"
		}
```
Delete a Customer:
Will delete a Customer. Use the Url of the Customer you want to delete. (the ID is the specific person) http://localhost:8090/api/customers/:id/ For Bob Marley we would put 2 for ID. remove the : also.

### Sale:
| Action | Method | URL
| ----------- | ----------- | ----------- |
|List sales	| GET |	http://localhost:8090/api/sales/
|Create a sale | POST |	http://localhost:8090/api/sales/
|Delete a sale	| DELETE |	http://localhost:8090/api/sales/:id

List Sales:
Will list all sales. (combination of salespeople to the customer to the automobile.)
```
"sales":[
	{	"price":3000,
		"automobile": "1AB321423ZCFDF3",
		"salesperson":{
			"first_name": "Will",
			"last_name": "Smith",
			"employee_id": "WillSmith",
			"id": 1
		},
		"Customer": {
			"first_name": "Bob",
			"last_name": "Marley",
			"address": "123 Street, Brooklyn, NY 24253",
			"phone_number": "123-456-7890",
			"id": 2
		},
		"id": 1
},
]
```
Create a Sale:
Will create a sale. The ID is assigned for Salesperson and Customer. pick salesperson and customer. (look at your sales list to verify it was created).
```
	{
	"automobile": "1AB321423ZCFDF3",
	"salesperson": 1,
	"customer": 2,
	"price": 3000
	}
```
Delete a sale:
Will delete a sale. Use the Url of the sale you want to delete. (the ID is the specific sale) http://localhost:8090/api/sales/:id/ For Bob Marley and Will Smith sale we would put 1 for ID. remove the : also.
