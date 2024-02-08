import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import ListCustomers from './CustomersList';
import SaleForm from './SaleForm';
import SalesPersonForm from './SalesPersonForm'
import SalesPeopleList from './SalesPeopleList';
import SalesHistory from './SalesHistory';
import SalesList from './SalesList';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelForm from './CreateVehicleModelForm';
import AutomobilesList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import ModelsList from './ModelsList';
import TechnicianForm from './AddTechnicianForm';
import TechnicianList from './TechnicianListForm';
import AppointmentForm from './CreateAppointmentForm'
import AppointmentList from './AppointmentList';
import AppointmentHistoryList from './ServiceHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customers/list/" element={<ListCustomers />} />
          <Route path="customers/" element= {<CustomerForm />} />
          <Route path="" element={<SalesList />} />
          <Route path="sales">
            <Route path="" element={<SalesPeopleList />} />
            <Route path="create" element={<SaleForm />} />
            <Route path="history" element={<SalesHistory />} />
          </Route>
          <Route path="salespeople/" element={<SalesPersonForm />} />
          <Route path="models/create/" element={<VehicleModelForm />} />
          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
          <Route path="models/list/" element={<ModelsList />}/>
          <Route path="technicians/create/" element={<TechnicianForm />} />
          <Route path="technicians/" element={<TechnicianList />} />
          <Route path="appointments/" element={<AppointmentList />} />
          <Route path="appointments/create/" element={<AppointmentForm />} />
          <Route path="appointments/history/" element={<AppointmentHistoryList />} />
          <Route path="automobiles">
            <Route path="" element={<AutomobilesList />} />
            <Route path="create" element={<AutomobileForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
