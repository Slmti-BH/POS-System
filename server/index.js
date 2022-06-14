const express=require("express");
const db=require("./database");
require("dotenv").config();

const app=express();
const PORT=process.env.POR||4040;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
});