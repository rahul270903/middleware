let blogs = [];

// Middleware to validate blog ID
const validateBlogId = (req, res, next) => {
  const authorId = parseInt(req.params.authorId);

  // Check if authorId is a valid integer
  if (isNaN(authorId) || !Number.isInteger(authorId) || authorId <= 0) {
    return res.status(400).json({ message: "Invalid author ID" });
  }

  // Proceed to the next middleware if validation passes
  next();
};

// Middleware to create a new blog
const createBlog = (req, res, next) => {
  const { author, content } = req.body;

  // Create new blog
  const newBlog = { id: blogs.length + 1, author, content };
  blogs.push(newBlog);
  
  // Respond with the newly created blog
  res.status(201).json(newBlog);
};

// Middleware to get all blogs
const getAllBlogs = (req, res, next) => {
  res.json(blogs);
};

// Middleware to get a specific blog by author ID
const getBlogByAuthorId = (req, res, next) => {
  const authorId = parseInt(req.params.authorId);
  const blog = blogs.find(blog => blog.id === authorId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.json(blog);
};

module.exports = { 
  validateBlogId, 
  createBlog,
  getAllBlogs,
  getBlogByAuthorId
};
