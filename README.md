# 🚀 **NegotiatorAI**

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![build](https://img.shields.io/github/actions/workflow/status/yourusername/NegotiatorAI/main.yml?label=build)
![release](https://img.shields.io/github/v/release/yourusername/NegotiatorAI?include_prereleases)

*A futuristic, gamified negotiation coach that lets procurement professionals sharpen their skills through AI-driven chat simulations.*

---

## ✨ Demo

> **Live Preview:** https://negotiatorai.app  
> *(guest mode available – jump straight in!)*

---

## 🗺️ Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Screenshots](#screenshots)
4. [Quick Start](#quick-start)
5. [Configuration](#configuration)
6. [Deployment](#deployment)
7. [Project Structure](#project-structure)
8. [Roadmap](#roadmap)
9. [Contributing](#contributing)
10. [License](#license)

---

## 🎮 Features

| Category | Highlights |
| --- | --- |
| **Gameplay** | • 6 core scenarios × 3 variations  
• Easy & Intermediate difficulty  
• Points, XP, badges & streaks  
• Leaderboards & daily challenges |
| **AI Engine** | • Grok API (xAI) role-playing sellers  
• Dynamic concession logic  
• Context-aware hints & feedback |
| **Real-Time Chat** | • Socket.io websockets  
• Typing indicators & message limits  
• Futuristic neon chat UI |
| **Analytics** | • Charts for discount %, win-rate  
• Progression bar & level-ups |
| **Security** | • JWT auth, bcrypt hashing  
• Email verification & reset  
• Helmet, rate-limit, input sanitisation |
| **Admin** | • Scenario CRUD dashboard  
• User metrics & data export |

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, Framer-Motion, React Router, Chart.js, Confetti-JS
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB + Mongoose
- **AI Integration:** Grok API (xAI)
- **Auth:** JWT, bcrypt, Nodemailer (email OTP)
- **DevOps:** Docker, GitHub Actions CI, Vercel (FE), Render (BE), MongoDB Atlas

---

## 📸 Screenshots

| Dashboard | Chat UI |
| --- | --- |
| ![dashboard](./screenshots/dashboard.png) | ![chat](./screenshots/chat-ui.png) |

---

## ⚡ Quick Start

```bash
# 1. Clone
$ git clone https://github.com/yourusername/NegotiatorAI.git && cd NegotiatorAI

# 2. Environment
$ cp .env.example .env     # then update keys

# 3. Install deps
$ yarn install             # installs both workspaces (frontend & backend)

# 4. Seed DB with sample scenarios
$ yarn seed

# 5. Run all services
$ yarn dev
```
Frontend 👉 http://localhost:5173   |  Backend 👉 http://localhost:5000

> **Tip:** `yarn docker:up` spins everything in Docker (requires Docker Compose v2).

---

## 🔧 Configuration

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for signing auth tokens |
| `GROK_API_KEY` | Your xAI Grok API key |
| `EMAIL_USER` / `EMAIL_PASS` | SMTP credentials for verification mails |

➡️ Full list in [.env.example](./.env.example)

---

## 🚀 Deployment

### Frontend (Vercel)

1. Push the repo to GitHub.
2. On Vercel > **New Project**, import and select **/frontend** folder.
3. Add env vars (`VITE_API_URL`, etc.), hit *Deploy*.

### Backend (Render)

1. Create *Web Service* from GitHub, point to **/backend/server.js**.
2. Add env vars, set build command `yarn`, start command `node server.js`.
3. Enable *Auto-deploy* & *HTTPS*.

> **ℹ️ GDPR:** Users can export or delete data via *Profile ➜ Privacy*.

---

## 📁 Project Structure

```
NegotiatorAI/
├── backend/
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Auth & negotiation endpoints
│   ├── sockets/        # Chat gateway
│   └── server.js       # Express bootstrap
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI
    │   ├── pages/      # Route views
    │   └── hooks/      # Custom hooks
    └── vite.config.js
```

---

## 🗺️ Roadmap

- [ ] Hard/Expert difficulty levels
- [ ] Voice-over & speech-to-text
- [ ] Mobile PWA & offline caching
- [ ] Additional scenarios & seasonal events

See the [issues](https://github.com/yourusername/NegotiatorAI/issues) page 👀

---

## 🤝 Contributing

1. Fork the project & create a branch: `git checkout -b feat/awesome`
2. Commit your changes: `git commit -m "feat: add awesome"`
3. Push to GitHub: `git push origin feat/awesome`
4. Open a **Pull Request**

Please run `yarn test` and follow the code-style pre-commit hooks before PRs.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more info.

---

## 🙏 Acknowledgements

- [xAI – Grok API](https://x.ai/api)
- [Bargainer.ai](https://www.bargainer.ai) for inspiration
- Icons by [Heroicons](https://heroicons.com)
- UI design influenced by [Glassmorphism](https://ui.glass/) & NeonCyber aesthetics


