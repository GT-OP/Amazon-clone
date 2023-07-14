import React from 'react';
import "./navbaar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import { useContext, useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
//FOR SIDE MENU
import Drawer from '@mui/material/Drawer';
import Rightheader from "./Rightheader";
//TO create menu when AVATAR IS CLICKED ON NAVBAR
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../redux/actions/action';
import { useSelector, useDispatch } from "react-redux";
//TO MAKE LIST IN SEARCH FILTER
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

//"NicePng_amazon-logo-png_167642.png"

/* redirecting to login page through Navlink from sign button*/
/* redirecting to home page through amazon logo */

//NOTE - IN <div class="cart_btn "> we have wriiten the code so that if user is not 
//{--continue} logged in it  and he/she clicks on cart he will be redirected to login page
//and if he/she a valid user he/she will get thier cat updated 

///defining icon on the left of navbar
//defining side menu using Drawer

const Navbaar = () => {

    const { account, setAccount } = useContext(LoginContext);

    const history = useNavigate("");

    const [dropen, setDropen] = useState(false);


    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

        if (res.status !== 201) {
            console.log("first login");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(data);
        }
    }

    useEffect(() => {
        getdetailsvaliduser();
    }, []);



    //for starus of opening and closing menu
    const handelopen = () => {
        setDropen(true);
    }
    const handleClosedr = () => {
        setDropen(false)
    }



    //FUNCTION AND HOOKS FOR DROP DOWN MENU 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };







    // for logout
    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        // console.log(data2);

        if (res2.status !== 201) {
            const error = new Error(res2.error);
            throw error;
        } else {
            console.log("data valid log");
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            history("/");
            setAccount(false);
           
        }
    }

    //FOR SEARCH FILTER AND THE LIST HAS BEEN CREATED USING MATERIAL UI
    const [text, setText] = useState();
    const { products } = useSelector(state => state.getproductsdata);
    const [liopen, setLiopen] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }




    //MAIN FUNCTION OF NAVBAR
    return (
        <header>
            <nav>
                <div className='left'>

                    <IconButton className="hamburgur" onClick={handelopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>

                    <Drawer open={dropen} onClose={handleClosedr}>
                        <Rightheader logclose={handleClosedr} logoutuser={logoutuser}/>
                    </Drawer>

                    <div className='navlogo'>
                        <NavLink to="/"> <img src="https://static.vecteezy.com/system/resources/previews/019/040/342/non_2x/amazon-logo-editorial-free-vector.jpg" /> </NavLink>
                    </div>

                    <div className='nav_searchbaar'>
                        <input type="text" name="" id=""  onChange={(e) => getText(e.target.value)}
                        placeholder="Search Your Products" />
                        <div className='search_icon'>
                            <SearchIcon id="search"></SearchIcon>
                        </div>
                        {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className='right'>
                    <div className="nav_btn">

                        <NavLink to="/login" >Sign in</NavLink>
                    </div>

                    <div className="cart_btn">
                        {
                            account ? <NavLink to="/buynow">
                                <div className="cart_btn">
                                    <Badge badgeContent={account.carts.length} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>

                                    <p>Cart</p>
                                </div>
                            </NavLink> : <NavLink to="/login">
                                <div className="cart_btn">
                                    <Badge badgeContent={0} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                    <p>Cart</p>
                                </div>
                            </NavLink>
                        }
                    </div>
                    {
                        account ? <Avatar className="avtar2" id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar" id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}></Avatar>
                    }

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        <MenuItem onClick={handleClose} style={{ margin: 10 }}>My account</MenuItem>
                        <MenuItem onClick={logoutuser} style={{ margin: 10 }}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout</MenuItem>
                    </Menu>

                </div>

            </nav>


        </header>

    )
}

export default Navbaar;



