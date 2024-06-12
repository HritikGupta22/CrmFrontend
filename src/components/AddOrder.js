import React, { useState } from 'react';
import axios from 'axios';
import './AddOrder.css'

const AddOrder = () => {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [customer, setcustomer] = useState('');
  const [message, setMessage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://crmbackend-2122.onrender.com/api/orders', {customer, product, amount});
      console.log('Order added:', response.data);
      setMessage({ type: 'success', text: 'Order added successfully!' });
      setProduct('');
      setAmount('');
      setcustomer('');
      setTimeout(() => setMessage(null), 3000); 
      } catch (error) {
        console.error('Error adding order:', error);
        setTimeout(() => setMessage(null), 3000); 
    }
    
  
  };

  return (
    <>

    <form onSubmit={handleSubmit} className='order-form'>
    <h1>Add Orders</h1>
      <input
        type="text"
        value={customer}
        onChange={(e) => setcustomer(e.target.value)}
        placeholder="Customer ID (if unknown, obtain from customer list)"
        required
      />
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Product Name"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      
      <button type="submit">Add Order</button>

      
    </form>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
    </>
  );
};

export default AddOrder;
