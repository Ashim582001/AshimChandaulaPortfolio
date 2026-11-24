
// =========================================
// ASHIM CHANDAULA — PORTFOLIO
// Main JavaScript
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------------------
  // 1. MOBILE NAVIGATION
  // ---------------------------------------

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);

    });

    navItems.forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

      });

    });

    document.addEventListener("click", event => {

      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

      }

    });

  }


  // ---------------------------------------
  // 2. SCROLL REVEAL ANIMATIONS
  // ---------------------------------------

  const revealElements = document.querySelectorAll(".reveal");

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
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  // ---------------------------------------
  // 3. FAQ ACCORDION
  // ---------------------------------------

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

      const wasActive = item.classList.contains("active");

      faqItems.forEach(otherItem => {

        otherItem.classList.remove("active");

        const otherButton = otherItem.querySelector(".faq-question");

        otherButton.setAttribute("aria-expanded", "false");

      });

      if (!wasActive) {

        item.classList.add("active");

        question.setAttribute("aria-expanded", "true");

      }

    });

  });


  // ---------------------------------------
  // 4. CURRENT YEAR IN FOOTER
  // ---------------------------------------

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

  }


  // ---------------------------------------
  // 5. ACTIVE NAVIGATION ON SCROLL
  // ---------------------------------------

  const sections = document.querySelectorAll("main section[id]");

  const navigationLinks = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const currentId = entry.target.getAttribute("id");

          navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentId) {

              link.classList.add("active");

            }

          });

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach(section => {

    sectionObserver.observe(section);

  });


  // ---------------------------------------
  // 6. GALLERY SCROLL MOVEMENT
  // ---------------------------------------

  const galleryRows = document.querySelectorAll(".gallery-row");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion && galleryRows.length > 0) {

    let galleryTicking = false;

    const moveGallery = () => {

      const windowHeight = window.innerHeight;

      galleryRows.forEach((row, index) => {

        const rect = row.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > windowHeight) {
          return;
        }

        const progress =
          (windowHeight - rect.top) /
          (windowHeight + rect.height);

        const direction = index === 1 ? 1 : -1;

        const movement =
          (progress - 0.5) * 65 * direction;

        const track = row.querySelector(".gallery-track");

        if (track) {

          track.style.translate = `${movement}px 0`;

        }

      });

      galleryTicking = false;

    };

    window.addEventListener("scroll", () => {

      if (!galleryTicking) {

        window.requestAnimationFrame(moveGallery);

        galleryTicking = true;

      }

    }, { passive: true });

    moveGallery();

  }


  // ---------------------------------------
  // 7. SMOOTH INTERNAL NAVIGATION
  // ---------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });

      }

    });

  });


  console.log("Ashim's portfolio is ready!");

});
