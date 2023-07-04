const mongoose = require("mongoose");


const wineSchema = new mongoose.Schema({
  
  
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  grappeVariety: {
    type: String,
    //required: true,
  },
  color: {
    type: String,
  },
  image: {
    type: String,
  }, 

  // userSeller: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },

  // userBuyer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },

  saleStatus: {
    type: Boolean,
    default: false,
  },
});

const WineModel = mongoose.model("bottles", wineSchema);

module.exports = WineModel;
