const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  authorName: {
    type: String,
    required: true
  },
  authorPhoto: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;