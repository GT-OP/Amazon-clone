import React,{useState} from "react";
import {Divider} from '@mui/material';
import './sign_in.css';
import { NavLink, useActionData } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () =>{
    const [arr,setData]=useState({
       "fname":"",
       "email":"",
       "mobile":"",
       "password":"",
       "cpassword":""
    }
    );

    const adddata = (x) =>{
        const {name,value}=x.target ;
        
        setData(()=>{
            return{
                ...arr,
                [name]:value
            };
        });
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { fname, email, mobile, password, cpassword } = arr;
        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, mobile, password, cpassword
                })
            });

            const data = await res.json();
            // console.log(data);

            if (res.status === 422 || !data) {
                toast.error("Invalid Details !", {
                    position: "top-center"
                });
            } else {
                setData({
                    ...arr, fname: "", email: "",
                    mobile: "", password: "", cpassword: ""
                });
                toast.success("Registration Successfully done!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log("front end ka catch error hai" + error.message);
        }
    }


    return(
    <section>
        <div className="sign_container">
                <div className="sign_header">
                    <img src="Amazon_logo_PNG3.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign - Up</h1>
                        <div className="form_data">
                            <label htmlFor="fname">Your name</label>
                            <input type="text" onChange={adddata} value={arr.fname} name="fname" id="fname" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">email</label>
                            <input type="email" onChange={adddata} value={arr.email} name="email" id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="mobile">Mobile number</label>
                            <input type="number" onChange={adddata} value={arr.mobile} name="mobile" id="mobile" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={adddata} value={arr.password} id="password" placeholder="At least 6 characters" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="passwordg">Password again</label>
                            <input type="password" name="cpassword" onChange={adddata} value={arr.cpassword} id="passwordg" />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                        <Divider />
                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    </form>
                </div>
        <ToastContainer />        
        </div>
    </section>
    );
}

export default SignUp