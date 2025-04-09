# 🌤️ Weather Dashboard Web App

A modern, responsive, and animated weather dashboard built using **React**, **Vite**, **Tailwind CSS (via CDN)**, and the **OpenWeatherMap API**. The app fetches real-time weather data and 5-day forecasts based on city search, with features like search history, dark/light mode toggle, and animated UI elements.

🌐 **Live URL:** [weather-app-nu-sandy.vercel.app](https://weather-app-nu-sandy.vercel.app/)

---

## 🚀 Features

- 🔍 City search for real-time weather
- 🧾 Recent search history (last 5 cities)
- 🌥️ 5-day / 3-hour forecast with trend display
- 🌗 Dark and Light mode toggle
- 🔁 Refresh current weather manually
- ⏳ Animated loading state while fetching data
- 🎞️ Smooth transitions and visual enhancements
- 📱 Fully responsive across all devices

---

## 🛠️ Tech Stack Used

| Technology     | Description                               |
|----------------|-------------------------------------------|
| **React.js**   | JavaScript library for UI development     |
| **Vite**       | Lightweight frontend build tool           |
| **Tailwind CSS (CDN)** | Utility-first CSS framework       |
| **Framer Motion** | Animation library for React           |
| **OpenWeatherMap API** | For weather and forecast data     |
| **Vercel**     | Deployment and hosting                    |

---

## 🧰 API Integration

We use the **OpenWeatherMap API** to fetch real-time and forecasted weather data.

### 📌 APIs Used:
1. **Current Weather API:**
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
2. **5-Day Forecast API:**
https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric


### 🔐 API Key:
- Register for a free key at: https://openweathermap.org/api
- Store it in your `.env` file as: VITE_WEATHER_API_KEY=ad506b89cd3f56fc679fd01ac190b755


### ⚠️ Rate Limits:
- **Free plan**: 60 calls/minute
- Caching or limiting unnecessary calls is recommended

---

## 💻 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sahilkhilar2004/weather_app.git
cd weather_app

### 2. Install Dependencies 
       npm install

### 3. Add Environment Variable
     Create a .env file in the root directory: VITE_WEATHER_API_KEY=ad506b89cd3f56fc679fd01ac190b755

### 4. Run the App Locally
     npm run dev
     The app will be available at: http://localhost:5173

