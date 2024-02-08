import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ModelsList() {
  const [models, setModels] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/models/');

    if (response.ok) {
      const data = await response.json();
      setModels(data.models)
    }
  }

  useEffect(()=>{
    getData()
  }, [])


  return (
    <>
    <h1>Models</h1>
    <table className="table table-striped">
      <thead>
        <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
        </tr>
      </thead>
      <tbody>
        {models.map(model => {
          return (
            <tr key={model.id}>
                <td>{ model.name }</td>
                <td>{ model.manufacturer.name }</td>
                <td><img src={model.picture_url} alt={model.name} style={{ width: '100px', height: 'auto' }} /></td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
      <Link to="/models/create/">
        <button className="btn btn-primary btn-lg">Add a model</button>
      </Link>
    </div>
    </>
  );
}

export default ModelsList;

