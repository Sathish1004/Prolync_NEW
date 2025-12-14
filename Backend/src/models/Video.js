import { pool } from '../config/db.js';

const Video = {
    create: async ({ courseId, title, description, videoPath, notesPath, lecturerId }) => {
        const query = `
            INSERT INTO videos (course_id, title, description, video_path, notes_path, lecturer_id, status)
            VALUES (?, ?, ?, ?, ?, ?, 'PENDING')
        `;
        const [result] = await pool.execute(query, [courseId, title, description, videoPath, notesPath, lecturerId]);
        return result.insertId;
    },

    findAllByLecturer: async (lecturerId) => {
        const query = `
            SELECT * FROM videos WHERE lecturer_id = ? ORDER BY created_at DESC
        `;
        const [rows] = await pool.execute(query, [lecturerId]);
        return rows;
    },

    findAllWithLecturers: async () => {
        const query = `
            SELECT v.*, l.full_name as lecturer_name, l.email as lecturer_email 
            FROM videos v 
            JOIN lecturers l ON v.lecturer_id = l.id 
            ORDER BY v.created_at DESC
        `;
        const [rows] = await pool.execute(query);
        return rows;
    },

    // For admin to verify
    updateStatus: async (videoId, status) => {
        const query = 'UPDATE videos SET status = ? WHERE id = ?';
        const [result] = await pool.execute(query, [status, videoId]);
        return result.affectedRows > 0;
    }
};

export default Video;
