const express = require('express');
const router = express.Router();

// Role selection page
router.get('/', (req, res) => {
    res.render('index', { 
        title: 'School Portal - Role Selection',
        description: 'Choose your role to access the system'
    });
});

// Login pages
// Render Admin Login Page
router.get('/login/admin', (req, res) => {
    res.render('admin-login', { 
        title: 'Admin Login - School Portal',
        description: 'Administrative access for school management'
    });
});

// Handle Admin Login (form submission)
const username ="chauhanvishal_85";
const password ="963852";


router.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Hardcoded check (replace later with DB)
    if (username === "chauhanvishal_85" && password === "963852") {
        // Admin Dashboard Page
        router.get('/login/admin/Dashboard', (req, res) => {
            res.render('dashboard', { 
                title: 'Admin Dashboard',
                description: 'Welcome to the admin panel'
            });
        });

    } else {
        // failure → reload login with error
        return res.render("admin-login", { 
            title: "Admin Login - School Portal",
            toast: { 
                icon: "fas fa-exclamation-circle", 
                title: "Login Failed", 
                message: "Invalid username or password. Please try again." 
            }
        });
    }
});


router.get('/login/student-10', (req, res) => {
    res.render('student10-login', { 
        title: 'Class 10 Login - School Portal',
        description: 'Login portal for 10th grade students'
    });
});

router.get('/login/student-12', (req, res) => {
    res.render('student12-login', { 
        title: 'Class 12 Login - School Portal',
        description: 'Login portal for 12th grade students'
    });
});

// Login API endpoint
router.post('/api/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // Here you would implement actual authentication logic
        // For demo purposes, we'll simulate validation
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        // Simulate database check
        const isValid = await validateCredentials(username, password, role);
        
        if (isValid) {
            // Set session or JWT token
            req.session.user = { username, role };
            
            res.json({ 
                success: true, 
                message: 'Login successful',
                redirectUrl: `/dashboard/${role}`
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Mock credential validation
async function validateCredentials(username, password, role) {
    // This is where you'd check against your database
    // For demo purposes, return true for any non-empty credentials
    return username.length > 0 && password.length > 0;
}

module.exports = router;
