/* =========================================================
   GOUROB NANDI PORTFOLIO
   V2.3 — INTERACTION SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const body =
    document.body;

  const navbar =
    document.querySelector(".navbar");

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navLinks =
    document.querySelector(".nav-links");

  const navItems =
    document.querySelectorAll(
      ".nav-links a"
    );

  const sections =
    document.querySelectorAll(
      "section[id]"
    );


  /* =======================================================
     YEAR
  ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-year]"
    );

  yearElements.forEach(
    (element) => {
      element.textContent =
        new Date().getFullYear();
    }
  );


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (
    menuToggle &&
    navLinks
  ) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );


    /* -----------------------------------------------------
       CLOSE MENU
    ----------------------------------------------------- */

    const closeMenu = () => {

      navLinks.classList.remove(
        "open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      body.classList.remove(
        "nav-open"
      );
    };


    /* -----------------------------------------------------
       OPEN MENU
    ----------------------------------------------------- */

    const openMenu = () => {

      navLinks.classList.add(
        "open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
      );

      body.classList.add(
        "nav-open"
      );
    };


    /* -----------------------------------------------------
       TOGGLE
    ----------------------------------------------------- */

    menuToggle.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        event.stopPropagation();

        const isOpen =
          navLinks.classList.contains(
            "open"
          );

        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      }
    );


    /* -----------------------------------------------------
       CLOSE AFTER NAVIGATION
    ----------------------------------------------------- */

    navItems.forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            closeMenu();

          }
        );

      }
    );


    /* -----------------------------------------------------
       CLICK OUTSIDE
    ----------------------------------------------------- */

    document.addEventListener(
      "click",
      (event) => {

        if (
          !navLinks.contains(
            event.target
          ) &&
          !menuToggle.contains(
            event.target
          )
        ) {

          closeMenu();

        }

      }
    );


    /* -----------------------------------------------------
       ESCAPE
    ----------------------------------------------------- */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape"
        ) {

          closeMenu();

        }

      }
    );


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    window.addEventListener(
      "resize",
      () => {

        if (
          window.innerWidth > 800
        ) {

          closeMenu();

        }

      }
    );

  }


  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  const handleNavbar =
    () => {

      if (!navbar) {
        return;
      }

      if (
        window.scrollY > 30
      ) {

        navbar.classList.add(
          "scrolled"
        );

      } else {

        navbar.classList.remove(
          "scrolled"
        );

      }

    };


  window.addEventListener(
    "scroll",
    handleNavbar,
    {
      passive: true
    }
  );

  handleNavbar();


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const updateProgress =
    () => {

      const scrollTop =
        window.scrollY;

      const scrollHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      if (
        scrollHeight <= 0
      ) {

        body.style.setProperty(
          "--scroll-progress",
          "0%"
        );

        return;
      }

      const progress =
        (scrollTop /
          scrollHeight) *
        100;

      body.style.setProperty(
        "--scroll-progress",
        `${Math.min(
          progress,
          100
        )}%`
      );
    };


  window.addEventListener(
    "scroll",
    updateProgress,
    {
      passive: true
    }
  );

  updateProgress();


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  navItems.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const href =
            link.getAttribute(
              "href"
            );

          if (
            !href ||
            !href.startsWith("#")
          ) {
            return;
          }

          const target =
            document.querySelector(
              href
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          /*
           * Update URL without causing
           * a second jump.
           */

          try {

            history.replaceState(
              null,
              "",
              href
            );

          } catch (error) {

            /* Ignore */

          }

        }
      );

    }
  );


  /* =======================================================
     REVEAL ANIMATIONS
     
     IMPORTANT:
     Elements are visible by default.
     JS adds animation only after
     the script successfully loads.
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window &&
    revealElements.length > 0
  ) {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "animate-ready"
        );

      }
    );


    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.10,

          rootMargin:
            "0px 0px -45px 0px"
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


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  if (
    sections.length > 0 &&
    navItems.length > 0
  ) {

    const activeObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                const id =
                  entry.target.id;

                navItems.forEach(
                  (link) => {

                    const href =
                      link.getAttribute(
                        "href"
                      );

                    link.classList.toggle(
                      "active",
                      href === `#${id}`
                    );

                  }
                );

              }

            }
          );

        },
        {
          rootMargin:
            "-25% 0px -65% 0px",

          threshold: 0
        }
      );


    sections.forEach(
      (section) => {

        activeObserver.observe(
          section
        );

      }
    );

  }


  /* =======================================================
     HERO CARD TILT
     DESKTOP / POINTER DEVICES ONLY
  ======================================================= */

  const tiltCards =
    document.querySelectorAll(
      ".hero-card"
    );


  const supportsHover =
    window.matchMedia(
      "(hover: hover)"
    ).matches;


  if (
    supportsHover &&
    tiltCards.length > 0
  ) {

    tiltCards.forEach(
      (card) => {

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
              ((y /
                rect.height) -
                0.5) *
              -5;

            const rotateY =
              ((x /
                rect.width) -
                0.5) *
              5;

            card.style.transform =
              `perspective(1200px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)`;
          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  const cursorGlow =
    document.querySelector(
      ".cursor-glow"
    );


  if (
    cursorGlow &&
    supportsHover
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
      "mousemove",
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      },
      {
        passive: true
      }
    );


    const animateGlow =
      () => {

        glowX +=
          (mouseX - glowX) *
          0.09;

        glowY +=
          (mouseY - glowY) *
          0.09;

        cursorGlow.style.transform =
          `translate(
            ${glowX}px,
            ${glowY}px
          ) translate(-50%, -50%)`;

        requestAnimationFrame(
          animateGlow
        );

      };


    animateGlow();

  }


  /* =======================================================
     EXTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach(
      (link) => {

        link.setAttribute(
          "rel",
          "noopener noreferrer"
        );

      }
    );


  /* =======================================================
     CLOSE MOBILE MENU ON ORIENTATION CHANGE
  ======================================================= */

  window.addEventListener(
    "orientationchange",
    () => {

      if (
        window.innerWidth > 800 &&
        navLinks
      ) {

        navLinks.classList.remove(
          "open"
        );

        body.classList.remove(
          "nav-open"
        );

      }

    }
  );


  /* =======================================================
     PAGE LOADED
  ======================================================= */

  body.classList.add(
    "loaded"
  );


  /* =======================================================
     DEBUG MARKER
     Useful for confirming JS loaded.
  ======================================================= */

  body.setAttribute(
    "data-js",
    "loaded"
  );

});
