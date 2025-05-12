# 🎶 RollingTuneTracker

**RollingTuneTracker** is a full-stack music album tracker I built to help a friend log and rate every album on *Rolling Stone’s “Top 500 Albums of All Time”* list. I used Python and Pandas to scrape and clean the album data, enriched it with metadata from Wikipedia and Spotify, then structured and stored it in MongoDB Atlas. On the backend, I used Node.js and Express, and built the frontend in React with TypeScript and the Mantine component library. The app tracks listening progress, shows album info, and lets users add comments and rankings. I built it end-to-end, from data pipeline to deployment, and recently polished it so it’s easy to demo and iterate on.

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://rollingtunetracker.vercel.app](https://rollingtunetracker.vercel.app)
- **Backend (Render)**: [https://rollingtunetracker.onrender.com](https://rollingtunetracker.onrender.com)

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Mantine + React Query
- **Backend**: Express.js (Node.js)
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (frontend) + Render (backend)

## 🧪 Local Development

### Prerequisites

- Node.js & npm
- MongoDB Atlas URI
- `.env` file in `/server`:
  ```
  MONGODB_URI=your_connection_string
  ```

### Run Backend

```bash
cd server
npm install
npm run dev
```

### Run Frontend

```bash
cd client
npm install
npm start
```

## 🌐 Environment Variables

### `/client/.env`

```env
REACT_APP_API_URL=https://rollingtunetracker.onrender.com
REACT_APP_APP_ID=your-app-id
```

### `/server/.env`

```env
MONGODB_URI=your_connection_string
```

## ✨ Features

- Filter and sort albums by year, artist, and rating
- Mark albums as listened or not listened
- Responsive UI with custom theming
- React Query for fast and efficient data fetching
