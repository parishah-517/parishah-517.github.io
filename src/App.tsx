import { projects } from "./data";

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

export default function App() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site">
      <header className="topbar">
        <button className="brand nav-button" type="button" onClick={() => scrollToSection("home")}>
          Pari Shah
        </button>
        <nav className="nav">
          <button className="nav-button" type="button" onClick={() => scrollToSection("projects")}>
            Projects
          </button>
          <button className="nav-button" type="button" onClick={() => scrollToSection("about")}>
            About
          </button>
          <button className="nav-button" type="button" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
          <a href="/pdfs/Pari_Shah_Resume_2026.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
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
                <p className="eyebrow">Software Engineer + Product Designer</p>
                <h1>
                  Building thoughtful digital and in-person experiences.
                </h1>
              </div>
              <div className="hero-below">
                <p className="lead">
                  I&apos;m Pari Shah, a New York-based software engineer and product
                  designer focused on creating impactful, user-centered
                  experiences across digital products and in-person communities.
                </p>
                <div className="hero-actions">
                  <button className="nav-button primary-link" type="button" onClick={() => scrollToSection("projects")}>
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
                <p className="meta">{project.context}</p>
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
              intersection of software engineering, product strategy, and user
              experience.
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
