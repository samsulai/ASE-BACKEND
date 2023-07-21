import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
};

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
  } catch (err) {
    handleErrors(res, err);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    handleErrors(res, err);
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
    handleErrors(res, err);
  }
};

export const getFeedPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const [post, otherPosts] = await Promise.all([
      Post.findById(postId),
      Post.find({ _id: { $ne: postId } }).limit(10),
    ]);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ post, otherPosts });
  } catch (err) {
    handleErrors(res, err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    handleErrors(res, err);
  }
};

export const getPaginatedPost = async (req, res) => {
  const { category, limit, page } = req.query;
  const postsPerPage = parseInt(limit) || 30;
  const currentPage = parseInt(page) || 1;

  try {
    let query = {};
    if (category) {
      query.category = category;
    }

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * postsPerPage)
      .limit(postsPerPage);

    res.status(200).json({ posts, totalPages });
  } catch (err) {
    handleErrors(res, err);
  }
};
