import { useEffect, useId, useState } from 'react';
import Button from '../Button/Button';
import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import { fetchContactMessages } from '../../services/portfolioService';
import './Inbox.css';

function Inbox({ onBack }) {
  const keyFieldId = useId();
  const defaultKey = import.meta.env.VITE_MESSAGES_VIEW_KEY || '';
  const [accessKey, setAccessKey] = useState(defaultKey);
  const [messages, setMessages] = useState([]);
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function loadMessages(key = accessKey) {
    if (!key.trim()) {
      setError(UI_STRINGS.inboxUnauthorized);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload = await fetchContactMessages(key.trim());
      setMessages(payload.data || []);
      setEmailConfigured(Boolean(payload.emailConfigured));
    } catch {
      setMessages([]);
      setError(UI_STRINGS.inboxUnauthorized);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (defaultKey) {
      loadMessages(defaultKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="inbox section" id="inbox" aria-labelledby="inbox-heading">
      <div className="section__inner">
        <SectionHeading
          eyebrow={UI_STRINGS.inboxEyebrow}
          title={UI_STRINGS.inboxTitle}
          description={UI_STRINGS.inboxBody}
          id="inbox-heading"
        />

        <div className="inbox__toolbar">
          <div className="inbox__key-field">
            <label htmlFor={keyFieldId}>{UI_STRINGS.inboxKeyLabel}</label>
            <input
              id={keyFieldId}
              type="password"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="inbox__actions">
            <Button type="button" onClick={() => loadMessages()} disabled={isLoading}>
              {isLoading ? UI_STRINGS.loadingPortfolio : UI_STRINGS.inboxLoad}
            </Button>
            <Button type="button" variant="secondary" onClick={onBack}>
              {UI_STRINGS.inboxBack}
            </Button>
          </div>
        </div>

        <p className={`inbox__delivery ${emailConfigured ? 'is-on' : 'is-off'}`}>
          {emailConfigured ? UI_STRINGS.inboxEmailOn : UI_STRINGS.inboxEmailOff}
        </p>

        {error ? (
          <p className="inbox__error" role="alert">
            {error}
          </p>
        ) : null}

        {!error && messages.length === 0 && !isLoading ? (
          <p className="inbox__empty">{UI_STRINGS.inboxEmpty}</p>
        ) : null}

        <div className="inbox__list">
          {messages.map((item) => (
            <article key={`${item.receivedAt}-${item.email}`} className="inbox__card">
              <header className="inbox__card-top">
                <div>
                  <h3>{item.name}</h3>
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </div>
                <time dateTime={item.receivedAt}>
                  {new Date(item.receivedAt).toLocaleString()}
                </time>
              </header>
              <p>{item.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Inbox;
