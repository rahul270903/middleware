// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate} = require('../middleware/authvalidationMiddleware');
const { validateBlogId,getBlogByAuthorId,getAllBlogs,createBlog} = require('../middleware/blogMiddleware')

// Placeholder array to simulate database
// Get all blogs
router.get('/blogs', authenticate, getAllBlogs);

// Create new blog
router.post('/blogs',authenticate, createBlog);

// Get specific blog by author ID
router.get('/blogs/:authorId', authenticate, validateBlogId,getBlogByAuthorId);

module.exports = router;
