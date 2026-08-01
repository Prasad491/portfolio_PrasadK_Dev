import './Button.css';

function Button({
  children,
  variant = 'primary',
  type = 'button',
  href,
  download,
  disabled = false,
  onClick,
  ariaLabel,
}) {
  const className = `button button--${variant}`;

  if (href) {
    return (
      <a
        className={className}
        href={href}
        download={download || undefined}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default Button;
