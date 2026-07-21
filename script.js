document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Dark/Light Theme Toggle
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    bodyElement.classList.add('light-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('light-theme');
    const activeTheme = bodyElement.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', activeTheme);
  });

  // ==========================================================================
  // 2. Mobile Menu Toggle
  // ==========================================================================
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navbarContainer = document.querySelector('.navbar-container');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');

  menuToggleBtn.addEventListener('click', () => {
    const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
    menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
    navbarContainer.classList.toggle('menu-open');
  });

  // Close mobile drawer when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      navbarContainer.classList.remove('menu-open');
    });
  });

  // ==========================================================================
  // 3. Scroll Interactions (Navbar & Scroll-To-Top)
  // ==========================================================================
  const scrollTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    // Navbar glass solid/thin on scroll
    if (window.scrollY > 50) {
      navbarContainer.classList.add('scrolled');
    } else {
      navbarContainer.classList.remove('scrolled');
    }

    // Scroll to Top visibility
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================================================
  // 4. Rotating Headlines in Hero
  // ==========================================================================
  const rotatingText = document.getElementById('rotating-headline');
  const headlines = ['Software Developer', 'AI & Machine Learning', 'Full Stack Developer'];
  let headlineIndex = 0;

  setInterval(() => {
    // Fade out
    rotatingText.style.opacity = 0;
    rotatingText.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      headlineIndex = (headlineIndex + 1) % headlines.length;
      rotatingText.textContent = headlines[headlineIndex];
      // Fade in
      rotatingText.style.opacity = 1;
      rotatingText.style.transform = 'translateY(0)';
    }, 400); // matches CSS duration
  }, 3200);

  // Set initial style transitions for rotating text
  rotatingText.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  // ==========================================================================
  // 5. Active Section Highlighting
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const navMobileLinks = document.querySelectorAll('.nav-mobile-link');

  const highlightSection = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200; // Offset

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      // Desktop nav links active state
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      // Mobile nav links active state
      navMobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', highlightSection, { passive: true });

  // ==========================================================================
  // 6. Contact Form Submission
  // ==========================================================================
  const contactForm = document.getElementById('portfolio-contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate sending progress
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    setTimeout(() => {
      // Success Notification
      alert('Thank you! Your message has been sent successfully. AJAYNATH will get back to you soon.');
      
      // Reset form
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1200);
  });

  // ==========================================================================
  // 7. Dynamic Footer Year
  // ==========================================================================
  document.getElementById('copyright-year').textContent = new Date().getFullYear().toString();
});
