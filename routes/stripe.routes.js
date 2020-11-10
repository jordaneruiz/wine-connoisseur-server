const express = require('express');
const router  = express.Router();


const { resolve } = require("path");
const WineModel = require('../models/Wine.model');
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51HlsvIIMHXpXkStpYUifwhq9jugGA6LbwpBPwgoVBQ3fyXu8XR6WQg1QrNyGNO4sTt605VfYOfSpKujsIzKT1SsT00UzKj2RDl");
router.use(express.static("."));
router.use(express.json());
const calculateOrderAmount = wine /* */ => {
  console.log("wine", wine)
  return wine.price * 100;
};
router.post("/create-payment-intent", async (req, res) => {
  const { wine /* */} = req.body; //req.body is the whole wine
  console.log("req.body", req.body)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(wine),//
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});


module.exports = router;