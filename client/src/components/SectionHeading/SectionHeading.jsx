import './SectionHeading.css';

function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      {title ? (
        <h2 className="section-heading__title" id={id}>
          {title}
        </h2>
      ) : null}
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}

export default SectionHeading;
