// server/controllers/projectController.js

const db = require('../config/db');

// Create a new project
exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    const created_by = req.user.id;

    if (!name) {
        return res.status(400).json({ msg: 'Project name is required' });
    }

    try {
        const newProject = { name, description, created_by };
        const [result] = await db.query('INSERT INTO projects SET ?', newProject);
        res.status(201).json({ id: result.insertId, ...newProject });
    } catch (err) {
        console.error('Error in createProject:', err.message);
        res.status(500).send('Server error');
    }
};

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const query = `
            SELECT p.*, CONCAT(u.first_name, ' ', u.last_name) AS created_by_name
            FROM projects p
            JOIN users u ON p.created_by = u.id
            ORDER BY p.created_at DESC
        `;
        const [projects] = await db.query(query);
        res.json(projects);
    } catch (err) {
        console.error('Error in getProjects:', err.message);
        res.status(500).send('Server error');
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const query = `
            SELECT p.*, CONCAT(u.first_name, ' ', u.last_name) AS created_by_name
            FROM projects p
            JOIN users u ON p.created_by = u.id
            WHERE p.id = ?
        `;
        const [projects] = await db.query(query, [req.params.id]);

        if (projects.length === 0) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.json(projects[0]);
    } catch (err) {
        console.error('Error in getProjectById:', err.message);
        res.status(500).send('Server error');
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    if (!name) {
        return res.status(400).json({ msg: 'Project name is required' });
    }

    try {
        const [result] = await db.query(
            'UPDATE projects SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.json({ msg: 'Project updated successfully' });
    } catch (err) {
        console.error('Error in updateProject:', err.message);
        res.status(500).send('Server error');
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.json({ msg: 'Project deleted successfully' });
    } catch (err) {
        console.error('Error in deleteProject:', err.message);
        res.status(500).send('Server error');
    }
}