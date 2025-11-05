# 🚀 InfoHub — Smart Utility Dashboard

**InfoHub** is a modern, responsive dashboard that brings together **real-time weather updates**, **currency conversion**, and **motivational quotes** — all in one elegant interface.

Built with **React (Vite)** for lightning-fast performance and **Node.js + Express** for a robust backend.

---

## 🔗 Live Demo
🌐 **Deployed App:** [https://info-hub-one.vercel.app/](https://info-hub-one.vercel.app/)  
💻 **GitHub Repository:** [https://github.com/eshwarpresi/InfoHub](https://github.com/eshwarpresi/InfoHub)

---

## 🧠 Overview
InfoHub was built to demonstrate clean architecture, real-time data handling, and modern React UI design.  
It reflects my ability to:
- Integrate multiple public APIs smoothly  
- Structure full-stack apps professionally  
- Deliver polished UI/UX with responsive layouts  

---

## 🛠️ Tech Stack

**Frontend:**  
- ⚛️ React (Vite)  
- 🎨 TailwindCSS + Custom CSS  
- 🌩️ Axios for API requests  

**Backend:**  
- 🧠 Node.js + Express  
- 🔐 dotenv for environment variables  
- 🌍 CORS for cross-origin communication  

---

## ✨ Key Features

✅ **Weather Module** – Displays live weather details with temperature, location & coordinates  
✅ **Currency Converter** – Converts between global currencies with up-to-date rates  
✅ **Quote Generator** – Fetches inspiring motivational quotes dynamically  
✅ **Clean UI** – Minimal, responsive, and aligned layout with subtle animations  
✅ **Full-Stack Integration** – Smooth API communication between client and server  

---

## ⚙️ Local Setup

### Clone the Repository
```bash
git clone https://github.com/eshwarpresi/InfoHub.git
cd InfoHub
Install Dependencies
Backend:

bash
Copy code
cd server
npm install
Frontend:

bash
Copy code
cd ../client
npm install
Run the App
Start backend:

bash
Copy code
cd server
node server.js
Start frontend:

bash
Copy code
cd ../client
npm run dev
Open http://localhost:5173 to view the app.

🔑 Environment Variables
Create a .env file in both server and client folders.

Server (.env)
ini
Copy code
PORT=5000
WEATHER_API_KEY=your_openweather_api_key
CURRENCY_API_KEY=your_exchange_api_key
Client (.env)
ini
Copy code
VITE_API_BASE_URL=http://localhost:5000
🧩 Folder Structure
pgsql
Copy code
InfoHub/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherModule.jsx
│   │   │   ├── CurrencyConverter.jsx
│   │   │   └── QuoteGenerator.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/              # Express Backend
    ├── server.js
    ├── .env
    └── package.json
🚀 Deployment
Frontend — Vercel
Build Command: npm run build

Output Directory: dist

Backend — Render / Railway / Vercel Functions
Start Command: node server.js

👨‍💻 Author
Eshwar
🎓 Full-Stack Developer | ByteXL Coding Challenge Participant
🌐 GitHub Profile