const express = require('express');
const cors = require('cors'); 

const app = express(); 
const PORT = 3000; 

// Middleware
app.use(cors());
app.use(express.json()); 

// Signup Endpoint
app.post('/api/signup', (req, res) => {
    const { fullName, username, email, password } = req.body;

    console.log('Received Signup Data:');
    console.log(`Full Name: ${fullName}`);
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`); 

    // Validation
    if (!fullName || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newUser = { id: Date.now(), username, email };

    // Send a success response back to the React frontend
    return res.status(201).json({ 
        message: 'User created successfully! Welcome aboard.',
        user: newUser
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});