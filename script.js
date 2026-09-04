const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

let lastScrollY = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;
    const isAtTop = currentScrollY <= 24;

    if (isAtTop) {
      siteHeader?.classList.remove("is-hidden", "cta-only");
    } else if (isScrollingDown) {
      siteHeader?.classList.add("is-hidden");
      siteHeader?.classList.remove("cta-only");
    } else {
      siteHeader?.classList.remove("is-hidden");
      siteHeader?.classList.add("cta-only");
      siteNav?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    }

    lastScrollY = Math.max(currentScrollY, 0);
  },
  { passive: true }
);

const revealItems = document.querySelectorAll(".reveal");

const todayHours = document.querySelector("#today-hours");
const weeklyHours = {
  0: null,
  1: "17:00 tot 22:00",
  2: "11:00 tot 22:00",
  3: "11:00 tot 22:00",
  4: "11:00 tot 22:00",
  5: "11:00 tot 22:00",
  6: "10:00 tot 21:00"
};

if (todayHours) {
  const hours = weeklyHours[new Date().getDay()];
  todayHours.textContent = hours ? `Vandaag open van ${hours}` : "Vandaag gesloten";
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
