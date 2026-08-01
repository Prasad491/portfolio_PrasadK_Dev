import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import './About.css';

function normalizeEducation(education) {
  if (!education) {
    return [];
  }

  return Array.isArray(education) ? education : [education];
}

function About({ about, education, languages = [] }) {
  const educationItems = normalizeEducation(education);

  return (
    <section className="about section" id="about" aria-labelledby="about-heading">
      <div className="section__inner">
        <SectionHeading
          eyebrow={UI_STRINGS.aboutEyebrow}
          title={about.headline}
          id="about-heading"
        />
        <div className="about__grid">
          <div>
            <p className="about__body">{about.body}</p>

            {educationItems.length > 0 ? (
              <div className="about__education">
                <h3 className="about__focus-title">{UI_STRINGS.educationLabel}</h3>
                <ul className="about__education-list">
                  {educationItems.map((item) => (
                    <li key={`${item.school}-${item.degree}`}>
                      <p className="about__education-degree">{item.degree}</p>
                      <p className="about__education-school">
                        {item.school}
                        {item.period ? ` | ${item.period}` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="about__side">
            <div className="about__panel">
              <h3 className="about__focus-title">{UI_STRINGS.focusAreasLabel}</h3>
              <ul className="about__focus-list">
                {about.focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {languages.length > 0 ? (
              <div className="about__panel">
                <h3 className="about__focus-title">{UI_STRINGS.languagesLabel}</h3>
                <ul className="about__focus-list">
                  {languages.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
