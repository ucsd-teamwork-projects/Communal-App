const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  group: { type: Schema.Types.ObjectId, ref: "Group"}
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;