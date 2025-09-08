/* ========= Global Site JS (shared) ========= */

// 1) Theme: saved > system > default(light)
(function(){
  const root = document.documentElement;
  const btn  = document.getElementById("themeToggle");
  const sun  = document.getElementById("iconSun");
  const moon = document.getElementById("iconMoon");
  const label= document.getElementById("toggleLabel");

  function setTheme(mode){
    root.setAttribute("data-theme", mode);
    const dark = mode === "dark";
    if (btn) btn.setAttribute("aria-pressed", String(dark));
    if (sun)  sun.style.display  = dark ? "none" : "inline";
    if (moon) moon.style.display = dark ? "inline" : "none";
    if (label) label.textContent = dark ? "Light" : "Dark";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0b1220" : "#4CAF50");
  }

  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  setTheme(saved || (prefersDark ? "dark" : "light"));

  btn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  });
})();

// 2) Fade-in on scroll (sections, cards, anything with .fade-on-scroll)
(function(){
  const targets = document.querySelectorAll("section, .fade-on-scroll, .cards .card, header .fade-in-hero");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => obs.observe(el));
})();