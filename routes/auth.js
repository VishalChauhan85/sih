const express = require('express');
const router = express.Router();

// ─── Hardcoded credentials (replace with DB later) ───────────────────────────
const ADMIN_CREDENTIALS = { username: 'chauhanvishal_85', password: '963852' };

// Middleware: protect dashboard
function requireAuth(req, res, next) {
    if (req.session && req.session.user) return next();
    res.redirect('/login/admin');
}

// ─── Role Selection Page ──────────────────────────────────────────────────────
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Streamwise Lab - Role Selection',
        description: 'Choose your role to access the system'
    });
});

// ─── Admin Login ──────────────────────────────────────────────────────────────
router.get('/login/admin', (req, res) => {
    res.render('admin-login', {
        title: 'Admin Login - Streamwise Lab',
        description: 'Administrative access for school management',
        toast: null
    });
});

router.post('/login/admin', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('admin-login', {
            title: 'Admin Login - Streamwise Lab',
            description: 'Administrative access',
            toast: {
                icon: 'fas fa-exclamation-circle',
                title: 'Missing Fields',
                message: 'Please fill in all fields.'
            }
        });
    }

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        req.session.user = { username, role: 'admin' };
        return res.redirect('/dashboard');
    } else {
        return res.render('admin-login', {
            title: 'Admin Login - Streamwise Lab',
            description: 'Administrative access',
            toast: {
                icon: 'fas fa-exclamation-circle',
                title: 'Login Failed',
                message: 'Invalid username or password. Please try again.'
            }
        });
    }
});

// ─── Student 10 Login ─────────────────────────────────────────────────────────
router.get('/login/student-10', (req, res) => {
    res.render('student10-login', {
        title: 'Class 10 Login - Streamwise Lab',
        description: 'Login portal for 10th grade students',
        toast: null
    });
});

router.post('/login/student-10', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('student10-login', {
            title: 'Class 10 Login - Streamwise Lab',
            description: 'Login portal for 10th grade students',
            toast: {
                icon: 'fas fa-exclamation-circle',
                title: 'Missing Fields',
                message: 'Please fill in all fields.'
            }
        });
    }

    // TODO: replace with real DB lookup
    req.session.user = { username, role: 'student10' };
    res.redirect('/dashboard');
});

// ─── Student 12 Login ─────────────────────────────────────────────────────────
router.get('/login/student-12', (req, res) => {
    res.render('student12-login', {
        title: 'Class 12 Login - Streamwise Lab',
        description: 'Login portal for 12th grade students',
        toast: null
    });
});

router.post('/login/student-12', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('student12-login', {
            title: 'Class 12 Login - Streamwise Lab',
            description: 'Login portal for 12th grade students',
            toast: {
                icon: 'fas fa-exclamation-circle',
                title: 'Missing Fields',
                message: 'Please fill in all fields.'
            }
        });
    }

    // TODO: replace with real DB lookup
    req.session.user = { username, role: 'student12' };
    res.redirect('/dashboard');
});

// ─── Dashboard ────────────────────────────────────────────────────────────────
router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard - Streamwise Lab',
        description: 'Your personalized learning dashboard',
        username: req.session.user.username,
        userRole: req.session.user.role
    });
});

// ─── Assessment Page ──────────────────────────────────────────────────────────
router.get('/assessment', requireAuth, (req, res) => {
    res.render('assessment', {
        title: 'Skill Assessment - Streamwise Lab',
        description: 'Discover your strengths and get college recommendations',
        username: req.session.user.username,
        userRole: req.session.user.role
    });
});

// ─── Assessment Submit + College Recommendations ──────────────────────────────
router.post('/assessment/submit', requireAuth, (req, res) => {
    const { interests, math, science, arts, commerce, location, state } = req.body;

    // Store in session
    req.session.assessment = { interests, math, science, arts, commerce, location, state };

    res.redirect('/colleges');
});

// ─── College Recommendations ──────────────────────────────────────────────────
router.get('/colleges', requireAuth, (req, res) => {
    res.render('colleges', {
        title: 'College Recommendations - Streamwise Lab',
        description: 'Government colleges near you based on your profile',
        username: req.session.user.username,
        userRole: req.session.user.role,
        assessment: req.session.assessment || null
    });
});

// ─── Logout ───────────────────────────────────────────────────────────────────
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
