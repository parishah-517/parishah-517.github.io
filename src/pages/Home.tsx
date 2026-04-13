import { ConnectSection } from "../components/ConnectSection";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data";

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

type Props = {
  scrollToSection: (sectionId: string) => void;
};

export default function Home(props: Props) {
  const { scrollToSection } = props;
  return (
    <>
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
                Software engineer and UX/UI designer based in the NYC metro area,
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
            <ProjectCard key={project.slug} project={project} />
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

      <ConnectSection variant="home" />
    </>
  );
}
