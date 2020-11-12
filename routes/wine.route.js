const express = require("express");
	const router = express.Router();
	

	let WineModel = require("../models/Wine.model");
	//for later
	const { isLoggedIn } = require('../helpers/auth-helper'); // this is the middleware to check if user is loggedIn
	

	//This will be used to displayed all the available bottles on the home page
	router.get("/bottles", (req, res) => {
	  WineModel.find({saleStatus: false})
	  //WineModel.find({ $and: [{saleStatus: false}, {userSeller: { $ne: req.session.loggedInUser._id}}] })
	

	  // .populate('userSeller')
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
	

	

	

	

	//mybottles
	router.get("/userBottles", (req, res) => {
	  //WineModel.find({userSeller: req.session.loggedInUser._id })
	  WineModel.find({ $and: [{saleStatus: false}, {userSeller: req.session.loggedInUser._id}] }) 
	

	  // .populate('userSeller')
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
	

	//my purchased Bottles
	router.get("/userBottlesPurchased", (req, res) => {
	  WineModel.find({userBuyer: req.session.loggedInUser._id })
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
	

	

	//my sold bottles
	router.get("/userBottlesSold", (req, res) => {
	  WineModel.find({ $and: [{saleStatus: true}, {userSeller: req.session.loggedInUser._id}] }) 
	    .then((sales) => {
	      console.log(req.session.loggedInUser._id)
	      sales.forEach(eachsales => {console.log(eachsales.saleStatus, eachsales.userSeller)})
	      res.status(200).json(sales);
	    })
	    .catch((err) => {
	      res.status(500).json({
	        error: "Something went wrong",
	        message: err,
	      });
	    });
	});
	

	

	

	//, userBuyer: req.session.loggedInUser._id  {userSeller: req.session.loggedInUser._id }
	

	router.get("/userBottles/:userId", (req, res) => {
	  //WineModel.find({userSeller: req.params.userId/*req.session.loggedInUser._id*/})
	  WineModel.find({ $and: [{saleStatus: false}, {userSeller: req.params.userId}] }) 
	

	  // .populate('userSeller')
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
	

	// //other user's bottle
	// router.get("/otheruserbottles", (req, res) => {
	

	//   WineModel.find({userSeller: req.params.userSeller})
	//   // .populate('userSeller')
	//     .then((wines) => {
	//       res.status(200).json(wines);
	//     })
	//     .catch((err) => {
	//       res.status(500).json({
	//         error: "Something went wrong",
	//         message: err,
	//       });
	//     });
	// });
	

	//form to sell a new bottle
	router.post("/add-bottle", isLoggedIn, (req, res) => {
	  let wineSeller = req.session.loggedInUser._id;
	  
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
	

	    // console.log("req.session is:", req.session)
	    // console.log("48 wineSeller is:", wineSeller)
	

	    WineModel.create({
	      ...req.body,
	      userSeller: wineSeller,
	    })
	      // .populate('userSeller')
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
	router.get('/bottle/:bottleId', isLoggedIn,  (req, res) => {
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
	router.delete('/bottle/:bottleId', isLoggedIn, (req, res) => {
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
	router.patch('/bottle/edit/:bottleId', isLoggedIn, (req, res) => {
	    let bottleId = req.params.bottleId
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
	    console.log(bottleId)
	    WineModel.findByIdAndUpdate(bottleId, {
	      name: name,
	      year: year,
	      price: price,
	      description: description,
	      country: country,
	      region: region,
	      grappeVariety: grappeVariety,
	      color: color,
	      image: image,
	    })
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
