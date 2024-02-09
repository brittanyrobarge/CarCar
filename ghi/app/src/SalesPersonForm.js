import React, {useState, useEffect} from 'react';

function SalespersonForm () {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `http://localhost:8090/api/salespeople/`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    
    if (response.ok) {
      setFormData({
        first_name: '',
        last_name: '',
        employee_id: '',
      });
    }
  }

  const handleFormChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,

      
      [inputName]: value 
    });
  }
  
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Salesperson</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required name="first_name" id="first_name" autoComplete="off" className="form-control" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required name="last_name" id="last_name" autoComplete="off" className="form-control" />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee ID" required name="employee_id" id="employee_id" autoComplete="off" className="form-control" />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;
