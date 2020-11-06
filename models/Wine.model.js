const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const wineSchema = new Schema({

const wineSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true,
  },
  year: {
    type: Number,
    //required: true,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  country: {
    type: String,
    //required: true,
  },
  region: {
    type: String,
    //required: true,
  },
  grappeVariety: {
    type: String,
    //required: true,
  },
  color: {
    type: String,
  },
  picture: {
    type: String,
  }, 

  userSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  userBuyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const WineModel = mongoose.model("Wine", wineSchema);
module.exports = WineModel;
