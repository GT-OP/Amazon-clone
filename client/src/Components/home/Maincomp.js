import React, { useEffect } from "react";
import Banner from "./Banner.js";
import './home.css';
import Slide from "./Slide.js";
import { getProducts } from '../redux/actions/action';
import { useSelector, useDispatch } from "react-redux";

const Maincomp = () => {

  //getproductsdata is the name given to our reducer function(present in action.js) in main.js
  //raeding data from use Selector
  const {products}=useSelector(state=> state.getproductsdata);
  //console.log(products);

  const dispatch=useDispatch();

  //calling getproducts function using dispatch which will fetch data from mongodb cloud on which our data is save
  useEffect(() => {
    dispatch(getProducts());
}, [dispatch])

    return (
      <div className="home_section">
            <div className="banner_part">
              <Banner />                
            </div>
            <div className="slide_part">
              <div className="left_slide">
                  <Slide title="Deal Of The Day" products={products} />
              </div>
              <div className="right_slide">
                  <h4>Best Deals On Laptops</h4>
                  <img src="https://m.media-amazon.com/images/G/31/img19/AMS/Houseads/Laptops-Sept2019._CB436595915_.jpg" alt="rightimg" />
                  <a href="#">see more</a>
              </div>
            </div>

            <Slide title="Today's offer" products={products} />
            <div className="center_img">  
                <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
            </div>
            <Slide title ="Up to 80% off" products={products}/>
            <Slide title="Up to 80% off" products={products}/>
        </div>
    );
  }
  
  export default Maincomp