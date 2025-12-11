import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    picture: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    tokenExpires: {
        type: Date
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    // For password-based auth later if needed
    password: {
        type: String,
        select: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
