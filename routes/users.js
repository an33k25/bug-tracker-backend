// server/routes/users.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// The line below calls the 'getAllUsers' function we defined in the controller.
// It will only work if the controller file is saved correctly.
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;
