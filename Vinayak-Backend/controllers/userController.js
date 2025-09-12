// controllers/userController.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await pool.execute(
            'SELECT user_id, user_name, user_email, user_profile, role, created_at FROM users WHERE user_id = ?',
            [userId]
        );
        if (!rows.length) return res.status(404).json({ message: 'User not found' });
        res.json({ user: rows[0] });
    } catch (err) {
        console.error('getProfile error', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, password } = req.body || {};
        const newName = name || req.body.user_name;
        const newEmail = email || req.body.user_email;
        const newPassword = password || req.body.user_password;

        // Build dynamic update query
        const fields = [];
        const values = [];

        if (newName) { fields.push('user_name = ?'); values.push(newName); }
        if (newEmail) { fields.push('user_email = ?'); values.push(newEmail); }
        if (newPassword) {
            const hashed = await bcrypt.hash(newPassword, 10);
            fields.push('user_password = ?'); values.push(hashed);
        }
        if (req.file) {
            fields.push('user_profile = ?'); values.push(`uploads/${req.file.filename}`);
        }

        if (fields.length === 0) return res.status(400).json({ message: 'No fields provided to update' });

        values.push(userId);
        const sql = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`;
        await pool.execute(sql, values);

        const [rows] = await pool.execute(
            'SELECT user_id, user_name, user_email, user_profile, role, created_at FROM users WHERE user_id = ?',
            [userId]
        );
        res.json({ message: 'Profile updated', user: rows[0] });
    } catch (err) {
        console.error('updateProfile error', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// upload multiple images and save metadata
exports.uploadUserImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No files uploaded' });
        const userId = req.user.id;

        const inserted = [];
        for (const f of req.files) {
            const filepath = f.path.replace(/\\/g, '/');
            const [result] = await pool.execute(
                'INSERT INTO user_images (user_id, filename, filepath, mime_type, size) VALUES (?, ?, ?, ?, ?)',
                [userId, f.filename, filepath, f.mimetype, f.size]
            );
            const insertId = result.insertId;
            const [rows] = await pool.execute('SELECT id, filename, filepath, mime_type, size, uploaded_at FROM user_images WHERE id = ?', [insertId]);
            if (rows.length) inserted.push(rows[0]);
        }

        res.json({ message: 'Files uploaded', files: inserted });
    } catch (err) {
        console.error('uploadUserImages error', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getUserImages = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await pool.execute('SELECT id, filename, filepath, mime_type, size, uploaded_at FROM user_images WHERE user_id = ? ORDER BY uploaded_at DESC', [userId]);
        res.json({ images: rows });
    } catch (err) {
        console.error('getUserImages error', err);
        res.status(500).json({ message: 'Server error' });
    }
};
