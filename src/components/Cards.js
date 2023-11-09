import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { API } from "../global"
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/card.css"


function CardReact() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${API}/items/get-items`);
                setData(response.data)
                setLoading(false)
            }
            catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchdata()
    }, [])

    const addToCart = (item) => {
        // Step 2: Add an item to the cart when the button is clicked
        setCart([...cart, item]);
    };

    return (
        <div className='cards'>
            {loading ? (<p>Loading..</p>) : error ? (<p>error:{error.message}</p>) :
                (data.map((item) => {
                    return <Card style={{ width: '18rem' }} className='card'>
                        <Card.Img variant="top" src={item.image} className='card-img' />
                        <Card.Body>
                            <Card.Title className='card-title'>{item.name}</Card.Title>
                            <Card.Text className='card-text'>
                                {item.category}<br />
                                Price:₹{item.price}/kg
                            </Card.Text>
                            <Button variant="primary" onClick={()=>addToCart(item)}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                }))}

        </div>
    );
}

export default CardReact;