import { useEffect, useState } from "react";
import { projects } from "./data";

const navSections = ["home", "projects", "about", "contact"] as const;

const skills = [
  "TypeScript",
  "React",
  "JavaScript",
  "Figma",
  "Python",
  "Algorithms",
  "User-Centered Design",
  "HTML",
  "CSS",
  "C++",
  "SQL",
  "Machine Learning"
];

const MOBILE_NAV_MAX = 767;

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [navOpen, setNavOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const topbar = document.querySelector(".topbar");
    const offset = (topbar?.getBoundingClientRect().height ?? 64) + 8;
    const top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const goToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setNavOpen(false);
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
    const updateActiveFromScroll = () => {
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
  }, []);

  const primaryNavLinks = (
    <>
      <button
        className={`nav-button${activeSection === "projects" ? " nav-button--active" : ""}`}
        type="button"
        onClick={() => goToSection("projects")}
        aria-current={activeSection === "projects" ? "page" : undefined}
      >
        Projects
      </button>
      <button
        className={`nav-button${activeSection === "about" ? " nav-button--active" : ""}`}
        type="button"
        onClick={() => goToSection("about")}
        aria-current={activeSection === "about" ? "page" : undefined}
      >
        About
      </button>
      <button
        className={`nav-button${activeSection === "contact" ? " nav-button--active" : ""}`}
        type="button"
        onClick={() => goToSection("contact")}
        aria-current={activeSection === "contact" ? "page" : undefined}
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
          <button
            className={`brand nav-button${activeSection === "home" ? " nav-button--active" : ""}`}
            type="button"
            onClick={() => goToSection("home")}
            aria-label="Home"
            aria-current={activeSection === "home" ? "page" : undefined}
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
          </button>
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

      <main>
        <section id="home" className="hero">
          <div className="hero-layout">
            <div className="hero-image-wrap">
              <img
                className="hero-image"
                src="/images/sketch.jpg"
                alt="Illustrated portrait of Pari Shah"
              />
            </div>
            <div className="hero-content">
              <div className="hero-headline-block">
                <h1>Pari Shah</h1>
                <p className="eyebrow">Software Engineer + UX/UI Designer</p>
              </div>
              <div className="hero-below">
                <p className="lead">
                  New York-based software engineer and UX/UI designer
                  focused on creating thoughtful, user-centered digital and
                  in-person experiences.
                </p>
                <div className="hero-actions">
                  <button className="nav-button" type="button" onClick={() => scrollToSection("projects")}>
                    Explore Projects
                  </button>
                  <a href="https://www.linkedin.com/in/pari-shah-41a888200/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href="https://github.com/parishah-517" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-head">
            <p className="eyebrow">Selected Work</p>
            <h2>Projects</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.dates && <p className="meta project-dates">{project.dates}</p>}
                <p className="meta">{project.tools}</p>
                {project.links && (
                  <div className="inline-links">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <div>
            <p className="eyebrow">About</p>
            <h2>Background</h2>
            <p>
              I graduated from the University of Michigan with a B.S.
              in Computer Science and Cognitive Science. I enjoy working at the
              intersection of software engineering, product strategy, and
              UX/UI design.
            </p>
          </div>

          <div className="skill-block">
            <h3>Core Skills</h3>
            <ul className="skill-list">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section education">
          <div className="section-head">
            <p className="eyebrow">Education</p>
            <h2>University of Michigan</h2>
          </div>
          <p className="lead small">
            B.S. in Computer Science and Cognitive Science, Dec 2023
          </p>
          <p className="meta">
            Relevant coursework includes Web Systems, Database
            Systems, User-Centered Software Development, UI Development, Algorithms, and Machine Learning.
          </p>
        </section>

        <section id="contact" className="section contact">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s connect</h2>
          <p className="lead small">
          Open to new opportunities and collaborations across product and design.
          </p>
          <div className="hero-actions">
            <a href="mailto:shahpari@umich.edu">Email</a>
            <a href="tel:7329170667">Phone</a>
            <a href="https://www.linkedin.com/in/pari-shah-41a888200/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
