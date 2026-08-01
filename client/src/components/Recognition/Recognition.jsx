import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import './Recognition.css';

function getCertificationLabel(item) {
  return typeof item === 'string' ? item : item.title;
}

function Recognition({ certifications = [], achievements = [] }) {
  const certItems = certifications.map((item) =>
    typeof item === 'string'
      ? { title: item, issuer: '', period: '', url: '', type: 'certification' }
      : item
  );

  if (!certItems.length && !achievements.length) {
    return null;
  }

  return (
    <section className="recognition section" id="recognition" aria-labelledby="recognition-heading">
      <div className="section__inner">
        <SectionHeading
          eyebrow={UI_STRINGS.recognitionEyebrow}
          title={UI_STRINGS.recognitionTitle}
          id="recognition-heading"
        />

        {certItems.length > 0 ? (
          <div className="recognition__block">
            <h3 className="recognition__subtitle">{UI_STRINGS.certificationsLabel}</h3>
            <div className="recognition__certs">
              {certItems.map((cert) => (
                <article key={getCertificationLabel(cert)} className="recognition__cert-card">
                  <div className="recognition__cert-badge" aria-hidden="true">
                    {cert.issuer?.toLowerCase().includes('microsoft') ? 'Az' : 'Cr'}
                  </div>
                  <div className="recognition__cert-body">
                    <h4>{cert.title}</h4>
                    {cert.issuer ? <p className="recognition__issuer">{cert.issuer}</p> : null}
                    {cert.period ? <p className="recognition__period">{cert.period}</p> : null}
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noreferrer">
                        {UI_STRINGS.viewCredential} →
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {achievements.length > 0 ? (
          <div className="recognition__block">
            <h3 className="recognition__subtitle">Company achievements</h3>
            <div className="recognition__awards">
              {achievements.map((award) => (
                <article key={`${award.organization}-${award.title}`} className="recognition__award-card">
                  <div className="recognition__award-visual" aria-hidden="true">
                    <span className="recognition__seal">{award.period || 'Award'}</span>
                    <strong>{award.organization}</strong>
                  </div>
                  <div className="recognition__award-body">
                    <p className="recognition__award-kicker">{award.type === 'company-award' ? 'Internal recognition' : 'Achievement'}</p>
                    <h4>{award.title}</h4>
                    {award.highlight ? <p className="recognition__highlight">{award.highlight}</p> : null}
                    <p className="recognition__summary">{award.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Recognition;
