const mobileToggle = document.querySelector("[data-mobile-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("hidden") === false;
    mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

const stickyCta = document.querySelector("[data-sticky-cta]");
if (stickyCta) {
  const toggleSticky = () => {
    if (window.scrollY > 420) {
      stickyCta.classList.remove("hidden");
    } else {
      stickyCta.classList.add("hidden");
    }
  };
  window.addEventListener("scroll", toggleSticky);
  toggleSticky();
}

const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (targetId && targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

const setFieldError = (field, message) => {
  const errorEl = field.parentElement.querySelector(".field-error");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.toggle("hidden", !message);
  }
  field.setAttribute("aria-invalid", message ? "true" : "false");
};

const validateForm = (form) => {
  let isValid = true;
  const nameField = form.querySelector('input[name="name"]');
  const mobileField = form.querySelector('input[name="mobile"]');
  const emailField = form.querySelector('input[name="email"]');
  const topicField = form.querySelector('select[name="topic"]');

  if (nameField) {
    const value = nameField.value.trim();
    if (!value) {
      setFieldError(nameField, "Please enter your name.");
      isValid = false;
    } else {
      setFieldError(nameField, "");
    }
  }

  if (mobileField) {
    const value = mobileField.value.trim();
    const mobileOk = /^[0-9]{10}$/.test(value.replace(/\s+/g, ""));
    if (!mobileOk) {
      setFieldError(mobileField, "Enter a valid 10-digit mobile number.");
      isValid = false;
    } else {
      setFieldError(mobileField, "");
    }
  }

  if (emailField) {
    const value = emailField.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!emailOk) {
      setFieldError(emailField, "Enter a valid email address.");
      isValid = false;
    } else {
      setFieldError(emailField, "");
    }
  }

  if (topicField) {
    const value = topicField.value.trim();
    if (!value) {
      setFieldError(topicField, "Select a preferred review topic.");
      isValid = false;
    } else {
      setFieldError(topicField, "");
    }
  }

  return isValid;
};

const leadForms = document.querySelectorAll("[data-lead-form]");
leadForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const statusEl = form.querySelector("[data-form-status]");

    if (!validateForm(form)) {
      if (statusEl) {
        statusEl.textContent = "Please complete the highlighted fields.";
        statusEl.className = "form-status error";
      }
      return;
    }

    if (statusEl) {
      statusEl.textContent = "Thanks. We will reach out within 1 business day.";
      statusEl.className = "form-status success";
    }

    form.reset();
  });
});

const topicButtons = document.querySelectorAll("[data-topic]");
topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const topic = button.getAttribute("data-topic");
    if (!topic) return;

    const form = document.querySelector("[data-lead-form]");
    const topicField = form ? form.querySelector('select[name="topic"]') : null;
    if (topicField) {
      topicField.value = topic;
      topicField.dispatchEvent(new Event("change"));
    }
  });
});