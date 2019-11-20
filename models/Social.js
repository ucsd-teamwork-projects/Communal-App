const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String,
    required: true
  },
  location: { 
    type: String,
    required: true 
  },
  time: {
    type: String,
    required: true
  },
  going: {
    type: [Schema.Types.ObjectId], 
    ref: "User"   
  },
  comments: {
    type: [Schema.Types.ObjectId], 
    ref: "Comment"   
  },
  img: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId, 
    ref: "User" 
  }
});

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;