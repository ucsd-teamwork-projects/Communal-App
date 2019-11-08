const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  likes: Number,
  dislikes: Number,
  Creator: String 
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;