/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuToggle.textContent =
      navMenu.classList.contains("active")
        ? "✕"
        : "☰";
  });


  document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("active");

      menuToggle.textContent = "☰";

    });

  });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".stat-card, .focus-card, .expertise-card, .highlight-card, " +
  ".work-card, .skill-group, .experience-card, .achievement-card, " +
  ".timeline-item, .certification-card, .learning-card, .contact-link"
);

revealElements.forEach(element => {
  element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.08
  }
);


revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }

  });


  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") === `#${currentSection}`
    ) {
      link.classList.add("active");
    }

  });

});


/* =========================================================
   SMOOTH ANCHOR FALLBACK
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================================
   BUTTON / LINK FEEDBACK
========================================================= */

document.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    link.style.transition = "transform .15s ease";

  });

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});
