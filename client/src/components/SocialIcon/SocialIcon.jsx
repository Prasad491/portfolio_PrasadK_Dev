import './SocialIcon.css';

function resolveKind(label = '', url = '') {
  const value = `${label} ${url}`.toLowerCase();

  if (value.includes('linkedin')) {
    return 'linkedin';
  }

  if (value.includes('mailto:') || value.includes('gmail') || value.includes('email') || value.includes('mail')) {
    return 'email';
  }

  if (value.includes('tel:') || value.includes('call') || value.includes('phone')) {
    return 'phone';
  }

  if (value.includes('github')) {
    return 'github';
  }

  return 'link';
}

function SocialIcon({ label, url, className = '' }) {
  const kind = resolveKind(label, url);
  const external = url.startsWith('http');
  const classes = ['social-icon', `social-icon--${kind}`, className].filter(Boolean).join(' ');

  return (
    <a
      className={classes}
      href={url}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      title={label}
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {kind === 'linkedin' ? (
          <path
            fill="currentColor"
            d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.14h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.74c0-1.85-.03-4.22-2.57-4.22-2.57 0-2.97 2.01-2.97 4.09V24H8.34V8.25z"
          />
        ) : null}

        {kind === 'email' ? (
          <path
            fill="currentColor"
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
          />
        ) : null}

        {kind === 'phone' ? (
          <path
            fill="currentColor"
            d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.4 21 3 13.6 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
          />
        ) : null}

        {kind === 'github' ? (
          <path
            fill="currentColor"
            d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.79 8.21 11.37.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.02-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.77-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"
          />
        ) : null}

        {kind === 'link' ? (
          <path
            fill="currentColor"
            d="M3.9 12a5 5 0 0 1 5-5h4v2h-4a3 3 0 1 0 0 6h4v2h-4a5 5 0 0 1-5-5zm7-1h6v2h-6v-2zm4.1-4h4a5 5 0 0 1 0 10h-4v-2h4a3 3 0 1 0 0-6h-4V7z"
          />
        ) : null}
      </svg>
    </a>
  );
}

export default SocialIcon;
