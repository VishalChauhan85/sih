// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginForms();
    initializePasswordToggles();
    initializeRoleCards();
});

// Initialize login forms
function initializeLoginForms() {
    const loginForms = document.querySelectorAll('#loginForm');
    
    loginForms.forEach(form => {
        form.addEventListener('submit', handleLogin);
    });
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Validation
    if (!username || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-login');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get current role from URL
        const role = getCurrentRole();
        
        // Here you would make actual API call
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role })
        });
        
        if (response.ok) {
            showAlert(`Welcome to the ${getRoleDisplayName(role)} portal!`, 'success');
            
            // Redirect after success
            setTimeout(() => {
                window.location.href = `/dashboard/${role}`;
            }, 1500);
        } else {
            throw new Error('Invalid credentials');
        }
        
    } catch (error) {
        showAlert('Invalid credentials. Please try again.', 'error');
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 500);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
}

// Initialize password toggle buttons
function initializePasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Initialize role cards hover effects
function initializeRoleCards() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility functions
function getCurrentRole() {
    const path = window.location.pathname;
    if (path.includes('admin')) return 'admin';
    if (path.includes('student-10')) return 'student10';
    if (path.includes('student-12')) return 'student12';
    return '';
}

function getRoleDisplayName(role) {
    const roleNames = {
        'admin': 'Admin',
        'student10': 'Class 10 Student',
        'student12': 'Class 12 Student'
    };
    return roleNames[role] || '';
}

// Alert system
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${getAlertIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add alert styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${getAlertColor(type)};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 4000);
}

function getAlertIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getAlertColor(type) {
    const colors = {
        'success': 'linear-gradient(135deg, #10b981, #059669)',
        'error': 'linear-gradient(135deg, #ef4444, #dc2626)',
        'warning': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'info': 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    return colors[type] || colors.info;
}

// Add CSS animations for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
document.head.appendChild(style);
