document.addEventListener('DOMContentLoaded', () => {
  // Global Header Scroll Effect
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    });
  }

  // Check which page we are on (Landing Page vs Certificate Page)
  const certificateForm = document.getElementById('certificateForm');
  const certificateContainer = document.getElementById('certificateToPrint');
  
  if (certificateForm) {
    initLandingPage();
  } else if (certificateContainer) {
    initCertificatePage();
  }
});

/**
 * Landing Page Logic (index.html)
 */
function initLandingPage() {
  const heroCtaBtn = document.getElementById('heroCtaBtn');
  const certificateForm = document.getElementById('certificateForm');
  const studentNameInput = document.getElementById('studentName');
  const studentEmailInput = document.getElementById('studentEmail');
  const studentMobileInput = document.getElementById('studentMobile');
  const mockupName = document.getElementById('mockupName');

  // 1. Smooth Scroll to Form
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', () => {
      document.getElementById('registration-form').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Focus on the first input after scrolling completes
      setTimeout(() => studentNameInput.focus(), 800);
    });
  }

  // 2. Interactive Mockup Synchronizer (Updates name in certificate mockup as student types)
  if (studentNameInput && mockupName) {
    studentNameInput.addEventListener('input', () => {
      const nameVal = studentNameInput.value.trim();
      if (nameVal) {
        mockupName.textContent = nameVal.toUpperCase();
        mockupName.style.color = '#002157'; // Make it dark blue like certificate font
      } else {
        mockupName.textContent = 'YOUR NAME HERE';
        mockupName.style.color = 'rgba(0, 33, 87, 0.45)'; // Soft placeholder look
      }
    });
  }

  // 3. Real-time Input Validation Cues
  const validationRules = [
    {
      input: studentNameInput,
      group: document.getElementById('groupStudentName'),
      validate: (val) => val.trim().length >= 2 && /^[A-Za-z\s.]{2,50}$/.test(val.trim())
    },
    {
      input: studentEmailInput,
      group: document.getElementById('groupStudentEmail'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
    },
    {
      input: studentMobileInput,
      group: document.getElementById('groupStudentMobile'),
      validate: (val) => {
        // Allow optional + or country codes, spaces, or hyphens but must contain 10 to 12 digits
        const cleanVal = val.replace(/[\s\-+()]/g, '');
        return /^\d{10,12}$/.test(cleanVal);
      }
    }
  ];

  validationRules.forEach(rule => {
    if (rule.input) {
      // Input event for clearing error state and live feedback
      rule.input.addEventListener('input', () => {
        const val = rule.input.value;
        if (val.trim() === '') {
          rule.group.classList.remove('valid', 'invalid');
        } else if (rule.validate(val)) {
          rule.group.classList.remove('invalid');
          rule.group.classList.add('valid');
        } else {
          // If they typed something but it's currently invalid, we don't force Red immediately
          // to avoid annoying user while typing. We validate fully on blur or submit.
        }
      });

      // Blur event to trigger full feedback after focus leaves
      rule.input.addEventListener('blur', () => {
        const val = rule.input.value;
        if (val.trim() === '') {
          rule.group.classList.remove('valid');
          rule.group.classList.add('invalid');
        } else if (rule.validate(val)) {
          rule.group.classList.remove('invalid');
          rule.group.classList.add('valid');
        } else {
          rule.group.classList.remove('valid');
          rule.group.classList.add('invalid');
        }
      });
    }
  });

  // 4. Form Submission and Generating Animation Flow
  if (certificateForm) {
    certificateForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;

      // Validate all fields
      validationRules.forEach(rule => {
        const val = rule.input.value;
        if (rule.validate(val)) {
          rule.group.classList.remove('invalid');
          rule.group.classList.add('valid');
        } else {
          rule.group.classList.remove('valid');
          rule.group.classList.add('invalid');
          isFormValid = false;
        }
      });

      if (isFormValid) {
        const name = studentNameInput.value.trim();
        const email = studentEmailInput.value.trim();
        const mobile = studentMobileInput.value.trim();

        // Save data temporarily to sessionStorage (cleared when browser tab closes)
        sessionStorage.setItem('cert_studentName', name);
        sessionStorage.setItem('cert_studentEmail', email);
        sessionStorage.setItem('cert_studentMobile', mobile);

        // Run premium loading animation sequence
        triggerLoadingSequence();
      }
    });
  }

  // 5. Loading Sequence Animation
  function triggerLoadingSequence() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const progressFill = document.getElementById('loaderProgressFill');
    const steps = [
      { el: document.getElementById('step1'), progress: 25 },
      { el: document.getElementById('step2'), progress: 50 },
      { el: document.getElementById('step3'), progress: 75 },
      { el: document.getElementById('step4'), progress: 100 }
    ];

    // Show overlay
    loadingOverlay.classList.add('active');

    // Run progressive steps
    steps.forEach((step, index) => {
      // Step activation timing
      setTimeout(() => {
        // Set previous step to completed
        if (index > 0) {
          const prevStep = steps[index - 1].el;
          prevStep.classList.remove('active');
          prevStep.classList.add('completed');
          prevStep.querySelector('i').className = 'fa-solid fa-circle-check';
        }

        // Activate current step
        step.el.classList.remove('pending');
        step.el.classList.add('active');
        progressFill.style.width = `${step.progress}%`;

        // If it's the last step, finalize it after a brief delay and redirect
        if (index === steps.length - 1) {
          setTimeout(() => {
            step.el.classList.remove('active');
            step.el.classList.add('completed');
            step.el.querySelector('i').className = 'fa-solid fa-circle-check';

            // Wait a final moment for visual satisfaction, then redirect
            setTimeout(() => {
              window.location.href = 'certificate.html';
            }, 600);
          }, 800);
        }
      }, index * 800); // 800ms spacing between loading phases
    });
  }
}

/**
 * Certificate Page Logic (certificate.html)
 */
function initCertificatePage() {
  const nameOverlay = document.getElementById('certStudentName');
  const dateOverlay = document.getElementById('certIssueDate');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const printCertBtn = document.getElementById('printCertBtn');

  // Retrieve student details from sessionStorage
  let studentName = sessionStorage.getItem('cert_studentName');

  // Fallback to URL query params if session was cleared
  if (!studentName) {
    const urlParams = new URLSearchParams(window.location.search);
    studentName = urlParams.get('name');
  }

  // Final fallback if name is completely missing
  if (!studentName) {
    studentName = 'Distinguished Graduate';
  }

  // 1. Dynamically Insert Student Name in uppercase for professional look
  if (nameOverlay) {
    nameOverlay.textContent = studentName.toUpperCase();
  }

  // 2. Format and Insert Live Current Date in UPPERCASE (e.g. "JUNE 10, 2026")
  const today = new Date();
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions).toUpperCase();
  
  if (dateOverlay) {
    dateOverlay.textContent = formattedDate;
  }

  // 3. Download PDF Action (using html2pdf.js client-side)
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      const element = document.getElementById('certificateToPrint');
      
      // Setup option parameters for standard A4 landscape rendering
      const opt = {
        margin:       0,
        filename:     `Aadhya_Excel_Certificate_${studentName.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 }, // Opaque max-quality JPEG to prevent transparency blending & color profile fading
        html2canvas:  { 
          scale: 4.0, // High-fidelity scale for ultra-sharp canvas rendering
          useCORS: true, 
          logging: false,
          letterRendering: true,
          backgroundColor: '#ffffff' // Solid white background to prevent transparency artifacts
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape', compress: true }
      };

      // Disable buttons to prevent multiple clicks and show spinner loading
      downloadPdfBtn.disabled = true;
      downloadPdfBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';

      // Temporarily apply the rendering layout override
      element.classList.add('pdf-render-mode');

      // Compile html2pdf worker up to canvas step, then immediately restore DOM styles
      const worker = html2pdf().set(opt).from(element).toContainer().toCanvas();
      
      worker.then(() => {
        // Swap back to responsive styles in the next frame
        element.classList.remove('pdf-render-mode');
      });

      // Continue processing the PDF output asynchronously
      worker.toImg().toPdf().save().then(() => {
        downloadPdfBtn.disabled = false;
        downloadPdfBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Download PDF';
      }).catch(err => {
        console.error('PDF Generation Error:', err);
        element.classList.remove('pdf-render-mode');
        
        alert('There was a problem generating the PDF. Opening browser Print dialog instead.');
        window.print();
        downloadPdfBtn.disabled = false;
        downloadPdfBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Download PDF';
      });
    });
  }

  // 4. Print Certificate Action
  if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
