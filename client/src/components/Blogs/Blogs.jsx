import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import './Blogs.css';

function Blogs({ blogs = [] }) {
  if (!blogs.length) {
    return null;
  }

  return (
    <section className="blogs section" id="blogs" aria-labelledby="blogs-heading">
      <div className="section__inner">
        <SectionHeading
          eyebrow={UI_STRINGS.blogsEyebrow}
          title={UI_STRINGS.blogsTitle}
          id="blogs-heading"
        />
        <div className="blogs__grid">
          {blogs.map((post) => (
            <article key={post.url || post.title} className="blogs__card">
              <p className="blogs__meta">
                {[post.platform, post.publishedAt].filter(Boolean).join(' · ')}
              </p>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              {post.url ? (
                <a href={post.url} target="_blank" rel="noreferrer">
                  {UI_STRINGS.readArticle} →
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blogs;
