const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { 
    type: String,
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
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
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;