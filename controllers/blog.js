const Blog = require("../models/Blog");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

//docs: create blog
exports.createBlog = async (req, res) => {
  console.log(req.user._id);
  const blog = await Blog.create({ ...req.body, Author: req.user._id });
  res.status(StatusCodes.CREATED).json({ blog });
};

//docs: get all blogs
exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({})
    .populate("Author", "-password")
    .sort("-createdAt");
  res.status(StatusCodes.OK).json({ blogs });
};

//docs: get single blog
exports.getSingleBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await Blog.findOne({ _id: blogId }).populate(
    "Author",
    "-password"
  );
  if (!blog) {
    throw new BadRequestError("No blog found");
  }
  res.status(StatusCodes.OK).json({ blog });
};

//docs: update blog
exports.updateBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const { Title, Content } = req.body;
  if (Title.length < 3 || Content.length < 10) {
    throw new BadRequestError(
      "Title must be at least 3 characters and Content must be at least 10 characters"
    );
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: blogId },
    { Title, Content },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ blog });
};

//docs: delete blog
exports.deleteBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blogDeleteStatue = await Blog.deleteOne({ _id: blogId });
  if (blogDeleteStatue.deletedCount === 0) {
    throw new BadRequestError("No blog found");
  }
  res.status(StatusCodes.OK).json({ blogDeleteStatue });
};

//docs: filter bolg by date
exports.SelectBlogByDate = async (req, res) => {
  let FormDate = req.body["FormDate"];
  //note: date format: 2023-05-27 like mongodb stored date format
  let ToDate = req.body["ToDate"];
  // console.log(FormDate, ToDate);
  //give a dummy date to taste as per application create status
  //   {
  //     "FormDate":"2023-05-25",
  //     "ToDate":"2023-05-28"
  // }
  console.log(new Date(FormDate), new Date(ToDate));

  const Blogs = await Blog.find({
    BlogCreateDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) },
  });
  console.log(Blogs);
  res.status(StatusCodes.OK).json({ Blogs });
};
