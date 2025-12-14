import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directories exist
const createDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

createDir('public/uploads/videos');
createDir('public/uploads/notes');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') {
            cb(null, 'public/uploads/videos');
        } else if (file.fieldname === 'notes') {
            cb(null, 'public/uploads/notes');
        } else {
            cb(null, 'public/uploads/others');
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'video') {
        if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mkv') {
            cb(null, true);
        } else {
            cb(new Error('Only mp4 and mkv video format allowed!'), false);
        }
    } else if (file.fieldname === 'notes') {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF format allowed for notes!'), false);
        }
    } else {
        cb(null, true);
    }
};

// Limits: Video 500MB, PDF 10MB
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB max limit broadly
    }
});

export default upload;
