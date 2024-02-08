import React, {useState, useEffect} from 'react';

function SaleForm() {
  const [automobiles, setAutomobiles] = useState([])
  const [salespeople, setSalespeople] = useState([])
  const [customers, setCustomers] = useState([])
  const [formData, setFormData] = useState({
    automobile: '',
    salesperson: '',
    customer: '',
    price: '',
  })


  const getAutoData = async () => {
    const autoUrl = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(autoUrl);

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  }
  

  const getSalespersonData = async () => {
    const salespersonUrl = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(salespersonUrl);

    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    }
  }


  const getCustomerData = async () => {
    const customerUrl = 'http://localhost:8090/api/customers/';
    const response = await fetch(customerUrl);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  }


  useEffect(() => {
    getAutoData();
    getSalespersonData();
    getCustomerData();
  }, []);

  const updateData = {
    sold: true,
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const setSold = await fetch(`http://localhost:8100/api/automobiles/${formData.automobile}/`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {'Content-Type': 'application/json'},
        });

    const saleUrl = 'http://localhost:8090/api/sales/';


    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(saleUrl, fetchConfig);
    
    if (response.ok) {
      setFormData({
        automobile: '',
        salesperson: '',
        customer: '',
        price: '',
      });
    }
  }

  
  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,

      [inputName]: value 
    });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} >
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.automobile} required name="automobile" id="automobile" className="form-select">
                <option value="">Choose an automobile VIN</option>
                {automobiles.filter(unSoldAutomobiles => unSoldAutomobiles.sold === false).map(automobile => {
                  return (
                    <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                  )
                })}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose an Salesperson</option>
                {salespeople.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>{`${salesperson.first_name} ${salesperson.last_name}`}</option>
                  )
                })}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                <option value="">Choose an Customer</option>
                {customers.map(customer => {
                  return (
                    <option key={customer.id} value={customer.id}>{`${customer.first_name} ${customer.last_name}`}</option>
                  )
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.price} placeholder="Price" type="number" min="0" required name="price" id="price" autoComplete="off" className="form-control" />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaleForm;

