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
  return Number(wine.price) * 100;

};
router.post("/create-payment-intent",  async (req, res) => {
  const { wine /* */} = req.body; //req.body is the whole wine
  console.log("req.body", req.body)
  // Create a PaymentIntent with the order amount and currency
 
    const paymentIntent =  await stripe.paymentIntents.create({
      amount: calculateOrderAmount(wine),//
      currency: "usd"
    })

      // WineModel.findByIdAndUpdate(wine._id, {$set: {userBuyer: req.session.loggedInUser._id, userSeller: null}})
      // .then(() => {
          res.send({
            clientSecret: paymentIntent.client_secret
          });

      // .catch((err) => {
      //   console.log(err)
      // })
  // })
  
});


router.post('/updateWineBuyer', (req, res) => {
  const { wine /* */} = req.body; 
   WineModel.findByIdAndUpdate(wine._id, {$set: {userBuyer: req.session.loggedInUser._id, /*userSeller: null*/ saleStatus: true}})
      .then(() => {
        res.status(200).json({})
      })
    .catch((err) => {
      console.log(err)
    })
})


module.exports = router;