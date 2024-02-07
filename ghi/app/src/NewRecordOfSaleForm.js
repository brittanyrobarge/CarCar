import React from 'react';

class NewRecordOfSaleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '0',
            automobile: '',
            automobiles: [],
            salesPerson: '',
            salesPeople: [],
            customer: '',
            customers: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.automobiles;
        delete data.salesPeople;
        delete data.customers;

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newSalesRecord = await response.json();
            console.log(newSalesRecord);

            const cleared = {
                price: '',
                automobile: '',
                salesPerson: '',
                customer: '',
            };
            this.setState(cleared)
        }
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({price: value})
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({SalesPerson: value})
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({customer: value})
    }

    async componentDidMount() {
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const automobileResponse = await fetch(automobileUrl);
        if (automobileResponse.ok) {
            const data = await automobileResponse.json();
            this.setState({ automobiles: data.automobiles });
        }

        const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
        const salesPeopleResponse = await fetch(salesPeopleUrl);
        if (salesPeopleResponse.ok) {
            const data = await salesPeopleResponse.json();
            this.setState({ salesPeople: data.salesPeople });
        }

        const customerUrl = 'http://localhost:8090/api/customers/';
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            const data = await customerResponse.json();
            this.setState({ customers: data.customers });
        }
    }

    render() {
        return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a New Sale</h1>
                    <form onSubmit={this.handleSubmit} id="create-sales-record-form">
                        <div className="form-floating mb-3">
                            <select onChange={this.handleAutomobileChange} required name="automobile" value={this.state.automobile} id="automobile" className="form-select">
                            <option value="">Choose a Automobile</option>
                            {this.state.automobiles.map(automobile => {
                                return (
                                    <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={this.handleSalesPersonChange} required name="salesperson" id="salesperson" className="form-select">
                            <option value="">Choose a Salesperson</option>
                            {this.state.salesPeople.map(salesPerson => {
                                return (
                                    <option key={salesPerson.employeeId} value={salesPerson.employeeId}>{salesPerson.first_name}{salesPerson.last_name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={this.handleCustomerChange} required name="customer" id="customer" className="form-select">
                            <option value="">Choose a Customer</option>
                            {this.state.customers.map(customer => {
                                return (
                                    <option key={customer.id} value={customer.id}>{customer.first_name}{customer.last_name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                             <input value={this.state.price} onChange={this.handlePriceChange} placeholder="Price" required type="number" pattern="[0-9]" name="price" id="prices" className="form-control" />
                             <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create Sales Record</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default NewRecordOfSaleForm;
