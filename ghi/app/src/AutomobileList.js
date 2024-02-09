import { useEffect, useState } from 'react';

function AutomobilesList() {
  const [automobiles, setAutomobiles] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/automobiles/');

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos)
    }
  }
  function setSold (bool) {
    if (bool){
        return "Yes"
    } else {
        return "No"
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <>
    <h1>Automobiles</h1>
    <table className="table table-striped">
      <thead>
        <tr>
            <th>Vin</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
        </tr>
      </thead>
      <tbody>
        {automobiles.map(automobile => {
          return (
            <tr key={automobile.id}>
                <td>{ automobile.vin }</td>
                <td>{ automobile.color }</td>
                <td>{ automobile.year }</td>
                <td>{ automobile.model.name}</td>
                <td>{ automobile.model.manufacturer.name}</td>
                <td>{ setSold(automobile.sold) }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default AutomobilesList;
