import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    image: String,
    description: String,
    category: String,
    showImage: {
    	type : Boolean,
    	default : true
    },
    image1 : {
    	type : String
    },
   
  },
  { timestamps: true }
);


const Post = mongoose.model("Post", postSchema);

export default Post;