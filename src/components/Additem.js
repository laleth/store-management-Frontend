import React, { useState } from 'react';
import NavbarReact from './Navbar';
import axios from 'axios';
import { API } from '../global';
import '../style/additem.css'; 
import { notification } from 'antd';

function Additem() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: ''
  });

   const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !formData.image) {
      openNotification('error', 'Failed to Add', 'Please fill in all fields.');
      return; 
    }
  
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.post(`${API}/items/add-items`, formData, {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        console.log('Item added successfully');
        openNotification('success', 'Added Successful', 'Item Added successfully.');
        
        setFormData({
          name: '',
          price: '',
          category: '',
          image: ''
        });
      }
    } catch (error) {
      console.error('Error adding item:', error.message);
      openNotification('error', 'Failed to Add', 'There was an error during Adding.');
    }
  };
  

  return (
    <div>
      <NavbarReact />
      <div className="additem-container">
        <h2>Add Item</h2>
        <form className="additem-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <textarea type="text"  name="image" value={formData.image} onChange={handleChange} required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Additem;
