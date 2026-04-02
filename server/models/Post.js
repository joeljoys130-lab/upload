import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  coverImage: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);