import { pool } from '../config/db.js';

const User = {
    create: async ({ name, email, password, googleId, picture, isVerified, verificationToken, tokenExpires, mobile, qualification, profile, graduationYear, language }) => {
        const query = `
            INSERT INTO users (full_name, email, password, google_id, picture, is_verified, verification_token, token_expires, mobile, qualification, profile, graduation_year, language)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        // Convert undefined to null for database
        const values = [
            name, // Maps to full_name
            email,
            password || null,
            googleId || null,
            picture || null,
            isVerified ? 1 : 0,
            verificationToken || null,
            tokenExpires || null,
            mobile || null,
            qualification || null,
            profile || null,
            graduationYear || null,
            language || null
        ];

        const [result] = await pool.execute(query, values);
        return {
            _id: result.insertId, // Map insertId to _id for compatibility
            name,
            email,
            picture,
            googleId,
            isVerified,
            verificationToken,
            tokenExpires,
            mobile,
            qualification,
            profile,
            graduationYear,
            language
        };
    },

    findOne: async (criteria) => {
        let query = "SELECT * FROM users WHERE ";
        const values = [];
        const keys = Object.keys(criteria);

        if (keys.length === 0) return null;

        keys.forEach((key, index) => {
            // Map camelCase criteria to snake_case column names if needed
            let column = key;
            if (key === 'verificationToken') column = 'verification_token';
            if (key === 'googleId') column = 'google_id';

            query += `${column} = ?`;
            if (index < keys.length - 1) query += " AND ";
            values.push(criteria[key]);
        });

        // Handle token expiration check specifically (simulating Mongoose query)
        // If criteria has a complex object like { $gt: Date.now() }, we need to handle it manually or simplify the caller
        // For now, let's assume specific usage in auth.controller.js and handle it there or make a robust query builder here is too complex.
        // Instead, we will support the specific queries used in auth.controller.js.

        const [rows] = await pool.execute(query, values);
        const user = rows[0];

        if (!user) return null;

        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            picture: user.picture,
            googleId: user.google_id,
            isVerified: !!user.is_verified,
            verificationToken: user.verification_token,
            tokenExpires: user.token_expires,
            mobile: user.mobile,
            qualification: user.qualification,
            profile: user.profile,
            graduationYear: user.graduation_year,
            language: user.language,

            // Helper to match Mongoose .save() pattern
            save: async function () {
                const updateQuery = `
                    UPDATE users SET 
                    full_name=?, email=?, password=?, picture=?, google_id=?, is_verified=?, verification_token=?, token_expires=?, mobile=?, qualification=?, profile=?, graduation_year=?, language=?
                    WHERE id=?
                `;
                const updateValues = [
                    this.name,
                    this.email,
                    this.password,
                    this.picture,
                    this.googleId || null, // Ensure compatibility
                    this.isVerified ? 1 : 0,
                    this.verificationToken || null,
                    this.tokenExpires || null, // JS Date object works with mysql2
                    this.mobile || null,
                    this.qualification || null,
                    this.profile || null,
                    this.graduationYear || null,
                    this.language || null,
                    this._id
                ];
                await pool.execute(updateQuery, updateValues);
                return this;
            }
        };
    },

    findById: async (id) => {
        const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
        const user = rows[0];
        if (!user) return null;

        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            picture: user.picture,
            googleId: user.google_id,
            isVerified: !!user.is_verified,
            verificationToken: user.verification_token,
            tokenExpires: user.token_expires,
            mobile: user.mobile,
            qualification: user.qualification,
            profile: user.profile,
            graduationYear: user.graduation_year,
            language: user.language
        };
    }
};

export default User;
