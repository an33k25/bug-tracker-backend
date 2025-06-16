// server/controllers/issueController.js

const db = require('../config/db');

// Create a new issue
exports.createIssue = async (req, res) => {
    const { title, description, priority, project_id, assignee_id } = req.body;
    const reporter_id = req.user.id;

    if (!title || !project_id) {
        return res.status(400).json({ msg: 'Title and project ID are required' });
    }

    try {
        const newIssue = {
            title,
            description,
            priority,
            project_id,
            assignee_id: assignee_id || null, // Ensure assignee can be null
            reporter_id
        };
        const [result] = await db.query('INSERT INTO issues SET ?', newIssue);
        res.status(201).json({ id: result.insertId, ...newIssue });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all issues for a specific project
exports.getIssuesByProjectId = async (req, res) => {
    try {
        const query = `
            SELECT
                i.id,
                i.title,
                i.status,
                i.priority,
                i.created_at,
                CONCAT(reporter.first_name, ' ', reporter.last_name) AS reporter_name,
                CONCAT(assignee.first_name, ' ', assignee.last_name) AS assignee_name
            FROM issues i
            JOIN users reporter ON i.reporter_id = reporter.id
            LEFT JOIN users assignee ON i.assignee_id = assignee.id
            WHERE i.project_id = ?
            ORDER BY i.created_at DESC
        `;
        const [issues] = await db.query(query, [req.params.projectId]);
        res.json(issues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a single issue by ID
exports.getIssueById = async (req, res) => {
    try {
        const query = `
            SELECT
                i.*,
                p.name AS project_name,
                CONCAT(reporter.first_name, ' ', reporter.last_name) AS reporter_name,
                reporter.email AS reporter_email,
                CONCAT(assignee.first_name, ' ', assignee.last_name) AS assignee_name,
                assignee.email AS assignee_email
            FROM issues i
            JOIN projects p ON i.project_id = p.id
            JOIN users reporter ON i.reporter_id = reporter.id
            LEFT JOIN users assignee ON i.assignee_id = assignee.id
            WHERE i.id = ?
        `;
        const [issues] = await db.query(query, [req.params.id]);

        if (issues.length === 0) {
            return res.status(404).json({ msg: 'Issue not found' });
        }
        res.json(issues[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update an issue
exports.updateIssue = async (req, res) => {
    const { title, description, status, priority, assignee_id } = req.body;
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'UPDATE issues SET title = ?, description = ?, status = ?, priority = ?, assignee_id = ? WHERE id = ?',
            [title, description, status, priority, assignee_id || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Issue not found' });
        }
        res.json({ msg: 'Issue updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete an issue
exports.deleteIssue = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM issues WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Issue not found' });
        }
        res.json({ msg: 'Issue deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
