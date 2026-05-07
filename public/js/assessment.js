// ── Step Navigation ──────────────────────────────────────────────────────────
let currentStep = 1;
const totalSteps = 4;

function nextStep(to) {
    if (!validateStep(currentStep)) return;
    if (to === 4) buildReview();
    goToStep(to);
}

function prevStep(to) {
    goToStep(to);
}

function goToStep(to) {
    // Hide all panels
    document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
    // Update dots
    document.querySelectorAll('.step').forEach((dot, i) => {
        dot.classList.remove('active', 'done');
        if (i + 1 < to) dot.classList.add('done');
        if (i + 1 === to) dot.classList.add('active');
    });
    // Show target
    const target = document.getElementById(`step-${to}`);
    if (target) {
        target.classList.add('active');
        // re-trigger animation
        target.style.animation = 'none';
        target.offsetHeight; // reflow
        target.style.animation = '';
    }
    currentStep = to;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Validation ────────────────────────────────────────────────────────────────
function validateStep(step) {
    if (step === 1) {
        const name = document.querySelector('[name="studentName"]').value.trim();
        const state = document.querySelector('[name="state"]').value;
        const city = document.querySelector('[name="location"]').value.trim();
        const cls = document.querySelector('[name="currentClass"]').value;
        const cat = document.querySelector('[name="category"]').value;

        if (!name || !state || !city || !cls || !cat) {
            showToast('Please fill in all fields before continuing.', 'error');
            return false;
        }
    }

    if (step === 2) {
        const allRated = ['math','science','chemistry','commerce','languages','arts','computers','social']
            .every(sub => parseInt(document.getElementById(`${sub}-val`).value) > 0);
        if (!allRated) {
            showToast('Please rate all subjects before continuing.', 'error');
            return false;
        }
    }

    if (step === 3) {
        const checked = document.querySelectorAll('[name="interests"]:checked').length;
        const goal = document.querySelector('[name="careerGoal"]:checked');
        if (checked === 0) {
            showToast('Please select at least one interest.', 'error');
            return false;
        }
        if (!goal) {
            showToast('Please select your career goal area.', 'error');
            return false;
        }
    }

    return true;
}

// ── Star Ratings ──────────────────────────────────────────────────────────────
document.querySelectorAll('.star-rating').forEach(group => {
    const name = group.dataset.name;
    const stars = group.querySelectorAll('.star');
    const input = document.getElementById(`${name}-val`);

    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const val = parseInt(star.dataset.val);
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < val);
            });
        });

        star.addEventListener('mouseleave', () => {
            const current = parseInt(input.value);
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < current);
            });
        });

        star.addEventListener('click', () => {
            const val = parseInt(star.dataset.val);
            input.value = val;
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < val);
            });
        });
    });
});

// ── Review Summary ────────────────────────────────────────────────────────────
function buildReview() {
    const f = document.getElementById('assessmentForm');
    const data = new FormData(f);

    const interests = [...document.querySelectorAll('[name="interests"]:checked')]
        .map(el => el.value.replace(/_/g,' ')).join(', ') || 'None selected';
    const goal = document.querySelector('[name="careerGoal"]:checked');

    const skills = ['math','science','chemistry','commerce','languages','arts','computers','social']
        .map(s => {
            const v = parseInt(document.getElementById(`${s}-val`).value);
            return `${cap(s)}: ${'★'.repeat(v)}${'☆'.repeat(5-v)}`;
        }).join('<br>');

    document.getElementById('reviewBox').innerHTML = `
        <div class="review-item">
            <label>Name</label>
            <span>${data.get('studentName') || '—'}</span>
        </div>
        <div class="review-item">
            <label>Class</label>
            <span>${data.get('currentClass') ? 'Class ' + data.get('currentClass') : '—'}</span>
        </div>
        <div class="review-item">
            <label>State</label>
            <span>${data.get('state') || '—'}</span>
        </div>
        <div class="review-item">
            <label>City / District</label>
            <span>${data.get('location') || '—'}</span>
        </div>
        <div class="review-item">
            <label>Category</label>
            <span>${data.get('category') || '—'}</span>
        </div>
        <div class="review-item">
            <label>Career Goal</label>
            <span>${goal ? cap(goal.value.replace(/_/g,' ')) : '—'}</span>
        </div>
        <div class="review-item full">
            <label>Subject Skills</label>
            <span style="font-family:monospace; font-size:0.9rem; line-height:1.8">${skills}</span>
        </div>
        <div class="review-item full">
            <label>Interests</label>
            <span>${interests}</span>
        </div>
    `;
}

function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(message, type = 'info') {
    const existing = document.querySelector('.assess-toast');
    if (existing) existing.remove();

    const colors = {
        error: 'linear-gradient(135deg,#ef4444,#dc2626)',
        success: 'linear-gradient(135deg,#10b981,#059669)',
        info: 'linear-gradient(135deg,#3b82f6,#2563eb)'
    };

    const toast = document.createElement('div');
    toast.className = 'assess-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        padding: 0.85rem 1.25rem;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 340px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

const style = document.createElement('style');
style.textContent = `@keyframes slideIn { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }`;
document.head.appendChild(style);
