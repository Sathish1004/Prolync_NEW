import { pool } from '../config/db.js';

const Quiz = {
    create: async ({ courseId, question, options, correctAnswer, lecturerId }) => {
        // Options stored as JSON string
        const query = `
            INSERT INTO quizzes (course_id, question, options, correct_answer, lecturer_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [
            courseId,
            question,
            JSON.stringify(options),
            correctAnswer,
            lecturerId
        ]);
        return result.insertId;
    },

    findByCourse: async (courseId) => {
        const query = 'SELECT * FROM quizzes WHERE course_id = ?';
        const [rows] = await pool.execute(query, [courseId]);
        return rows;
    }
};

export default Quiz;
