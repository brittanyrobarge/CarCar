
import React, { useState, useEffect } from 'react';

function AppointmentHistoryList(props) {
    const [appointments, setAppointments] = useState([]);

    async function loadAppointments() {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if(response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
            console.log(data.appointments)
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
        loadAppointments();
    }, []);

    return (
        <>
        <h1>Service History</h1>
        <div className="input-group">
            <div className="form-outline">
                <input id="search-input" type="search" className="form-control" max_length={17} />
                <label className="form-label" htmlFor="search-input">Search by VIN</label>
            </div>
            <button id="search-button" type="button" className="btn btn-primary">
                <i className="fas fa-search"></i>
            </button>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date / Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments?.map(appointment => {
                    return(
                        <tr key={appointment.vin}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.vip}</td>
                            <td>{appointment.customer}</td>
                            <td>{appointment.date_time}</td>
                            <td>{appointment.technician.first_name}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}



export default AppointmentHistoryList
