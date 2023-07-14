import React,{useState,useContext} from "react";
import './sign_in.css';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const Sign_in = () =>{
    
    //FOR AVATAR AND CART-ICON DATA UPDATION
    const { account, setAccount } = useContext(LoginContext);

    /* code to update and input form details */   
    const [arr,setData]=useState({
        "email":"",
        "password":""
    }
    );
    //console.log(arr);
    const adddata = (x) =>{
        
        const {name,value}=x.target;

        setData(()=>{
            return{
            ...arr,
            [name]:value
            }
        }    
        );
    };


    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = arr;
        
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });


            const data = await res.json();
           

            if (res.status === 400 || !data) {
               
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                setData({ ...arr, email: "", password: "" })
                toast.success("Login Successfully done 😃!", {
                    position: "top-center"
                });
            }
       
    };

    //NOW WE ARE ADDING CODE WITH WHICH WHEN USER WILL GET SUCCESSFULLY LOGGED IN CART AND AVATAR WILL GET UPDATED AUTOMATICALLY


    /*main signin code */
    return(
        <section>
     
        <div className="sign_container">
        
            <div className="sign_header">
                <img src="Amazon_logo_PNG3.png" alt="signupimg" />
            </div>

            <div className="sign_form">
                <form method='POST'>
                    <h1>Sign-In</h1>

                    <div className="form_data">
                        <label htmlFor="email">Email</label>
                        <input type="text" onChange= {adddata} value={arr.email} name="email"id="email" />
                    </div>
                    <div className="form_data">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Atleat 6 characters" onChange={adddata} value={arr.password} name="password" id="password" />
                    </div>
                    <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                </form>   
                <ToastContainer /> 
            </div>
            
            <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                 <NavLink to="/register">  <button>Create your Amazon Account</button></NavLink>
            </div>

        </div>

    </section> 
    );
}

export default Sign_in