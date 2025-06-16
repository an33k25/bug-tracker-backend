// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');

// Initialize Express app
const app = express();

// --- START ENHANCED CORS SETUP ---
// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000', // The default port for create-react-app
  'http://localhost:3001', // A common alternative port
  // Add other client URLs if needed
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

// Use the enhanced CORS options
app.use(cors(corsOptions));
// --- END ENHANCED CORS SETUP ---


// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('MySQL database connected successfully.');
    connection.release();
});

// API Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Bug Tracker API.' });
});

// Import and use routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/issues', require('./routes/issues'));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
