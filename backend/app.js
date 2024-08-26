const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Enable CORS with default settings (allows all origins)
app.use(cors());

// If you want more granular control, you can configure specific options
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with the actual frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true, // Allow cookies to be sent
// }));

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
