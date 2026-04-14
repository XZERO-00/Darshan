document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     0. Preloader Logo Building
     ========================================= */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // The CSS animation takes about 1.3s total (0.7s max delay + 0.6s animation duration).
    // Give it a little padding before fading out the preloader background.
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1800);
  }

  /* =========================================
     1. Theme Toggle (Light / Dark Mode)
     ========================================= */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  // Check local storage for theme preference
  const savedTheme = localStorage.getItem('darshan_theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('darshan_theme', newTheme);
  });

  /* =========================================
     2. Mobile Menu Toggle
     ========================================= */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuLinks = mobileMenu.querySelectorAll('a, button');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // Change icon based on state
    if (mobileMenu.classList.contains('active')) {
      mobileMenuBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      `;
    } else {
      mobileMenuBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
           <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      `;
    }
  });

  // Close menu when clicking a link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
           <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      `;
    });
  });

  /* =========================================
     3. Scroll Animations (Intersection Observer)
     ========================================= */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* =========================================
     4. Specifications Tabs
     ========================================= */
  const tabs = document.querySelectorAll('.tab');
  const specData = [
    [
      ['Material', 'Galvanized / PPGI Steel'],
      ['Thickness', '0.40 — 0.80 mm'],
      ['Cover Width', '760 mm'],
      ['Pitch', '76 mm'],
      ['Depth', '19 mm'],
      ['Yield Strength', '240 — 550 MPa'],
      ['Zinc Coating', 'Z100 — Z275 g/m²'],
      ['Max Length', '12000 mm']
    ],
    [
      ['Material', 'High Tensile PPGI'],
      ['Thickness', '0.45 — 1.00 mm'],
      ['Cover Width', '900 mm'],
      ['Rib Height', '40 — 76 mm'],
      ['Flange Width', '180 mm'],
      ['Yield Strength', '350 — 550 MPa'],
      ['Zinc Coating', 'Z180 — Z275 g/m²'],
      ['Max Length', '15000 mm']
    ],
    [
      ['Material', 'PPGI Color Coated'],
      ['Thickness', '0.40 — 0.55 mm'],
      ['Cover Width', '820 mm'],
      ['Tile Height', '28 mm'],
      ['Pitch', '205 mm'],
      ['Coating', 'PVDF / PE'],
      ['Zinc Coating', 'Z120 — Z200 g/m²'],
      ['Max Length', '10000 mm']
    ]
  ];

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const index = parseInt(tab.dataset.tab);
      const tbl = document.getElementById('specData');
      
      if (tbl && specData[index]) {
        // Simple fade out/in effect
        tbl.style.opacity = 0;
        setTimeout(() => {
          tbl.innerHTML = specData[index].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('');
          tbl.style.opacity = 1;
        }, 200);
      }
    });
  });

  /* =========================================
     5. Color Selection
     ========================================= */
  const colorDots = document.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(x => x.classList.remove('sel'));
      dot.classList.add('sel');
    });
  });
});
