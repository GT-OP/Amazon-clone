//created REDUX STORE

import {applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";     
import {composeWithDevTools} from "redux-devtools-extension";
import rootreducers from "./Components/redux/reducers/main";
import getproductsdata from "./Components/redux/reducers/main";
import { getProductsReducers } from "./Components/redux/reducers/Productsreducers";
/*rootreducers,
    composeWithDevTools(applyMiddleware(...middleware))*/
const middleware = [thunk];

//defining all reducers without the use of main.js
const store = configureStore({
    reducer: {
        getproductsdata : getProductsReducers
    },
 }
    
);

export default store;