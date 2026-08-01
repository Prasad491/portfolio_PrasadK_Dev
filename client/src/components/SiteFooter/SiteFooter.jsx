import { UI_STRINGS } from '../../constants/uiStrings';
import './SiteFooter.css';

function SiteFooter({ name }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          © {year} {name}
        </p>
        <p>{UI_STRINGS.footerNote}</p>
      </div>
    </footer>
  );
}

export default SiteFooter;
