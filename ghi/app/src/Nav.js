import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">CarCar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle pr-4" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item"  to="salespeople/">Add a Salesperson</Link></li>
                <li><Link className="dropdown-item" to="salespeople">Salespeople</Link></li>
                <li><Link className="dropdown-item" to="customers/">Add a customer</Link></li>
                <li><Link className="dropdown-item"to="customers">Customers</Link></li>
                <li><Link className="dropdown-item" to="sales/">Add a Sale</Link></li>
                <li><Link className="dropdown-item" to="sales">Sales</Link></li>
                <li><Link className="dropdown-item" to="sales/history">Sales History</Link></li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle pr-4" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/technicians">Technicians</Link></li>
                <li><Link className="dropdown-item" to="/technicians/create">Add a Technician</Link></li>
                <li><Link className="dropdown-item" to="/appointments">Service Appointments</Link></li>
                <li><Link className="dropdown-item" to="/appointments/create">Create a Service Appointment</Link></li>
                <li><Link className="dropdown-item" to="/appointments/history">Service History</Link></li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle pr-4" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/manufacturers">Manufacturers</Link></li>
                <li><Link className="dropdown-item" to="/manufacturers/create">Add a Manufacturer</Link></li>
                <li><Link className="dropdown-item" to="/models">Models</Link></li>
                <li><Link className="dropdown-item" to="/models/create">Add a Model</Link></li>
                <li><Link className="dropdown-item" to="/automobiles">Automobiles</Link></li>
                <li><Link className="dropdown-item" to="/automobiles/create">Add an Automobile</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
