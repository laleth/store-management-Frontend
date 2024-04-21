import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import "../style/billdetails.css";
import { API } from '../global';

function BillDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Check if 'data' parameter exists
  if (!searchParams.has('data')) {
    return (
      <div className="bill-details-container">
        <h2>Bill Details</h2>
        <p>No data available</p>
        <Button variant="primary" href="/">Go to Home</Button>
      </div>
    );
  }

  const billData = JSON.parse(searchParams.get('data'));

  // Get the last item from the billData array
  const lastBill = billData[billData.length - 1];

  console.log(lastBill);

  const handleDeleteBills = async () => {
    try {
      const response = await axios.delete(`${API}/bills/delete-bills`);
      if (response.status === 200) {
        console.log('All bills deleted successfully');
        // You can navigate to home or update state as needed
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
      <Button variant="primary" href="/">Home</Button>
      
    </div>
      </div>
    </div>
  );
}

export default BillDetails;
