import React, { useEffect, useState } from 'react';
import "../style/cart.css";
import { Button } from 'react-bootstrap';
import Bill from './Bill'; // Import the Bill component


function Cart({ cart }) {
  const [total, setTotal] = useState(0);
  const [showBillPopup, setShowBillPopup] = useState(false); // State for popup visibility

  const calculateTotal = (cartItems) => {
    let sum = 0;
    cartItems.forEach(element => {
      sum += element.price;
    });
    return sum;
  };

  useEffect(() => {
    setTotal(calculateTotal(cart));
  }, [cart]);

  const handleChargeBill = () => {
    setShowBillPopup(true); // Show the popup
  }

  const handleClosePopup = () => {
    setShowBillPopup(false); // Close the popup
  }

  return (
    <div className='myCart'>

      <h2>My Cart</h2>
      {!cart || cart.length === 0 ? (
        <p>Cart is Empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Item Price</th>
              <th>Quantity</th>
              <th>Net Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>1</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Net Total</td>
              <td>₹{total}</td>
            </tr>
          </tfoot>
        </table>
      )}
      <Button variant="primary" onClick={handleChargeBill}>Charge Bill</Button>

      {/* Popup */}
      {showBillPopup && (
        <div className="bill-popup">
          <div className="bill-popup-content">
            <span className="close-btn" onClick={handleClosePopup}>&times;</span>
            <Bill cart={cart} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
