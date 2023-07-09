import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { title, image, description, category } = req.body;

    const post = new Post({
      title,
      image,
      description,
      category,
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create post' });
  }
}

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getPostByCategoryandLimit = async (req, res) => {
  const { category, limit } = req.query;

  try {
    let query = {};

    if (category) {
      query.category = category;
    }

    let postQuery = Post.find(query).sort({ createdAt: -1 });

    if (limit) {
      postQuery = postQuery.limit(parseInt(limit));
    }

    const posts = await postQuery;

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeedPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const otherPosts = await Post.find({ _id: { $ne: postId } }).limit(10);

    res.status(200).json({ post, otherPosts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};