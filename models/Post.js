import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    image: String,
    description: String,
    category: String,
    slug: String,
  },
  { timestamps: true }
);


const Post = mongoose.model("Post", postSchema);

export default Post;