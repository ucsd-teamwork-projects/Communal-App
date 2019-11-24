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
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
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
    type: String
  },
  category: { 
    type: String,
    required: true
  },
  going: [{
    type: Schema.Types.ObjectId, 
    ref: "User"   
  }],
  comments: [{
    type: Schema.Types.ObjectId, 
    ref: "Comment"   
  }]
  
});

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;