import React, { useContext } from "react";
import Avatar from '@mui/material/Avatar';
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import './rightheader.css';
import LogoutIcon from '@mui/icons-material/Logout';

const Rightheader=({logclose,logoutuser})=>{
    
    const {account,setAccount}=useContext(LoginContext);
    const imgd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAdVBMVEX/mTMSiAf/////lin/u4N7rnoAhQAAAHb5+fzt7fX19fkAAIIAAHyUlL7i4u6Hh7cAAIdlZabX1+exsdGXl8Tc3OrPz+Orq8yRkb/IyN02NpRcXKKMjLi/v9qOjr+hocRRUZ2AgLMLC4kbG4g+PpRvb6tLS5yC6aPSAAABUklEQVRoge2WbW+EIAyAXfcCVMATVOTUoed5//8njlz2dYlZaLYPfdJE/PKkAdpSVQzDMAzDMAzzF7wSUr0RUgEh/0aO/TD0SCFHv+61EPW++tP+s/Kwi/vYxtiOd7GHonI56SNZBSqHTYeeZDk5XutJIThprXSAaqqvp7bmlPxRRwkLOOty5IWM9aOU3OgWBlCL8s75/Mk/rTZl5EpvCDJAsvMwzDZBkICbVkXkRiwqIhrbfKb02ViDGNUiTqR+Qn5bVU7c981oxhxN7wOCWm8l5Fb7fJDoNmO6jDGbw95Zr20B+aKbXPhhHufuuFyOLi9CbgKNXgrIvbAqpx7T2F0ynUkx30hlhSeQjyXlpNtCeqCkV5G2iEjLn7RxfbfcSNNyaYfFc8x1RGMOSAc00D4tnn6yR9FvoJW/E1J9EFK9EMJylrOc5SxnOctZznKW/8QXesNF4ZJCeSYAAAAASUVORK5CYII";
    return(
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {
                        account ? <Avatar className="avtar2" title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar>:
                        <Avatar className="avtar"></Avatar>
                    }                
                    {account ? <h3>Hi, {account.fname.toUpperCase()}</h3> : ""}
                </div>
                <div className="nav_btn" onClick={()=>logclose()}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Shop by category</NavLink>
                    <Divider style={{ width: "100%", marginLeft: "-20 px" }}/>

                    <NavLink to="/">Todays Deal</NavLink>
                    {
                        account ? <NavLink to="/buynow">Your Order</NavLink> : <NavLink to="/login">Your Order</NavLink>
                    }
                    <Divider style={{ width: "100%", marginLeft: "-20 px" }}/>

                    <div className="flag">
                        <NavLink to="" style={{ marginTop: 14 }}>Settings</NavLink>
                        <img src={imgd} alt="Indian Flag" style={{ width: 35, marginLeft: 10 }}/>
                    </div>

                    {
                        account ?
                            <div className="flag">
                                <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                                <h3 onClick={() => logoutuser()} style={{ cursor: "pointer", fontWeight: 500 }}>Log Out</h3>
                            </div>
                            : <NavLink to="/login">Sign in</NavLink>
                    }

                </div>
            </div>
        </>
    );
}

export default Rightheader