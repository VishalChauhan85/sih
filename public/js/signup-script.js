document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Auto-hide server-rendered toast after 5s
    const toast = document.getElementById('toast');
    if (toast) {
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Loading state
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

    // Client-side validation before submit
    form.addEventListener('submit', function (e) {
        const username = form.username.value.trim();
        const password = form.password.value;

        if (!username || !password) {
            e.preventDefault();
            showClientToast('Please fill in all fields.', 'error');
            return;
        }

        if (username.length < 3) {
            e.preventDefault();
            showClientToast('Username must be at least 3 characters.', 'error');
            return;
        }

        if (password.length < 6) {
            e.preventDefault();
            showClientToast('Password must be at least 6 characters.', 'error');
            return;
        }

        // Show loading
        setLoading(true);
    });

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    const passwordHint = document.querySelector('.password-hint');

    if (passwordInput && passwordHint) {
        passwordInput.addEventListener('input', function () {
            const p = this.value;
            if (p.length === 0) {
                passwordHint.textContent = 'Password must be at least 6 characters long';
                passwordHint.style.color = '';
            } else if (p.length < 6) {
                passwordHint.textContent = 'Too short';
                passwordHint.style.color = '#ef4444';
            } else if (p.length < 8) {
                passwordHint.textContent = 'Strength: Fair';
                passwordHint.style.color = '#f59e0b';
            } else if (p.length < 12) {
                passwordHint.textContent = 'Strength: Good';
                passwordHint.style.color = '#10b981';
            } else {
                passwordHint.textContent = 'Strength: Strong 💪';
                passwordHint.style.color = '#059669';
            }
        });
    }

    // Input scale effect
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Client-side toast (for validation errors only)
function showClientToast(message, type = 'info') {
    const existing = document.querySelector('.client-toast');
    if (existing) existing.remove();

    const colors = {
        error: 'linear-gradient(135deg,#ef4444,#dc2626)',
        success: 'linear-gradient(135deg,#10b981,#059669)',
    };

    const el = document.createElement('div');
    el.className = 'client-toast';
    el.textContent = message;
    el.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        padding: 0.85rem 1.25rem;
        background: ${colors[type] || colors.error};
        color: white;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 320px;
    `;

    document.body.appendChild(el);

    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s';
        setTimeout(() => el.remove(), 300);
    }, 4000);
}

const s = document.createElement('style');
s.textContent = `@keyframes slideIn { from { transform:translateX(110%); opacity:0; } to { transform:translateX(0); opacity:1; } }`;
document.head.appendChild(s);
