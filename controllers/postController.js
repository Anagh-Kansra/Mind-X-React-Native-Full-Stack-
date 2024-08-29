const postModel = require("../models/postModel");
const cloudinary = require("cloudinary").v2; // Ensure you're using v2 of Cloudinary
const { getDataUri } = require("../utils/features");

// Create post controller
const createPostController = async (req, res) => {
  try {
    const { title, description, links, hashtags } = req.body;

    // Validate
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please fill in all fields",
      });
    }

    // Handle image upload
    let imageResult;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      imageResult = await cloudinary.uploader.upload(fileUri.content, {
        folder: "posts",
      });
    }

    // Create post
    const post = new postModel({
      title,
      description,
      postedBy: req.auth._id,
      images: imageResult
        ? { url: imageResult.secure_url, public_id: imageResult.public_id }
        : null,
      links,
      hashtags,
    });
    await post.save();

    res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).send({
        success: false,
        message: "Validation errors",
        errors: messages,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error creating post",
        error,
      });
    }
  }
};

// Get all posts controller
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching posts",
      error,
    });
  }
};

// Get user posts controller
const getUserPostsController = async (req, res) => {
  try {
    const userPost = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "User posts fetched successfully",
      userPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching user posts",
      error,
    });
  }
};

// Delete post controller
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the post by ID
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    // Delete image from Cloudinary if it exists
    if (post.images && post.images.public_id) {
      await cloudinary.uploader.destroy(post.images.public_id);
    }

    // Delete the post
    await postModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting post",
      error,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Title and descrption are required",
      });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title,
        description: description,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating post API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
