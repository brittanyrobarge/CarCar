import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import RecordSaleForm from './RecordSaleForm';
import ListSalesPeople from './ListSalesPeople';
import ListAllSales from './ListAllSales';
import ListCustomers from './ListCustomers';
import SalesPersonForm from './SalesPersonForm';
import ManufacturersList from './ManufacturesList';
// import ManufacturerForm from './CreateManufacturerForm';
// import VehicleModelForm from './CreateVehicleModelForm';
import ModelsList from './ModelList';
import TechnicianForm from './AddTechnicianForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customers/list/" element={<ListCustomers />} />
          <Route path="customer/" element= {<CustomerForm />} />
          <Route path="salespeople/list/" element={<ListSalesPeople />} />
          <Route path="sales/" element={<RecordSaleForm />} />
          <Route path= "salespeople/" element={<SalesPersonForm />} />
          <Route path="sales/history/" element={<ListAllSales />} />
          {/* <Route path="models/create/" element={<VehicleModelForm />} /> */}
          {/* <Route path="manufacturers/create/" element={<ManufacturerForm />} /> */}
          <Route path="models/list/" element={<ModelsList />}/>
          <Route path="technicians/create/" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
