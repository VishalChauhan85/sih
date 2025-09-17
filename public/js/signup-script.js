document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Toast functionality
    function showToast(title, description, type = 'success') {
        const toast = document.getElementById('toast');
        const toastIcon = toast.querySelector('.toast-icon');
        const toastTitle = toast.querySelector('.toast-title');
        const toastDescription = toast.querySelector('.toast-description');

        // Set content
        toastTitle.textContent = title;
        toastDescription.textContent = description;
        
        // Set icon and style based on type
        toast.className = `toast ${type}`;
        if (type === 'success') {
            toastIcon.className = 'toast-icon fas fa-check-circle';
        } else if (type === 'error') {
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
        }

        // Show toast
        toast.classList.add('show');

        // Hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Form validation
    function validateForm(formData) {
        const { username, password } = formData;

        // if (!username || !password || !grade) {
        if (!username || !password ) {
            showToast(
                'Missing Information',
                'Please fill in all fields to continue.',
                'error'
            );
            return false;
        }

        if (password.length < 6) {
            showToast(
                'Password Too Short',
                'Password must be at least 6 characters long.',
                'error'
            );
            return false;
        }

        if (username.length < 3) {
            showToast(
                'Username Too Short',
                'Username must be at least 3 characters long.',
                'error'
            );
            return false;
        }

        return true;
    }

    // Loading state management
    function setLoading(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    }

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            username: form.username.value.trim(),
            password: form.password.value,
            // grade: form.grade.value
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // Set loading state
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            
            // Show success message
            showToast(
                'Welcome to the Admin Portal! 🎉',
                `Account Login successfully for ${formData.username}`,
                'success'
            );

            // In a real application, you would:
            // 1. Send data to your backend API
            // 2. Handle the response
            // 3. Redirect on success or show error on failure
            
            console.log('Form submitted:', formData);
            
            // Optional: Reset form
            // form.reset();
        }, 2000);
    });

    // Enhanced input interactions
    const inputs = document.querySelectorAll('.form-input, .form-select');
    
    inputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Sign in link handler
    const signinLink = document.querySelector('.signin-link');
    signinLink.addEventListener('click', function() {
        showToast(
            'Coming Soon!',
            'Sign up functionality will be available soon.',
            'success'
        );
    });

    // Add some interactive effects
    const card = document.querySelector('.signup-card');
    
    // Subtle hover effect for the card
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    // Password strength indicator (optional enhancement)
    const passwordInput = document.getElementById('password');
    const passwordHint = document.querySelector('.password-hint');
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = getPasswordStrength(password);
        
        passwordHint.textContent = `Password strength: ${strength.text}`;
        passwordHint.style.color = strength.color;
    });

    function getPasswordStrength(password) {
        if (password.length === 0) {
            return { text: 'Password must be at least 6 characters long', color: 'var(--text-muted)' };
        } else if (password.length < 6) {
            return { text: 'Too short', color: '#ef4444' };
        } else if (password.length < 8) {
            return { text: 'Fair', color: '#f59e0b' };
        } else if (password.length < 12) {
            return { text: 'Good', color: '#10b981' };
        } else {
            return { text: 'Strong', color: '#059669' };
        }
    }

    // Add ripple effect to button
    submitBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 600ms linear';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Add ripple animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .submit-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});