# Travel Agency Dashboard 🌍✈️

A modern full-stack travel agency dashboard built with React Router and TypeScript, featuring AI-powered trip generation and real-time analytics.

![screnshot](./Screenshot%20from%202025-05-07%2014-07-04.png)

## ✨ Features

- 🤖 AI-powered trip itinerary generation using Google Gemini API
- 📊 Real-time analytics dashboard with Syncfusion charts
- 🎨 Modern UI with Tailwind CSS and custom components
- 🔐 User authentication and role-based access control
- 📱 Responsive design for all devices
- 🖼️ Dynamic image handling with Unsplash API
- 🗄️ Data persistence with Appwrite backend
- 🚀 Server-side rendering for optimal performance
- 📈 Error tracking and monitoring with Sentry

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Appwrite
- **APIs**: Google Gemini AI, Unsplash
- **Charts**: Syncfusion
- **Monitoring**: Sentry

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Appwrite instance

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/paulustimothy/travel_agency_dashboard.git
   cd travel_agency_dashboard
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create `.env` file in the root directory

   ```env
   # Appwrite
   VITE_APPWRITE_ENDPOINT=
   VITE_APPWRITE_PROJECT_ID=
   VITE_APPWRITE_DATABASE_ID=
   VITE_APPWRITE_API_KEY=
   VITE_APPWRITE_USER_COLLECTION_ID=
   VITE_APPWRITE_TRIPS_COLLECTION_ID=

   # Syncfusion
   VITE_SYNCFUSION_LICENSE_KEY=

   # Google AI Studio
   GEMINI_API_KEY=

   # Unsplash
   UNSPLASH_ACCESS_KEY=
   ```

4. Start development server
   ```bash
   npm run dev
   ```

### Production Build

```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Special Thanks to JS Mastery
