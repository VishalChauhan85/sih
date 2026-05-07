// ── College Database ──────────────────────────────────────────────────────────
const COLLEGES = [
    // Delhi
    { id:1, name:"University of Delhi", short:"DU", state:"Delhi", city:"New Delhi", streams:["science","commerce","arts","law","management"], fees:"low", rating:4.8, seats:12000, estd:1922, affiliation:"Central University", website:"https://www.du.ac.in" },
    { id:2, name:"Jawaharlal Nehru University", short:"JNU", state:"Delhi", city:"New Delhi", streams:["arts","science"], fees:"free", rating:4.7, seats:1800, estd:1969, affiliation:"Central University", website:"https://www.jnu.ac.in" },
    { id:3, name:"Delhi Technological University", short:"DTU", state:"Delhi", city:"New Delhi", streams:["engineering"], fees:"mid", rating:4.5, seats:5000, estd:1941, affiliation:"State University", website:"https://www.dtu.ac.in" },
    { id:4, name:"Indraprastha Institute of Information Technology", short:"IIIT", state:"Delhi", city:"New Delhi", streams:["engineering"], fees:"mid", rating:4.4, seats:800, estd:2008, affiliation:"State University", website:"https://www.iiitd.ac.in" },
    { id:5, name:"Lady Shri Ram College", short:"LSR", state:"Delhi", city:"New Delhi", streams:["arts","commerce","science"], fees:"low", rating:4.6, seats:2200, estd:1956, affiliation:"University of Delhi", website:"https://www.lsr.edu.in" },

    // Maharashtra
    { id:6, name:"University of Mumbai", short:"MU", state:"Maharashtra", city:"Mumbai", streams:["science","commerce","arts","law","management"], fees:"low", rating:4.3, seats:25000, estd:1857, affiliation:"State University", website:"https://mu.ac.in" },
    { id:7, name:"Institute of Chemical Technology", short:"ICT", state:"Maharashtra", city:"Mumbai", streams:["engineering","science"], fees:"mid", rating:4.6, seats:1200, estd:1933, affiliation:"Deemed University", website:"https://www.ictmumbai.edu.in" },
    { id:8, name:"Savitribai Phule Pune University", short:"SPPU", state:"Maharashtra", city:"Pune", streams:["science","commerce","arts","engineering","law"], fees:"low", rating:4.2, seats:18000, estd:1949, affiliation:"State University", website:"https://www.unipune.ac.in" },
    { id:9, name:"Government Law College Mumbai", short:"GLC", state:"Maharashtra", city:"Mumbai", streams:["law"], fees:"free", rating:4.5, seats:600, estd:1855, affiliation:"University of Mumbai", website:"https://www.glcmumbai.ac.in" },

    // Karnataka
    { id:10, name:"Indian Institute of Science", short:"IISc", state:"Karnataka", city:"Bangalore", streams:["science","engineering"], fees:"low", rating:4.9, seats:1200, estd:1909, affiliation:"Central University", website:"https://www.iisc.ac.in" },
    { id:11, name:"Bangalore University", short:"BU", state:"Karnataka", city:"Bangalore", streams:["science","commerce","arts","law"], fees:"low", rating:4.1, seats:30000, estd:1964, affiliation:"State University", website:"https://bangaloreuniversity.ac.in" },
    { id:12, name:"Visvesvaraya Technological University", short:"VTU", state:"Karnataka", city:"Belgaum", streams:["engineering"], fees:"mid", rating:4.2, seats:50000, estd:1998, affiliation:"State University", website:"https://vtu.ac.in" },

    // Tamil Nadu
    { id:13, name:"University of Madras", short:"UM", state:"Tamil Nadu", city:"Chennai", streams:["science","arts","commerce","law"], fees:"low", rating:4.3, seats:20000, estd:1857, affiliation:"State University", website:"https://www.unom.ac.in" },
    { id:14, name:"Anna University", short:"AU", state:"Tamil Nadu", city:"Chennai", streams:["engineering"], fees:"mid", rating:4.5, seats:8000, estd:1978, affiliation:"State University", website:"https://www.annauniv.edu" },
    { id:15, name:"Madras Medical College", short:"MMC", state:"Tamil Nadu", city:"Chennai", streams:["medical"], fees:"free", rating:4.7, seats:250, estd:1835, affiliation:"Tamil Nadu Dr. MGR University", website:"https://www.mmc.tn.gov.in" },

    // Uttar Pradesh
    { id:16, name:"Banaras Hindu University", short:"BHU", state:"Uttar Pradesh", city:"Varanasi", streams:["science","arts","commerce","law","engineering","medical"], fees:"low", rating:4.5, seats:12000, estd:1916, affiliation:"Central University", website:"https://www.bhu.ac.in" },
    { id:17, name:"Aligarh Muslim University", short:"AMU", state:"Uttar Pradesh", city:"Aligarh", streams:["science","arts","commerce","law","engineering","medical","management"], fees:"low", rating:4.4, seats:10000, estd:1875, affiliation:"Central University", website:"https://www.amu.ac.in" },
    { id:18, name:"University of Allahabad", short:"AU", state:"Uttar Pradesh", city:"Prayagraj", streams:["science","arts","commerce","law"], fees:"free", rating:4.2, seats:8000, estd:1887, affiliation:"Central University", website:"https://www.allduniv.ac.in" },

    // Rajasthan
    { id:19, name:"University of Rajasthan", short:"URaj", state:"Rajasthan", city:"Jaipur", streams:["science","arts","commerce","law","management"], fees:"low", rating:4.0, seats:20000, estd:1947, affiliation:"State University", website:"https://www.uniraj.ac.in" },
    { id:20, name:"IIT Jodhpur", short:"IITJ", state:"Rajasthan", city:"Jodhpur", streams:["engineering","science"], fees:"mid", rating:4.5, seats:700, estd:2008, affiliation:"Central Institute", website:"https://www.iitj.ac.in" },

    // West Bengal
    { id:21, name:"University of Calcutta", short:"CU", state:"West Bengal", city:"Kolkata", streams:["science","arts","commerce","law","management"], fees:"low", rating:4.3, seats:30000, estd:1857, affiliation:"State University", website:"https://www.caluniv.ac.in" },
    { id:22, name:"Jadavpur University", short:"JU", state:"West Bengal", city:"Kolkata", streams:["engineering","science","arts"], fees:"low", rating:4.6, seats:5000, estd:1955, affiliation:"State University", website:"https://jadavpuruniversity.in" },

    // Gujarat
    { id:23, name:"Gujarat University", short:"GU", state:"Gujarat", city:"Ahmedabad", streams:["science","arts","commerce","law","management"], fees:"low", rating:4.0, seats:25000, estd:1950, affiliation:"State University", website:"https://www.gujaratuniversity.ac.in" },
    { id:24, name:"Nirma University", short:"NU", state:"Gujarat", city:"Ahmedabad", streams:["engineering","management","law"], fees:"high", rating:4.3, seats:3000, estd:2003, affiliation:"Deemed University", website:"https://nirmauni.ac.in" },

    // Punjab
    { id:25, name:"Panjab University", short:"PU", state:"Punjab", city:"Chandigarh", streams:["science","arts","commerce","law","engineering","management"], fees:"low", rating:4.3, seats:15000, estd:1947, affiliation:"State University", website:"https://puchd.ac.in" },

    // Madhya Pradesh
    { id:26, name:"Barkatullah University", short:"BU", state:"Madhya Pradesh", city:"Bhopal", streams:["science","arts","commerce","law"], fees:"low", rating:3.9, seats:12000, estd:1970, affiliation:"State University", website:"https://www.bubhopal.ac.in" },
    { id:27, name:"IIT Indore", short:"IITI", state:"Madhya Pradesh", city:"Indore", streams:["engineering","science"], fees:"mid", rating:4.5, seats:600, estd:2009, affiliation:"Central Institute", website:"https://www.iiti.ac.in" },

    // Bihar
    { id:28, name:"Patna University", short:"PU", state:"Bihar", city:"Patna", streams:["science","arts","commerce","law"], fees:"free", rating:3.8, seats:18000, estd:1917, affiliation:"State University", website:"https://www.patnauniversity.ac.in" },

    // Andhra Pradesh
    { id:29, name:"Andhra University", short:"AU", state:"Andhra Pradesh", city:"Visakhapatnam", streams:["science","arts","commerce","law","engineering"], fees:"low", rating:4.1, seats:20000, estd:1926, affiliation:"State University", website:"https://www.andhrauniversity.edu.in" },

    // Kerala
    { id:30, name:"University of Kerala", short:"KU", state:"Kerala", city:"Thiruvananthapuram", streams:["science","arts","commerce","law"], fees:"low", rating:4.2, seats:15000, estd:1937, affiliation:"State University", website:"https://www.keralauniversity.ac.in" },

    // Telangana
    { id:31, name:"Osmania University", short:"OU", state:"Telangana", city:"Hyderabad", streams:["science","arts","commerce","law","management","engineering"], fees:"low", rating:4.2, seats:22000, estd:1918, affiliation:"State University", website:"https://www.osmania.ac.in" },

    // Haryana
    { id:32, name:"Kurukshetra University", short:"KUK", state:"Haryana", city:"Kurukshetra", streams:["science","arts","commerce","law","management"], fees:"low", rating:4.0, seats:14000, estd:1956, affiliation:"State University", website:"https://www.kuk.ac.in" },
];

// ── Color map for college logos ───────────────────────────────────────────────
const BG_COLORS = [
    'linear-gradient(135deg,hsl(200,95%,45%),hsl(170,70%,50%))',
    'linear-gradient(135deg,hsl(262,83%,58%),hsl(200,95%,45%))',
    'linear-gradient(135deg,hsl(142,76%,36%),hsl(170,70%,50%))',
    'linear-gradient(135deg,hsl(38,92%,50%),hsl(20,90%,55%))',
    'linear-gradient(135deg,hsl(340,80%,60%),hsl(262,83%,58%))',
];

// ── Render ────────────────────────────────────────────────────────────────────
function renderColleges(list) {
    const grid = document.getElementById('collegesGrid');
    const noRes = document.getElementById('noResults');
    const count = document.getElementById('resultsCount');

    count.innerHTML = `Showing <strong>${list.length}</strong> college${list.length !== 1 ? 's' : ''}`;

    if (list.length === 0) {
        grid.innerHTML = '';
        noRes.style.display = 'flex';
        noRes.style.flexDirection = 'column';
        noRes.style.alignItems = 'center';
        return;
    }

    noRes.style.display = 'none';
    grid.innerHTML = list.map((c, i) => {
        const streamBadges = c.streams.map(s =>
            `<span class="stream-badge stream-${s}">${capitalize(s)}</span>`
        ).join('');

        const feesLabel = { free: 'Free / Scholarship', low: '< ₹10,000/yr', mid: '₹10k–₹50k/yr', high: '> ₹50,000/yr' }[c.fees] || c.fees;
        const stars = '★'.repeat(Math.floor(c.rating)) + (c.rating % 1 >= 0.5 ? '½' : '');
        const color = BG_COLORS[i % BG_COLORS.length];

        return `
        <div class="college-card" data-state="${c.state}" data-streams="${c.streams.join(',')}" data-fees="${c.fees}">
            <div class="college-card-header">
                <div class="college-logo" style="background:${color}">${c.short}</div>
                <div class="college-title">
                    <h3>${c.name}</h3>
                    <div class="location"><i class="fas fa-map-marker-alt"></i> ${c.city}, ${c.state}</div>
                </div>
            </div>
            <div class="college-card-body">
                <div class="college-streams">${streamBadges}</div>
                <div class="college-meta">
                    <div class="meta-row">
                        <span class="meta-label"><i class="fas fa-rupee-sign"></i> Fees</span>
                        <span class="meta-value">${feesLabel}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label"><i class="fas fa-calendar"></i> Est.</span>
                        <span class="meta-value">${c.estd}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label"><i class="fas fa-users"></i> Seats</span>
                        <span class="meta-value">${c.seats.toLocaleString()}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label"><i class="fas fa-star"></i> Rating</span>
                        <div class="college-rating">
                            <span>${c.rating}</span>/5
                        </div>
                    </div>
                </div>
            </div>
            <div class="college-card-footer">
                <button class="btn-details" onclick="alert('Detailed view coming soon for ${c.name}')">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                <a href="${c.website}" target="_blank" rel="noopener" class="btn-website">
                    <i class="fas fa-external-link-alt"></i> Website
                </a>
            </div>
        </div>`;
    }).join('');
}

// ── Filters ───────────────────────────────────────────────────────────────────
function applyFilters() {
    const stream = document.getElementById('filterStream').value;
    const state  = document.getElementById('filterState').value;
    const fees   = document.getElementById('filterFees').value;
    const search = document.getElementById('searchInput').value.toLowerCase().trim();

    const filtered = COLLEGES.filter(c => {
        const matchStream = stream === 'all' || c.streams.includes(stream);
        const matchState  = state  === 'all' || c.state === state;
        const matchFees   = fees   === 'all' || c.fees  === fees;
        const matchSearch = !search || c.name.toLowerCase().includes(search) || c.city.toLowerCase().includes(search);
        return matchStream && matchState && matchFees && matchSearch;
    });

    renderColleges(filtered);
}

function resetFilters() {
    document.getElementById('filterStream').value = 'all';
    document.getElementById('filterState').value  = 'all';
    document.getElementById('filterFees').value   = 'all';
    document.getElementById('searchInput').value  = '';
    renderColleges(COLLEGES);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Live search ───────────────────────────────────────────────────────────────
document.getElementById('searchInput').addEventListener('input', () => {
    applyFilters();
});

// ── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    // Pre-select state from assessment if available
    if (assessmentData && assessmentData.state) {
        const stateSelect = document.getElementById('filterState');
        const match = [...stateSelect.options].find(o => o.value === assessmentData.state);
        if (match) {
            stateSelect.value = assessmentData.state;
            applyFilters();
            return;
        }
    }
    renderColleges(COLLEGES);
});
