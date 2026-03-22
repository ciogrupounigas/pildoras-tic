/* ══════════════════════════════════════════════════
   PÍLDORAS TIC — App v2.0
   Grupo Unigas · Formación Tecnológica
   ══════════════════════════════════════════════════ */

const PildorasTIC = {

  init() {
    this.navigation.init();
    this.breadcrumb.init();
    this.animations.init();
    this.accordion.init();
    this.search.init();
    this.progress.init();
    this.sidebar.init();
    this.stats.init();
  },

  /* ── NAVEGACIÓN ── */
  navigation: {
    init() {
      const section = document.body.getAttribute('data-section');
      if (!section) return;

      document.querySelectorAll('.ptic-sidebar__link').forEach(link => {
        const href = link.getAttribute('href') || '';
        const linkSection = link.getAttribute('data-nav');
        if (linkSection === section) {
          link.classList.add('ptic-sidebar__link--active');
        }
      });
    }
  },

  /* ── BREADCRUMB ── */
  breadcrumb: {
    init() {
      const titleEl = document.getElementById('section-title');
      const currentEl = document.querySelector('.ptic-breadcrumb__current');
      if (titleEl && currentEl && !currentEl.textContent.trim()) {
        currentEl.textContent = titleEl.textContent;
      }
    }
  },

  /* ── SIDEBAR MOBILE ── */
  sidebar: {
    init() {
      const toggle = document.querySelector('.ptic-header__toggle');
      const sidebar = document.querySelector('.ptic-sidebar');
      const overlay = document.querySelector('.ptic-overlay');

      if (!toggle || !sidebar) return;

      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('ptic-sidebar--open');
        if (overlay) overlay.classList.toggle('ptic-overlay--active');
      });

      if (overlay) {
        overlay.addEventListener('click', () => {
          sidebar.classList.remove('ptic-sidebar--open');
          overlay.classList.remove('ptic-overlay--active');
        });
      }
    }
  },

  /* ── ANIMACIONES SCROLL ── */
  animations: {
    init() {
      const items = document.querySelectorAll('.ptic-timeline__item, .ptic-card, .ptic-feature-card');
      if (!items.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.15 });

      items.forEach(item => observer.observe(item));
    }
  },

  /* ── ACCORDION / FAQ ── */
  accordion: {
    init() {
      document.querySelectorAll('.ptic-accordion__trigger').forEach(trigger => {
        // ARIA: marcar estado inicial
        trigger.setAttribute('aria-expanded', 'false');
        const panel = trigger.closest('.ptic-accordion').querySelector('.ptic-accordion__panel');
        if (panel) panel.setAttribute('role', 'region');

        trigger.addEventListener('click', () => {
          const accordion = trigger.closest('.ptic-accordion');
          const accPanel = accordion.querySelector('.ptic-accordion__panel');
          const isActive = accordion.classList.contains('active');

          // Cerrar todos
          document.querySelectorAll('.ptic-accordion').forEach(acc => {
            acc.classList.remove('active');
            acc.querySelector('.ptic-accordion__panel').style.maxHeight = null;
            acc.querySelector('.ptic-accordion__trigger').setAttribute('aria-expanded', 'false');
          });

          // Abrir el clickeado si estaba cerrado
          if (!isActive) {
            accordion.classList.add('active');
            accPanel.style.maxHeight = accPanel.scrollHeight + 'px';
            trigger.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }
  },

  /* ── BUSCADOR (recursos-faq) ── */
  search: {
    init() {
      const input = document.querySelector('.ptic-search__input');
      if (!input) return;

      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll('[data-searchable]');

        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) || query === '' ? '' : 'none';
        });
      });
    }
  },

  /* ── PROGRESS BARS ── */
  progress: {
    init() {
      const bars = document.querySelectorAll('.ptic-progress__fill');
      if (!bars.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.getAttribute('data-width') + '%';
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.3 });

      bars.forEach(bar => observer.observe(bar));
    }
  },

  /* ── STATS COUNTER ── */
  stats: {
    init() {
      const counters = document.querySelectorAll('.ptic-stats__value[data-target]');
      if (!counters.length) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          counters.forEach(el => this.animateCounter(el));
          observer.disconnect();
        }
      }, { threshold: 0.5 });

      const statsBar = document.querySelector('.ptic-stats');
      if (statsBar) observer.observe(statsBar);
    },

    animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 30);
    }
  },

  /* ── UTILIDADES ── */
  utils: {
    // Comunicación cross-frame con SharePoint
    postToParent(type, data) {
      try {
        if (window.parent !== window) {
          window.parent.postMessage({ source: 'pildoras-tic', type, data }, '*');
        }
      } catch (e) {
        console.warn('[PildorasTIC] postToParent bloqueado por cross-origin:', e.message);
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => PildorasTIC.init());
