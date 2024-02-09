import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManufacturersList() {
  const [manufacturers, setManufacturers] = useState([])
  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/manufacturers/');

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers)
    }
  }
  useEffect(()=>{
    getData()
  }, [])
  return (
    <>
    <h1>Manufacturers</h1>
    <table className="table table-striped">
      <thead>
        <tr>
            <th>Model Name</th>
        </tr>
      </thead>
      <tbody>
        {manufacturers.map(manufacturer => {
          return (
            <tr key={manufacturer.id}>
                <td>{ manufacturer.name }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
      <Link to="/manufacturers/create/">
        <button className="btn btn-primary btn-lg">Add a manufacturer</button>
      </Link>
    </div>
    </>
  );
}
export default ManufacturersList;
