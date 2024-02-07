import React, {useEffect, useState } from 'react';


function AppointmentForm() {
    const[dateTime, setDateTime] = useState('');
    const[reason, setReason] = useState('');
    const[vin, setVin] = useState('');
    const[customer, setCustomer] = useState('');
    const[technician, setTechnician] = useState([]);

    const fetchData = async () => {
        const technicianUrl = 'http://localhost:8080/api/technicians/';

        const response = await fetch(technicianUrl);

        if (response.ok) {
            const data = await response.json();
            setTechnician(data.technicians)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.date_time = dateTime;
        data.reason = reason;
        data.vin = vin;
        data.customer = customer;
        data.technician = technician;

        const appointmentUrl = "http://localhost:8080/api/appointments/";

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const appointment = await fetch(appointmentUrl, fetchConfig);
        if (appointment.ok) {
            const newAppointment = await appointment.json();
            console.log(newAppointment);
            setDateTime('');
            setReason('');
            setVin('');
            setCustomer('');
            setTechnician('');
        };
    }
    const handleDateTimeChange = (event) => {
        const value = event.target.value;
        setDateTime(value);
    }
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
        console.log(value)
    }

    return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Appointment</h1>
                        <form onSubmit={handleSubmit} id="create-appointment">
                            <div className="form-floating mb-3">
                                <input onChange={handleVinChange} value={vin} placeholder="vin" required type="text" maxLength={17} name="vin" id="vin" className="form-control" />
                                <label htmlFor="vin">Automobile Vin</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleCustomerChange} value={customer} placeholder="customer" required type="text" name="customer" id="customer" className="form-control" />
                                <label htmlFor="customer">Customer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleDateTimeChange} value={dateTime} placeholder="dateTime" name="dateTime" id="dateTime" type="datetime-local" className="form-control" />
                                <label htmlFor="dateTime">Date and Time</label>
                            </div>
                            <div className="mb-3">
                            <select onChange={handleTechnicianChange} name={technician} id="technician"  className="form-select" >
                                <option value="">Technician</option>
                                {technician.map((tech) => {
                                    return (
                                        <option key={tech.employee_id} value={tech.employee_id}>{tech.first_name}</option>
                                    )
                                })}


                            </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleReasonChange} value={reason} placeholder="reason" type="text" name="reason" id="reason" className="form-control"/>
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

export default AppointmentForm;
