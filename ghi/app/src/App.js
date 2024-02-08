import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import SalesPeopleList from './SalesPeopleList';
import CustomerForm from './CustomerForm';
import CustomersList from './CustomersList';
import SaleForm from './SaleForm';
import SalesList from './SalesList';
import SalesHistory from './SalesHistory'
import TechnicianListForm from './TechnicianListForm';
import AppointmentList from './AppointmentList';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import ModelsList from './ModelsList';
import ModelsForm from './ModelsForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople">
            <Route path="" element={<SalesPeopleList />} />
            <Route path="create" element={<SalesPersonForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomersList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="create" element={<SaleForm />} />
            <Route path="history" element={<SalesHistory />} />
          </Route>
          <Route path="technicians" element={<TechnicianListForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<ModelsList />} />
            <Route path="create" element={<ModelsForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList />} />
            <Route path="create" element={<AutomobileForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
