import { useState } from 'react';
import Button from '../Button/Button';
import { UI_STRINGS } from '../../constants/uiStrings';
import { getResumeDownloadUrl } from '../../services/portfolioService';
import './Hero.css';

function Hero({ profile }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const displayName = profile.shortName || profile.name;
  const linkedInUrl =
    profile.linkedinUrl ||
    profile.socials?.find((item) => item.label.toLowerCase().includes('linkedin'))?.url;
  const mailUrl = `mailto:${profile.email}`;
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__hello">
            {UI_STRINGS.helloPrefix} <span>{displayName}</span>
          </p>
          <h1 className="hero__heading" id="hero-heading">
            a <span>{profile.title}</span>.
          </h1>
          <p className="hero__tagline">{profile.tagline}</p>
          <p className="hero__location">{profile.location}</p>

          <div className="hero__contacts">
            <a className="hero__contact-chip hero__contact-chip--mail" href={mailUrl}>
              <span className="hero__contact-label">{UI_STRINGS.emailMeLabel}</span>
              <span className="hero__contact-value">{profile.email}</span>
              <span className="sr-only">{UI_STRINGS.openMailHint}</span>
            </a>
            {linkedInUrl ? (
              <a
                className="hero__contact-chip hero__contact-chip--linkedin"
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="hero__contact-label">{UI_STRINGS.linkedInLabel}</span>
                <span className="hero__contact-value">linkedin.com/in/prasad-kulkarni</span>
              </a>
            ) : null}
          </div>

          <div className="hero__actions">
            <Button href="#projects">{UI_STRINGS.viewWork} →</Button>
            <Button href={getResumeDownloadUrl()} variant="secondary">
              {UI_STRINGS.downloadResume}
            </Button>
            <Button href="#contact" variant="ghost">
              {UI_STRINGS.contactCta}
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__photo-wrap">
            {!photoFailed && profile.photoUrl ? (
              <img
                className="hero__photo"
                src={profile.photoUrl}
                alt={`${displayName} ${UI_STRINGS.photoAltSuffix}`}
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div className="hero__photo hero__photo--fallback" aria-hidden="true">
                {initials}
              </div>
            )}
          </div>
          <div className="hero__badge" aria-hidden="true">
            <strong>7+</strong>
            <span>Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
