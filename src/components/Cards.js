import React, { useEffect, useState, createContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Badge, message } from 'antd';
import { API } from '../global';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/card.css';
import Carouselreact from './Carousel';
import NavbarReact from './Navbar';

const CartContext = createContext();

function CardReact({ addToCart }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`${API}/items/get-items`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.post(
        `${API}/items/delete-items`,
        { itemId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        message.success('Item deleted successfully');
        setData(data.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      message.error('Failed to delete item');
      console.error('Error deleting item:', error.message);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <NavbarReact />
      <Carouselreact />
      <div className='cards'>
        <Link to='/cart'>
          <Badge count={cartItems.length}>
            <Button variant='primary'>View Cart</Button>
          </Badge>
        </Link>
        {loading ? (
          <p>Loading..</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          data.map((item) => (
            <Card key={item._id} style={{ width: '18rem' }} className='card'>
              <Card.Img variant='top' src={item.image} className='card-img' />
              <Card.Body>
                <Card.Title className='card-title'>{item.name}</Card.Title>
                <Card.Text className='card-text'>
                  {item.category}
                  <br />
                  Price: ₹{item.price}/kg
                </Card.Text>
                <Button
                  variant='primary' className='crd-btn'
                  onClick={() => handleAddToCart(item)}>
                  Add To Cart
                </Button>
                <Button
                  variant='danger' className='crd-btn'
                  onClick={() => handleDeleteItem(item._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </CartContext.Provider>
  );
}

export default CardReact;
