// @ts-nocheck
// ==========================================================
// GO MASSAGE - SEPARATED JS - PORTRAIT/LANDSCAPE PRECISION (UPDATED)
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger Menu & Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      // Kunci scroll halaman utama saat menu terbuka di mode portrait
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Tutup menu secara otomatis saat salah satu tautan diklik
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Orientation Detection & Precision Display
  function updateOrientation() {
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    const badge = document.getElementById('orientationBadge');
    const status = document.getElementById('orientationStatus');
    const mode = isPortrait ? 'Portrait' : 'Landscape';
    
    if (badge) badge.textContent = `● ${mode} Optimized`;
    if (status) status.textContent = `Orientation: ${mode} Mode • ${window.innerWidth} x ${window.innerHeight}px • Precision Layout Active`;
    
    document.body.setAttribute('data-orientation', mode.toLowerCase());
  }

  // Jalankan saat pertama kali dimuat
  updateOrientation();
  window.addEventListener('resize', updateOrientation);
  window.addEventListener('orientationchange', () => setTimeout(updateOrientation, 100));

  // 4. Smooth Scroll untuk Navigasi Anchor
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (navMenu) {
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
          }
        }
      }
    });
  });

  // 5. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.service-card, .feature, .step, .article-card');
  if (revealElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target); // Hentikan observasi setelah animasi muncul sekali
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
});
