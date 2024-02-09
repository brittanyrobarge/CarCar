# CarCar
CarCar is an application for managing the aspects of an automobile dealership. It manages the inventory, automobile sales, and automobile services.

Team:

* Brittany Welborn - Automobile Service
* Brittany Robarge - Automobile Sales

## Getting Started
[Have Git, Docker, Django & Insomnia]
1. Fork and Clone the repository- https://gitlab.com/brittanyrobarge26/project-beta.git
2. Build and Run the project- the commands:
	docker volume create beta-data
	docker-compose build
	docker-compose up
-See Docker containers are running in the application
-Go to http://localhost:3000/ to view

## Design
CarCar is made up of 3 microservices which interact with one another.

- **Inventory**
- **Services**
- **Sales**

## Integration 
Inventory holds records of automobiles that are available for sale. 
Service and Sales microservices use a poller to update the information from the inventory domain.

## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Manufacturers:
From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

Action	Method	URL
List manufacturers	GET	http://localhost:8100/api/manufacturers/
Create a manufacturer	POST	http://localhost:8100/api/manufacturers/
Get a specific manufacturer	GET	http://localhost:8100/api/manufacturers/:id/
Update a specific manufacturer	PUT	http://localhost:8100/api/manufacturers/:id/
Delete a specific manufacturer	DELETE	http://localhost:8100/api/manufacturers/:id/


Creating and updating a manufacturer requires only the manufacturer's name.
{
  "name": "Chrysler"
}

The return value of creating, getting, and updating a single manufacturer is its name, href, and id.
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}

The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}

### Vehicle models:
From Insomnia and your browser, you can access the vehicle model endpoints at the following URLs.

Action	Method	URL
List vehicle models	GET	http://localhost:8100/api/models/
Create a vehicle model	POST	http://localhost:8100/api/models/
Get a specific vehicle model	GET	http://localhost:8100/api/models/:id/
Update a specific vehicle model	PUT	http://localhost:8100/api/models/:id/
Delete a specific vehicle model	DELETE	http://localhost:8100/api/models/:id/

Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}

Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}

Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.
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

Getting a list of vehicle models returns a list of the detail information with the key "models".
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

### Automobile information:
From Insomnia and your browser, you can access the automobile endpoints at the following URLs.
Note: The identifiers for automobiles in this API are not integer ids. They are the Vehicle Identification Number (VIN) for the specific automobile.

Action	Method	URL
List automobiles	GET	http://localhost:8100/api/automobiles/
Create an automobile	POST	http://localhost:8100/api/automobiles/
Get a specific automobile	GET	http://localhost:8100/api/automobiles/:vin/
Update a specific automobile	PUT	http://localhost:8100/api/automobiles/:vin/
Delete a specific automobile	DELETE	http://localhost:8100/api/automobiles/:vin/

You can create an automobile with its color, year, VIN, and the id of the vehicle model.
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}

As noted, you query an automobile by its VIN. For example, you would use the URL

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.

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
You can update the color, year, and sold status of an automobile.

{
  "color": "red",
  "year": 2012,
  "sold": true
}
Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.

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
Action			Method	URL
List salespeople	GET	http://localhost:8090/api/salespeople/
Create a salesperson	POST	http://localhost:8090/api/salespeople/
Delete a specific salesperson	DELETE	http://localhost:8090/api/salespeople/:id/

List salespeople:
Will return a list of salespeople. The ID will be assigned.
"salespeople": [
		{
			"first_name": "Will"
			"last_name": "Smith"
			"employee_id": "WillSmith"
			"id": 1
		}
]
Create a Salesperson:
Will create a salesperson. The ID will be assigned. (look at your salespeople list to verify it was created).
		{
			"first_name": "Will"
			"last_name": "Smith"
			"employee_id": "WillSmith"
		}
Delete a Salesperson:
Will delete a salesperson. Use the Url of the salesperson you want to delete. (the ID is the specific person) http://localhost:8090/api/salespeople/:id/ For Will Smith we would put 1 for ID. remove the : also.

### Customer:
List customers	GET	http://localhost:8090/api/customers/
Create a customer	POST	http://localhost:8090/api/customers/
Delete a specific customer	DELETE	http://localhost:8090/api/customers/:id/

List a Customer:
Will return a list of Customers. ID will be assigned.
"Customers": [
		{
			"first_name": "Bob",
			"last_name": "Marley",
			"address": "123 Street, Brooklyn, NY 24253",
			"phone_number": "123-456-7890",
			"id": 2
		}
]
Create a Customer:
Will create a customer. The ID will be assigned. (look at your customer list to verify it was created).
		{
			"first_name": "Bob",
			"last_name": "Marley",
			"address": "123 Street, Brooklyn, NY 24253",
			"phone_number": "123-456-7890"
		}
Delete a Customer:
Will delete a Customer. Use the Url of the Customer you want to delete. (the ID is the specific person) http://localhost:8090/api/customers/:id/ For Bob Marley we would put 2 for ID. remove the : also.

### Sale:
List sales	GET	http://localhost:8090/api/sales/
Create a sale	POST	http://localhost:8090/api/sales/
Delete a sale	DELETE	http://localhost:8090/api/sales/:id

List Sales:
Will list all sales. (combination of salespeople to the customer to the automobile.)
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

Create a Sale:
Will create a sale. The ID is assigned for Salesperson and Customer. pick salesperson and customer. (look at your sales list to verify it was created).
	{
	"automobile": "1AB321423ZCFDF3",
	"salesperson": 1,
	"customer": 2,
	"price": 3000
	}
Delete a sale: 
Will delete a sale. Use the Url of the sale you want to delete. (the ID is the specific sale) http://localhost:8090/api/sales/:id/ For Bob Marley and Will Smith sale we would put 1 for ID. remove the : also.
