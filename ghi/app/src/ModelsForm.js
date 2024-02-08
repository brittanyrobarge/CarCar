import React, { useEffect, useState } from 'react';


const initialData = {
  name: '',
  picture_url: '',
  manufacturer_id: '',
};

function ModelsForm() {
  const [manufacturers, setManufacturers] = useState([]);
  const [formData, setFormData] = useState(initialData);



  const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const modelsUrl = 'http://localhost:8100/api/models/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(modelsUrl, fetchConfig);
    console.log(formData)

    if (response.ok) {
        setFormData(initialData);
    }
  };


  const handleFormChange = (e) => {
    let value = e.target.value;
    const inputName = e.target.name;
    if (inputName === 'manufacturer_id' && value !== '') {
        value = parseInt(value, 10);
      }

    setFormData({
      ...formData,

      [inputName]: value
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a vehicle model</h1>
            <form onSubmit={handleSubmit} id="add-model-form">
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.name} placeholder="Name" required name="name" id="name" autoComplete="off" className="form-control" />
                <label htmlFor="name">Automobile name...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="" required type="text" name="picture_url" id="picture_url" className="form-control" value={formData.picture_url} />
                <label htmlFor="picture_url">Picture URL...</label>
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange} value={formData.manufacturer_id} type="text" required name="manufacturer_id" id="manufacturer_id" className="form-select">
                  <option value="">Choose an Manufacturer</option>
                  {manufacturers.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-lg btn-primary">Create</button>
            </form>
            <div className="alert alert-success mt-3 d-none" id="success-message">
                Success!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelsForm;
