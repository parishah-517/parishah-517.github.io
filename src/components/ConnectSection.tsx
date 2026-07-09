type Variant = "home" | "footer";

type Props = {
  variant?: Variant;
};

export function ConnectSection({ variant = "home" }: Props) {
  const headingId = variant === "footer" ? "project-connect-heading" : undefined;

  const inner = (
    <>
      <p className="eyebrow">Contact</p>
      <h2 {...(headingId ? { id: headingId } : {})}>Let&apos;s connect</h2>
      <p className="lead small">
        Open to new opportunities and collaborations across product, design, and engineering.
      </p>
      <div className="hero-actions">
        <a href="mailto:shahpari@umich.edu">Email</a>
        <a href="tel:7329170667">Phone</a>
        <a
          href="https://www.linkedin.com/in/pari-shah-41a888200/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </>
  );

  if (variant === "footer") {
    return (
      <footer
        className="section contact project-detail-connect"
        aria-labelledby={headingId}
      >
        {inner}
      </footer>
    );
  }

  return (
    <section id="contact" className="section contact">
      {inner}
    </section>
  );
}
