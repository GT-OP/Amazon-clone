import './App.css';
import Navbaar from './Components/header/Navbaar.js';
import Newnav from './Components/newnav/Newnav.js';
import Maincomp from './Components/home/Maincomp.js';
import Footer from './Components/footer/Footer.js';
import { Routes, Route } from "react-router-dom";
import SignUp from './Components/signup_signin/SignUp.js';
import Sign_in from './Components/signup_signin/Sign_in.js'
import Cart from './Components/cart/Cart.js'
import Buynow from './Components/buynow/Buynow.js';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from "react"
/* SINCE " MAINCOMP " HAS ALREADY BEEN USED IN ROUTES THEREFORE WE WILL NOT USE IT OTHERWISE OUR WEBSITE WON'T WORK PROPERLY*/

function App() {
  //FOR LOADING ANIMATION
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])


  return (
    <>
      {
        data ? (
          <>
            <Navbaar />
            <Newnav />
            <Routes>
              <Route path="/" element={<Maincomp />} />
              <Route path="/login" element={<Sign_in />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/getproductsone/:id" element={<Cart />} />
              <Route path="/buynow" element={<Buynow />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )
      }
    </>
  );
}

export default App;
