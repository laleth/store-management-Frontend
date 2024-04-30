import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router-dom';
import NavbarReact from './components/Navbar';
import Cart from './components/Cart';
import CardReact from './components/Cards';
import { useState } from 'react';
import Bill from './components/Bill';
import BillDetails from './components/Billdetails';
import Login from './components/Login';




function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  return (
    <div className="App">
    <NavbarReact/>
    <Router>
      <Routes>
      <Route
            path="/"
            element={<Login setAuthenticated={setAuthenticated}/>}
          />
        <Route
            path="/card"
            element={authenticated ? <CardReact addToCart={addToCart}/> : <Navigate to="/" />}
          />
        <Route
            path="/cart"
            element={authenticated ? <Cart  cart={cart}/> : <Navigate to="/" />}
          />
          <Route
            path="/bill"
            element={authenticated ? <Bill  cart={cart}/> : <Navigate to="/" />}
          />
          <Route
            path="/bill-details"
            element={authenticated ? <BillDetails/> : <Navigate to="/" />}
          />
      </Routes>
    </Router>
</div>
  );
}

export default App;
