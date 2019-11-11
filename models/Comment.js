const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { 
    type: String, 
    required: true 
  },
  author: { 
    type: Schema.Types.ObjectId,
     ref: "User" 
    },
  social: { 
    type: Schema.Types.ObjectId, 
    ref: "Social" 
  },
  communal: { 
    type: Schema.Types.ObjectId, 
    ref: "Communal"
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;