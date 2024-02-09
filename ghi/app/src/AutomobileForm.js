import React, {useState, useEffect} from 'react';

function AutomobileForm() {
  const [models, setModels] = useState([])
  const [formData, setFormData] = useState({
    color: '',
    year: '',
    vin: '',
    model_id: '',
  })

  const getModelData = async () => {
    const modelUrl = 'http://localhost:8100/api/models/';
    const response = await fetch(modelUrl);

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  }

  useEffect(() => {
    getModelData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const automobileUrl = 'http://localhost:8100/api/automobiles/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(automobileUrl, fetchConfig);
    
    if (response.ok) {
      setFormData({
        color: '',
        year: '',
        vin: '',
        model_id: '',
      });
    }
  }

  const handleFormChange = (e) => {
    let value = e.target.value;
    const inputName = e.target.name;
    if (inputName === 'model_id' && value !== '') {
        value = parseInt(value, 10);
      }

    setFormData({
      ...formData,

      [inputName]: value 
    });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} >
          <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.color} placeholder="Color" required name="color" id="color" autoComplete="off" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.year} placeholder="Year" type="number" min="0" required name="year" id="year" autoComplete="off" className="form-control" />
                <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required name="vin" id="vin" autoComplete="off" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.model_id} required name="model_id" id="model_id" className="form-select">
                <option value="">Choose an Model</option>
                {models.map(model => {
                  return (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
