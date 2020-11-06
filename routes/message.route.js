const express = require("express");
const router = express.Router();
const UserModel = require("../model/User.model");
const MessageModel = require("../model/Message.model");



router.get("/messages", (req, res) => {
  let userId = req.session.loggedInUser._id;

  MessageModel.find({ recipient: userId })
    .then((dataReceived) => {
      res.status(200).json(dataReceived);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

//retrieve th emessage the user sent to another user
router.get("/messages/sent/:id", (req, res) => {
  let id = req.params.id;
  UserModel.findById(id)
  .then((sentData) => {
    res.status(200).json(sentData);
  })
  .catch((err) => {
    res.status(500).json({
      error: "Failled to retrieved recipient information",
      message: err,
    });
  });
});


//to send a message to another user
router.post("/messages/send/:id", (req, res) => {
  let { content } = req.body;
  let recipientId = req.params.id;
  let userId = req.session.loggedInUser._id;

  MessageModel.create({
    recipient: recipientId,
    sender: userId,
    content,
  })
  .then((sentData) => {
    res.status(200).json(sentData);
  })
  .catch((err) => {
    res.status(500).json({
      error: "Failled to send message",
      message: err,
    });
  });
});

//to check a message the user received
router.get("/messages/:id", (req, res) => {
  //req.app.locals.notUser = false;
  MessageModel.findById(req.params.id)
   
  .then((sentData) => {
    res.status(200).json(sentData);
  })
  .catch((err) => {
    res.status(500).json({
      error: "Failled to retrieve message details",
      message: err,
    });
  });
});

module.exports = router;
