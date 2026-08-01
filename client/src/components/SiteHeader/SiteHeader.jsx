import { useEffect, useId, useState } from 'react';
import SocialIcon from '../SocialIcon/SocialIcon';
import './SiteHeader.css';
import { NAV_ITEMS, UI_STRINGS } from '../../constants/uiStrings';
import { useTheme } from '../../hooks/useTheme';
import { getResumeDownloadUrl } from '../../services/portfolioService';

function ThemeIcon({ isDark }) {
  if (isDark) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none">
        <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.75v2.1M12 19.15v2.1M21.25 12h-2.1M4.85 12H2.75M18.54 5.46l-1.48 1.48M6.94 17.06l-1.48 1.48M18.54 18.54l-1.48-1.48M6.94 6.94 5.46 5.46"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none">
      <path
        d="M20.2 14.35A7.85 7.85 0 0 1 9.65 3.8 8.7 8.7 0 1 0 20.2 14.35Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SiteHeader({ name, socials = [], hiddenNavIds = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const menuId = useId();
  const navItems = NAV_ITEMS.filter((item) => !hiddenNavIds.includes(item.id));
  const resumeUrl = getResumeDownloadUrl();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 980) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={`site-header${isMenuOpen ? ' site-header--open' : ''}`}>
      <div className="site-header__glow" aria-hidden="true" />
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top" onClick={closeMenu}>
          <span className="site-header__mark" aria-hidden="true">
            {name?.charAt(0) || 'P'}
          </span>
          <span className="site-header__brand-text">
            <span className="site-header__brand-name">{name}</span>
            <span className="site-header__brand-tag">Portfolio</span>
          </span>
        </a>

        <nav className="site-header__nav site-header__nav--desktop" aria-label={UI_STRINGS.navLabel}>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          {socials.length > 0 ? (
            <nav className="site-header__socials" aria-label={UI_STRINGS.socialNavLabel}>
              {socials.slice(0, 3).map((item) => (
                <SocialIcon key={item.label} label={item.label} url={item.url} />
              ))}
            </nav>
          ) : null}

          <button
            type="button"
            className="site-header__theme"
            onClick={toggleTheme}
            aria-label={isDark ? UI_STRINGS.switchToLight : UI_STRINGS.switchToDark}
            title={isDark ? UI_STRINGS.switchToLight : UI_STRINGS.switchToDark}
          >
            <ThemeIcon isDark={isDark} />
          </button>

          <a className="site-header__resume" href={resumeUrl}>
            {UI_STRINGS.downloadResume}
          </a>

          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? UI_STRINGS.closeMenu : UI_STRINGS.openMenu}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="site-header__toggle-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`site-header__panel${isMenuOpen ? ' is-open' : ''}`}
        id={menuId}
        hidden={!isMenuOpen}
      >
        <div className="site-header__panel-inner">
          <p className="site-header__panel-kicker">{UI_STRINGS.menuTitle}</p>
          <nav aria-label={UI_STRINGS.navLabel}>
            <ul className="site-header__panel-links">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={closeMenu}>
                    <span className="site-header__panel-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__panel-footer">
            <a className="site-header__panel-resume" href={resumeUrl} onClick={closeMenu}>
              {UI_STRINGS.downloadResume} →
            </a>
            {socials.length > 0 ? (
              <nav className="site-header__panel-socials" aria-label={UI_STRINGS.socialNavLabel}>
                {socials.slice(0, 3).map((item) => (
                  <SocialIcon key={`panel-${item.label}`} label={item.label} url={item.url} />
                ))}
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
