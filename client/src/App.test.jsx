import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const portfolioFixture = {
  profile: {
    name: 'Alex Rivera',
    title: 'Full-Stack Software Engineer',
    tagline: 'Building reliable products.',
    location: 'Remote',
    email: 'alex@example.com',
    shortName: 'Alex Rivera',
    photoUrl: '/images/profile.svg',
    socials: [{ label: 'GitHub', url: 'https://github.com/' }],
  },
  about: {
    headline: 'About headline',
    body: 'About body copy for tests.',
    focusAreas: ['Frontend', 'Backend'],
  },
  services: [
    {
      title: 'Web Development',
      description: 'Build web apps.',
      icon: 'web',
    },
  ],
  experience: [
    {
      company: 'Northline',
      role: 'Engineer',
      period: '2022 — Present',
      location: 'Remote',
      summary: 'Built things.',
      highlights: ['Shipped features'],
    },
  ],
  projects: [
    {
      title: 'Pulseboard',
      summary: 'Dashboard project',
      outcomes: ['Faster triage'],
      tech: ['React'],
      links: [{ label: 'Demo', url: 'https://example.com' }],
    },
  ],
  skills: {
    Frontend: ['React'],
  },
  education: [
    {
      degree: 'Bachelor of Engineering',
      school: 'KIT College of Engineering',
      period: '2009 — 2013',
    },
  ],
  certifications: [
    {
      title: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft Learn',
      period: 'Credential verified',
      url: 'https://learn.microsoft.com/en-gb/users/prasadkulkarni-7916/credentials/5bf3808800105ca7?source=docs',
    },
  ],
  achievements: [
    {
      title: 'Certificate of Appreciation',
      organization: 'SLK Altimetrik',
      period: 'H1 25-26',
      summary: 'Recognized for exemplary work on MSOL Platform and DP Flow Cloud.',
      highlight: 'Steallar team',
      type: 'company-award',
    },
  ],
  blogs: [],
  languages: ['English (Native or Bilingual)'],
  seo: {
    title: 'Alex Rivera — Portfolio',
    description: 'Test description',
  },
};

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url, options = {}) => {
        if (url === '/api/portfolio') {
          return {
            ok: true,
            json: async () => ({ success: true, data: portfolioFixture }),
          };
        }

        if (url === '/api/contact' && options.method === 'POST') {
          return {
            ok: true,
            json: async () => ({
              success: true,
              message: 'Message received. Thank you for reaching out.',
              emailSent: true,
            }),
          };
        }

        return {
          ok: false,
          json: async () => ({ message: 'Not found' }),
        };
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('renders portfolio content from the API', async () => {
    render(<App />);

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/Full-Stack Software Engineer/i);
    expect(screen.getByRole('heading', { name: 'About headline' })).toBeInTheDocument();
    expect(screen.getByText('Pulseboard')).toBeInTheDocument();
  });

  test('submits the contact form successfully', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole('heading', { level: 1 });

    await user.type(screen.getByLabelText('Your Name'), 'Jordan Recruiter');
    await user.type(screen.getByLabelText('Your Email'), 'jordan@example.com');
    await user.type(
      screen.getByLabelText('Your Message'),
      'I would like to discuss an opportunity with you.'
    );
    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Message received. Thank you for reaching out.')
      ).toBeInTheDocument();
    });
  });
});
