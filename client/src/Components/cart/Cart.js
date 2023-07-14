import React from "react";
import './cart.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from "@mui/material";
import { data1 } from './data1';
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../context/ContextProvider";
//FOR LOADING ANIMATION
import CircularProgress from '@mui/material/CircularProgress';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const Cart = () => {

    const { id } = useParams("");
    //console.log(id);

    //storing hook
    const history = useNavigate("");

    //USING useContext hook 
    const { account, setAccount } = useContext(LoginContext);

    //using hook to update individual item datat with initial value of inddata as ""
    const [inddata, setIndedata] = useState("");

    const getinddata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {

                "Content-Type": "application/json"
            }

        });
        console.log("res is");
        console.log(res);
        const data = await res.json();
        //console.log(data);

        if (res.status !== 201) {
            alert("no data available")
        } else {
            // console.log("ind mila hain");
            setIndedata(data);
        }
    };

    useEffect(() => {
        setTimeout(getinddata, 1000)
    }, [id]);



    //below code is for dates and month
    let d = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // Adding one date to the present date
    d.setDate(d.getDate() + 1);

    let year = d.getFullYear();
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    let day1 = day; let month1 = d.getMonth(); let curr = day;
    // Adding leading 0 if the day or month
    // is one digit value
    month = month.length == 1 ?
        month.padStart('2', '0') : month;

    day = day.length == 1 ?
        day.padStart('2', '0') : day;

    if (day1 > day) {
        month1 = month;
    }
    let r = d.getDate() + 5;
    if (curr > 23) {
        r = 2;
    }


    //ADD TO CART FUNCTION
    const addtocart = async (id) => {
        console.log(id);
        const checkres = await fetch(`/addcart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inddata
            }),
            credentials: "include"
        });
        // console.log(check);
        const data1 = await checkres.json();
        // console.log(data1 +  'ok');


        if (checkres.status == 401 || !data1) {
            console.log("user invalid ");
            alert("user invalid");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(data1);
            alert("Data added into your cart");
            history("/buynow");
        }
    }




    //Since we want to call hook once our web page has been rendered therefore we have written all html code inside {indata && object....} 
    return (

        <div className="cart_section">
            {inddata && Object.keys(inddata).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={inddata.detailUrl} alt="" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>Add to Cart</button>
                            <button className="cart_btn2">Buy Now</button>
                        </div>
                    </div>
                    <div className="right_cart">
                        <h3>{inddata.title.shortTitle}</h3>
                        <h4>{inddata.title.longTitle}</h4>
                        <div className="best-seller">
                            #1 best seller
                        </div>

                        <Divider />

                        <p className="Deal_of_the">Deal Of The Day</p>
                        <p><span style={{ color: "#cc0c39", fontSize: "18px" }}>-{inddata.price.discount} </span><span>₹</span><span style={{ fontSize: "30px", fontWeight: 300 }}>{inddata.price.cost}</span></p>
                        <p className="mrp">M.R.P. : <del>₹{inddata.price.mrp}</del></p>
                        <p><span style={{ color: "black" }}>Inclusive of all Taxes</span></p>

                        <Divider />

                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{inddata.price.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>{monthNames[month1 - 1]} {r}- {day}</span> Details</h4>
                        </div>
                        <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow,{day} {monthNames[month - 1]}. Order within 8 hrs 1 min. </span></p>
                        <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>

                    </div>
                </div>
            }

            {!inddata ? <div className="circle">
                <CircularProgress />
                <h2> Loading....</h2>
            </div> : ""}
        </div>


    );
}

export default Cart