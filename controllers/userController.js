// server/controllers/userController.js

const db = require('../config/db');

/**
 * @desc    Get all users (ID and name only)
 * @route   GET /api/users
 * @access  Private
 */
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM users");
        res.json(users);
    } catch (err) {
        console.error('Error in getAllUsers:', err.message);
        res.status(500).send('Server Error');
    }
};
