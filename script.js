/**
 * JK Legal Associates - Main Interactive Script
 * High Court & District Court, Lucknow
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Sticky Header & Scroll To Top Visibility
  // ------------------------------------------------------------------------
  const header = document.getElementById('mainHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header background elevation
    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to top button
    if (scrollPos > 450) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  mobileMenuBtn.addEventListener('click', openDrawer);
  drawerCloseBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // ------------------------------------------------------------------------
  // 3. Active Nav Link Tracking on Scroll (IntersectionObserver)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // ------------------------------------------------------------------------
  // 4. Practice Area Category Filters
  // ------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const practiceCards = document.querySelectorAll('.practice-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      practiceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 5. Interactive Chamber Office Selector
  // ------------------------------------------------------------------------
  const chamberCivil = document.getElementById('chamberCivil');
  const chamberHigh = document.getElementById('chamberHigh');
  const preferredChamberSelect = document.getElementById('preferredChamber');

  if (chamberCivil && chamberHigh) {
    chamberCivil.addEventListener('click', () => {
      chamberCivil.classList.add('active');
      chamberHigh.classList.remove('active');
      if (preferredChamberSelect) {
        preferredChamberSelect.value = 'Civil Court Kaiserbagh (Chamber 8 B)';
      }
    });

    chamberHigh.addEventListener('click', () => {
      chamberHigh.classList.add('active');
      chamberCivil.classList.remove('active');
      if (preferredChamberSelect) {
        preferredChamberSelect.value = 'High Court Lucknow (Chamber 8 C)';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Case Enquiry Form Validation & Luxury Submission Handling
  // ------------------------------------------------------------------------
  const enquiryForm = document.getElementById('caseEnquiryForm');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');

  // Modal elements
  const modalClientName = document.getElementById('modalClientName');
  const modalRefId = document.getElementById('modalRefId');
  const modalCaseType = document.getElementById('modalCaseType');
  const modalChamber = document.getElementById('modalChamber');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  function openSuccessModal(data) {
    modalClientName.textContent = data.fullName;
    modalRefId.textContent = data.refId;
    modalCaseType.textContent = data.caseType;
    modalChamber.textContent = data.preferredChamber;

    // Build pre-filled WhatsApp link
    const waText = encodeURIComponent(
      `Hello JK Legal Associates,\n\nI have booked my Free First Consultation.\n` +
      `*Reference:* ${data.refId}\n` +
      `*Name:* ${data.fullName}\n` +
      `*Phone:* ${data.phoneNumber}\n` +
      `*Case Type:* ${data.caseType}\n` +
      `*Preferred Chamber:* ${data.preferredChamber}\n` +
      `*Urgency:* ${data.urgencyLevel}\n` +
      `*Brief Summary:* ${data.caseSummary}\n\nPlease let me know when Advocate Jamshed Khan can review this.`
    );
    modalWhatsAppBtn.href = `https://wa.me/918382828952?text=${waText}`;

    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSuccessModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeSuccessModal);
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeSuccessModal();
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const fullName = document.getElementById('fullName');
      const phoneNumber = document.getElementById('phoneNumber');
      const emailAddress = document.getElementById('emailAddress');
      const caseType = document.getElementById('caseType');
      const preferredChamber = document.getElementById('preferredChamber');
      const urgencyLevel = document.getElementById('urgencyLevel');
      const caseSummary = document.getElementById('caseSummary');

      // Error elements
      const fullNameError = document.getElementById('fullNameError');
      const phoneNumberError = document.getElementById('phoneNumberError');
      const emailAddressError = document.getElementById('emailAddressError');
      const caseTypeError = document.getElementById('caseTypeError');
      const caseSummaryError = document.getElementById('caseSummaryError');

      // Clear previous errors
      [fullName, phoneNumber, emailAddress, caseType, caseSummary].forEach(el => {
        if (el) el.classList.remove('invalid');
      });
      [fullNameError, phoneNumberError, emailAddressError, caseTypeError, caseSummaryError].forEach(el => {
        if (el) el.textContent = '';
      });

      // Name Validation
      if (!fullName.value.trim() || fullName.value.trim().length < 2) {
        fullName.classList.add('invalid');
        fullNameError.textContent = 'Please enter your full name.';
        isValid = false;
      }

      // Phone Validation (Indian 10-digit mobile or standard format)
      const phoneClean = phoneNumber.value.trim().replace(/\D/g, '');
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneClean || (phoneClean.length === 10 && !phoneRegex.test(phoneClean)) || phoneClean.length < 10) {
        phoneNumber.classList.add('invalid');
        phoneNumberError.textContent = 'Please enter a valid 10-digit mobile number.';
        isValid = false;
      }

      // Optional Email Validation
      if (emailAddress.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress.value.trim())) {
          emailAddress.classList.add('invalid');
          emailAddressError.textContent = 'Please enter a valid email address or leave blank.';
          isValid = false;
        }
      }

      // Case Type Validation
      if (!caseType.value) {
        caseType.classList.add('invalid');
        caseTypeError.textContent = 'Please select the type of court or case category.';
        isValid = false;
      }

      // Case Summary Validation
      if (!caseSummary.value.trim() || caseSummary.value.trim().length < 8) {
        caseSummary.classList.add('invalid');
        caseSummaryError.textContent = 'Please provide a brief description (at least 8 characters).';
        isValid = false;
      }

      if (!isValid) {
        // Scroll to the first invalid element
        const firstInvalid = enquiryForm.querySelector('.invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Generate Reference ID
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const refId = `JKLA-2026-${randomCode}`;

      const formData = {
        fullName: fullName.value.trim(),
        phoneNumber: phoneNumber.value.trim(),
        emailAddress: emailAddress.value.trim(),
        caseType: caseType.value,
        preferredChamber: preferredChamber.value,
        urgencyLevel: urgencyLevel.value,
        caseSummary: caseSummary.value.trim(),
        refId: refId
      };

      // Show confirmation modal
      openSuccessModal(formData);

      // Reset form
      enquiryForm.reset();
    });
  }
});

// --------------------------------------------------------------------------
// 7. Global Helper: Select Practice Area and Scroll to Form
// --------------------------------------------------------------------------
window.selectPracticeCase = function(caseName) {
  const caseSelect = document.getElementById('caseType');
  const contactSection = document.getElementById('contact');

  if (caseSelect) {
    for (let i = 0; i < caseSelect.options.length; i++) {
      if (caseSelect.options[i].value === caseName || caseSelect.options[i].value.includes(caseName)) {
        caseSelect.selectedIndex = i;
        break;
      }
    }
    // Visual pulse
    caseSelect.style.borderColor = '#c99b35';
    caseSelect.style.boxShadow = '0 0 12px rgba(201, 155, 53, 0.4)';
    setTimeout(() => {
      caseSelect.style.borderColor = '';
      caseSelect.style.boxShadow = '';
    }, 2000);
  }

  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// --------------------------------------------------------------------------
// 8. Global Helper: Pre-fill Advocate for Consultation
// --------------------------------------------------------------------------
window.prefillAdvocate = function(advocateName) {
  const caseSummary = document.getElementById('caseSummary');
  const contactSection = document.getElementById('contact');

  if (caseSummary) {
    caseSummary.value = `Consultation requested specifically with: ${advocateName}.\nCase Details: `;
    caseSummary.focus();
  }

  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};
