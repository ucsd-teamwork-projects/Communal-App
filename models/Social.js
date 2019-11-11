const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  categories: { 
    type: String
  },
  location: { 
    type: String,
    required: true 
  },
  likes: {
    type: Number
  },
  dislikes: {
    type: Number
  },
  creator: {
    type: [Schema.Types.ObjectId], 
    ref: "User" 
  }
});

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;