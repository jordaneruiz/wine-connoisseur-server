const express = require('express')
const router = express.Router()

//we installed bcrypt.js
const bcrypt = require('bcryptjs');

const UserModel = require('../models/User.model');

//will come later in the code 
//const { isLoggedIn } = require('../helpers/auth-helper'); // middleware to check if user is loggedIn


router.post('/signup', (req, res) => {
  const {username, email, password } = req.body;
  console.log(username, email, password);
  console.log("req.body is :", req.body)

  if (!username || !email || !password) {
      res.status(500)
        .json({
          errorMessage: 'Please enter username, email and password'
        });
      return;  
  }

  const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
  if (!myRegex.test(email)) {
      res.status(500)
        .json({
          errorMessage: 'Email format not correct'//how to show the error message the server is sending? in the catch block in the signin blaoc in app.js in User side
      });
      return;  
  }

  const myPassRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
  if (!myPassRegex.test(password)) {
    res.status(500)
        .json({
          errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet'
        });
      return;  
  }



  bcrypt.genSalt(12)
      .then((salt) => {
        console.log('Salt: ', salt);
        bcrypt.hash(password, salt)
          .then((passwordH) => {
            console.log("passwordH is :", passwordH)
            UserModel.create({email, username, passwordH})
              .then((user) => {
                console.log("user is:", user)
                user.passwordH = "***";
                req.session.loggedInUser = user;
                console.log(req.session)
                res.status(200).json(user);
              })
              .catch((err) => {
                if (err.code === 11000) {
                  res.status(500)
                  .json({
                    errorMessage: 'username or email entered already exists!'
                  });
                  return;  
                } 
                else {
                  res.status(500)
                  .json({
                    errorMessage: 'Something went wrong! Go to sleep!'
                  });
                  return; 
                }
              })
          });  
  });

});
 
router.post('/signin', (req, res) => {
  const {email, password } = req.body;
  if ( !email || !password) {
      res.status(500).json({
          error: 'Please enter Username. email and password',
     })
    return;  
  }
  const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
  if (!myRegex.test(email)) {
      res.status(500).json({
          error: '1-Email format not correct',
      })
      return;  
  }


  // Find if the user exists in the database 
  UserModel.findOne({email})
  .then((userData) => {
       //check if passwords match
      bcrypt.compare(password, userData.password)
        .then((doesItMatch) => {
            //if it matches
            if (doesItMatch) {
              // req.session is the special object that is available to you
              userData.password = "***";
              req.session.loggedInUser = userData;
              console.log('Signin', req.session)
              res.status(200).json(userData)
            }
            //if passwords do not match
            else {
                res.status(500).json({
                    error: 'Passwords don\'t match',
                })
              return; 
            }
        })
        .catch(() => {
            res.status(500).json({
                error: '2-Email format not correct',
            })
          return; 
        });
  })

  //throw an error if the user does not exists 
  .catch((err) => {
    res.status(500).json({
        error: 'Email format not correct',
        message: err
    })
    return;  
  });

});

router.post('/logout', (req, res) => {
req.session.destroy();
res
.status(204) //  No Content
.send();
})

router.get("/user", /*isLoggedIn,*/ (req, res, next) => {
res.status(200).json(req.session.loggedInUser);
});

module.exports = router;