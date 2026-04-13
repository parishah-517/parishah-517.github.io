import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "./scroll";

const navSections = ["home", "projects", "about", "contact"] as const;

const MOBILE_NAV_MAX = 767;

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [navOpen, setNavOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const goToSection = (sectionId: string) => {
    setNavOpen(false);
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  useEffect(() => {
    if (!navOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_NAV_MAX) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const hash = location.hash.slice(1);
    if (hash) {
      const t = window.setTimeout(() => scrollToSection(hash), 80);
      return () => window.clearTimeout(t);
    }
  }, [isHome, location.hash]);

  useEffect(() => {
    if (!isHome) return;

    const updateActiveFromScroll = () => {
      const docEl = document.documentElement;
      const canScroll = docEl.scrollHeight > docEl.clientHeight + 1;
      if (canScroll) {
        const scrollBottom = window.scrollY + window.innerHeight;
        if (scrollBottom >= docEl.scrollHeight - 2) {
          setActiveSection(navSections[navSections.length - 1]);
          return;
        }
      }

      const topbar = document.querySelector(".topbar");
      const offset = (topbar?.getBoundingClientRect().height ?? 64) + 8;
      const scrollLine = window.scrollY + offset;

      for (let i = navSections.length - 1; i >= 0; i--) {
        const id = navSections[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const sectionTop = el.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= scrollLine) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("home");
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, [isHome]);

  useEffect(() => {
    if (location.pathname.startsWith("/projects")) {
      setActiveSection("projects");
    }
  }, [location.pathname]);

  const projectsNavActive =
    activeSection === "projects" || location.pathname.startsWith("/projects");
  const homeNavActive = isHome && activeSection === "home";

  const primaryNavLinks = (
    <>
      <button
        className={`nav-button${projectsNavActive ? " nav-button--active" : ""}`}
        type="button"
        onClick={() => goToSection("projects")}
        aria-current={projectsNavActive ? "page" : undefined}
      >
        Projects
      </button>
      <button
        className={`nav-button${activeSection === "about" && isHome ? " nav-button--active" : ""}`}
        type="button"
        onClick={() => goToSection("about")}
        aria-current={activeSection === "about" && isHome ? "page" : undefined}
      >
        About
      </button>
      <button
        className={`nav-button${activeSection === "contact" && isHome ? " nav-button--active" : ""}`}
        type="button"
        onClick={() => goToSection("contact")}
        aria-current={activeSection === "contact" && isHome ? "page" : undefined}
      >
        Contact
      </button>
      <a
        className="nav-link"
        href="/pdfs/Pari_Shah_Resume_2026.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setNavOpen(false)}
      >
        Resume
      </a>
    </>
  );

  return (
    <div className="site">
      <header className="topbar">
        <div className="topbar-row">
          <Link
            className={`brand nav-button${homeNavActive ? " nav-button--active" : ""}`}
            to="/"
            aria-label="Home"
            aria-current={homeNavActive ? "page" : undefined}
            onClick={() => setNavOpen(false)}
          >
            <svg
              className="brand-home-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden={true}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>
          <button
            type="button"
            className={`nav-toggle${navOpen ? " nav-toggle--open" : ""}`}
            aria-expanded={navOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className="nav-toggle-bar" aria-hidden />
            <span className="nav-toggle-bar" aria-hidden />
            <span className="nav-toggle-bar" aria-hidden />
            <span className="visually-hidden">Toggle menu</span>
          </button>
          <div className="nav-desktop-wrap">
            <nav id="primary-nav" className="nav" aria-label="Primary">
              {primaryNavLinks}
            </nav>
          </div>
        </div>
        <div
          id="mobile-nav-panel"
          className={`nav-mobile-dropdown${navOpen ? " nav-mobile-dropdown--open" : ""}`}
          aria-hidden={!navOpen}
        >
          <nav className="nav nav--mobile-dropdown" aria-label="Primary">
            {primaryNavLinks}
          </nav>
        </div>
      </header>

      <main className={location.pathname.startsWith("/projects/") ? "main--project-detail" : undefined}>
        <Outlet />
      </main>
    </div>
  );
}
