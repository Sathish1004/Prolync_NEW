import { Blog } from '../models/blog.model.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = async (req, res) => {
    try {
        const { category, tag, search } = req.query;
        let query = { isPublished: true };

        if (category) {
            query.category = category;
        }

        if (tag) {
            query.tags = tag;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .select('-content'); // Exclude content for list view to reduce payload

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Increment views
        blog.views += 1;
        await blog.save({ validateBeforeSave: false });

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get latest blogs (for home page / recommended)
// @route   GET /api/blogs/latest
// @access  Public
export const getLatestBlogs = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const blogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .limit(limit)
            .select('title slug coverImage category readTime createdAt excerpt');

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private (Admin)
export const createBlog = async (req, res) => {
    try {
        const { title, content, excerpt, coverImage, category, tags, readTime, isPublished } = req.body;

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        const blog = await Blog.create({
            title,
            slug,
            content,
            excerpt,
            coverImage,
            category,
            tags,
            readTime,
            isPublished
        });

        res.status(201).json(blog);
    } catch (error) {
        // Check for duplicate slug error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'A blog with this title already exists' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        await blog.deleteOne();

        res.status(200).json({ message: 'Blog removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
