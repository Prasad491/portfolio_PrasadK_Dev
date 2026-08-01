import { UI_STRINGS } from '../../constants/uiStrings';
import './Companies.css';

function CompanyItem({ company }) {
  return (
    <span className="companies__item">
      {company.logoUrl ? (
        <img
          className="companies__logo"
          src={company.logoUrl}
          alt=""
          width={28}
          height={28}
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <span className="companies__name">{company.name}</span>
    </span>
  );
}

function Companies({ experience = [] }) {
  const companies = [];
  const seen = new Set();

  experience.forEach((item) => {
    if (!item.company || seen.has(item.company)) {
      return;
    }
    seen.add(item.company);
    companies.push({
      name: item.company,
      logoUrl: item.logoUrl || '',
    });
  });

  if (!companies.length) {
    return null;
  }

  return (
    <section className="companies" aria-label={UI_STRINGS.companiesLabel}>
      <div className="companies__viewport">
        <div className="companies__track">
          <div className="companies__group">
            {companies.map((company) => (
              <CompanyItem key={company.name} company={company} />
            ))}
          </div>
          <div className="companies__group" aria-hidden="true">
            {companies.map((company) => (
              <CompanyItem key={`dup-${company.name}`} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Companies;
