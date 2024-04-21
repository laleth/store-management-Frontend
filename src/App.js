import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import NavbarReact from './components/Navbar';
import Cart from './components/Cart';
import CardReact from './components/Cards';
import { useState } from 'react';
import Bill from './components/Bill';
import BillDetails from './components/Billdetails';



function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  return (
    <div className="App">
    <NavbarReact/>
    <Router>
      <Routes>
        <Route path='/' element={<CardReact addToCart={addToCart}/>}/>
        <Route path='/cart' element={<Cart cart={cart}/>}/>
        <Route path='/bill' element={<Bill cart={cart}/>}/>
        <Route path="/bill-details" element={<BillDetails/>} />
      </Routes>
    </Router>
</div>
  );
}

export default App;
