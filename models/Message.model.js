const mongoose = require("mongoose");
//const {Schema, model} = require("mongoose");

//let MessageSchema = new Schema({
const messageSchema = new mongoose.Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    required: true
  },
},
{
  timestamps: true
});


const MessageModel = mongoose.model("Message", messageSchema);
module.exports = MessageModel;
//module.exports = model("Message", MessageSchema);