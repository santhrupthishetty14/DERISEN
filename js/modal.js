/**
 * DE.RISEN — INTERACTIVE "LET'S TALK" CONSULTATION MODAL & TOAST HANDLER
 */

document.addEventListener('DOMContentLoaded', () => {
  initTalkModal();
});

function initTalkModal() {
  const modalOverlay = document.getElementById('talkModal');
  const openButtons = document.querySelectorAll('.open-talk-modal');
  const closeButton = document.getElementById('modalCloseBtn');
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toastMsg');

  if (!modalOverlay) return;

  function openModal(defaultService = '') {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (defaultService) {
      const select = document.getElementById('serviceSelect');
      if (select) select.value = defaultService;
    }

    const firstInput = modalOverlay.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Click outside to close
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission handling
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('emailAddress').value.trim();

      if (!name || !email) {
        showToast('Please fill out all required fields.', true);
        return;
      }

      // Submit feedback simulation
      const submitBtn = form.querySelector('.form-submit-btn');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Inquiry...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
        form.reset();
        closeModal();
        showToast(`Thank you, ${name}! Your inquiry has been sent to DE.RISEN.`);
      }, 1000);
    });
  }

  function showToast(message, isError = false) {
    if (!toast) return;
    
    const toastText = toast.querySelector('.toast-text');
    if (toastText) toastText.textContent = message;

    if (isError) {
      toast.style.borderColor = '#EF4444';
    } else {
      toast.style.borderColor = 'var(--brand-purple)';
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}
