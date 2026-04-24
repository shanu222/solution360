const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const yearEl = document.getElementById("year");
const menuToggle = document.getElementById("menuToggle");
const topNav = document.getElementById("topNav");
const navLinks = document.querySelectorAll('a[href^="#"]');
const sendButton = document.getElementById("sendButton");
const backToTop = document.getElementById("backToTop");
const revealNodes = document.querySelectorAll(".card, .feature-item, .metric-card, .contact-form");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuToggle && topNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = topNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 320) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });
}

if (navLinks.length > 0) {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (!targetEl) {
        return;
      }

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

      if (topNav && menuToggle && topNav.classList.contains("open")) {
        topNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

if (form && statusText) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = String(form.name.value || "").trim();
    const email = String(form.email.value || "").trim();
    const message = String(form.message.value || "").trim();

    if (!name || !email || !message) {
      statusText.textContent = "Please complete all fields before submitting.";
      statusText.style.color = "#b91c1c";
      return;
    }

    if (sendButton) {
      sendButton.setAttribute("disabled", "true");
      sendButton.textContent = "Preparing Message...";
    }

    const subject = encodeURIComponent("Website Inquiry - Solution360");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:shanu1998end@gmail.com?subject=${subject}&body=${body}`;

    statusText.textContent = "Your email app has been opened. If it did not open, email us directly at shanu1998end@gmail.com.";
    statusText.style.color = "#0f766e";
    form.reset();

    if (sendButton) {
      sendButton.removeAttribute("disabled");
      sendButton.textContent = "Send Message";
    }
  });
}

if (revealNodes.length > 0 && "IntersectionObserver" in window) {
  revealNodes.forEach((node) => {
    node.style.opacity = "0";
    node.style.transform = "translateY(14px)";
    node.style.transition = "opacity 0.45s ease, transform 0.45s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}
