import { useEffect, useState } from 'react';

function SalesHistory() {
  const [sales, setSales] = useState([])
  const [salespeople, setSalespeople] = useState([])
  const [filteredSales, setFilteredSales] = useState([])

  const getSalesData = async () => {
    const salesResponse = await fetch('http://localhost:8090/api/sales/');

    if (salesResponse.ok) {
      const salesData = await salesResponse.json();
      setSales(salesData.sales)
    }
  }

  const getSalesPeopleData = async () => {
    const salespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');

    if (salespeopleResponse.ok) {
      const salespeopleData = await salespeopleResponse.json();
      setSalespeople(salespeopleData.salespeople)
    }
  }

  useEffect(()=>{
    getSalesData()
    getSalesPeopleData()
  }, [])

  function getSalesperson(employee) {
   setFilteredSales(sales.filter((sale) => sale.salesperson.employee_id === employee))
  }
  
  return (
    <>
    <h1>Salesperson History</h1>
    <div className="btn-group">
        <button className="btn btn-success btn-lg" type="button">
            Choose a Salesperson
        </button>
        <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
            {salespeople.map(salesperson => {
                return(
                    <li key={salesperson.id}><button className="dropdown-item" type="button" onClick={() => getSalesperson(salesperson.employee_id)}>{salesperson.first_name} {salesperson.last_name}</button></li>
                )})}
        </ul>
    </div>
    <table className="table table-striped">
      <thead>
        <tr>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {filteredSales.map(sale => {
          return (
            <tr key={sale.id}>
                <td>{ `${sale.salesperson.first_name} ${sale.salesperson.last_name}` }</td>
                <td>{ `${sale.customer.first_name} ${sale.customer.last_name}` }</td>
                <td>{ sale.automobile }</td>
                <td>{ sale.price }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default SalesHistory;
