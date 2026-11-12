// ===== Navigation: background on scroll, mobile menu, active link =====
const nav = document.getElementById("nav-menu");
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setMenu(open) {
  links.classList.toggle("open", open);
  nav.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((l) =>
        l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Typing effect =====
const phrases = [
  "scalable backend systems",
  "Kafka event pipelines",
  "AI/LLM pipelines",
  "multi-tenant SaaS platforms",
  "secure auth with OAuth2 + RBAC",
];
const typedEl = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typedEl && !reduceMotion) {
  let phrase = 0;
  let chars = phrases[0].length;
  let deleting = true;

  const tick = () => {
    const text = phrases[phrase];
    chars += deleting ? -1 : 1;
    typedEl.textContent = text.slice(0, chars);

    let delay = deleting ? 40 : 75;
    if (!deleting && chars === text.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && chars === 0) {
      deleting = false;
      phrase = (phrase + 1) % phrases.length;
      delay = 300;
    }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2000);
}

// ===== Contact form (FormSubmit: no passwords or API keys in the code) =====
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("form-submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form._honey.value) return; // bot filled the hidden field

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  statusEl.className = "form-status";
  statusEl.textContent = "";

  try {
    const res = await fetch("https://formsubmit.co/ajax/murlikhaire28@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === "false" || data.success === false) {
      throw new Error(data.message || "Request failed");
    }
    form.reset();
    statusEl.classList.add("ok");
    statusEl.textContent = "Thanks! Your message has been sent. I'll reply soon.";
  } catch (err) {
    statusEl.classList.add("error");
    statusEl.textContent =
      "Sorry, the message couldn't be sent. Please email me at murlikhaire28@gmail.com.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send message";
  }
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
