/**
 * PRESTIGE LUXURY CONSTRUCTION - MAIN JAVASCRIPT
 * Features:
 * - Sticky header effect
 * - Responsive hamburger drawer menu
 * - Dynamic project category filtering (Residential, Commercial, Interior)
 * - Project details modal / gallery preview
 * - WhatsApp contact form with automatic message compilation
 * - Active navigation highlight
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initProjectFiltering();
  initProjectModal();
  initWhatsAppContactForm();
  highlightActiveNav();
});

/* ---------------------------------------------------------
   1. STICKY HEADER EFFECT
   --------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ---------------------------------------------------------
   2. MOBILE HAMBURGER MENU & DRAWER
   --------------------------------------------------------- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileDrawer || !mobileDrawerOverlay) return;

  const toggleMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains('active');
    if (shouldOpen) {
      hamburgerBtn.classList.add('active');
      mobileDrawer.classList.add('active');
      mobileDrawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      hamburgerBtn.classList.remove('active');
      mobileDrawer.classList.remove('active');
      mobileDrawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  hamburgerBtn.addEventListener('click', () => toggleMenu());
  mobileDrawerOverlay.addEventListener('click', () => toggleMenu(false));

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* ---------------------------------------------------------
   3. PROJECT FILTERING (Residential, Commercial, Interior)
   --------------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Subtle fade-in animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ---------------------------------------------------------
   4. PROJECT DETAILS MODAL & GALLERY
   --------------------------------------------------------- */
function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  if (!modalOverlay) return;

  const closeBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLocation = document.getElementById('modalLocation');
  const modalArea = document.getElementById('modalArea');
  const modalYear = document.getElementById('modalYear');
  const modalScope = document.getElementById('modalScope');

  // Trigger modal when clicking project card
  const projectCards = document.querySelectorAll('.project-card[data-modal="true"]');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.getAttribute('data-img') || card.querySelector('img')?.src;
      const title = card.getAttribute('data-title') || card.querySelector('.project-title')?.textContent;
      const category = card.getAttribute('data-category-label') || card.querySelector('.project-badge')?.textContent;
      const location = card.getAttribute('data-location') || 'Sulawesi Tengah';
      const area = card.getAttribute('data-area') || 'Custom Luxury Scale';
      const year = card.getAttribute('data-year') || '2025';
      const scope = card.getAttribute('data-scope') || 'Architecture & Construction';
      const desc = card.getAttribute('data-desc') || 'Proyek mahakarya konstruksi premium dengan standar arsitektur kelas dunia, pengerjaan presisi tinggi, dan sentuhan material mewah pilihan.';

      if (modalImg) modalImg.src = img;
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalLocation) modalLocation.textContent = location;
      if (modalArea) modalArea.textContent = area;
      if (modalYear) modalYear.textContent = year;
      if (modalScope) modalScope.textContent = scope;
      if (modalDesc) modalDesc.textContent = desc;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ---------------------------------------------------------
   5. WHATSAPP CONTACT FORM INTEGRATION
   --------------------------------------------------------- */
function initWhatsAppContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('namaLengkap')?.value.trim();
    const phone = document.getElementById('nomorTelepon')?.value.trim();
    const email = document.getElementById('emailAddress')?.value.trim();
    const category = document.getElementById('kategoriProyek')?.value;
    const locationArea = document.getElementById('lokasiLuas')?.value.trim();
    const message = document.getElementById('pesanProyek')?.value.trim();

    // Validation
    if (!name || !phone || !message) {
      alert('Mohon lengkapi Nama, Nomor Telepon/WhatsApp, dan Pesan Proyek Anda.');
      return;
    }

    // Official WhatsApp Number for Prestige Luxury Construction
    // Can be easily updated by user:
    const waNumber = '6281935417132';

    // Formatted WhatsApp Message
    const textLines = [
      '🏛️ *KONSULTASI PROYEK - PRESTIGE LUXURY CONSTRUCTION*',
      '--------------------------------------------------',
      `👤 *Nama Lengkap:* ${name}`,
      `📞 *Telepon / WA:* ${phone}`,
      `📧 *Email:* ${email || '-'}`,
      `🏢 *Kategori Proyek:* ${category || 'General Consultation'}`,
      `📍 *Lokasi & Estimasi Luas:* ${locationArea || '-'}`,
      '--------------------------------------------------',
      '📝 *Detail Kebutuhan & Pesan:*',
      `${message}`,
      '--------------------------------------------------',
      '_Dikirim langsung melalui Formulir Website Resmi Prestige Luxury Construction._'
    ];

    const fullMessage = textLines.join('\n');
    const encodedMessage = encodeURIComponent(fullMessage);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank');

    // Friendly feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Mengalihkan ke WhatsApp...';
      submitBtn.style.background = '#25D366';
      submitBtn.style.color = '#FFFFFF';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        contactForm.reset();
      }, 3500);
    }
  });
}

/* ---------------------------------------------------------
   6. ACTIVE NAV HIGHLIGHT
   --------------------------------------------------------- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
