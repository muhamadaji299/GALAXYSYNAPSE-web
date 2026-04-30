# 🌌 GALAXY SYNAPSE

**GALAXY SYNAPSE** is a premium, full-stack galactic-themed web application that integrates secure authentication, AI-driven conversations, and real-time cosmic data.

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/frontend-React-61dafb)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-336791)

---

## 🚀 Key Features

- **🛡️ Secure Galactic Auth**: JWT-based authentication with high-end landing, login, and registration pages.
- **🤖 Synapse AI Chat**: Intelligent AI assistant powered by Llama 3 with persistent chat history.
- **📰 Cosmic News**: Real-time technology and space news feed via NewsData.io.
- **🔭 Galaxy Explore**: Interactive space gallery utilizing the official NASA Image & Video Library API.
- **🎨 Premium UI/UX**: Futuristic Black & White aesthetic with smooth glassmorphism and Framer Motion animations.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js & Express
- **Database**: PostgreSQL (Neon/Local)
- **AI Engine**: Groq (Llama 3.1)
- **Authentication**: JSON Web Token (JWT) & Bcrypt

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/muhamadaji299/GALAXYSYNAPSE-web.git
```

### 2. Backend Setup (`auth-api`)
```bash
cd auth-api
npm install
```
Create a `.env` file in the root of `auth-api`:
```env
PORT=3000
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup (`auth-fe`)
```bash
cd auth-fe
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## 📊 Database Schema
The project requires the following tables in PostgreSQL:
- `users`: Stores user identity and credentials.
- `chats`: Manages AI conversation sessions.
- `messages`: Stores individual chat logs linked to sessions.

## 📜 License
This project is licensed under the MIT License.

---
*Developed with precision for modern explorers.*
