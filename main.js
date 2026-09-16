/* =========================================================
   GOUROB NANDI — INTERACTIVE PORTFOLIO JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll("#navMenu a");
  const sections = document.querySelectorAll("main section[id]");
  const year = document.getElementById("currentYear");

  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const closeMenu = () => {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  };

  const openMenu = () => {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.textContent = "✕";
  };

  if (menuToggle && navMenu) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      if (navMenu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  const updateNavbar = () => {
    if (!navbar) return;

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const updateActiveNav = () => {
    if (!sections.length) return;

    const scrollPosition = window.scrollY + 180;
    let currentId = "";

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${currentId}`;

      link.classList.toggle("active", isActive);
    });
  };

  updateActiveNav();

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      event.preventDefault();

      const navbarHeight =
        navbar ? navbar.offsetHeight : 0;

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        10;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    });
  });

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealItems = document.querySelectorAll(
    ".stat-card, " +
    ".focus-card, " +
    ".expertise-card, " +
    ".highlight-card, " +
    ".work-card, " +
    ".skill-group, " +
    ".experience-card, " +
    ".achievement-card, " +
    ".timeline-item, " +
    ".certification-card, " +
    ".learning-card, " +
    ".contact-link"
  );

  revealItems.forEach((element, index) => {
    element.classList.add("reveal");

    element.style.transitionDelay =
      `${Math.min(index % 6, 5) * 60}ms`;
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.10,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealItems.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =======================================================
     INTERACTIVE 3D CARD EFFECT
  ======================================================= */

  const tiltCards = document.querySelectorAll(
    ".hero-card, " +
    ".expertise-card, " +
    ".achievement-card, " +
    ".certification-card"
  );

  const supportsHover =
    window.matchMedia &&
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

  if (supportsHover) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - 0.5) * -5;

        const rotateY =
          ((x / rect.width) - 0.5) * 5;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-7px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =======================================================
     DESKTOP CURSOR GLOW
  ======================================================= */

  if (supportsHover) {
    const glow = document.createElement("div");

    glow.className = "cursor-glow";

    document.body.appendChild(glow);

    let glowVisible = false;

    window.addEventListener("mousemove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;

      if (!glowVisible) {
        glow.style.opacity = "1";
        glowVisible = true;
      }
    });

    document.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
      glowVisible = false;
    });
  }

  /* =======================================================
     EXTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {
      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    });

  /* =======================================================
     DESKTOP RESIZE
  ======================================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });

  /* =======================================================
     PAGE LOADED
  ======================================================= */

  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});
