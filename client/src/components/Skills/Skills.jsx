import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import './Skills.css';

function Skills({ skills }) {
  const groups = Object.entries(skills || {});

  return (
    <section className="skills section" id="skills" aria-labelledby="skills-heading">
      <div className="section__inner">
        <SectionHeading
          eyebrow={UI_STRINGS.skillsEyebrow}
          title={UI_STRINGS.skillsTitle}
          id="skills-heading"
        />
        <div className="skills__showcase">
          {groups.map(([group, items], groupIndex) => (
            <article
              key={group}
              className={`skills__group skills__group--accent-${(groupIndex % 4) + 1}`}
              style={{ animationDelay: `${groupIndex * 80}ms` }}
            >
              <header className="skills__header">
                <span className="skills__index">{String(groupIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{group}</h3>
                  <p>{items.length} capabilities</p>
                </div>
              </header>
              <ul className="skills__cloud">
                {items.map((skill, skillIndex) => (
                  <li
                    key={skill}
                    className={skillIndex % 5 === 0 ? 'skills__chip skills__chip--hot' : 'skills__chip'}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
