import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import './Features.css';

const ICON_PATHS = {
  web: 'M4 7h16v10H4z M8 21h8 M12 17v4',
  app: 'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M11 18h2',
  lead: 'M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z M4 21a8 8 0 0 1 16 0',
  qa: 'M9 12l2 2 4-4 M12 3a9 9 0 1 1-9 9 9 9 0 0 1 9-9z',
};

function FeatureIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="features__icon">
      <path
        d={ICON_PATHS[name] || ICON_PATHS.web}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Features({ services }) {
  if (!services?.length) {
    return null;
  }

  return (
    <section className="features section" id="features" aria-labelledby="features-heading">
      <div className="section__inner">
        <SectionHeading
          eyebrow={UI_STRINGS.featuresEyebrow}
          title={UI_STRINGS.featuresTitle}
          id="features-heading"
        />
        <div className="features__grid">
          {services.map((service) => (
            <article key={service.title} className="features__card">
              <FeatureIcon name={service.icon} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
