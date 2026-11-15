// Client-side script, served from public/javascripts.
// Each feature below is small and independent. If an element is not on the
// current page, that feature quietly does nothing.
document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Close the mobile navbar after a link is tapped */
  var navCollapse = document.getElementById('mainNav');
  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
      });
    });
  }

  /* 2. Dark / light theme toggle (choice is remembered in localStorage) */
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-bs-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: ignore */ }
    });
  }

  /* 3. Typing effect for the hero roles (reads roles from the data-roles attribute) */
  var typedEl = document.getElementById('typed');
  if (typedEl && !reduceMotion) {
    var roles = [];
    try { roles = JSON.parse(typedEl.getAttribute('data-roles')); } catch (e) { roles = []; }
    if (roles.length > 1) {
      var roleIndex = 0, charIndex = roles[0].length, deleting = true;
      (function tick() {
        var word = roles[roleIndex];
        typedEl.textContent = word.slice(0, charIndex);
        var delay = deleting ? 45 : 90;

        if (!deleting && charIndex === word.length) {        // finished typing: pause
          deleting = true; delay = 1600;
        } else if (deleting && charIndex === 0) {             // finished deleting: next word
          deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300;
        } else {
          charIndex += deleting ? -1 : 1;
        }
        setTimeout(tick, delay);
      })();
    }
  }

  /* 4. Scroll reveal + animated counters (IntersectionObserver) */
  var revealEls = document.querySelectorAll('.reveal');
  var counters = document.querySelectorAll('.counter');

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    if (reduceMotion || target === 0) { el.textContent = target; return; }
    var duration = 1200, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(target * progress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.counter').forEach(runCounter);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Very old browsers: just show everything
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    counters.forEach(runCounter);
  }

  /* 5. Project filter buttons */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.project-item');
  var noResults = document.getElementById('noResults');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var shown = 0;
      items.forEach(function (item) {
        var tags = item.getAttribute('data-tags').split(',');
        var match = filter === 'all' || tags.indexOf(filter) !== -1;
        item.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (noResults) noResults.classList.toggle('d-none', shown !== 0);
    });
  });

  /* 6. Copy email to clipboard (contact page) */
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn && navigator.clipboard) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(copyBtn.getAttribute('data-email')).then(function () {
        var label = copyBtn.querySelector('span');
        label.textContent = 'Copied!';
        setTimeout(function () { label.textContent = 'Copy'; }, 1800);
      });
    });
  }

  /* 7. Back-to-top button */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
});
