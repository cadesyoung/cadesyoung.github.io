/* ═══════════════════════════════════════════════════
   Cade Young — Portfolio JS
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Mobile nav ────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const sidenav   = document.getElementById('sidenav');

  hamburger.addEventListener('click', () => {
    sidenav.classList.toggle('open');
  });

  // Close nav when a link is clicked on mobile
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      sidenav.classList.remove('open');
    });
  });

  // ── Scroll spy: highlight active nav link ─────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => spyObserver.observe(sec));

  // ── Reveal on scroll ──────────────────────────────
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger sibling reveals
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(idx * 80, 400));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));

  // ── Smooth scroll for anchor links ────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Hero name letter animation on load ────────────
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.style.opacity = '0';
    heroName.style.transform = 'translateY(20px)';
    heroName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      heroName.style.opacity = '1';
      heroName.style.transform = 'translateY(0)';
    }, 150);
  }

  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    heroTag.style.opacity = '0';
    heroTag.style.transition = 'opacity 0.6s ease';
    setTimeout(() => { heroTag.style.opacity = '1'; }, 50);
  }

  const heroSub = document.querySelector('.hero-subtitle');
  if (heroSub) {
    heroSub.style.opacity = '0';
    heroSub.style.transition = 'opacity 0.7s ease';
    setTimeout(() => { heroSub.style.opacity = '1'; }, 300);
  }

  ['.hero-bio', '.hero-meta', '.hero-cta'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.7s ease';
      setTimeout(() => { el.style.opacity = '1'; }, 450 + i * 120);
    }
  });


  // ── Game modal ─────────────────────────────────────
  window.openGame = function () {
    const modal = document.getElementById('game-modal');
    const frame = document.getElementById('game-frame');
    frame.src = 'https://html-classic.itch.zone/html/17746521/dag/index.html?v=1780193137';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeGame = function () {
    const modal = document.getElementById('game-modal');
    const frame = document.getElementById('game-frame');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    frame.src = '';
  };

  // Click outside the inner box to close
  window.handleModalClick = function (e) {
    if (e.target === document.getElementById('game-modal')) closeGame();
  };

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { window.closeGame(); window.closeLMS && window.closeLMS(); }
  });


  // ── LMS Screenshot Modal ───────────────────────
  let lmsIndex = 0;

  function lmsUpdateUI() {
    const track = document.getElementById('lms-track');
    const counter = document.getElementById('lms-counter');
    const dots = document.querySelectorAll('.lms-dot');
    track.style.transform = `translateX(-${lmsIndex * 100}%)`;
    counter.textContent = `${lmsIndex + 1} / 4`;
    dots.forEach((d, i) => d.classList.toggle('active', i === lmsIndex));
  }

  window.openLMS = function () {
    lmsIndex = 0;
    lmsUpdateUI();
    const modal = document.getElementById('lms-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLMS = function () {
    document.getElementById('lms-modal').classList.remove('active');
    document.body.style.overflow = '';
  };

  window.lmsSlide = function (dir) {
    lmsIndex = (lmsIndex + dir + 4) % 4;
    lmsUpdateUI();
  };

  window.lmsGoTo = function (i) {
    lmsIndex = i;
    lmsUpdateUI();
  };

  window.handleLmsModalClick = function (e) {
    if (e.target === document.getElementById('lms-modal')) closeLMS();
  };

})();