const express=require("express");
const bodyParser = require('body-parser')
const cors=require("cors")
require("dotenv").config
const app=express();
const PORT=8080;
const stripe = require('stripe')("sk_test_51KpOBkDlrmIgsDL88TyD3ju54VqMbbNAVqKI5vA4iNmE0R0RohTIDaUug0Ak43bBThW5ibC2LhD6FfU6F0q1ofu0009C1aAXLq");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.post("/stripe/charge", cors(), async (req,res)=>{
  console.log("Stripe-route.js 9 | routes reached",req.body)
  let{amount, id} =req.body
  console.log("Stripe-route.js 10 | amount and id", amount, id)
  try{
    const payment=await stripe.paymentIntents.create({
      amount: amount,
      currency: "HKD",
      description: "Please give me money",
      payment_method: id,
      confirm: true,
    })
    console.log("Stripe-route.js 19 | payment", payment)
    res.json({
      message: "payment Successful",
      success: true,
    })
  }catch(error){
    console.log("Stripe-route.js 17 | error", error);
    res.json({
      message:"payment failed",
      success: false,
    })
  }
})

app.listen(PORT, ()=>{
  console.log(`Listening to the port ${PORT}`);
})