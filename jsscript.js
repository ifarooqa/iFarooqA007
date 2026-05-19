// Mobile nav
const toggle = document.getElementById('navtoggle'), links = document.getElementById('navlinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Hero entrance
window.addEventListener('load', () => {
    const hl = document.getElementById('hleft'), hr = document.getElementById('hright');
    [hl, hr].forEach((el, i) => {
        if (!el) return;
        el.style.cssText = 'opacity:0;transform:translateY(36px);transition:opacity .9s ease ' + (i * .18) + 's,transform .9s ease ' + (i * .18) + 's';
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'none'; }));
    });
});

// Reveal on scroll
const revEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
revEls.forEach(el => ro.observe(el));

// Skill bars
const skillEls = document.querySelectorAll('.sitem[data-skill]');
const so = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const fill = e.target.querySelector('.sbarfill');
            if (fill) setTimeout(() => { fill.style.width = e.target.dataset.skill + '%'; }, 200);
            so.unobserve(e.target);
        }
    });
}, { threshold: .3 });
skillEls.forEach(el => so.observe(el));

// Counter
document.querySelectorAll('[data-count]').forEach(el => {
    const co = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const target = +e.target.dataset.count;
                let cur = 0;
                const step = target / 90;
                const t = setInterval(() => {
                    cur = Math.min(cur + step, target);
                    e.target.textContent = Math.floor(cur) + '+';
                    if (cur >= target) clearInterval(t);
                }, 16);
                co.unobserve(e.target);
            }
        });
    }, { threshold: .5 });
    co.observe(el);
});
