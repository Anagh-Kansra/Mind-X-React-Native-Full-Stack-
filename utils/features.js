const path = require("path");
const dataUriParser = require("datauri/parser");

const getDataUri = (file) => {
  const parser = new dataUriParser();
  const fileUri = parser.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );
  return fileUri;
};

module.exports = { getDataUri };
