import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
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
          <Route path="technicians/create/" element={<TechnicianForm />} />
          <Route path="technicians/" element={<TechnicianList />} />
          <Route path="appointments/" element={<AppointmentList />} />
          <Route path="appointments/create/" element={<AppointmentForm />} />
          <Route path="appointments/history/" element={<AppointmentHistoryList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
