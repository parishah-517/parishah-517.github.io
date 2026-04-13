import { Link } from "react-router-dom";
import type { Project } from "../data";
import { imageMediaStyle } from "../projectImageStyle";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const imageContain =
    project.cardMedia.kind === "image" && project.cardMedia.objectFit === "contain";

  return (
    <article className="project-card project-card--media">
      <Link to={`/projects/${project.slug}`} className="project-card-link">
        <div
          className={`project-card-visual${imageContain ? " project-card-visual--contain" : ""}`}
        >
          {project.cardMedia.kind === "video" ? (
            <video
              className="project-card-video"
              src={project.cardMedia.src}
              muted
              playsInline
              loop
              autoPlay
              aria-label={project.cardMedia.alt}
            />
          ) : (
            <img
              className="project-card-image"
              src={project.cardMedia.src}
              alt={project.cardMedia.alt}
              loading="lazy"
              style={imageMediaStyle(project.cardMedia)}
            />
          )}
        </div>
        <div className="project-card-caption">
          <span className="project-card-title">{project.title}</span>
          <span className="project-card-cta">View project →</span>
        </div>
      </Link>
    </article>
  );
}
