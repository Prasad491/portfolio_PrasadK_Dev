import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import './Experience.css';

function getCompanyInitials(company = '') {
  return company
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function CompanyMark({ company, logoUrl, className }) {
  const initials = getCompanyInitials(company);

  if (logoUrl) {
    return (
      <img
        className={className}
        src={logoUrl}
        alt=""
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return <span className={className}>{initials}</span>;
}

function Experience({ experience }) {
  return (
    <section className="experience section" id="experience" aria-labelledby="experience-heading">
      <div className="section__inner">
        <SectionHeading
          eyebrow={UI_STRINGS.experienceEyebrow}
          title={UI_STRINGS.experienceTitle}
          id="experience-heading"
        />

        <ol className="experience__rail">
          {experience.map((item, index) => {
            const isCurrent = /present/i.test(item.period);

            return (
              <li
                key={`${item.company}-${item.role}-${item.period}`}
                className={`experience__stop experience__stop--tone-${(index % 3) + 1}${isCurrent ? ' is-current' : ''}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="experience__axis" aria-hidden="true">
                  <span className={`experience__node${item.logoUrl ? ' experience__node--logo' : ''}`}>
                    <CompanyMark
                      company={item.company}
                      logoUrl={item.logoUrl}
                      className={item.logoUrl ? 'experience__node-logo' : undefined}
                    />
                  </span>
                </div>

                <article className="experience__card">
                  <p className="experience__company">{item.company}</p>

                  <div className="experience__badges">
                    {isCurrent ? (
                      <span className="experience__badge experience__badge--live">
                        {UI_STRINGS.currentRoleLabel}
                      </span>
                    ) : null}
                    <span className="experience__badge">{item.period}</span>
                    <span className="experience__badge experience__badge--soft">{item.location}</span>
                  </div>

                  <h3 className="experience__role">{item.role}</h3>
                  <p className="experience__summary">{item.summary}</p>

                  <ul className="experience__highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>
                        <span className="experience__check" aria-hidden="true">
                          ✓
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default Experience;
