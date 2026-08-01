import { useId, useState } from 'react';
import Button from '../Button/Button';
import SectionHeading from '../SectionHeading/SectionHeading';
import { UI_STRINGS } from '../../constants/uiStrings';
import { submitContact, getResumeDownloadUrl } from '../../services/portfolioService';
import { validateContactForm } from '../../utils/contactValidation';
import './Contact.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  message: '',
};

const TEST_MESSAGE = {
  name: 'Test Recruiter',
  email: 'recruiter.test@example.com',
  message:
    'This is a test message from the portfolio contact form. Please confirm you can see it in your inbox.',
};

function Contact({ socials = [], email, linkedinUrl }) {
  const formId = useId();
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mailHref = email ? `mailto:${email}` : socials.find((item) => item.url.startsWith('mailto:'))?.url;
  const linkedInHref =
    linkedinUrl || socials.find((item) => item.label.toLowerCase().includes('linkedin'))?.url;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function fillTestMessage() {
    setForm(TEST_MESSAGE);
    setFieldErrors({});
    setStatus({ type: 'idle', message: '' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { isValid, errors, values } = validateContactForm(form);
    setFieldErrors(errors);

    if (!isValid) {
      setStatus({ type: 'error', message: UI_STRINGS.formError });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await submitContact(values);
      setForm(INITIAL_FORM);
      setFieldErrors({});
      setStatus({
        type: 'success',
        message: response.emailSent
          ? response.message || UI_STRINGS.formSuccess
          : `${response.message || UI_STRINGS.formSuccess} ${UI_STRINGS.formSuccessLocal}`,
      });
    } catch {
      setStatus({ type: 'error', message: UI_STRINGS.formError });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <div className="section__inner contact__layout">
        <div>
          <SectionHeading
            eyebrow={UI_STRINGS.contactEyebrow}
            title={UI_STRINGS.contactHeadline}
            description={UI_STRINGS.contactBody}
            id="contact-heading"
          />

          <div className="contact__direct">
            {mailHref ? (
              <a className="contact__direct-card contact__direct-card--mail" href={mailHref}>
                <span className="contact__direct-kicker">{UI_STRINGS.emailMeLabel}</span>
                <strong>{email || mailHref.replace('mailto:', '')}</strong>
                <span>{UI_STRINGS.openMailHint}</span>
              </a>
            ) : null}

            {linkedInHref ? (
              <a
                className="contact__direct-card"
                href={linkedInHref}
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact__direct-kicker">{UI_STRINGS.linkedInLabel}</span>
                <strong>prasad-kulkarni-a2788599</strong>
                <span>linkedin.com</span>
              </a>
            ) : null}
          </div>

          <div className="contact__actions">
            <Button href={getResumeDownloadUrl()} variant="secondary">
              {UI_STRINGS.downloadResume}
            </Button>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="contact__field">
            <label htmlFor={`${formId}-name`}>{UI_STRINGS.formNameLabel}</label>
            <input
              id={`${formId}-name`}
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
            />
            {fieldErrors.name ? (
              <p className="contact__error" id={`${formId}-name-error`}>
                {UI_STRINGS.formValidationName}
              </p>
            ) : null}
          </div>

          <div className="contact__field">
            <label htmlFor={`${formId}-email`}>{UI_STRINGS.formEmailLabel}</label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
            />
            {fieldErrors.email ? (
              <p className="contact__error" id={`${formId}-email-error`}>
                {UI_STRINGS.formValidationEmail}
              </p>
            ) : null}
          </div>

          <div className="contact__field">
            <label htmlFor={`${formId}-message`}>{UI_STRINGS.formMessageLabel}</label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? `${formId}-message-error` : undefined}
            />
            {fieldErrors.message ? (
              <p className="contact__error" id={`${formId}-message-error`}>
                {UI_STRINGS.formValidationMessage}
              </p>
            ) : null}
          </div>

          <div className="contact__form-actions">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? UI_STRINGS.formSubmitting : `${UI_STRINGS.formSubmit} →`}
            </Button>
            <Button type="button" variant="secondary" onClick={fillTestMessage}>
              {UI_STRINGS.fillTestMessage}
            </Button>
          </div>

          <div className="contact__status" role="status" aria-live="polite">
            {status.message ? (
              <p className={`contact__status-text contact__status-text--${status.type}`}>
                {status.message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
