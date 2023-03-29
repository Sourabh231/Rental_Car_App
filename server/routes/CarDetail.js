const Cardetails = require("../models/Cardetails")
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/adminpage",(req,resp)=>{
    console.log("okay")
})
app.post("/newcar",async (req,resp)=>{
    console.log(req.body)
    const { carname,type,model,milage,perkm,availablefrom,availabletill,image,description,cardetails,details} = req.body
    const CarData = new Cardetails({
        carname,
        type,
        model,
        milage,
        perkm,
        availablefrom,
        availabletill,
        image,
        description,
        cardetails,
        details
    })
    CarData.save()
    .then(() => {
      resp.send({ message: "successful" });
    })
    .catch((err) => {
      resp.send({ message: err });
      console.log(err);
    });
})
app.put("/editcar",(req,resp)=>{
    resp.send("my api")
})

