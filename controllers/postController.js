const Post = require("../models/postModel");
const AppError = require("../utils/AppError");

const createPost = async (req, res, next) => {
  if (req.Admin) return next(new AppError("admin can't add post", 500));
  const { title } = req.body;
  const userID = req.user._id;
  const post = await Post.create({
    title: title,
    userId: userID,
    publishDate: new Date(),
  });
  if (!post) return next(new AppError("can't create post", 500));
  res.send(post);
};

const getAllPosts = async (req, res, next) => {
  const post = await Post.find({});
  if (!post) return next(new AppError("no posts found", 404));
  res.send(post);
};

const getUserPosts = async (req, res, next) => {
  if (req.Admin) return next(new AppError("admin can't get post", 500));
  const userID = req.user._id;
  if (!userID) return next(new AppError("please login to show posts", 404));
  const post = await Post.find({ userId: userID });
  res.send(post);
};

const getPostById = async (req, res, next) => {
  const post = await Post.findById({ _id: req.params.id });
  if (!post) return next(new AppError("post not found", 404));
  res.send(post);
};

const updatePostById = async (req, res, next) => {
  if (req.Admin) return next(new AppError("admin can't update post", 403));
  const userID = req.user._id;
  if (!userID) return next(new AppError("please login to update posts", 403));
  const post = await Post.findById({ _id: req.params.id });
  if (!post) return next(new AppError("post not found", 404));
  if (!(JSON.stringify(post.userId) === JSON.stringify(userID)))
    return next(
      new AppError("you don't have permission to update this post", 404)
    );
  await Post.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(post);
};

const deletePostById = async (req, res, next) => {
  const userID = req.user._id;
  const post = await Post.findById({ _id: req.params.id });
  if (!(JSON.stringify(post.userId) === JSON.stringify(userID)))
    return next(
      new AppError("you don't have permission to delete this post", 404)
    );
  await Post.deleteOne({ _id: req.params.id });
  res.send("Post deleted Successfully !!");
};

const deleteUserPosts = async (req, res, next) => {
  const userID = req.user._id;
  if (!userID) return next(new AppError("please login to delete posts", 404));
  await Post.deleteMany({ userId: userID });
  res.send("All Posts of You Deleted Successfully !");
};

const deleteAllPosts = async (req, res, next) => {
  await Post.deleteMany({});
  res.send("All Posts of You Deleted Successfully !");
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  deleteAllPosts,
  getUserPosts,
  deleteUserPosts,
};
