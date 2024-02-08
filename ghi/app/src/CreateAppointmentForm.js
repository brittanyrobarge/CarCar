import React, { useEffect, useState } from 'react';


const initialData = {
  vin: '',
  customer: '',
  date: '',
  date_time: '',
  technician: '',
  reason: '',
};


function AppointmentForm() {
  const [technicians, setTechnician] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnician(data.technicians);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleDateChange = (e) => {
    setDate(e.target.value);
    setFormData({
      ...formData,
      date: e.target.value,
    });
  };


  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setFormData({
      ...formData,
      date_time: e.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const dateTimeString = date + 'T' + time;
    const dateTimeObject = new Date(dateTimeString);
    const isoDateTimeString = dateTimeObject.toISOString();

    const appointmentUrl = 'http://localhost:8080/api/appointments/';
    const {vin, customer, date_time, technician, reason} = formData

    const fetchConfig = {
      method: 'post',
      body: JSON.stringify({vin, customer, date_time: isoDateTimeString, technician, reason}),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(appointmentUrl, fetchConfig);

    if (response.ok) {
        setFormData(initialData);
        document.getElementById('success-message').classList.remove('d-none');
    } else {
        document.getElementById('success-message').classList.add('d-none');
  }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a service appointment</h1>
            <form onSubmit={handleSubmit} id="add-appointment-form">
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="" required type="text" name="vin" id="vin" className="form-control" value={formData.vin} />
                <label htmlFor="model_name">Automobile VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleDateChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" value={formData.date} />
                <label htmlFor="date"></label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTimeChange} placeholder="Time" required type="time" name="time" id="time" className="form-control" value={formData.date_time} />
                <label htmlFor="time"></label>
              </div>
              <div className="mb-3" id="loading-technicians-spinner">
                {technicians.length === 0 && (
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Nothing to see here</span>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange} placeholder="Choose a technician" required name="technician" id="technician" className='form-select' value={formData.technician}>
                  <option value="">Choose a technician</option>
                  {technicians.map((technician) => (
                    <option key={technician.id} value={technician.id}>
                      {technician.first_name} {technician.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" value={formData.reason} />
                <label htmlFor="reason">Reason</label>
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

export default AppointmentForm;
