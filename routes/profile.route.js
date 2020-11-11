const express = require("express");
const router = express.Router();

const UserModel = require("../models/User.model");
const WineModel = require("../models/Wine.model");

const { isLoggedIn } = require('../helpers/auth-helper'); // this is the middleware to check if user is loggedIn

//for user to access his own profile
router.get("/profile", isLoggedIn, (req, res) => {
  let userData = req.session.loggedInUser._id;
  console.log("userData is: ", userData)
  // console.log("req.session is: ", req.session)
  // console.log("req.session.loggedInUser is: ", req.session.loggedInUser)

  UserModel.findById(userData)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

//for user to edit his own profile
router.patch("/profile/edit", (req, res) => {
  let userId = req.session.loggedInUser._id;

  UserModel.findByIdAndUpdate(userId, { $set: { ...req.body } })
    .then((updatedProfile) => {
      console.log(updatedProfile)

      res.status(200).json(updatedProfile);
    })
    .catch((err) => {
      console.log(err)

      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
    
});

//for a loggedin user to see another user profile
router.get("/profile/:userId", (req, res) => {
  let userId = req.params.userId;

  UserModel.findById(userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Failed to retrieved user information from DB",
        message: err,
      });
    });
});

module.exports = router;