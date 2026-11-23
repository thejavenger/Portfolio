document.documentElement.classList.add("js");
// Typing effect
(function () {
    var el = document.getElementById('typed');
    if (!el) return;
    var words = ['Software Developer', 'Full-Stack Developer', 'Mobile App Developer', 'AI-Assisted Developer'];
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.textContent = words[0]; return; }
    var w = 0, c = 0, del = false;
    function tick() {
        var word = words[w];
        el.textContent = word.slice(0, c);
        var delay = del ? 40 : 85;
        if (!del && c === word.length) { del = true; delay = 1600; }
        else if (del && c === 0) { del = false; w = (w + 1) % words.length; delay = 350; }
        c += del ? -1 : 1;
        setTimeout(tick, delay);
    }
    tick();
})();

// Mobile nav
(function () {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
    });
    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
    });
})();

// Header shadow on scroll
(function () {
    var h = document.querySelector('.site-header');
    function f() { h.classList.toggle('scrolled', window.scrollY > 20); }
    f(); window.addEventListener('scroll', f, { passive: true });
})();

// Reveal on scroll
(function () {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach(function (i) { i.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
})();

// Lightbox
(function () {
    var lb = document.getElementById('lightbox');
    var img = lb.querySelector('img');
    function close() { lb.classList.remove('show'); document.body.classList.remove('noscroll'); }
    document.querySelectorAll('[data-zoom]').forEach(function (fig) {
        fig.addEventListener('click', function () {
            var src = fig.querySelector('img');
            img.src = src.src; img.alt = src.alt;
            lb.classList.add('show'); document.body.classList.add('noscroll');
        });
    });
    lb.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
