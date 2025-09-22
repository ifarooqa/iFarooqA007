// ===== Matrix background =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w, h, cols, ypos;
function resize() {
    w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
    cols = Math.floor(w / 20); ypos = Array(cols).fill(0);
}
window.addEventListener('resize', resize); resize();
function matrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#b91c1c'; ctx.font = '16px monospace';
    ypos.forEach((y, i) => { const text = String.fromCharCode(0x30A0 + Math.random() * 96); const x = i * 20; ctx.fillText(text, x, y); if (y > h + Math.random() * 100) ypos[i] = 0; else ypos[i] = y + 20; });
    requestAnimationFrame(matrix);
} matrix();

// ===== IntersectionObserver reveal =====
const io = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } }); }, { threshold: .18 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// ===== Typing effect =====
const phrases = [
    'fast, secure WordPress sites.',
    'pixel‑perfect frontends.',
    'custom themes & plugins.',
    'experiences users love.'
];
const el = document.getElementById('typing');
let pi = 0, ci = 0, deleting = false;
function type() {
    const current = phrases[pi];
    el.textContent = current.slice(0, ci) + (ci % 2 === 0 ? '_' : '');
    if (!deleting) { ci++; if (ci > current.length) { deleting = true; setTimeout(type, 1200); return; } }
    else { ci--; if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; } }
    setTimeout(type, deleting ? 40 : 80);
}
type();

// ===== Skill bars + counters on reveal =====
const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target; const lvl = +card.dataset.level || 70;
            const span = card.querySelector('.bar>span'); const pct = card.querySelector('.percent');
            span.style.width = lvl + '%';
            let i = 0; const step = () => { i++; pct.textContent = Math.min(i, lvl) + '%'; if (i < lvl) requestAnimationFrame(step); };
            requestAnimationFrame(step);
            skillIO.unobserve(card);
        }
    })
}, { threshold: .5 });
document.querySelectorAll('.skill').forEach(s => skillIO.observe(s));

// ===== Small utilities =====
document.getElementById('year').textContent = new Date().getFullYear();