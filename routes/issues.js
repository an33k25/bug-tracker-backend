// server/routes/issues.js

const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, issueController.createIssue);
router.get('/project/:projectId', authMiddleware, issueController.getIssuesByProjectId);
router.get('/:id', authMiddleware, issueController.getIssueById);
router.put('/:id', authMiddleware, issueController.updateIssue);
router.delete('/:id', authMiddleware, issueController.deleteIssue);

// Ensure this line exists and is correct
module.exports = router;
