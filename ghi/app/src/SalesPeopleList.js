import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');

    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  
  return (
    <>
    <h1>Salespeople</h1>
    <table className="table table-striped">
      <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
        </tr>
      </thead>
      <tbody>
        {salespeople.map(salesperson => {
          return (
            <tr key={salesperson.id}>
                <td>{ salesperson.first_name }</td>
                <td>{ salesperson.last_name }</td>
                <td>{ salesperson.employee_id }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
      <Link to="/salespeople/create/">
        <button className="btn btn-primary btn-lg">Add a salesperson</button>
      </Link>
    </div>
    </>
  );
}

export default SalespeopleList;
