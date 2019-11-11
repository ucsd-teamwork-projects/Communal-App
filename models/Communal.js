const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communalSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  members: {
    type: [Schema.Types.ObjectId], 
    ref: "User" 
  }
});

const Communal = mongoose.model("Communal", communalSchema);

module.exports = Communal;