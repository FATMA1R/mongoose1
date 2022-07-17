const express = require('express');
const app = express()
const db_connect=require("./db_connect");
require("dotenv").config();
db_connect(); //appel db

app.use(express.json()); 

// *****************************ROUTES************************************
// ---global middlware for person routes 
// ---@PATH: /person
app.use("/person",require("./routes/person"));


app.listen(process.env.PORT, (err)=>
err ? console.log(err) : console.log("server is running"));
