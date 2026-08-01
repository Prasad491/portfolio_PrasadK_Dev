import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import './Projects.css';

function Projects({ projects }) {
  return (
    <section className="projects section" id="projects" aria-labelledby="projects-heading">
      <div className="section__inner">
        <SectionHeading
          eyebrow={UI_STRINGS.projectsEyebrow}
          title={UI_STRINGS.projectsTitle}
          id="projects-heading"
        />
        <div className="projects__grid">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`projects__card projects__card--tone-${(index % 3) + 1}`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="projects__glow" aria-hidden="true" />
              <div className="projects__thumb" aria-hidden="true">
                <span className="projects__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="projects__orb" />
              </div>
              <div className="projects__body">
                <div className="projects__meta">
                  <h3 className="projects__title">{project.title}</h3>
                  <span className="projects__count">{project.tech.length} stack</span>
                </div>
                <p className="projects__summary">{project.summary}</p>
                <ul className="projects__outcomes">
                  {project.outcomes.slice(0, 2).map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
                <div className="projects__footer">
                  <ul className="projects__tech" aria-label={UI_STRINGS.techLabel}>
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  {project.links?.length ? (
                    <nav className="projects__links" aria-label={UI_STRINGS.projectLinksLabel}>
                      {project.links.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                          {link.label} →
                        </a>
                      ))}
                    </nav>
                  ) : (
                    <span className="projects__tag">Enterprise delivery</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
