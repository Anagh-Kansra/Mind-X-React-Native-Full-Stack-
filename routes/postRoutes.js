const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");
const { singleUpload } = require("../middlewares/multer");

// Router object
const router = express.Router();

// Create post route
router.post("/create-post", requireSignIn, singleUpload, createPostController);

// Get all posts route
router.get("/get-all-post", getAllPostsController);

// Get user posts route
router.get("/get-user-post", requireSignIn, getUserPostsController);

// Delete post route
router.delete("/delete-post/:id", requireSignIn, deletePostController);

// Update post route
router.put("/update-post/:id", requireSignIn, updatePostController);

module.exports = router;
