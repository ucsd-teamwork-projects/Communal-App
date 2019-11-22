const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  name: { 
    type: String, 
    required: true 
  },
  time: {
    type: String,
    required: true
  },
  location: { 
    type: String,
    required: true 
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: { 
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
  }
  
});

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;