import React, { useEffect, useState } from 'react';

function AppointmentList(props) {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);


    async function loadAppointments() {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
        loadAppointments();
    }, []);


    async function loadAutomobiles() {
        const response = await fetch('http://localhost:8100/api/automobiles');
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.automobiles);
        } else {
            console.error(response);
        }
    }

    function Cancel(appointmentId) {
        // Implement cancel logic, e.g., make a DELETE request to cancel the appointment
        console.log(`Cancel appointment with ID: ${appointmentId}`);
    }

    function Finish(appointmentId) {
        // Implement finish logic, e.g., make a POST request to mark the appointment as finished
        console.log(`Finish appointment with ID: ${appointmentId}`);
    }

    useEffect(() => {
        loadAutomobiles();
    }, []);

    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date / Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {appointments?.map(appointment => {
                    console.log(appointment);
                    return (
                        <tr key={appointment.vin}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.vip }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ appointment.date_time}</td>
                            <td>{ appointment.technician.first_name }</td>
                            <td>{ appointment.reason }</td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-danger" onClick={() => Cancel(appointment.id)}>Cancel</button>{' '}
                                    <button type="button" className="btn btn-success" onClick={() => Finish(appointment.id)}>Finish</button>{' '}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

export default AppointmentList;
