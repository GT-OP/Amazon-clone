require('dotenv').config({ path: '`' });
const express = require("express");
const app = express();
const port = process.env.PORT || 8005;

//we have created database in mongodb ATLAS
const mongoose=require("mongoose");

//ESTABLISHING CONNECTION WITH MONGODB BY CALLING 'conn.js' FILE
require("./db/conn");

//importing schema
const Products= require(__dirname+"/models/productsSchema");

//importing defaultdata
const Defaultdata=require("./defaultdata");
const cors=require("cors");
const router=require("./routes/router");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser(""));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://amazonstore-lxe5.onrender.com/"],
  })
);
app.use(router);

// for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}




app.listen(port,()=>{
    console.log('server is running on port number ${port} ');
});

Defaultdata();

