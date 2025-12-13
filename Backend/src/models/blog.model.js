import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Learning & Career Guidance',
            'Course & Skill-Based',
            'Industry & Tech Updates',
            'Project & Case Study',
            'Student Success & Community',
            'Company & Platform Updates'
        ]
    },
    author: {
        type: String,
        default: 'Prolync Team'
    },
    tags: [{
        type: String
    }],
    readTime: {
        type: Number, // in minutes
        default: 5
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for search
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export const Blog = mongoose.model('Blog', blogSchema);
