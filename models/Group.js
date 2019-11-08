const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  members: Number,
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;