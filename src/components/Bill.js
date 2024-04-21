import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { API } from '../global';
import '../style/bill.css';
import { notification } from 'antd';

function Bill({ cart }) {
  const [custname, setCustname] = useState("");
  const [phone, setPhone] = useState("");
  const [tax, setTax] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [paymentmode, setPayment] = useState("");
  const [cartItems, setCartitems] = useState("");
  const [total, setTotal] = useState(0);

  const calculateSubTotal = () => {
    let sum = 0;
    const names = cart.map(item => item.name).join(', ');
    setCartitems(names);
    
    cart.forEach(element => {
      sum += element.price;
    });
    
    return sum;
  };

  useEffect(() => {
    const calculatedSubTotal = calculateSubTotal();
    setTotal(calculatedSubTotal);
    const calculatedTax = calculatedSubTotal * 0.1; 
    setTax(calculatedTax);
    setSubtotal(calculatedSubTotal + calculatedTax);
  }, [cart, subTotal]);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };


  const chargebill = async () => {
    try {
      const response = await axios.post(`${API}/bills/charge-bill`, {
        customerName: custname,
        customerPhoneNumber: phone,
        totalAmount: total,
        tax: tax,
        subTotal: subTotal,
        paymentMode: paymentmode,
        cartItems: cartItems
      });
      if (response.status === 200) {
        openNotification('success', 'Bill Saved Successful', 'Your Bill has been Saved Successfully.');
      } else {
        console.log(`Error: ${response.data.message}`);
        openNotification('error', 'Bill Error', 'There was an error during Bill Saving.');
      }
    } catch (error) {
      console.error('Error during bill charging:', error);
    }
  };

  const getBill = async () => {
    try {
      const response = await axios.get(`${API}/bills/get-bill`);
      const billData = response.data;
      
      window.location.href = `/bill-details?data=${JSON.stringify(billData)}`;
      
    } catch (error) {
      console.error('Error retrieving bill:', error);
      openNotification('error', 'Bill Retrieval Error', 'There was an error retrieving the bill.');
    }
  };
  

  return (
    <div className="bill-container">
      <label>
        Customer Name:
        <input type='text' placeholder='Customer Name' onChange={(e) => setCustname(e.target.value)} value={custname} />
      </label>
      <label>
        Phone Number:
        <input type='text' placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} value={phone} />
      </label>
      <label>
        Total Amount:
        <input type='text' placeholder='Total Amount' value={total} readOnly />
      </label>
      <label>
        Tax:
        <input type='text' placeholder='Tax' value={tax} readOnly />
      </label>
      <label>
        Sub Total:
        <input type='text' placeholder='Sub Total' value={subTotal} readOnly />
      </label>
      <label>
        Payment Mode:
        <input type='text' placeholder='Payment Mode' onChange={(e) => setPayment(e.target.value)} value={paymentmode} />
      </label>
      <label>
        Cart Items:
        <input type='text' placeholder='Cart Items' value={cartItems} readOnly />
      </label>
      <Button variant='info' onClick={chargebill}>Charge Bill</Button>
      <Button variant='success' onClick={getBill}>Get Bill</Button>
    </div>
  );
}

export default Bill;
