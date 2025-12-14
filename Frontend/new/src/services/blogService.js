import axios from 'axios';

const API_URL = 'http://localhost:5001/api/blogs';

// Create new blog
export const createBlog = async (blogData) => {
    const response = await axios.post(API_URL, blogData);
    return response.data;
};

// Get all blogs with optional filters
export const getBlogs = async (params) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
};

// Get single blog by slug
export const getBlogBySlug = async (slug) => {
    const response = await axios.get(`${API_URL}/${slug}`);
    return response.data;
};

// Get latest blogs
export const getLatestBlogs = async (limit = 3) => {
    const response = await axios.get(`${API_URL}/latest`, { params: { limit } });
    return response.data;
};

// Update blog
export const updateBlog = async (id, blogData) => {
    const response = await axios.put(`${API_URL}/${id}`, blogData);
    return response.data;
};

// Delete blog
export const deleteBlog = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
