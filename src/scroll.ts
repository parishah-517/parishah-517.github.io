/** Scroll so section id sits below the sticky top bar. */
export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const topbar = document.querySelector(".topbar");
  const offset = (topbar?.getBoundingClientRect().height ?? 64) + 8;
  const top = window.scrollY + el.getBoundingClientRect().top - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
