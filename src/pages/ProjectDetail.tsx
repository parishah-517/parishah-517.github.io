import { Link, Navigate, useParams } from "react-router-dom";
import { ConnectSection } from "../components/ConnectSection";
import { DetailCarousel } from "../components/DetailCarousel";
import type { CSSProperties } from "react";
import type { CardMedia, DetailTriptych, Project } from "../data";
import { getProjectBySlug } from "../data";
import { imageMediaStyle } from "../projectImageStyle";

function triptychSideImageStyle(
  side: DetailTriptych["left"]
): CSSProperties | undefined {
  const style: CSSProperties = {};
  if (side.objectPosition) style.objectPosition = side.objectPosition;
  if (side.translateY) style.transform = `translateY(${side.translateY})`;
  return Object.keys(style).length > 0 ? style : undefined;
}

function detailHeroMedia(project: Project): CardMedia | null {
  if (project.detailMedia) return project.detailMedia;
  if (project.cardMedia.kind === "image") return project.cardMedia;
  return null;
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const hero = detailHeroMedia(project);
  const detailImageContain =
    hero?.kind === "image" && hero.objectFit === "contain";
  const showHero = Boolean(hero && !project.detailTriptych);

  const toolsLinksSection = (
    <>
      <div className="project-detail-tools-block">
        <p className="eyebrow project-detail-section-subheader project-detail-tools-label">Tools</p>
        <p className="meta project-detail-tools-values">{project.tools}</p>
      </div>
      {project.links && project.links.length > 0 && (
        <div className="project-detail-links-block">
          <p className="eyebrow project-detail-section-subheader project-detail-links-label">Links</p>
          <div className="inline-links project-detail-links">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <article className="project-detail">
      <p className="project-detail-back">
        <Link to="/#projects">← Projects</Link>
      </p>
      <header className="project-detail-header">
        <p className="eyebrow">Project</p>
        <h1>{project.title}</h1>
        {project.dates && <p className="meta project-dates">{project.dates}</p>}
      </header>
      <div className="project-detail-body project-detail-intro">
        <p className="lead">{project.summary}</p>
        {toolsLinksSection}
        {project.detailAppVideo?.heading && (
          <p className="eyebrow project-detail-section-subheader project-detail-app-heading-intro">
            {project.detailAppVideo.heading}
          </p>
        )}
      </div>
      {project.detailAppVideo && (
        <div className="project-detail-meta-app-row">
          <div className="project-detail-meta-app-row-media">
            <div className="project-detail-app-video-frame">
              <video
                className="project-detail-app-video-el"
                src={project.detailAppVideo.video.src}
                poster={project.detailAppVideo.video.poster}
                muted
                playsInline
                loop
                autoPlay
                controls
                aria-label={project.detailAppVideo.video.alt}
              />
            </div>
          </div>
          <div className="project-detail-meta-app-row-left">
            <div className="project-detail-app-copy">
              <p className="project-detail-app-video-desc">{project.detailAppVideo.description}</p>
            </div>
          </div>
        </div>
      )}
      {project.detailCarousel && project.detailCarousel.length > 0 && (
        <div className="project-detail-carousel-section">
          {project.detailCarouselHeading && (
            <p className="eyebrow project-detail-section-subheader">{project.detailCarouselHeading}</p>
          )}
          <DetailCarousel slides={project.detailCarousel} label={project.title} />
        </div>
      )}
      {project.detailVideos && project.detailVideos.length > 0 && (
        <div className="project-detail-videos-section">
          {project.detailVideosHeading && (
            <p className="eyebrow project-detail-section-subheader">{project.detailVideosHeading}</p>
          )}
          {(project.detailVideosIntro || project.detailVideosDuration) && (
            <div className="project-detail-videos-preamble">
              {project.detailVideosIntro && (
                <p className="lead project-detail-videos-intro">{project.detailVideosIntro}</p>
              )}
              {project.detailVideosDuration && (
                <p className="meta project-detail-videos-duration">
                  <strong>Duration:</strong> {project.detailVideosDuration}
                </p>
              )}
            </div>
          )}
          <div className="project-detail-video-row">
            {project.detailVideos.map((clip) => (
              <div
                className={`project-detail-video-cell${clip.fullWidth ? " project-detail-video-cell--full" : ""}`}
                key={clip.src}
              >
                <p className="project-detail-video-label">{clip.label}</p>
                <div className="project-detail-video-wrap">
                  <video
                    className="project-detail-video project-detail-video--pair"
                    src={clip.src}
                    muted
                    playsInline
                    loop
                    autoPlay
                    controls
                    aria-label={clip.alt}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {project.detailTriptych && (
        <div className="project-detail-triptych-wrap">
          {project.detailTriptych.heading && (
            <p className="eyebrow project-detail-section-subheader">{project.detailTriptych.heading}</p>
          )}
          {project.detailTriptych.intro && (
            <p className="project-detail-triptych-intro">{project.detailTriptych.intro}</p>
          )}
          <div className="project-detail-triptych">
            <div className="project-detail-triptych-cell">
              <img
                src={project.detailTriptych.left.src}
                alt={project.detailTriptych.left.alt}
                loading="lazy"
                style={triptychSideImageStyle(project.detailTriptych.left)}
              />
            </div>
            <div className="project-detail-triptych-cell">
              <video
                className="project-detail-triptych-video"
                src={project.detailTriptych.centerVideo.src}
                muted
                playsInline
                loop
                autoPlay
                controls
                aria-label={project.detailTriptych.centerVideo.alt}
              />
            </div>
            <div className="project-detail-triptych-cell">
              <img
                src={project.detailTriptych.right.src}
                alt={project.detailTriptych.right.alt}
                loading="lazy"
                style={triptychSideImageStyle(project.detailTriptych.right)}
              />
            </div>
          </div>
        </div>
      )}
      {showHero && hero && (
        <div
          className={`project-detail-media${detailImageContain ? " project-detail-media--contain" : ""}`}
        >
          {hero.kind === "video" ? (
            <video
              className="project-detail-video"
              src={hero.src}
              muted
              playsInline
              loop
              autoPlay
              controls
              aria-label={hero.alt}
            />
          ) : (
            <img
              src={hero.src}
              alt={hero.alt}
              style={imageMediaStyle(hero)}
            />
          )}
        </div>
      )}
      <ConnectSection variant="footer" />
    </article>
  );
}
