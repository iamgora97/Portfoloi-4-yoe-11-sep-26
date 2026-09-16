/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle =
  document.getElementById("menuToggle");

const navMenu =
  document.getElementById("navMenu");


if (menuToggle && navMenu) {


  /* OPEN / CLOSE MENU */

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navMenu.classList.toggle("open");


      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );


      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

    }
  );


  /* CLOSE AFTER CLICKING LINK */

  const navLinks =
    navMenu.querySelectorAll("a");


  navLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          navMenu.classList.remove("open");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          document.body.classList.remove(
            "menu-open"
          );

        }
      );

    }
  );


  /* CLOSE WHEN CLICKING OUTSIDE */

  document.addEventListener(
    "click",
    (event) => {

      const insideMenu =
        navMenu.contains(event.target);

      const insideButton =
        menuToggle.contains(event.target);


      if (
        !insideMenu &&
        !insideButton &&
        navMenu.classList.contains("open")
      ) {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );

      }

    }
  );


  /* RESET ON DESKTOP */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 760) {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );

      }

    }
  );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
  document.getElementById("currentYear");


if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if (
  "IntersectionObserver" in window
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
      (
        entries,
        observer
      ) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "animate-visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.10
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

}


/* =========================================================
   HERO CARD TILT
========================================================= */

const heroCard =
  document.querySelector(".hero-card");

const heroVisual =
  document.querySelector(".hero-visual");


if (
  heroCard &&
  heroVisual &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {


  heroVisual.addEventListener(
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


      const rotateX =
        ((y - centerY) / centerY) * -5;


      const rotateY =
        ((x - centerX) / centerX) * 5;


      heroCard.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;

    }
  );


  heroVisual.addEventListener(
    "mouseleave",
    () => {

      heroCard.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

    }
  );

}


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
  document.querySelector(".cursor-glow");


if (
  cursorGlow &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {


  let cursorX = 0;
  let cursorY = 0;

  let glowX = 0;
  let glowY = 0;


  document.addEventListener(
    "mousemove",
    (event) => {

      cursorX =
        event.clientX;

      cursorY =
        event.clientY;

      cursorGlow.style.opacity =
        "1";

    }
  );


  document.addEventListener(
    "mouseleave",
    () => {

      cursorGlow.style.opacity =
        "0";

    }
  );


  function animateCursor() {

    glowX +=
      (cursorX - glowX) * 0.12;

    glowY +=
      (cursorY - glowY) * 0.12;


    cursorGlow.style.left =
      `${glowX}px`;

    cursorGlow.style.top =
      `${glowY}px`;


    requestAnimationFrame(
      animateCursor
    );

  }


  animateCursor();

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const desktopNavLinks =
  document.querySelectorAll(
    ".nav-links a"
  );


if (
  sections.length &&
  desktopNavLinks.length &&
  "IntersectionObserver" in window
) {


  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {


              desktopNavLinks.forEach(
                (link) => {

                  link.classList.remove(
                    "active"
                  );

                }
              );


              const activeLink =
                document.querySelector(
                  `.nav-links a[href="#${entry.target.id}"]`
                );


              if (activeLink) {

                activeLink.classList.add(
                  "active"
                );

              }

            }

          }
        );

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(
    (section) => {

      sectionObserver.observe(
        section
      );

    }
  );

}
