import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import "../style/billdetails.css";
import { API } from '../global';
import { notification } from 'antd';

function BillDetails() {
  const location = useLocation();
  const { data } = location.state;

  if (!data) {
    return (
      <div className="bill-details-container">
        <h2>Bill Details</h2>
        <p>No data available</p>
        <Button variant="primary" href="/card">Go to Home</Button>
      </div>
    );
  }

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };


  const lastBill = data[data.length - 1];

  console.log(lastBill);

  const handleDeleteBills = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.delete(`${API}/bills/delete-bills`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        openNotification('success', 'Bill Saved Successful', 'Your Bill has been Saved Successfully.');
        console.log('All bills deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting bills:', error);
    }
  };

  return (
    <div className="bill-details-container">
      <h2>Bill Details</h2>
      <div>
        <p>Customer Name: {lastBill.customerName}</p>
        <p>Phone Number: {lastBill.customerPhoneNumber}</p>
        <p>Total Amount: {lastBill.totalAmount}</p>
        <p>Tax: {lastBill.tax}</p>
        <p>Sub Total: {lastBill.subTotal}</p>
        <p>Payment Mode: {lastBill.paymentMode}</p>
        <p>Cart Items: {lastBill.cartItems}</p>
        <div className="button-container">
          <Button variant="danger" onClick={handleDeleteBills}>Delete Bills</Button>
          <Button variant="primary" href="/card">Home</Button>
        </div>
      </div>
    </div>
  );
}

export default BillDetails;
