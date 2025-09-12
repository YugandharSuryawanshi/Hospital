const pool = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.execute('SELECT id, name, email, image, role FROM users ORDER BY id DESC');
        res.json(users);
    } catch (err) {
        console.error('getAllUsers error', err);
        res.status(500).json({ error: err.message });
    }
};