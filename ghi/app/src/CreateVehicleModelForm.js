import React, { useEffect, useState } from 'react';

function VehicleModelForm() {
    const[name, setName] = useState('');
    const[pictureUrl, setPicture] = useState('');
    const[manufacturers, setManufacturers] = useState([]);
    const[manufacturer, setManufacturer] = useState('');

    const fetchData = async () => {
      const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'

      const response = await fetch(manufacturerUrl);

      if (response.ok){
        const data = await response.json();
        setManufacturers(data.manufacturers)
      }
    }
    useEffect(() => {
      fetchData();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;

        const vehicleModelUrl = "http://localhost:8100/api/models/";

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const model = await fetch(vehicleModelUrl, fetchConfig);
        if (model.ok){
                const newModel = await model.json();
                console.log(newModel);
                setName('');
                setPicture('');
                setManufacturer('');
            };
      }

      const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
      }
      const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value);
      }
      const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
      }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Vehicle Model</h1>
            <form onSubmit={handleSubmit} id="add-model">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePictureChange} value={pictureUrl} placeholder="Picture" required type="url" name="picture" id="picture" className="form-control"/>
                <label htmlFor="picture">Picture</label>
              </div>
              <div className="form-floating mb-3">
              <select onChange={handleManufacturerChange} value={manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                <option value="">Choose a Manufacturer...</option>
                {manufacturers?.map(manu => {
                  return (
                    <option key={manu.id} value={manu.id}>{manu.name}</option>
                  )
                })}
                </select>
                </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default VehicleModelForm;
