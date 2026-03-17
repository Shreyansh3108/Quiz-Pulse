# ⚡ Quiz Pulse

> **Master the Technical Edge.** A professional-grade assessment platform for engineers to bridge the gap between learning and high-stakes interview performance.

[![Live Site](https://img.shields.io/badge/Live-Frontend-blue?style=for-the-badge&logo=vercel)](https://quiz-pulse-three.vercel.app/)
[![Live API](https://img.shields.io/badge/Live-Backend-green?style=for-the-badge&logo=render)](https://quiz-pulse-zr61.onrender.com/api)

---

## 📖 Overview

**Quiz Pulse** is a production-ready MERN stack application designed for developers preparing for elite technical roles. Built with a minimalist "SaaS-dark" aesthetic, the platform eliminates distractions, allowing users to focus purely on mastering Data Structures, Fullstack Development, and Core Engineering concepts.

The application features a tiered filtering system that dynamically fetches subtopics based on real-time database availability, ensuring users can target specific weaknesses (e.g., focusing only on "Cloud Computing" within the "Development" category).

## 🚩 The Problem
Traditional learning platforms often suffer from:
* **Topic Saturation:** Users get lost in massive, unorganized question banks.
* **UI Friction:** Cluttered designs that break the "flow state" required for technical study.
* **Deployment Complexity:** Difficulty in managing secure communication between separate frontend and backend cloud providers.

## 🏗️ Solution & Architecture

The application utilizes a **Decoupled MERN Architecture**, optimized for low-latency response times and independent service scaling.

### Backend (Node.js & Express)
* **Dynamic Query Engine:** Leverages MongoDB `.distinct()` and `.find()` patterns to build real-time menus based on the current data state.
* **Auth Service:** A custom-built authentication layer using Mongoose to manage user registration and secure login persistence.
* **Security:** Implements specialized CORS (Cross-Origin Resource Sharing) configurations to allow safe communication between Vercel and Render.

### Frontend (React & Tailwind CSS)
* **Performance:** Built with Vite for near-instant hot-module replacement and optimized production builds.
* **Minimalist UI:** Inspired by industry-leading tools like **Linear** and **Apple**, utilizing subtle typography and high-contrast dark modes to reduce cognitive load.
* **State Management:** Uses React hooks for real-time score tracking, timers, and "Cold Start" detection logic.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (NoSQL)
* **Deployment:** Vercel (Client), Render (Server)
* **Networking:** Axios (Interceptors & Instance-based)

---

## 🧠 Key AI & Design Decisions

### Why MongoDB for Question Storage?
We opted for a **NoSQL approach** because technical questions are non-uniform. MongoDB allows us to store code blocks, varying answer lengths, and metadata without the performance penalties or migration risks associated with rigid SQL schemas.

### Decoupled API Handshake
The frontend communicates via a centralized **Axios instance**. This allows us to handle the "Cold Start" behavior of free-tier hosting (Render) by implementing retry logic and user-friendly "Connecting to Database..." states during the initial handshake.

---

## 🚀 Setup Instructions

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas Account
* Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/Shreyansh3108/Quiz-Pulse.git](https://github.com/Shreyansh3108/Quiz-Pulse.git)
   cd Quiz-Pulse
