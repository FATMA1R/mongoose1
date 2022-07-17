const express = require('express');
const { default: mongoose } = require('mongoose');
const db_connect=async()=>{
    try{
       const result=await mongoose.connect(process.env.MONGO_URI);
       console.log("database is connected")
    
    } catch (error) {
       console.log(error)
    }
}
module.exports = db_connect;