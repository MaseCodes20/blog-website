const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");

// @desx Get Posts
// @route Get /api/v1/Posts
// @access Public
const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desx Get Post
// @route Get /api/v1/Posts/:postId
// @access Public
const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.postId });

    res.status(200).json(post);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desx Get User Posts
// @route Get /api/v1/Posts/find/:userID
// @access Public
const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userID });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desx Set Posts
// @route Post /api/v1/Posts
// @access Private
const setPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desx Update Posts
// @route Put /api/v1/Posts/:postId
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(404);
    throw new Error("Post does not exist");
  }

  if (post.userId !== req.user?.id) {
    res.status(400);
    throw new Error(`Not Authorized to update this post!`);
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desx Update Likes
// @route Put /api/v1/Posts/:postId/comments
// @access Public
const updateLikes = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(404);
    throw new Error("Post does not exist");
  }

  if (!req.body.likes) {
    res.status(404);
    throw new Error("Only likes that can be updated");
  }

  try {
    const updatedPostLikes = await Post.findByIdAndUpdate(
      req.params.postId,
      { likes: req.body.likes },
      {
        new: true,
      }
    );

    res.status(200).json(updatedPostLikes);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desx Update Comments
// @route Put /api/v1/Posts/:postId/comments
// @access Public
const updateComments = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(404);
    throw new Error("Post does not exist");
  }

  if (!req.body.comments) {
    res.status(404);
    throw new Error("Only comments that can be updated");
  }

  try {
    const updatedPostComments = await Post.findByIdAndUpdate(
      req.params.postId,
      { comments: req.body.comments },
      {
        new: true,
      }
    );

    res.status(200).json(updatedPostComments);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desx Delete Posts
// @route Delete /api/v1/Posts/:postId
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(400);
    throw new Error("Post does not exist");
  }

  if (post.userId !== req.user?.id) {
    res.status(400);
    throw new Error(`Not Authorized to delete this post!`);
  }

  try {
    await post.remove();

    res.status(200).json(post);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  getAllPosts,
  getPost,
  getUserPosts,
  setPost,
  updatePost,
  deletePost,
  updateComments,
  updateLikes,
};
