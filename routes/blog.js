const express = require("express");

const router = express.Router();

// middlewares
const { authenticated } = require("../middleware/authentication.js");

// controllers
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  SelectBlogByDate,
} = require("../controllers/blog.js");
router.post("/createblog", authenticated, createBlog);
router.get("/allblogs", getAllBlogs);
router.get("/singleblog/:id", getSingleBlog);
router.put("/updateblog/:id", authenticated, updateBlog);
router.delete("/deleteblog/:id", authenticated, deleteBlog);
module.exports = router;
router.get("/selectblogbydate", SelectBlogByDate);
