import { useEffect, useState } from 'react';
import About from './components/About/About';
import Blogs from './components/Blogs/Blogs';
import Companies from './components/Companies/Companies';
import Contact from './components/Contact/Contact';
import Experience from './components/Experience/Experience';
import Features from './components/Features/Features';
import Hero from './components/Hero/Hero';
import Inbox from './components/Inbox/Inbox';
import Projects from './components/Projects/Projects';
import Recognition from './components/Recognition/Recognition';
import SiteFooter from './components/SiteFooter/SiteFooter';
import SiteHeader from './components/SiteHeader/SiteHeader';
import Skills from './components/Skills/Skills';
import StatusPanel from './components/StatusPanel/StatusPanel';
import { UI_STRINGS } from './constants/uiStrings';
import { usePortfolio } from './hooks/usePortfolio';
import './App.css';

function getViewFromHash() {
  return window.location.hash === '#inbox' ? 'inbox' : 'site';
}

function App() {
  const { data, isLoading, error, reload } = usePortfolio();
  const [view, setView] = useState(getViewFromHash);

  useEffect(() => {
    function handleHashChange() {
      setView(getViewFromHash());
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!data?.seo) {
      return undefined;
    }

    document.title = data.seo.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', data.seo.description);
    }

    return undefined;
  }, [data]);

  function backToSite() {
    window.location.hash = 'contact';
  }

  if (isLoading) {
    return <StatusPanel mode="loading" />;
  }

  if (error || !data) {
    return <StatusPanel mode="error" onRetry={reload} />;
  }

  const brandName = data.profile.shortName || data.profile.name;
  const hiddenNavIds = data.blogs?.length ? [] : ['blogs'];

  if (view === 'inbox') {
    return (
      <div className="app">
        <a className="skip-link" href="#inbox">
          {UI_STRINGS.skipToContent}
        </a>
        <SiteHeader name={brandName} socials={data.profile.socials} hiddenNavIds={hiddenNavIds} />
        <main id="main">
          <Inbox onBack={backToSite} />
        </main>
        <SiteFooter name={brandName} />
      </div>
    );
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {UI_STRINGS.skipToContent}
      </a>
      <SiteHeader name={brandName} socials={data.profile.socials} hiddenNavIds={hiddenNavIds} />
      <main id="main">
        <Hero profile={data.profile} />
        <Companies experience={data.experience} />
        <About about={data.about} education={data.education} languages={data.languages} />
        <Features services={data.services} />
        <Projects projects={data.projects} />
        <Recognition certifications={data.certifications} achievements={data.achievements} />
        <Experience experience={data.experience} />
        <Skills skills={data.skills} />
        <Blogs blogs={data.blogs} />
        <Contact
          socials={data.profile.socials}
          email={data.profile.email}
          linkedinUrl={data.profile.linkedinUrl}
        />
      </main>
      <SiteFooter name={brandName} />
    </div>
  );
}

export default App;
