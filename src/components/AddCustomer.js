import React, { useState } from 'react';
import axios from 'axios';
import './AddCustomer.css'

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://crmbackend-2122.onrender.com/api/customers', { name, email, phone });
      console.log('Customer added:', response.data);
      setMessage({ type: 'success', text: 'Customer added successfully!' });
      setName('');
      setEmail('');
      setPhone('');
      setTimeout(() => setMessage(null), 3000); 

    } catch (error) {
      console.error('Error adding customer:', error);
      setMessage({ type: 'error', text: 'Error adding customer' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <>

    <form onSubmit={handleSubmit} className='customer-form'>
    <h1>Add Customer</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <button type="submit">Add Customer</button>
    </form>

    {message && (
      <div className={`message ${message.type}`}>
        {message.text}
      </div>
    )}

    </>

  );
};

export default AddCustomer;
