/* =========================================================
   GOUROB NANDI PORTFOLIO
   INTERACTIVE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const cursorGlow = document.querySelector(".cursor-glow");

  /* =======================================================
     FOOTER YEAR
  ======================================================= */

  const yearElements = document.querySelectorAll("[data-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      document.body.classList.toggle("nav-open", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    const mobileNavItems =
      navLinks.querySelectorAll("a");

    mobileNavItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        document.body.classList.remove("nav-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", (event) => {
      if (!navLinks.classList.contains("open")) {
        return;
      }

      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navLinks.classList.remove("open");

        document.body.classList.remove("nav-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.textContent = "☰";
      }
    });
  }

  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  const handleNavbarScroll = () => {
    if (!navbar) {
      return;
    }

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  handleNavbarScroll();

  window.addEventListener(
    "scroll",
    handleNavbarScroll,
    { passive: true }
  );

  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const navbarHeight =
        navbar?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      history.replaceState(
        null,
        "",
        targetId
      );
    });
  });

  /* =======================================================
     REVEAL ANIMATIONS
     
     IMPORTANT:
     Elements are visible by default.
     JS adds animate-ready only after JS loads.
     Therefore a JS failure can NEVER blank the page.
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    revealElements.length &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    revealElements.forEach((element) => {
      element.classList.add("animate-ready");
    });

    if ("IntersectionObserver" in window) {
      const observer =
        new IntersectionObserver(
          (entries, observerInstance) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "visible"
              );

              observerInstance.unobserve(
                entry.target
              );
            });
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px",
          }
        );

      revealElements.forEach((element) => {
        observer.observe(element);
      });
    } else {
      revealElements.forEach((element) => {
        element.classList.add("visible");
      });
    }
  }

  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navigationItems =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );

  if (
    sections.length &&
    navigationItems.length &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const id =
              entry.target.getAttribute("id");

            navigationItems.forEach((link) => {
              const href =
                link.getAttribute("href");

              link.classList.toggle(
                "active",
                href === `#${id}`
              );
            });
          });
        },
        {
          threshold: 0.15,
          rootMargin:
            "-20% 0px -65% 0px",
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* =======================================================
     HERO CARD 3D TILT
  ======================================================= */

  const heroCard =
    document.querySelector(".hero-card");

  const canUseHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

  if (heroCard && canUseHover) {
    heroCard.addEventListener(
      "mousemove",
      (event) => {
        const rect =
          heroCard.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateY =
          ((x - centerX) / centerX) * 7;

        const rotateX =
          ((centerY - y) / centerY) * 7;

        heroCard.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      }
    );

    heroCard.addEventListener(
      "mouseleave",
      () => {
        heroCard.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      }
    );
  }

  /* =======================================================
     CARD HOVER TILT
  ======================================================= */

  const interactiveCards =
    document.querySelectorAll(
      ".card"
    );

  if (canUseHover) {
    interactiveCards.forEach((card) => {
      card.addEventListener(
        "mousemove",
        (event) => {
          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateX =
            ((y - rect.height / 2) /
              rect.height) *
            -3;

          const rotateY =
            ((x - rect.width / 2) /
              rect.width) *
            3;

          card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.style.transform = "";
        }
      );
    });
  }

  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  if (cursorGlow && canUseHover) {
    let cursorX = 0;
    let cursorY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener(
      "mousemove",
      (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;
      },
      { passive: true }
    );

    const animateCursor = () => {
      currentX +=
        (cursorX - currentX) * 0.12;

      currentY +=
        (cursorY - currentY) * 0.12;

      cursorGlow.style.left =
        `${currentX}px`;

      cursorGlow.style.top =
        `${currentY}px`;

      requestAnimationFrame(
        animateCursor
      );
    };

    animateCursor();
  }

  /* =======================================================
     EXTERNAL LINKS
     
     Opens external links safely in a new tab.
  ======================================================= */

  const externalLinks =
    document.querySelectorAll(
      'a[href^="http"]'
    );

  externalLinks.forEach((link) => {
    const href =
      link.getAttribute("href");

    if (!href) {
      return;
    }

    link.setAttribute(
      "target",
      "_blank"
    );

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );
  });

  /* =======================================================
     RESIZE CLEANUP
  ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        if (
          window.innerWidth > 800 &&
          navLinks &&
          menuToggle
        ) {
          navLinks.classList.remove(
            "open"
          );

          document.body.classList.remove(
            "nav-open"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          menuToggle.textContent = "☰";
        }

        if (
          heroCard &&
          !canUseHover
        ) {
          heroCard.style.transform = "";
        }
      }, 150);
    },
    { passive: true }
  );

  /* =======================================================
     PAGE LOADED
  ======================================================= */

  document.body.classList.add("js-loaded");

  console.log(
    "Gourob Nandi Portfolio loaded successfully."
  );
});
