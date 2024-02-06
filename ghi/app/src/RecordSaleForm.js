import React, { useEffect, useState } from 'react';

function SalesRecordForm() {
    const [price, setPrice] = useState('');
    const [automobile, setAutomobile] = useState('');
    const [salesPerson, setSalesPerson] = useState('');
    const [customer, setCustomer] = useState('');
    const [automobiles, setAutomobiles] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [customers, setCustomers] = useState([]);

    const fetchAutomobileData = async () => {
        const AutomobileUrl = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(AutomobileUrl);
        if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
        }
    }

    async function loadCustomers() {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
          const data = await response.json();
          setCustomers(data.customers)
        } else {
          console.error(response);
        }
      }

    async function loadSalespersons() {
          const response = await fetch('http://localhost:8090/api/salespeople/');
          if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salespeople)
          } else {
            console.error(response);
          }
        }

    useEffect(() =>{
        fetchAutomobileData();
        loadCustomers();
        loadSalespersons();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.price = price;
        data.automobile = automobile;
        data.salesPerson = salesPerson;
        data.customer = customer;

        const salesUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const sale = await fetch(salesUrl, fetchConfig);
        if (sale.ok) {
            const newSale = await sale.json();
            console.log(newSale);

            setPrice('');
            setAutomobile('');
            setSalesPerson('');
            setCustomer('');
        }
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a New Sale</h1>
                    <form onSubmit={handleSubmit} id="create-record-of-sale-form">
                        <div className="form-floating mb-3">
                            <select required value={automobile} onChange={handleAutomobileChange} placeholder="Automobile VIN" type="text" name="automobile" id="automobile" className="form-control">
                             <option value="">Choose an automobile VIN..</option>
                             {automobiles?.map(auto => {return (
                             <option key={auto.vin} value={auto.vin}>{auto.vin}</option>
                             )
                             })}
                             </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleSalesPersonChange} placeholder="SalesPerson" type="text" name="salesPerson" id="salesPerson" className="form-control">
                             <option value="">Choose a salesperson..</option>
                             {salespersons?.map(salespeople => {
                                return (
                             <option key={salespeople.id} value={salespeople.first_name + '' +salespeople.last_name}>{salespeople.first_name}{salespeople.last_name}</option>
                             )
                             })}
                             </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleCustomerChange} placeholder="Customer" type="text" name="customer" id="customer" className="form-control">
                             <option value="">Choose a customer..</option>
                             {customers?.map(customers => {
                                return (
                             <option key={customers.id} value={customers.first_name + '' +customers.last_name}>{customers.first_name}{customers.last_name}</option>
                             )
                             })}
                             </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={price} onChange={handlePriceChange} required placeholder="Price" type="number" min="0" name="employee_id" id="price" className="form-control" />
                            <label htmlFor="address">0</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }

    export default SalesRecordForm;
