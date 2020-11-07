const express = require("express");
const router = express.Router();

let WineModel = require("../models/Wine.model");
//for later
//const { isLoggedIn } = require('../helpers/auth-helper'); // this is the middleware to check if user is loggedIn

//This will be used to displayed all the available bottles on the home page
router.get("/bottles", (req, res) => {
  WineModel.find()
    .then((wines) => {
      res.status(200).json(wines);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});




//form to sell a new bottle
router.post("/add-bottle", /*isLoggedIn, */ (req, res) => {
    const {
      name,
      year,
      price,
      description,
      country,
      region,
      grappeVariety,
      color,
      image,
    } = req.body;

    console.log(req.body)

    WineModel.create({
      name,
      year,
      price,
      description,
      country,
      region,
      grappeVariety,
      color,
      image,
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({
          error: "Something went wrong",
          message: err,
        });
      });
  }
);



//to check a specific bottle's details
router.get('/bottle/:bottleId', /*isLoggedIn, */ (req, res) => {
  WineModel.findById(req.params.bottleId)
    .then((resp) => {
      res.status(200).json(resp)
    })
    .catch((err) => {
        res.status(500).json({
          error: 'Something went wrong',
          message: err
        })
    })
})


//for the seller to delete one of his "for sale bottle"
router.delete('/bottle/:bottleId', /*isLoggedIn, */ (req, res) => {
  WineModel.findByIdAndDelete(req.params.bottleId)
  .then((resp) => {
       res.status(200).json(resp)
  })
  .catch((err) => {
       res.status(500).json({
            error: 'Something went wrong',
            message: err
       })
  })  
})


//for the seller to edit one of his "for sale bottle"
router.patch('/bottle/:bottleId', /*isLoggedIn,*/ (req, res) => {
    let bottleId = req.params.id
    const {
      name,
      year,
      price,
      description,
      country,
      region,
      grappeVariety,
      color,
      image,
    } = req.body;

    WineModel.findByIdAndUpdate(bottleId, {$set: {
      name: name,
      year: year,
      price: price,
      description: description,
      country: country,
      region: region,
      grappeVariety: grappeVariety,
      color: color,
      image: image,
    }})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               console.log(err)
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

module.exports = router;