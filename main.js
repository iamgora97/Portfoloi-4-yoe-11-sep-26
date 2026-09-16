/* =========================================================
   GOUROB NANDI PORTFOLIO — V2
   INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =======================================================
     SELECTORS
  ======================================================= */

  const navbar =
    document.querySelector(".navbar");

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navLinks =
    document.querySelector(".nav-links");

  const cursorGlow =
    document.querySelector(".cursor-glow");

  const heroCard =
    document.querySelector(".hero-card");

  /* =======================================================
     FOOTER YEAR
  ======================================================= */

  document
    .querySelectorAll("[data-year]")
    .forEach((element) => {
      element.textContent =
        new Date().getFullYear();
    });

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const updateScrollProgress = () => {
    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {
      document.body.style.setProperty(
        "--scroll-progress",
        "0%"
      );

      return;
    }

    const progress =
      (window.scrollY /
        documentHeight) *
      100;

    document.body.style.setProperty(
      "--scroll-progress",
      `${Math.min(progress, 100)}%`
    );
  };

  updateScrollProgress();

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  /* =======================================================
     NAVBAR
  ======================================================= */

  const updateNavbar = () => {
    if (!navbar) {
      return;
    }

    navbar.classList.toggle(
      "scrolled",
      window.scrollY > 25
    );
  };

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuToggle && navLinks) {
    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.addEventListener(
      "click",
      () => {
        const opened =
          navLinks.classList.toggle(
            "open"
          );

        document.body.classList.toggle(
          "nav-open",
          opened
        );

        menuToggle.setAttribute(
          "aria-expanded",
          String(opened)
        );

        menuToggle.textContent =
          opened ? "✕" : "☰";
      }
    );

    navLinks
      .querySelectorAll("a")
      .forEach((link) => {
        link.addEventListener(
          "click",
          () => {
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
        );
      });

    document.addEventListener(
      "click",
      (event) => {
        if (
          !navLinks.classList.contains(
            "open"
          )
        ) {
          return;
        }

        if (
          !navLinks.contains(
            event.target
          ) &&
          !menuToggle.contains(
            event.target
          )
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
      }
    );
  }

  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {
      link.addEventListener(
        "click",
        (event) => {
          const targetId =
            link.getAttribute(
              "href"
            );

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          const offset =
            navbar
              ? navbar.offsetHeight + 10
              : 85;

          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            offset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      );
    });

  /* =======================================================
     REVEAL ANIMATIONS
     
     Content remains visible if JS fails.
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (
    revealElements.length &&
    !reducedMotion
  ) {
    revealElements.forEach(
      (element) => {
        element.classList.add(
          "animate-ready"
        );
      }
    );

    if (
      "IntersectionObserver" in
      window
    ) {
      const revealObserver =
        new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(
              (entry) => {
                if (
                  !entry.isIntersecting
                ) {
                  return;
                }

                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );
              }
            );
          },
          {
            threshold: 0.08,

            rootMargin:
              "0px 0px -45px 0px",
          }
        );

      revealElements.forEach(
        (element) => {
          revealObserver.observe(
            element
          );
        }
      );
    } else {
      revealElements.forEach(
        (element) => {
          element.classList.add(
            "visible"
          );
        }
      );
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
    "IntersectionObserver" in
      window
  ) {
    const navObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const id =
                entry.target.getAttribute(
                  "id"
                );

              navigationItems.forEach(
                (link) => {
                  link.classList.toggle(
                    "active",
                    link.getAttribute(
                      "href"
                    ) === `#${id}`
                  );
                }
              );
            }
          );
        },
        {
          threshold: 0.1,

          rootMargin:
            "-20% 0px -65% 0px",
        }
      );

    sections.forEach(
      (section) => {
        navObserver.observe(
          section
        );
      }
    );
  }

  /* =======================================================
     HERO 3D TILT
  ======================================================= */

  const desktopPointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

  if (
    heroCard &&
    desktopPointer &&
    !reducedMotion
  ) {
    heroCard.addEventListener(
      "mousemove",
      (event) => {
        const rect =
          heroCard.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateY =
          ((x - centerX) /
            centerX) *
          6;

        const rotateX =
          ((centerY - y) /
            centerY) *
          6;

        heroCard.style.transform =
          `
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-5px)
          `;
      }
    );

    heroCard.addEventListener(
      "mouseleave",
      () => {
        heroCard.style.transform =
          "";
      }
    );
  }

  /* =======================================================
     CARD MICRO INTERACTION
  ======================================================= */

  if (
    desktopPointer &&
    !reducedMotion
  ) {
    document
      .querySelectorAll(
        ".card"
      )
      .forEach((card) => {
        card.addEventListener(
          "mousemove",
          (event) => {
            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;

            const rotateX =
              ((y -
                rect.height / 2) /
                rect.height) *
              -2.5;

            const rotateY =
              ((x -
                rect.width / 2) /
                rect.width) *
              2.5;

            card.style.transform =
              `
              perspective(1000px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(-7px)
              `;
          }
        );

        card.addEventListener(
          "mouseleave",
          () => {
            card.style.transform =
              "";
          }
        );
      });
  }

  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  if (
    cursorGlow &&
    desktopPointer &&
    !reducedMotion
  ) {
    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener(
      "mousemove",
      (event) => {
        mouseX =
          event.clientX;

        mouseY =
          event.clientY;
      },
      { passive: true }
    );

    const animateCursor =
      () => {
        currentX +=
          (mouseX - currentX) *
          0.11;

        currentY +=
          (mouseY - currentY) *
          0.11;

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
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="http"]'
    )
    .forEach((link) => {
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
     CLOSE MENU ON ESCAPE
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key !== "Escape"
      ) {
        return;
      }

      if (
        navLinks &&
        navLinks.classList.contains(
          "open"
        )
      ) {
        navLinks.classList.remove(
          "open"
        );

        document.body.classList.remove(
          "nav-open"
        );

        if (menuToggle) {
          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          menuToggle.textContent =
            "☰";
        }
      }
    }
  );

  /* =======================================================
     RESIZE
  ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(
        resizeTimer
      );

      resizeTimer =
        setTimeout(() => {
          if (
            window.innerWidth >
              800 &&
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

            menuToggle.textContent =
              "☰";
          }

          if (heroCard) {
            heroCard.style.transform =
              "";
          }
        }, 150);
    },
    { passive: true }
  );

  /* =======================================================
     READY
  ======================================================= */

  document.body.classList.add(
    "js-loaded"
  );

  console.log(
    "Gourob Nandi Portfolio V2 loaded."
  );
});
