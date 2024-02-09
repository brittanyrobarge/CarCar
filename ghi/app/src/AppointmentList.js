
import { useState, useEffect } from "react";
const AppointmentsList = () => {
	const [appointments, setAppointments] = useState([]);
	useEffect(() => {
		const fetchAppointments = async () => {
			const url = "http://localhost:8080/api/appointments/";
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				setAppointments(data.appointments);
			}
		};
		fetchAppointments();
	}, []);

	const cancelAppointment = async (id) => {
		const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
		const fetchConfig = {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(appointmentUrl, fetchConfig);
		if (response.ok) {
			window.location.reload();
		}
	};
	const finishAppointment = async (id) => {
		const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
		const fetchConfig = {
			method: "put",
			body: JSON.stringify({ finished: true }),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(appointmentUrl, fetchConfig);
		if (response.ok) {
			window.location.reload();
		}
	};
	return (
		<>
			<div className="px-4 py-5 my-1 mt-0 text-center">
				<h1 className="display-5">Appointment List</h1>
			</div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Customer</th>
						<th>Vin</th>
						<th>Date</th>
						<th>Time</th>
						<th>Technician</th>
						<th>Reason</th>
						<th>Vip</th>
					</tr>
				</thead>
				<tbody key="tbody">
					{appointments.map((appointment) => {
						if (!appointment.finish) {
							return (
								<tr key={appointment.vin}>
									<td>{appointment.customer}</td>
									<td>{appointment.vin}</td>
									<td>
										{new Date(appointment.date_time).toLocaleDateString(
											"en-US"
										)}
									</td>
									<td>
										{new Date(appointment.date_time).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>
									<td>{appointment.technician.first_name}</td>
									<td>{appointment.reason}</td>
									<td>{appointment.vip ? "Yes" : "No"}</td>
									<td>
										<button
                                            key={`cancel-${appointment.cancel}`}
											onClick={(e) => cancelAppointment(appointment.id)}
											className="btn btn-secondary m-2">
											Cancel
										</button>
										<button
                                            key={`finish-${appointment.finish}`}
											onClick={(e) => finishAppointment(appointment.id)}
											className="btn btn-primary">
											Finished
										</button>
									</td>
								</tr>
							);
						}
                        return null;
					})}
				</tbody>
			</table>
		</>
	);
};
export default AppointmentsList;
