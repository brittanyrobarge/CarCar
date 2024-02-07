import React, { useEffect, useState } from 'react';

function TechnicianList(props) {
    const [technicians, setTechnicians] = useState ([]);

    async function loadTechnicians() {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if(response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        } else {
            console.error(response);
        }
        }
    useEffect(() => {
        loadTechnicians();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {technicians?.map(technician => {
                    return (
                        <tr key={technician.employee_id}>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>
                            <td>{ technician.employee_id }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TechnicianList;
