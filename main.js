/* =========================================================
   GOUROB NANDI PORTFOLIO
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      navMenu.classList.toggle("active");

      const isOpen = navMenu.classList.contains("active");

      menuToggle.textContent = isOpen ? "✕" : "☰";

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    /* Close menu after clicking a navigation link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(
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


  /* Add reveal class */

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  /* Intersection Observer */

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
      }
    );


    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navigationLinks = document.querySelectorAll(
    "#navMenu a"
  );


  function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
      window.scrollY + 160;


    sections.forEach(section => {

      const sectionTop = section.offsetTop;

      const sectionBottom =
        sectionTop + section.offsetHeight;


      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionBottom
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navigationLinks.forEach(link => {

      const href =
        link.getAttribute("href");


      link.classList.remove("active");


      if (
        href === `#${currentSection}`
      ) {

        link.classList.add("active");

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  updateActiveNavigation();


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach(anchor => {

    anchor.addEventListener(
      "click",
      event => {

        const targetId =
          anchor.getAttribute("href");


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


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });


      }
    );

  });


  /* =======================================================
     NAVBAR SHADOW ON SCROLL
  ======================================================= */

  const navbar =
    document.querySelector(".navbar");


  function updateNavbar() {

    if (!navbar) {
      return;
    }


    if (window.scrollY > 20) {

      navbar.style.boxShadow =
        "0 8px 30px rgba(15, 23, 42, 0.06)";

    } else {

      navbar.style.boxShadow =
        "none";

    }

  }


  window.addEventListener(
    "scroll",
    updateNavbar,
    {
      passive: true
    }
  );


  updateNavbar();


  /* =======================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ======================================================= */

  document.addEventListener(
    "click",
    event => {

      if (!menuToggle || !navMenu) {
        return;
      }


      const clickedInsideNav =
        navMenu.contains(event.target);


      const clickedMenuButton =
        menuToggle.contains(event.target);


      if (
        !clickedInsideNav &&
        !clickedMenuButton &&
        navMenu.classList.contains("active")
      ) {

        navMenu.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =======================================================
     ESCAPE KEY — CLOSE MOBILE MENU
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        navMenu &&
        navMenu.classList.contains("active")
      ) {

        navMenu.classList.remove("active");

        if (menuToggle) {

          menuToggle.textContent = "☰";

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          menuToggle.focus();

        }

      }

    }
  );


  /* =======================================================
     CARD HOVER EFFECT
     Desktop only
  ======================================================= */

  const hoverCards = document.querySelectorAll(
    ".expertise-card, " +
    ".focus-card, " +
    ".work-card, " +
    ".achievement-card, " +
    ".certification-card, " +
    ".learning-card"
  );


  if (
    window.matchMedia &&
    window.matchMedia("(hover: hover)").matches
  ) {

    hoverCards.forEach(card => {

      card.addEventListener(
        "mouseenter",
        () => {
          card.classList.add("is-hovered");
        }
      );


      card.addEventListener(
        "mouseleave",
        () => {
          card.classList.remove("is-hovered");
        }
      );

    });

  }


  /* =======================================================
     PAGE LOAD
  ======================================================= */

  window.addEventListener(
    "load",
    () => {

      document.body.classList.add("loaded");

      /* Make sure hero is immediately visible */

      const hero =
        document.querySelector(".hero");

      if (hero) {
        hero.classList.add("visible");
      }

    }
  );


  /* =======================================================
     RESIZE HANDLING
  ======================================================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);


      resizeTimer = setTimeout(
        () => {

          /*
             If desktop width is restored while the
             mobile menu is open, close the menu.
          */

          if (
            window.innerWidth > 800 &&
            navMenu
          ) {

            navMenu.classList.remove(
              "active"
            );

            if (menuToggle) {

              menuToggle.textContent =
                "☰";

              menuToggle.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          }


          updateActiveNavigation();

        },
        150
      );

    }
  );


  /* =======================================================
     EXTERNAL LINKS
  ======================================================= */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );


  externalLinks.forEach(link => {

    /*
      Security improvement for links opening
      in a new browser tab.
    */

    const existingRel =
      link.getAttribute("rel");


    if (!existingRel) {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    }

  });


  /* =======================================================
     CONSOLE MESSAGE
  ======================================================= */

  console.log(
    "%cGourob Nandi Portfolio",
    "font-size:18px;font-weight:800;"
  );

  console.log(
    "%cSenior Software Test Engineer | AI/ML QA & Automation Specialist",
    "font-size:12px;"
  );

});
