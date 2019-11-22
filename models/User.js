const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  image: {
    type: String
  },
  likes: {
    type: [Schema.Types.ObjectId], 
    ref: "Social" 
  },
  dislikes: {
    type: [Schema.Types.ObjectId], 
    ref: "Social" 
  },
  going: {
    type: [Schema.Types.ObjectId], 
    ref: "Social" 
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;