const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();

app.use(bodyParser.json());

const orders = [];
let orderId=1;
app.post("/order",async(req,res)=>{
    const {userId,order_details} = req.body;

    if(!userId || !order_details)
    {
        return res.status(400).json({error:"missing required filed userId or orderdetails"});
    }

    const newOrder = {order_id:orderId++,userId,order_details,created_at:new Date()};
    orders.push(newOrder);
    
    try{
        const notificationResponse= await axios.post("http://localhost:4000/notify",{
            user_id:userId,
            message:`Your order (${newOrder.order_details})has been placed successfully.`

        });
        
        res.status(201).json({
            message:"Order placed and user is notified",
            order:newOrder,
            notificationStatus:notificationResponse.data,

        })
    }
    catch (e){
        console.error("error in order placing service.",e.message);
        res.status(500).json({message:"ordered placed but notification failed"});
    }
})

app.listen(3000,()=>{
    console.log("order service is running at port 3000");
})