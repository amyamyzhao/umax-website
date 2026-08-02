/* ============================================================
   UMAX Sports — Global JavaScript
   ============================================================ */

// ---- Mobile nav toggle ----
document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ---- Scroll-triggered nav background ----
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.borderBottomColor = window.scrollY > 60
        ? 'rgba(255,255,255,0.08)'
        : 'var(--gray-80)';
    }, { passive: true });
  }

  // ---- Intersection observer for fade-up ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ---- RFQ Form submission ----
  const rfqForm = document.getElementById('rfq-form');
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = rfqForm.querySelector('[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Collect form data
      const data = Object.fromEntries(new FormData(rfqForm));
      console.log('RFQ submitted:', data);

      // Simulate async (replace with real endpoint / Formspree / EmailJS)
      setTimeout(() => {
        rfqForm.innerHTML = `
          <div style="text-align:center;padding:64px 0">
            <div style="font-family:var(--font-head);font-size:3rem;font-weight:900;margin-bottom:16px">✓</div>
            <h3 style="margin-bottom:12px">Request Received</h3>
            <p>Thank you! Our team will review your project details and respond within 24 hours.</p>
            <p style="margin-top:8px;color:var(--gray-50)">Need faster response? WhatsApp us at <strong style="color:var(--white)">+86 183 5833 8643</strong></p>
          </div>`;
      }, 1200);
    });
  }

  // ---- WhatsApp float tooltip ----
  const waFloat = document.querySelector('.wa-float');
  if (waFloat) {
    waFloat.setAttribute('title', 'Chat on WhatsApp: +86 183 5833 8643');
  }

});


/* ---- UMAX Customer Reviews carousel ---- */
(() => {
  const modules = document.querySelectorAll(".umax-reviews");

  modules.forEach((module) => {
    const track = module.querySelector("[data-umax-review-track]");
    const previous = module.querySelector("[data-umax-review-prev]");
    const next = module.querySelector("[data-umax-review-next]");

    if (!track || !previous || !next) return;

    const scrollOneCard = (direction) => {
      const card = track.querySelector(".umax-review-card");
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
      const distance = card ? card.getBoundingClientRect().width + gap : 360;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      track.scrollBy({
        left: distance * direction,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    previous.addEventListener("click", () => scrollOneCard(-1));
    next.addEventListener("click", () => scrollOneCard(1));
  });
})();

