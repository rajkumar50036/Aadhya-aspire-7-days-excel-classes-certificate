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

  // Ensure the background template image uses its absolute URL on load
  const bgImg = document.querySelector('.certificate-bg-image');
  if (bgImg) {
    bgImg.src = bgImg.src;
  }

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

  const saveImageBtn = document.getElementById('saveImageBtn');

  // 3. Save Image Action (using html2canvas client-side)
  if (saveImageBtn) {
    saveImageBtn.addEventListener('click', () => {
      const element = document.getElementById('certificateToPrint');
      const img = element.querySelector('.certificate-bg-image');
      
      // Disable buttons to prevent multiple clicks and show spinner loading
      saveImageBtn.disabled = true;
      saveImageBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

      // Setup html2canvas parameters
      const html2canvasOptions = { 
        scale: 4.0, // High-fidelity scale for ultra-sharp canvas rendering
        useCORS: true, 
        logging: false,
        letterRendering: true,
        backgroundColor: '#ffffff', // Solid white background to prevent transparency artifacts
        imageTimeout: 0 // Wait indefinitely for images to load
      };

      const proceedWithCapture = () => {
        // Temporarily apply the rendering layout override
        element.classList.add('pdf-render-mode');

        // Wait two animation frames to allow browser layout calculation & paint of the resized container
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Render DOM to canvas
            html2canvas(element, html2canvasOptions).then(canvas => {
              // Immediately restore responsive DOM styles
              element.classList.remove('pdf-render-mode');

              // Convert canvas to lossless PNG blob/dataURL and trigger download
              try {
                // Get PNG Data URL
                const dataUrl = canvas.toDataURL('image/png');
                
                // Create a temporary link element to trigger downloading
                const link = document.createElement('a');
                link.download = `Aadhya_Excel_Certificate_${studentName.replace(/\s+/g, '_')}.png`;
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Reset button state
                saveImageBtn.disabled = false;
                saveImageBtn.innerHTML = '<i class="fa-solid fa-image"></i> Save Image';
              } catch (err) {
                console.error('Image Generation Error:', err);
                alert('There was a problem generating the image file. Opening browser Print dialog instead.');
                window.print();
                saveImageBtn.disabled = false;
                saveImageBtn.innerHTML = '<i class="fa-solid fa-image"></i> Save Image';
              }
            }).catch(err => {
              console.error('html2canvas Error:', err);
              element.classList.remove('pdf-render-mode');
              alert('There was a problem generating the image. Opening browser Print dialog instead.');
              window.print();
              saveImageBtn.disabled = false;
              saveImageBtn.innerHTML = '<i class="fa-solid fa-image"></i> Save Image';
            });
          });
        });
      };

      // Check if image is fully loaded and decoded in memory before capturing
      if (img) {
        if (img.complete) {
          if (typeof img.decode === 'function') {
            img.decode().then(proceedWithCapture).catch(proceedWithCapture);
          } else {
            proceedWithCapture();
          }
        } else {
          img.onload = proceedWithCapture;
          img.onerror = proceedWithCapture;
        }
      } else {
        proceedWithCapture();
      }
    });
  }

  // 4. Print Certificate Action
  if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
