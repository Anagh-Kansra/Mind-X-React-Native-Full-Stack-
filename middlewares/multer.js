const multer = require("multer");
const path = require("path");

// Configure Multer to use memory storage
const storage = multer.memoryStorage();

// Create single file upload middleware
const singleUpload = multer({ storage }).single("images");

module.exports = { singleUpload };
