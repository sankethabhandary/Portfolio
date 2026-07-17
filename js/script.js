/* 
  Data Analyst Portfolio - script.js
  Dashboard Interactions & Event Handlers
*/

// ==========================================================================
// EmailJS Configuration Placeholders
// ==========================================================================
const EMAILJS_PUBLIC_KEY = 'w-_6JrovTJJK2WgMV';
const EMAILJS_SERVICE_ID = 'service_s7cqkge';
const EMAILJS_TEMPLATE_ID = 'template_6qq2jdc';

// Initialize EmailJS SDK
if (typeof emailjs !== 'undefined') {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation & Scroll Handlers ---
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.querySelector('.back-to-top');

  // Shrink header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Toggle Back to Top Button
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Back to top behavior
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Active Navigation Highlight (Scroll Spy) ---
  const sections = document.querySelectorAll('section[id]');
  
  const scrollSpyOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section is in middle viewport
    threshold: 0
  };

  const scrollSpyCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const scrollSpyObserver = new IntersectionObserver(scrollSpyCallback, scrollSpyOptions);
  sections.forEach(section => scrollSpyObserver.observe(section));

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Reveal slightly before entering viewport
    threshold: 0.1
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animates only once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  revealElements.forEach(element => revealObserver.observe(element));

  // --- Projects Data Object for Modal Details ---
  const PROJECTS_DATA = {
    'sql': [
      {
        id: 'zepto-sql',
        title: 'Zepto SQL Data Analysis',
        desc: 'Analyzed Zepto product data using PostgreSQL. Cleaned product records, standardized values from paise to rupees, and extracted key business insights.',
        outcomes: [
          'Wrote optimized PostgreSQL queries to explore pricing, availability, and stockout distributions.',
          'Standardized currency figures by dividing prices by 100.0, and purged invalid zero-mrp listings.',
          'Calculated estimated revenues and top discount margins by product category for commercial teams.'
        ],
        tech: ['PostgreSQL', 'Data Cleaning', 'Business Analytics'],
        github: 'https://github.com/sankethabhandary',
        screenshots: ['images/sql_cleaning.png']
      } 
    ],
    'excel': [
      {
        id: 'road-accident',
        title: 'Road Accident Analysis Dashboard',
        desc: 'Dynamic Excel executive dashboard tracking monthly accidents, severity metrics, casualty trends, and regional safety insights.',
        outcomes: [
          'Consolidated and structured raw Excel casualty logs using Power Query.',
          'Designed interactive dashboard controls with pivot charts and localized slicers.',
          'Isolated peak hours and safety hot-spots to inform community traffic safety policies.'
        ],
        tech: ['MS Excel', 'Power Query', 'Pivot Tables', 'Data Visualization'],
        github: 'https://github.com/sankethabhandary',
        screenshots: ['images/ecxel_dashboard_road_accident.png']
      }
    ],
    'power-bi': [
      {
        id: 'finance-transactions',
        title: 'Financial Transaction Dashboard',
        desc: 'Interactive Power BI finance tracker monitoring customer transactions, revenue trends, and key financial indicators.',
        outcomes: [
          'Developed a clean star schema linking customer profiles, locations, and transactions.',
          'Authored custom DAX queries for transactional growth rates and year-to-date sales figures.',
          'Built drill-through layouts to explore transaction margins across product groups.'
        ],
        tech: ['Power BI', 'DAX', 'Data Modeling', 'ETL Pipelines'],
        github: 'https://github.com/sankethabhandary',
        screenshots: ['images/dashboard_overview.png', 'images/Transaction_dashboard.png']
      }
    ],
    'python': [
      {
        id: 'amazon-scraper',
        title: 'Amazon Price Scraping Pipeline',
        desc: 'Python-based product price monitor that automatically extracts values, records timestamps, and saves data logs to CSV.',
        outcomes: [
          'Programmed scraper using Requests and BeautifulSoup to extract product listings and prices.',
          'Analyzed crawled records and calculated historical price statistics with Pandas.',
          'Configured a recurring tracking script to compile daily price changes.'
        ],
        tech: ['Python', 'BeautifulSoup', 'Pandas', 'Web Scraping'],
        github: 'https://github.com/sankethabhandary',
        screenshots: ['images/amaz.png']
      }
    ]
  };

  // --- Modal Helpers ---
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    // Keep scroll hidden if another modal is still active
    if (!document.querySelector('.modal.active')) {
      document.body.style.overflow = '';
    }
  }

  // Bind close buttons and backdrops on all modals
  const allModals = document.querySelectorAll('.modal');
  allModals.forEach(modal => {
    modal.querySelectorAll('.modal-close, .modal-close-btn, .modal-backdrop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(modal);
      });
    });
  });

  // --- Category Projects Modal Logic ---
  const categoryModal = document.getElementById('categoryProjectsModal');
  const categoryProjectsList = document.getElementById('categoryProjectsList');
  const categoryModalTitle = document.getElementById('categoryModalTitle');
  const categoryModalSubtitle = document.getElementById('categoryModalSubtitle');
  const categoryTag = document.getElementById('modalCategoryTag');

  function openCategoryProjects(categoryKey) {
    const projects = PROJECTS_DATA[categoryKey] || [];
    let catTitle = '';
    let catSubtitle = '';
    
    if (categoryKey === 'sql') {
      catTitle = 'SQL Case Studies';
      catSubtitle = 'PostgreSQL & MySQL Database Analysis';
    } else if (categoryKey === 'excel') {
      catTitle = 'Excel Spreadsheets & Reports';
      catSubtitle = 'Pivot Tables, Power Query, and Advanced Models';
    } else if (categoryKey === 'power-bi') {
      catTitle = 'Power BI Dashboards';
      catSubtitle = 'Business Intelligence and Data Modeling';
    } else if (categoryKey === 'python') {
      catTitle = 'Python Data Pipelines';
      catSubtitle = 'Automation, Web Scraping, and EDA';
    }
    
    categoryModalTitle.innerText = catTitle;
    categoryModalSubtitle.innerText = catSubtitle;
    categoryTag.innerText = `${projects.length} Projects`;
    
    categoryProjectsList.innerHTML = '';
    
    projects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.className = 'modal-project-item';
      
      const techTags = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join(' ');
      const outcomesList = project.outcomes.map(o => `<li>${o}</li>`).join('');
      
      projectItem.innerHTML = `
        <h4 class="modal-project-item-title">${project.title}</h4>
        <p class="modal-project-item-desc">${project.desc}</p>
        <div class="modal-project-item-outcomes">
          <h5>Key Insights & Outcomes:</h5>
          <ul>${outcomesList}</ul>
        </div>
        <div class="modal-project-item-tech">
          ${techTags}
        </div>
        <div class="modal-project-item-actions">
          <a href="${project.github}" target="_blank" class="btn btn-secondary">
            <i class="fab fa-github"></i> GitHub Repository
          </a>
          <button class="btn btn-primary btn-view-screenshots" data-category="${categoryKey}" data-project-id="${project.id}">
            <i class="fas fa-image"></i> View Application
          </button>
        </div>
      `;
      categoryProjectsList.appendChild(projectItem);
    });
    
    openModal(categoryModal);
  }

  // --- Category Card Event Listeners ---
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    const viewBtn = card.querySelector('.btn-view-projects');
    const categoryKey = card.getAttribute('data-category');
    if (viewBtn && categoryKey) {
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCategoryProjects(categoryKey);
      });
    }
  });

  // --- Screenshot Lightbox Overlay Modal Logic ---
  const screenshotModal = document.getElementById('screenshotViewerModal');
  const galleryImg = document.getElementById('galleryImg');
  const galleryCurrent = document.getElementById('galleryCurrent');
  const galleryTotal = document.getElementById('galleryTotal');
  const screenshotModalTitle = document.getElementById('screenshotModalTitle');
  
  let currentScreenshots = [];
  let currentSlideIndex = 0;
  
  function openScreenshotViewer(categoryKey, projectId) {
    const projects = PROJECTS_DATA[categoryKey] || [];
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    currentScreenshots = project.screenshots || [];
    currentSlideIndex = 0;
    
    screenshotModalTitle.innerText = `${project.title} - Screenshots`;
    
    if (currentScreenshots.length > 0) {
      updateGalleryImage();
      openModal(screenshotModal);
    }
  }
  
  function updateGalleryImage() {
    galleryImg.src = currentScreenshots[currentSlideIndex];
    galleryImg.alt = `Screenshot ${currentSlideIndex + 1}`;
    galleryCurrent.innerText = currentSlideIndex + 1;
    galleryTotal.innerText = currentScreenshots.length;
    
    // Hide arrow buttons if there's only 1 image
    const prevArrow = screenshotModal.querySelector('.prev-arrow');
    const nextArrow = screenshotModal.querySelector('.next-arrow');
    if (currentScreenshots.length <= 1) {
      prevArrow.style.display = 'none';
      nextArrow.style.display = 'none';
    } else {
      prevArrow.style.display = '';
      nextArrow.style.display = '';
    }
  }
  
  function nextScreenshot() {
    if (currentScreenshots.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % currentScreenshots.length;
    updateGalleryImage();
  }
  
  function prevScreenshot() {
    if (currentScreenshots.length === 0) return;
    currentSlideIndex = (currentSlideIndex - 1 + currentScreenshots.length) % currentScreenshots.length;
    updateGalleryImage();
  }

  // Handle clicks inside Projects modal list to open screenshots
  document.addEventListener('click', (e) => {
    const screenshotBtn = e.target.closest('.btn-view-screenshots');
    if (screenshotBtn) {
      const categoryKey = screenshotBtn.getAttribute('data-category');
      const projectId = screenshotBtn.getAttribute('data-project-id');
      if (categoryKey && projectId) {
        openScreenshotViewer(categoryKey, projectId);
      }
    }
  });

  // Wire arrow button clicks inside lightbox
  if (screenshotModal) {
    screenshotModal.querySelector('.prev-arrow').addEventListener('click', (e) => {
      e.preventDefault();
      prevScreenshot();
    });
    screenshotModal.querySelector('.next-arrow').addEventListener('click', (e) => {
      e.preventDefault();
      nextScreenshot();
    });
  }

  // --- Certificate Viewer Modal Logic ---
  const certModal = document.getElementById('certificateViewerModal');
  const certContainer = document.getElementById('certificateContainer');
  const certModalTitle = document.getElementById('certificateModalTitle');
  const btnDownloadCert = document.getElementById('btnDownloadCert');
  
  function openCertificateViewer(type, src, title) {
    certModalTitle.innerText = title;
    btnDownloadCert.href = src;
    
    certContainer.innerHTML = '';
    if (type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = title;
      certContainer.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      certContainer.appendChild(img);
    }
    
    openModal(certModal);
  }

  // Register Certificate buttons click handlers
  document.querySelectorAll('.btn-view-cert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-cert-type');
      const src = btn.getAttribute('data-cert-src');
      const title = btn.getAttribute('data-cert-title');
      if (type && src && title) {
        openCertificateViewer(type, src, title);
      }
    });
  });

  // --- PDF Canvas Thumbnail Generator ---
  function initPDFThumbnails() {
    if (typeof pdfjsLib === 'undefined') {
      console.warn('PDF.js SDK not loaded, static fallbacks will be displayed.');
      return;
    }
    
    // Configure worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    const canvases = document.querySelectorAll('canvas.pdf-thumbnail');
    canvases.forEach(canvas => {
      const pdfUrl = canvas.getAttribute('data-pdf');
      if (!pdfUrl) return;
      
      pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        return pdf.getPage(1);
      }).then(page => {
        const viewport = page.getViewport({ scale: 1.5 });
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        return page.render(renderContext).promise;
      }).then(() => {
        // Mark container as loaded to hide fallback img
        const container = canvas.closest('.cert-thumbnail-container');
        if (container) {
          container.classList.add('pdf-loaded');
        }
      }).catch(err => {
        console.error('Error rendering PDF thumbnail:', err);
      });
    });
  }

  // Trigger thumbnail rendering on DOM load
  initPDFThumbnails();

  // --- Keyboard Accessibility & Esc Handles ---
  window.addEventListener('keydown', (e) => {
    const activeModals = document.querySelectorAll('.modal.active');
    if (activeModals.length > 0) {
      const topModal = activeModals[activeModals.length - 1];
      
      if (e.key === 'Escape') {
        closeModal(topModal);
      } else if (topModal.id === 'screenshotViewerModal') {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
          nextScreenshot();
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
          prevScreenshot();
        }
      }
    }
  });

  // --- Contact Form Submission, Validation & EmailJS ---

  // --- Contact Form Submission, Validation & EmailJS ---
  const contactForm = document.getElementById('portfolioContactForm');
  const formName = document.getElementById('formName');
  const formEmail = document.getElementById('formEmail');
  const formSubject = document.getElementById('formSubject');
  const formMessage = document.getElementById('formMessage');
  
  // Field validation helper function
  function validateField(field, errorEl, rule, customMsg) {
    const isValid = rule();
    if (isValid) {
      field.classList.remove('invalid');
      errorEl.innerText = '';
      errorEl.classList.remove('visible');
    } else {
      field.classList.add('invalid');
      errorEl.innerText = customMsg;
      errorEl.classList.add('visible');
    }
    return isValid;
  }

  // Validation Rules
  const nameRule = () => formName.value.trim().length > 0;
  const emailRule = () => {
    const val = formEmail.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return val.length > 0 && emailPattern.test(val);
  };
  const subjectRule = () => formSubject.value.trim().length > 0;
  const messageRule = () => formMessage.value.trim().length > 0;

  // Register real-time input event listeners
  if (formName && formEmail && formSubject && formMessage) {
    formName.addEventListener('input', () => {
      validateField(formName, document.getElementById('errorName'), nameRule, 'Full name is required.');
    });
    formEmail.addEventListener('input', () => {
      const val = formEmail.value.trim();
      if (val.length === 0) {
        validateField(formEmail, document.getElementById('errorEmail'), emailRule, 'Email address is required.');
      } else {
        validateField(formEmail, document.getElementById('errorEmail'), emailRule, 'Please enter a valid email address.');
      }
    });
    formSubject.addEventListener('input', () => {
      validateField(formSubject, document.getElementById('errorSubject'), subjectRule, 'Subject is required.');
    });
    formMessage.addEventListener('input', () => {
      validateField(formMessage, document.getElementById('errorMessage'), messageRule, 'Message details are required.');
    });
  }

  // Feedback modals
  const successModal = document.getElementById('successModal');
  const errorModal = document.getElementById('errorModal');

  // Close handles for feedback modals
  if (successModal) {
    successModal.querySelectorAll('.modal-close, .feedback-close-btn, .modal-backdrop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(successModal);
      });
    });
  }

  if (errorModal) {
    errorModal.querySelectorAll('.modal-close, .feedback-close-btn, .modal-backdrop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(errorModal);
      });
    });
    
    const retryBtn = errorModal.querySelector('.feedback-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(errorModal);
        formMessage.focus();
      });
    }
  }

  // Form submission process
  if (contactForm) {
    const submitButton = contactForm.querySelector('.form-submit');
    const originalBtnText = submitButton.innerHTML;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Run full form validation
      const isNameValid = validateField(formName, document.getElementById('errorName'), nameRule, 'Full name is required.');
      const isEmailValid = validateField(formEmail, document.getElementById('errorEmail'), emailRule, formEmail.value.trim().length === 0 ? 'Email address is required.' : 'Please enter a valid email address.');
      const isSubjectValid = validateField(formSubject, document.getElementById('errorSubject'), subjectRule, 'Subject is required.');
      const isMsgValid = validateField(formMessage, document.getElementById('errorMessage'), messageRule, 'Message details are required.');

      // Halt if any field is invalid
      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMsgValid) {
        const firstInvalid = contactForm.querySelector('.form-input.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Enter sending state
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" style="margin-left: 8px;"></i>';

      // Build payload matching recruiter info, dates and reply-to headers
      const currentDate = new Date();
      const templateParams = {
        recruiter_name: formName.value.trim(),
        recruiter_email: formEmail.value.trim(),
        subject: formSubject.value.trim(),
        message: formMessage.value.trim(),
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
        reply_to: formEmail.value.trim()
      };

      if (typeof emailjs === 'undefined') {
        console.error('EmailJS SDK not loaded!');
        openModal(errorModal);
        submitButton.disabled = false;
        submitButton.innerHTML = originalBtnText;
        return;
      }

      // Execute transmission
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          // Success popup modal
          openModal(successModal);
          contactForm.reset();
          
          // Clean dynamic invalid boundaries
          document.querySelectorAll('.form-input').forEach(input => input.classList.remove('invalid'));
          document.querySelectorAll('.error-message').forEach(err => {
            err.innerText = '';
            err.classList.remove('visible');
          });

          submitButton.disabled = false;
          submitButton.innerHTML = originalBtnText;

          // Dismiss popup automatically after 4 seconds
          setTimeout(() => {
            closeModal(successModal);
          }, 4000);
        })
        .catch((error) => {
          console.error('EmailJS transmission failed:', error);
          openModal(errorModal);
          submitButton.disabled = false;
          submitButton.innerHTML = originalBtnText;
        });
    });
  }
});
