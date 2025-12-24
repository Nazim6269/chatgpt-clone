# 🤖 ChatGPT Clone Website

A modern ChatGPT-like AI chat application that allows users to interact with an AI assistant in real time. Built with a clean UI, responsive design, and a scalable backend architecture.

---

## ✨ Features

- 💬 Real-time AI chat interface
- 🧠 Context-aware conversation handling
- ⚡ Fast and responsive UI
- 📱 Fully responsive (mobile-first) design
- 🔐 Secure API handling
- 🧩 Modular and scalable code structure
- 🌙 Modern UI/UX inspired by ChatGPT

---

## 🛠 Tech Stack

Frontend

- React
- Tailwind CSS
- JavaScript
- Fetch API

Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- REST API

AI Integration

- Google Gemini API (Chat Completion)

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Nazim6269/chatgpt-clone.git
cd chatgpt-clone
```

## Install Dependencies

Backend

```bash
cd backend
yarn install
# or
npm install
```

Frontend

```bash
cd frontend
yarn install
# or
npm install
```

## Run Development Server

Backend

```bash
yarn dev
# or
npm dev
```

Frontend

```bash
yarn dev
# or
npm dev
```

## Open your Browser

Visit: [http://localhost:5173](http://localhost:5173)

## Project Structure

```bash
.

backend/
├─ controller/
│ ├─ chat.controller.js
│ └─ image.controller.js
├─ models/
│ ├─ chat.model.js
│ └─ userChats.model.js
├─ routes/
│ └─ route.js
├─ utils/
│ └─ connectMongo.js
├─ .env
├─ app.js
├─ index.js
├─ package.json
├─ secret.js
├─ vercel.json
└─ yarn.lock
frontend/
├─ public/
│  ├─ arrow.png
│  ├─ attachment.png
│  ├─ bg.png
│  ├─ bot.png
│  ├─ chat.png
│  ├─ code.png
│  ├─ human1.jpeg
│  ├─ human2.jpeg
│  ├─ image.png
│  ├─ logo.png
│  ├─ logo.svg
│  └─ orbital.png
├─ src/
│  ├─ components/
│  │  ├─ AiGenerator.jsx
│  │  ├─ LeftSideBar.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ NewPrompt.jsx
│  │  └─ Upload.jsx
│  ├─ layouts/
│  │  ├─ DashboardLayout.jsx
│  │  └─ RootLayout.jsx
│  ├─ lib/
│  │  └─ gemini.js
│  ├─ routes/
│  │  ├─ Chat.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Home.jsx
│  │  ├─ Signin.jsx
│  │  └─ Signup.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .env
├─ .eslintrc.cjs
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ secret.js
├─ vercel.json
├─ vite.config.js
└─ yarn.lock
```

## 💻 Deployment

Deployed on Vercel for live demo.

🔗 Live Demo: [https://chatgpt-clone-afra.vercel.app/](https://chatgpt-clone-afra.vercel.app/)

## 👨‍💻 Author

Nazim Uddin  
Front-End Developer | React & Next.js Enthusiast

- 🌐 [Portfolio](https://portfolio-nextjs-one-tau.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/nazim-uddin-23a93a216/)
- 🐙 [GitHub](https://github.com/Nazim6269)
