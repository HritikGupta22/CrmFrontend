import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import AddCustomer from './components/AddCustomer';
import AddOrder from './components/AddOrder';
import AudienceBuilder from './components/AudienceBuilder';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Mini CRM</h1>
          <nav>
            <ul>
              <li><Link to="/">Add Customer & Order</Link></li>
              <li><Link to="/customers">Customer List</Link></li>
              <li><Link to="/orders">Order List</Link></li>
              <li><Link to="/audience">Build Audience</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<div><AddCustomer /><AddOrder /></div>} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/audience" element={<AudienceBuilder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
