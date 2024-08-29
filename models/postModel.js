const mongoose = require("mongoose");

// Define a regular expression for hashtags
const hashtagPattern = /^#[a-zA-Z0-9_]+$/;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a post title"],
    },
    description: {
      type: String,
      required: [true, "Please add a post description"],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    links: {
      type: String, // URLs for external links
      required: false,
    },
    hashtags: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
