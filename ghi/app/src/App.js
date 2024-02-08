import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SalesPersonForm from './SalesPersonForm';
// import ManufacturersList from './ManufacturesList';
// import ManufacturerForm from './CreateManufacturerForm';
// import VehicleModelForm from './CreateVehicleModelForm';
import AutomobilesList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import ModelsList from './ModelList';
import TechnicianForm from './AddTechnicianForm';
import TechnicianList from './TechnicianListForm';
import AppointmentList from './AppointmentList';
import AppointmentForm from './CreateAppointmentForm';
import AppointmentHistoryList from './ServiceHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customer/" element= {<CustomerForm />} />
          <Route path= "salespeople/" element={<SalesPersonForm />} />
          {/* <Route path="models/create/" element={<VehicleModelForm />} /> */}
          {/* <Route path="manufacturers/create/" element={<ManufacturerForm />} /> */}
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
