# Prasad Kulkarni — Portfolio

Public portfolio website for **Prasad Shashikant Kulkarni** (Team Lead & MERN Stack Engineer).

Built as a monorepo: **React + Vite** frontend and **Node.js + Express** API. No public login.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, CSS |
| Backend | Node.js, Express 5 |
| Data | JSON (`portfolio.json`) |
| Email | Optional Nodemailer (SMTP / Gmail) |
| Security | Helmet, CORS, rate limiting |
| Tests | Vitest (client), Jest (server) |

---

## Features

- Hero, About, Experience timeline, Projects, Skills, Recognition, Contact
- Dark / light theme toggle
- Company logo marquee and career timeline
- JSON-driven content (easy to update without code changes)
- Contact form with validation + rate limiting
- Owner-only message inbox (`/#inbox`)
- Resume PDF download
- Optional SMTP email notifications

---

## Project structure

```text
portfolio/
├── client/                 # React + Vite UI
│   ├── public/             # Static assets (images, logos)
│   ├── src/                # Components, hooks, services
│   └── .env.example
├── server/                 # Express API
│   ├── src/
│   │   ├── assets/resume/  # Place latest.pdf here
│   │   └── data/           # portfolio.json, messages.json
│   └── .env.example
├── .gitignore
└── README.md
```

---

## Getting started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd portfolio

cd server && npm install
cd ../client && npm install
```

### 2. Environment files (required)

**Do not commit real `.env` files.** Only `.env.example` is tracked.

```bash
# Windows (PowerShell)
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env

# macOS / Linux
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit both `.env` files and set at least:

- `MESSAGES_VIEW_KEY` (server)
- `VITE_MESSAGES_VIEW_KEY` (client) — **must match** the server key

### 3. Content & resume

1. Update profile/experience/projects in `server/src/data/portfolio.json`
2. Add your resume as `server/src/assets/resume/latest.pdf`

### 4. Run locally

**Terminal 1 — API** (port `5000`):

```bash
cd server
npm run dev
```

**Terminal 2 — UI** (port `5173`):

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Environment variables

| File | Commit to GitHub? |
|------|-------------------|
| `.env.example` | Yes (placeholders only) |
| `.env` / `.env.local` | **No** (ignored by `.gitignore`) |

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | API port (default `5000`) |
| `CLIENT_ORIGIN` | Frontend origin for CORS (`http://localhost:5173` locally) |
| `NODE_ENV` | `development` / `production` |
| `MESSAGES_VIEW_KEY` | Secret key for inbox API |
| `RESUME_FILENAME` | Filename used for resume download |
| `CONTACT_TO_EMAIL` | Inbox email destination (optional SMTP) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | Optional email delivery |
| `CONTACT_RATE_LIMIT_WINDOW_MS` / `CONTACT_RATE_LIMIT_MAX` | Contact form rate limit |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_MESSAGES_VIEW_KEY` | Default inbox key (must match `MESSAGES_VIEW_KEY`) |

> Vite embeds `VITE_*` values at **build time**. Set them in your host’s env UI **before** running `npm run build`.

### Production hosts (Render / Railway / etc.)

Do **not** upload `.env` files. Add the same keys in the platform **Environment Variables** panel.

Set `CLIENT_ORIGIN` to your live site URL (example: `https://prasadkulkarni.dev`).

---

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/portfolio` | Portfolio content |
| `POST` | `/api/contact` | Submit contact message |
| `GET` | `/api/contact/messages?key=...` | List messages (protected) |
| `GET` | `/api/resume` | Download resume PDF |

---

## Contact & inbox

1. Messages are always saved to `server/src/data/messages.json` (local / server disk)
2. Owner inbox: open `/#inbox` and use your `MESSAGES_VIEW_KEY`
3. Optional Gmail delivery — example:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=you@gmail.com
```

Use a Gmail **App Password**, not your normal account password.

---

## Scripts

```bash
# Client
cd client
npm run dev      # start Vite
npm run build    # production build
npm run test     # Vitest
npm run lint     # ESLint

# Server
cd server
npm run dev      # nodemon
npm start        # node
npm test         # Jest
```

---

## Deploy notes

This app needs a **Node.js** host for the Express API (contact, resume, portfolio JSON).

Good options:

- [Render](https://render.com)
- [Railway](https://railway.app)
- [Fly.io](https://fly.io)

Frontend-only hosts (GitHub Pages alone) are not enough unless the API is hosted separately.

Suggested personal domains: `prasadkulkarni.dev` or `prasadkulkarni.com`.

---

## License

Private portfolio project. All rights reserved.
