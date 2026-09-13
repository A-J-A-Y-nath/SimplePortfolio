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
  let headlines = ['Software Developer', 'AI & Machine Learning', 'Full Stack Developer'];
  let headlineIndex = 0;

  setInterval(() => {
    if (!rotatingText || headlines.length === 0) return;
    rotatingText.style.opacity = 0;
    rotatingText.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      headlineIndex = (headlineIndex + 1) % headlines.length;
      rotatingText.textContent = headlines[headlineIndex];
      rotatingText.style.opacity = 1;
      rotatingText.style.transform = 'translateY(0)';
    }, 400);
  }, 3200);

  if (rotatingText) {
    rotatingText.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }

  // ==========================================================================
  // 5. Active Section Highlighting
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const navMobileLinks = document.querySelectorAll('.nav-mobile-link');

  const highlightSection = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

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
  // ==========================================================================
  // 6. Direct WhatsApp Message Submission
  // ==========================================================================
  const contactForm = document.getElementById('portfolio-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('.btn-submit');

      const name = nameInput ? nameInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !message) {
        alert('Please provide your name and a message.');
        return;
      }

      // Determine target WhatsApp phone number (from loaded contact data or fallback)
      let rawPhone = window.portfolioContactPhone || '+91 8590861516';
      let phoneDigits = rawPhone.replace(/[^0-9]/g, '');
      if (!phoneDigits) phoneDigits = '918590861516';

      // Build structured WhatsApp message
      let waText = `Hi Ajaynath, I'm reaching out from your portfolio website!\n\n`;
      waText += `*Name:* ${name}\n`;
      if (subject) {
        waText += `*Subject:* ${subject}\n`;
      }
      waText += `*Message:*\n${message}`;

      const waUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(waText)}`;

      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="wa-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.11-.23-.17-.48-.3"/></svg>
        Opening WhatsApp...
      `;

      setTimeout(() => {
        window.open(waUrl, '_blank');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }, 400);
    });
  }

  // ==========================================================================
  // 7. Dynamic Footer Year
  // ==========================================================================
  const copyrightYearEl = document.getElementById('copyright-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear().toString();
  }

  // ==========================================================================
  // 8. Dynamic Full Portfolio Renderers (Profile, About, Skills, Projects, Exp, Edu, Contact)
  // ==========================================================================
  const projectsGrid = document.getElementById('projects-grid');

  const escapeHtml = (str) => {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const renderProfile = (profile) => {
    if (!profile) return;
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && profile.name) heroTitle.textContent = profile.name;

    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc && profile.heroDescription) heroDesc.textContent = profile.heroDescription;

    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge && profile.status) {
      statusBadge.innerHTML = `
        <span class="pulse-indicator">
          <span class="pulse-ring"></span>
          <span class="pulse-core"></span>
        </span>
        ${escapeHtml(profile.status)}
      `;
    }

    if (Array.isArray(profile.headlines) && profile.headlines.length > 0) {
      headlines = profile.headlines;
      if (rotatingText) rotatingText.textContent = headlines[0];
    }

    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody && profile.terminal) {
      const t = profile.terminal;
      terminalBody.innerHTML = `
        <div class="line"><span class="keyword">const</span> <span class="variable">developer</span> = <span class="punctuation">{</span></div>
        <div class="line indent">name: <span class="string">'${escapeHtml(t.name || profile.name || '')}'</span>,</div>
        <div class="line indent">role: <span class="string">'${escapeHtml(t.role || 'Full Stack')}'</span>,</div>
        <div class="line indent">focus: <span class="punctuation">[</span>${(t.focus || []).map(f => `<span class="string">'${escapeHtml(f)}'</span>`).join(', ')}<span class="punctuation">]</span>,</div>
        <div class="line indent">learning: <span class="boolean">true</span>,</div>
        <div class="line indent">openToWork: <span class="boolean">true</span></div>
        <div class="line"><span class="punctuation">}</span>;</div>
        <div class="prompt-line">
          <svg class="terminal-prompt-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
          <span class="prompt-text">${escapeHtml(t.command || 'npm run build')}</span>
          <span class="cursor"></span>
        </div>
      `;
    }
  };

  const renderAbout = (about) => {
    if (!about) return;
    const aboutDesc = document.querySelector('.about-description');
    if (aboutDesc && Array.isArray(about.paragraphs)) {
      aboutDesc.innerHTML = about.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    }

    const tagContainer = document.querySelector('.tag-container');
    if (tagContainer && Array.isArray(about.tags)) {
      tagContainer.innerHTML = about.tags.map(t => `<span class="skill-tag">${escapeHtml(t)}</span>`).join('');
    }

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid && Array.isArray(about.stats)) {
      const statIcons = [
        '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="20" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
        '<path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
        '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" x2="12" y1="19" y2="22"/>',
        '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a6 6 0 0 0-6 6v3.5c0 1.63 1.25 2.97 2.83 3.14l2.17.22 2.17-.22A3.17 3.17 0 0 0 18 11.5V8a6 6 0 0 0-6-6z"/>'
      ];
      statsGrid.innerHTML = about.stats.map((st, i) => `
        <div class="stat-card">
          <div class="stat-glow"></div>
          <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${statIcons[i % statIcons.length]}</svg>
          <div class="stat-value" data-value="${escapeHtml(st.value)}">${escapeHtml(st.value)}</div>
          <p class="stat-label">${escapeHtml(st.label)}</p>
        </div>
      `).join('');
    }
  };

  const renderSkills = (skills) => {
    if (!Array.isArray(skills) || skills.length === 0) return;
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    const categoryIcons = {
      'Programming': '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
      'Frontend': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
      'Backend': '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
      'Databases': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
      'AI & ML': '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v14"/><path d="M12 9h4"/><path d="M12 15H8"/>',
      'Tools & Concepts': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
    };

    skillsGrid.innerHTML = skills.map(cat => `
      <div class="skill-card">
        <div class="skill-title-wrapper">
          <svg class="skill-title-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${categoryIcons[cat.category] || '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'}
          </svg>
          <h3>${escapeHtml(cat.category)}</h3>
        </div>
        <ul class="skill-list">
          ${(cat.items || []).map(it => `<li>${escapeHtml(it)}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  };

  const renderExperience = (experience) => {
    if (!Array.isArray(experience)) return;
    const timelineWrapper = document.querySelector('#experience .timeline-wrapper');
    if (!timelineWrapper) return;

    const cardsHtml = experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-marker">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        </div>
        <div class="timeline-card">
          <span class="timeline-period">${escapeHtml(exp.period)}</span>
          <h3>${escapeHtml(exp.title)}</h3>
          <p class="timeline-org">${escapeHtml(exp.organization)}</p>
          <p class="timeline-description">${escapeHtml(exp.description)}</p>
        </div>
      </div>
    `).join('');

    timelineWrapper.innerHTML = `<div class="timeline-line"></div>${cardsHtml}`;
  };

  const renderEducation = (education) => {
    if (!Array.isArray(education)) return;
    const timelineWrapper = document.querySelector('#education .timeline-wrapper');
    if (!timelineWrapper) return;

    const cardsHtml = education.map(edu => `
      <div class="timeline-item">
        <div class="timeline-marker">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
        </div>
        <div class="timeline-card">
          <span class="timeline-period">${escapeHtml(edu.period)}</span>
          <h3>${escapeHtml(edu.degree)}</h3>
          <p class="timeline-org">${escapeHtml(edu.institution)}</p>
          <p class="timeline-description font-mono">${escapeHtml(edu.score)}</p>
        </div>
      </div>
    `).join('');

    timelineWrapper.innerHTML = `<div class="timeline-line"></div>${cardsHtml}`;
  };

  const renderContact = (contact) => {
    if (!contact) return;
    window.portfolioContactPhone = contact.phone || '';
    const phoneDigits = (contact.phone || '').replace(/[^0-9]/g, '') || '918590861516';

    const emailLink = document.querySelector('.contact-card a[href^="mailto:"]');
    if (emailLink && contact.email) {
      emailLink.href = `mailto:${contact.email}`;
      emailLink.textContent = contact.email;
    }

    const phoneLink = document.getElementById('contact-phone-link') || document.querySelector('.contact-card a[href*="wa.me"]');
    if (phoneLink && contact.phone) {
      phoneLink.href = `https://wa.me/${phoneDigits}`;
      phoneLink.textContent = contact.phone;
    }

    const waSocial = document.getElementById('contact-wa-social');
    if (waSocial) {
      waSocial.href = `https://wa.me/${phoneDigits}`;
    }

    const locationVal = document.querySelector('.contact-card:nth-child(3) .contact-value');
    if (locationVal && contact.location) {
      locationVal.textContent = contact.location;
    }

    const ghIconBtn = document.querySelector('.social-icon-btn[href*="github.com"]');
    if (ghIconBtn && contact.github) ghIconBtn.href = contact.github;

    const liIconBtn = document.querySelector('.social-icon-btn[href*="linkedin.com"]');
    if (liIconBtn && contact.linkedin) liIconBtn.href = contact.linkedin;
  };

  // Projects Rendering
  const createProjectCard = (project) => {
    const article = document.createElement('article');
    article.className = 'project-card';
    if (project.id) article.setAttribute('data-id', project.id);

    const banner = document.createElement('div');
    const isCustom = project.customGradient || (project.bannerGradient && (project.bannerGradient.startsWith('linear-gradient') || project.bannerGradient.startsWith('radial-gradient')));
    if (isCustom) {
      banner.className = 'project-banner';
      banner.style.background = project.customGradient || project.bannerGradient;
    } else {
      const gradientClass = project.bannerGradient || 'gradient-blue';
      banner.className = `project-banner ${gradientClass}`;
    }

    if (project.bannerImage) {
      const img = document.createElement('img');
      img.src = project.bannerImage;
      img.alt = project.title || 'Project banner';
      img.className = 'project-banner-img';
      banner.appendChild(img);
    } else {
      const overlay = document.createElement('div');
      overlay.className = 'banner-overlay';
      const titleSpan = document.createElement('span');
      titleSpan.className = 'banner-title';
      titleSpan.textContent = project.bannerTitle || 'Project';
      banner.appendChild(overlay);
      banner.appendChild(titleSpan);
    }

    const content = document.createElement('div');
    content.className = 'project-content';

    const h3 = document.createElement('h3');
    h3.textContent = project.title || 'Untitled Project';
    content.appendChild(h3);

    const desc = document.createElement('p');
    desc.textContent = project.description || '';
    content.appendChild(desc);

    if (project.tags && project.tags.length > 0) {
      const ul = document.createElement('ul');
      ul.className = 'project-tech-tags';
      project.tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        ul.appendChild(li);
      });
      content.appendChild(ul);
    }

    const linksDiv = document.createElement('div');
    linksDiv.className = 'project-links';

    if (project.githubUrl) {
      const ghLink = document.createElement('a');
      ghLink.href = project.githubUrl;
      ghLink.target = '_blank';
      ghLink.rel = 'noopener noreferrer';
      ghLink.className = 'link-github';
      ghLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        GitHub
      `;
      linksDiv.appendChild(ghLink);
    }

    if (project.demoUrl) {
      const demoLink = document.createElement('a');
      demoLink.href = project.demoUrl;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
      demoLink.className = 'link-demo';
      demoLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
        Live Demo
      `;
      linksDiv.appendChild(demoLink);
    }

    content.appendChild(linksDiv);

    const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowSvg.setAttribute('class', 'card-arrow-icon');
    arrowSvg.setAttribute('width', '20');
    arrowSvg.setAttribute('height', '20');
    arrowSvg.setAttribute('viewBox', '0 0 24 24');
    arrowSvg.setAttribute('fill', 'none');
    arrowSvg.setAttribute('stroke', 'currentColor');
    arrowSvg.setAttribute('stroke-width', '2');
    arrowSvg.setAttribute('stroke-linecap', 'round');
    arrowSvg.setAttribute('stroke-linejoin', 'round');
    arrowSvg.innerHTML = '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>';

    article.appendChild(banner);
    article.appendChild(content);
    article.appendChild(arrowSvg);

    return article;
  };

  const renderProjects = (projectsList) => {
    if (!projectsGrid || !Array.isArray(projectsList) || projectsList.length === 0) return;
    projectsGrid.innerHTML = '';
    projectsList.forEach(proj => {
      projectsGrid.appendChild(createProjectCard(proj));
    });
  };

  const renderFullPortfolio = (data) => {
    if (!data) return;
    if (data.profile) renderProfile(data.profile);
    if (data.about) renderAbout(data.about);
    if (data.skills) renderSkills(data.skills);
    if (data.projects) renderProjects(data.projects);
    if (data.projectsDescription) {
      const projDescEl = document.getElementById('projects-section-desc') || document.querySelector('#projects .section-desc');
      if (projDescEl) projDescEl.textContent = data.projectsDescription;
    }
    if (data.experience) renderExperience(data.experience);
    if (data.education) renderEducation(data.education);
    if (data.contact) renderContact(data.contact);
  };

  let currentPortfolioHash = '';

  const loadPortfolioData = async () => {
    const candidatePaths = [
      'http://localhost:8000/api/portfolio',
      '/api/portfolio',
      `../portfolio-data.json?_t=${Date.now()}`,
      `portfolio-data.json?_t=${Date.now()}`,
      `/portfolio-data.json?_t=${Date.now()}`
    ];

    for (const path of candidatePaths) {
      try {
        const response = await fetch(path, { cache: 'no-store' });
        if (response.ok) {
          const rawText = await response.text();
          const data = JSON.parse(rawText);
          if (data && typeof data === 'object') {
            if (rawText !== currentPortfolioHash) {
              currentPortfolioHash = rawText;
              localStorage.setItem('portfolio_full_data', rawText);
              renderFullPortfolio(data);
            }
            return;
          }
        }
      } catch (err) {}
    }

    // Fallback: check localStorage
    const local = localStorage.getItem('portfolio_full_data');
    if (local && local !== currentPortfolioHash) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && typeof parsed === 'object') {
          currentPortfolioHash = local;
          renderFullPortfolio(parsed);
          return;
        }
      } catch (e) {}
    }
  };

  // Initial load
  loadPortfolioData();

  // Cross-tab and live sync
  window.addEventListener('storage', (e) => {
    if ((e.key === 'portfolio_full_data' || e.key === 'portfolio_projects') && e.newValue) {
      try {
        const updated = JSON.parse(e.newValue);
        if (Array.isArray(updated)) {
          renderProjects(updated);
        } else if (typeof updated === 'object') {
          currentPortfolioHash = JSON.stringify(updated);
          renderFullPortfolio(updated);
        }
      } catch (err) {}
    }
  });

  window.addEventListener('focus', loadPortfolioData);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      loadPortfolioData();
    }
  });

  setInterval(loadPortfolioData, 1500);

  // Optional Live Reload SSE connection if running dev server
  if (window.location.protocol.startsWith('http')) {
    try {
      const liveReloadSource = new EventSource('/api/live-reload');
      liveReloadSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'reload') {
            window.location.reload();
          } else {
            loadPortfolioData();
          }
        } catch (err) {}
      };
      liveReloadSource.onerror = () => {
        liveReloadSource.close();
      };
    } catch (e) {}
  }
});
