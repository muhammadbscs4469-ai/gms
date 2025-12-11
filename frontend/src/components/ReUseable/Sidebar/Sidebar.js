import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2><Link to="/">Dashboard</Link></h2>
      <nav>
        <ul>
          {/* <li><Link to="/">Home</Link></li> */}
          <li><Link to="/logistic">Logistic</Link></li>
          <li><Link to="/dispatch">Dispatch Manager</Link></li>
          {/* <li><Link to="/about">About</Link></li> */}
          {/* <li><Link to="/services">Services</Link></li> */}
          {/* <li><Link to="/contact">Contact</Link></li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
