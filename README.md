🌐 InfoHub

InfoHub is a modern, responsive, and fully interactive web dashboard that aggregates useful tools and information in one place. Built with React.js on the frontend and Node.js/Express.js on the backend, it provides real-time weather updates, motivational quotes, and a currency converter, making it a versatile application for everyday users.

🔗 Live Demo: https://info-hub-one.vercel.app/

📁 GitHub Repository: https://github.com/eshwarpresi/InfoHub

🚀 Features

💫 Motivational Quotes: Fetches random inspirational quotes to keep users motivated.

🌤️ Live Weather Module: Displays current weather based on your location or a default city, including temperature, humidity, wind speed, sunrise, and sunset.

💱 Currency Converter: Convert any two currencies in real-time using reliable API data.

Responsive Design: Works flawlessly on mobile, tablet, and desktop.

Error Handling: Graceful fallback messages for failed API calls or denied location access.

Vite + React + Node.js: Fast, modern, and maintainable stack for frontend and backend.

🛠 Tech Stack

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js, SQLite

APIs: OpenWeatherMap (Weather), Custom Quote API, Currency API

Deployment: Vercel (Frontend), Render (Backend)

Version Control: Git + GitHub

📂 Project Structure
InfoHub/
├─ client/             # React frontend
│  ├─ src/
│  │  ├─ components/   # Modular UI components
│  │  │  ├─ WeatherModule.jsx
│  │  │  ├─ QuoteGenerator.jsx
│  │  │  └─ CurrencyConverter.jsx
│  │  └─ App.jsx
│  └─ package.json
├─ server/             # Node.js backend
│  ├─ server.js
│  └─ package.json
├─ README.md
└─ .gitignore

⚡ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/eshwarpresi/InfoHub.git
cd InfoHub

2️⃣ Backend Setup
cd server
npm install
npm start


Backend runs on http://localhost:5000

Handles weather, quotes, and currency APIs.

3️⃣ Frontend Setup
cd ../client
npm install
npm run dev


Frontend runs on http://localhost:5173 (Vite default)

Ensure .env contains:

VITE_API_BASE_URL=https://infohub-ph4h.onrender.com

4️⃣ Build & Deploy
npm run build


For production deployment, push to Vercel (frontend) and Render (backend).

📝 Key Highlights

Clean Code & Modular Components: Every module is reusable and maintainable.

API Integration Expertise: Handles multiple APIs with proper error handling.

User-Centric Design: Smooth UI/UX with Tailwind CSS, mobile-first approach.

Environment Variables: Securely configured API endpoints using .env files.

Git & Version Control: Well-structured commits, clean Git history, ready for collaboration.


🔑 Features 

Complete full-stack implementation (React + Node.js + APIs)

Responsive design using Tailwind CSS

Real-time location-based weather using geolocation API

Clean error handling and loading states

Fully deployable project with Vercel + Render


📌 Contact & Feedback

GitHub: https://github.com/eshwarpresi

Email: eshwarraju2002@gmail.com

LinkedIn: linkedin.com/in/eshwar-raju-a-g-715a74286


👨‍💻 Author
Eshwar
🎓 Mern-Full-Stack Developer | ByteXL Coding Challenge
🌐 https://github.com/eshwarpresi