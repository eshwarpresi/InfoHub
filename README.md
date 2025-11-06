🚀 InfoHub — Smart Utility Dashboard

InfoHub is a modern, responsive dashboard that combines real-time weather updates, currency conversion, and motivational quotes — all in a single elegant interface.

Built with React (Vite) for lightning-fast performance and Node.js + Express for a robust backend.

🔗 Live Demo

🌐 Deployed App: https://info-hub-one.vercel.app/

💻 GitHub Repository: https://github.com/eshwarpresi/InfoHub

🧠 Overview

InfoHub demonstrates clean architecture, real-time API integration, and modern React UI design. It reflects my ability to:

Integrate multiple public APIs seamlessly

Structure full-stack applications professionally

Deliver polished, responsive UI/UX with clean design

🛠️ Tech Stack

Frontend:

⚛️ React (Vite)

🎨 TailwindCSS + Custom CSS

🌩️ Axios for API requests

Backend:

🧠 Node.js + Express

🔐 dotenv for environment variables

🌍 CORS for cross-origin communication

✨ Key Features

✅ Weather Module – Live weather details with temperature, location & coordinates
✅ Currency Converter – Convert between global currencies with up-to-date rates
✅ Quote Generator – Fetch inspiring motivational quotes dynamically
✅ Clean UI – Minimal, responsive layout with subtle animations
✅ Full-Stack Integration – Smooth communication between frontend and backend

⚙️ Local Setup
1. Clone the repository
git clone https://github.com/eshwarpresi/InfoHub.git
cd InfoHub

2. Install dependencies

Backend

cd server
npm install


Frontend

cd ../client
npm install

3. Start the app

Backend

cd ../server
node server.js


Frontend

cd ../client
npm run dev


Open http://localhost:5173
 in your browser to view the app.

🔑 Environment Variables

Create a .env file in both server and client folders.

Server (server/.env)

PORT=5000
WEATHER_API_KEY=your_actual_openweathermap_api_key_here


Client (client/.env)

VITE_API_BASE_URL=https://infohub-ph4h.onrender.com

🧩 Folder Structure
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

⚡ Note: After opening the deployed link in your browser, please wait for 15–20 seconds — the backend may take a moment to wake up.
🔁 If the site doesn’t load immediately, simply refresh or restart once to ensure it runs smoothly.

👨‍💻 Author

Eshwar Raju
🎓 MERN Full-Stack Developer | ByteXL Coding
📧 Email: eshwarraju2002@gmail.com
🌐 GitHub: https://github.com/eshwarpresi
🔗 LinkedIn: linkedin.com/in/eshwar-raju-a-g-715a74286