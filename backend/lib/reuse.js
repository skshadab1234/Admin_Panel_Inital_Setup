const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

function slugify(text) {
  return text
    .toString() // Ensure the input is a string
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces and multiple spaces with a single hyphen
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}

module.exports = {
  slugify,
};
